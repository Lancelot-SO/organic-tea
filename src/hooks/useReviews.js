import { useState, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export const useReviews = (productId) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchReviews = useCallback(async () => {
        if (!productId) return;
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('reviews')
                .select('*, profile:profiles(full_name, avatar_url)')
                .eq('product_id', productId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setReviews(data || []);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching reviews:', err.message);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    const addReview = async ({ userId, rating, comment }) => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase
                .from('reviews')
                .insert([{
                    product_id: productId,
                    user_id: userId,
                    rating,
                    comment
                }])
                .select()
                .single();

            if (error) throw error;

            // Re-fetch to get updated averages (optional: could also update locally)
            await fetchReviews();
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const deleteReview = async (reviewId) => {
        setLoading(true);
        setError(null);
        try {
            const { error } = await supabase
                .from('reviews')
                .delete()
                .eq('id', reviewId);

            if (error) throw error;
            setReviews(prev => prev.filter(r => r.id !== reviewId));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        reviews,
        loading,
        error,
        fetchReviews,
        addReview,
        deleteReview
    };
};
