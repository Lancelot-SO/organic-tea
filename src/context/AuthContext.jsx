import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(() => {
        // Instant bootstrap from cache
        const cached = localStorage.getItem('garden_auth_profile');
        return cached ? JSON.parse(cached) : null;
    });
    const [loading, setLoading] = useState(true);
    const [profileLoading, setProfileLoading] = useState(false);

    // Fetch user profile from profiles table
    const fetchProfile = async (userId) => {
        // Skip if already fetching this user or if same profile already exists
        if (profile?.id === userId && !profileLoading) {
            console.log('AuthContext: Profile already exists for this user, skipping fetch');
            return profile;
        }

        console.log('AuthContext: fetchProfile started for ID:', userId);
        setProfileLoading(true);

        // Aggressive 3s timeout for background refresh
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Profile fetch timed out')), 3000)
        );

        try {
            const fetchPromise = supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            const { data, error } = await Promise.race([fetchPromise, timeoutPromise]);

            if (error) {
                console.warn('AuthContext: Profile fetch error:', error.message);
                throw error;
            }

            console.log('AuthContext: Profile data received for', data?.email, '| Role:', data?.role);
            setProfile(data);
            localStorage.setItem('garden_auth_profile', JSON.stringify(data));
            return data;
        } catch (error) {
            console.error('AuthContext: Error in fetchProfile:', error.message);
            // Don't clear profile on error if we have a cache, just log it
            if (!profile) setProfile(null);
            return null;
        } finally {
            setProfileLoading(false);
            console.log('AuthContext: fetchProfile process ended');
        }
    };

    // Initialize auth state
    useEffect(() => {
        // Get initial session
        const initAuth = async () => {
            console.log('AuthContext: Initializing...');
            setLoading(true);
            try {
                const { data: { session } } = await supabase.auth.getSession();
                console.log('AuthContext: Session found:', !!session);
                const currentUser = session?.user ?? null;
                setUser(currentUser);

                if (currentUser) {
                    // Start background sync
                    fetchProfile(currentUser.id);

                    // If we have a cache for this user, we can stop the initial blocker
                    const cached = localStorage.getItem('garden_auth_profile');
                    if (cached) {
                        const parsed = JSON.parse(cached);
                        if (parsed.id === currentUser.id) {
                            console.log('AuthContext: Cache hit, resolving loading state');
                            setLoading(false);
                        }
                    }
                } else {
                    localStorage.removeItem('garden_auth_profile');
                }
            } catch (error) {
                console.error('Auth init error:', error);
            } finally {
                setLoading(false);
                console.log('AuthContext: Initialized');
            }
        };

        initAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                console.log('AuthContext: Event change:', event, 'User ID:', session?.user?.id);
                const currentUser = session?.user ?? null;
                setUser(currentUser);

                if (currentUser) {
                    // Only fetch profile if we don't have it or it's a new user
                    if (profile?.id !== currentUser.id) {
                        await fetchProfile(currentUser.id);
                    }
                } else {
                    console.log('AuthContext: No session, clearing profile');
                    setProfile(null);
                    localStorage.removeItem('garden_auth_profile');
                }

                setLoading(false);
                console.log('AuthContext: Loading state set to false');
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    // Sign up with email and password
    const signUp = async ({ email, password, fullName }) => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { full_name: fullName },
            },
        });
        if (error) throw error;
        return data;
    };

    // Sign in with email and password
    const signIn = async ({ email, password }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    };

    // Sign out
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        localStorage.removeItem('garden_auth_profile');
        setUser(null);
        setProfile(null);
    };

    // Update user profile
    const updateProfile = async (updates) => {
        if (!user) throw new Error('No user logged in');

        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)
            .select()
            .single();

        if (error) throw error;
        setProfile(data);
        localStorage.setItem('garden_auth_profile', JSON.stringify(data));
        return data;
    };

    const isAdmin = profile?.role === 'admin';

    const value = {
        user,
        profile,
        loading,
        profileLoading,
        isAdmin,
        signUp,
        signIn,
        signOut,
        updateProfile,
        fetchProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
