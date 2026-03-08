import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

/**
 * useProducts — fetches and filters products from Supabase
 */
export const useProducts = (options = {}) => {
    const {
        categorySlug = null,
        searchQuery = '',
        sortBy = 'created_at',
        sortOrder = 'desc',
        limit = 20,
        page = 1,
        priceMin = null,
        priceMax = null,
    } = options;

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    // Fetch categories
    const fetchCategories = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setCategories(data || []);
        } catch (err) {
            console.error('Error fetching categories:', err.message);
        }
    }, []);

    // Fetch products with filters
    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            let query = supabase
                .from('products')
                .select('*, categories(name, slug), average_rating, review_count', { count: 'exact' })
                .eq('is_published', true);

            // Filter by category
            if (categorySlug) {
                const category = categories.find((c) => c.slug === categorySlug);
                if (category) {
                    query = query.eq('category_id', category.id);
                }
            }

            // Search
            if (searchQuery) {
                query = query.ilike('name', `%${searchQuery}%`);
            }

            // Price range
            if (priceMin !== null && priceMin !== '') {
                query = query.gte('price', Number(priceMin));
            }
            if (priceMax !== null && priceMax !== '') {
                query = query.lte('price', Number(priceMax));
            }

            // Sorting
            query = query.order(sortBy, { ascending: sortOrder === 'asc' });

            // Pagination
            const from = (page - 1) * limit;
            const to = from + limit - 1;
            query = query.range(from, to);

            const { data, error, count } = await query;

            if (error) throw error;
            setProducts(data || []);
            setTotalCount(count || 0);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching products:', err.message);
        } finally {
            setLoading(false);
        }
    }, [categorySlug, searchQuery, sortBy, sortOrder, limit, page, categories, priceMin, priceMax]);

    // Fetch single product by slug
    const fetchProductBySlug = useCallback(async (slug) => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*, categories(name, slug), average_rating, review_count')
                .eq('slug', slug)
                .eq('is_published', true)
                .single();

            if (error) throw error;
            return data;
        } catch (err) {
            console.error('Error fetching product:', err.message);
            return null;
        }
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    useEffect(() => {
        if (categories.length > 0 || !categorySlug) {
            fetchProducts();
        }
    }, [fetchProducts, categories, categorySlug]);

    return {
        products,
        categories,
        loading,
        error,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        fetchProducts,
        fetchProductBySlug,
    };
};

/**
 * useAdminProducts — full CRUD for admin product management
 */
/**
 * useAdminProducts — full CRUD for admin product management
 */
export const useAdminProducts = (options = {}) => {
    const {
        categorySlug = null,
        searchQuery = '',
        sortBy = 'created_at',
        sortOrder = 'desc',
        limit = 10,
        page = 1,
    } = options;

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async (currentOptions = options) => {
        setLoading(true);
        setError(null);
        try {
            let query = supabase
                .from('products')
                .select('*, categories(name, slug)', { count: 'exact' });

            // In Admin, we show everything (including unpublished)

            if (currentOptions.categorySlug) {
                // Fetch category by slug to get ID
                const { data: catData } = await supabase
                    .from('categories')
                    .select('id')
                    .eq('slug', currentOptions.categorySlug)
                    .single();

                if (catData) {
                    query = query.eq('category_id', catData.id);
                }
            }

            if (currentOptions.searchQuery) {
                query = query.ilike('name', `%${currentOptions.searchQuery}%`);
            }

            query = query.order(currentOptions.sortBy || 'created_at', {
                ascending: currentOptions.sortOrder === 'asc'
            });

            const from = ((currentOptions.page || 1) - 1) * (currentOptions.limit || 10);
            const to = from + (currentOptions.limit || 10) - 1;
            query = query.range(from, to);

            const { data, error, count } = await query;
            if (error) throw error;

            setProducts(data || []);
            setTotalCount(count || 0);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching admin products:', err.message);
        } finally {
            setLoading(false);
        }
    }, [options.categorySlug, options.searchQuery, options.sortBy, options.sortOrder, options.limit, options.page]);

    const createProduct = async (product) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .insert(product)
                .select()
                .single();

            if (error) throw error;
            await fetchProducts(); // Refresh list
            return data;
        } finally {
            setLoading(false);
        }
    };

    const updateProduct = async (id, updates) => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('products')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            await fetchProducts(); // Refresh list
            return data;
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('products')
                .delete()
                .eq('id', id);

            if (error) throw error;
            await fetchProducts(); // Refresh list
        } finally {
            setLoading(false);
        }
    };

    const togglePublish = async (id, isPublished) => {
        return updateProduct(id, { is_published: !isPublished });
    };

    return {
        products,
        loading,
        error,
        totalCount,
        totalPages: Math.ceil(totalCount / (options.limit || 10)),
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct,
        togglePublish,
        updateSalesCount: async (id, count) => {
            return updateProduct(id, { sales_count: count });
        },
    };
};
