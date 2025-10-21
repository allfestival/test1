import { useCallback, useEffect, useState } from 'react';
import { fetchProducts } from '../api/shopify';

export default function useShopifyProducts(options = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchProducts(options);
      setProducts(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [options]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return { products, loading, error, refresh: loadProducts };
}
