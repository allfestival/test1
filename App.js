import { SafeAreaView, StatusBar, StyleSheet, Text, View, FlatList, RefreshControl } from 'react-native';
import { useCallback } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import useShopifyProducts from './src/hooks/useShopifyProducts';
import ProductCard from './src/components/ProductCard';
import { colors, spacing } from './src/styles/theme';

export default function App() {
  const { products, loading, error, refresh } = useShopifyProducts({ first: 20 });

  const renderItem = useCallback(({ item }) => <ProductCard product={item} />, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ExpoStatusBar style="dark" />
      <View style={styles.container}>
        <Text style={styles.header}>Shopify Store</Text>
        {error ? <Text style={styles.error}>{error.message}</Text> : null}
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={refresh} />}
          ListEmptyComponent={
            !loading && !error ? (
              <Text style={styles.emptyText}>No products available yet.</Text>
            ) : null
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg
  },
  listContent: {
    paddingBottom: spacing.lg
  },
  error: {
    color: '#ef4444',
    marginBottom: spacing.md
  },
  emptyText: {
    textAlign: 'center',
    color: colors.muted,
    marginTop: spacing.xl
  }
});
