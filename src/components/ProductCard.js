import { Image, StyleSheet, Text, View } from 'react-native';

function formatPrice(price) {
  if (!price) return 'Unavailable';
  const amount = Number(price.amount);
  if (Number.isNaN(amount)) return `${price.amount} ${price.currencyCode}`;
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: price.currencyCode
  }).format(amount);
}

export default function ProductCard({ product }) {
  const image = product?.featuredImage;
  const price = product?.priceRange?.minVariantPrice;

  return (
    <View style={styles.card}>
      {image?.url ? (
        <Image
          source={{ uri: image.url }}
          accessibilityLabel={image?.altText ?? `${product.title} image`}
          style={styles.image}
        />
      ) : (
        <View style={[styles.image, styles.imagePlaceholder]}>
          <Text style={styles.imagePlaceholderText}>No image</Text>
        </View>
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{product.title}</Text>
        {product.description ? (
          <Text style={styles.description} numberOfLines={3}>
            {product.description}
          </Text>
        ) : null}
        <Text style={styles.price}>{formatPrice(price)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16
  },
  image: {
    height: 220,
    width: '100%',
    backgroundColor: '#f0f0f0'
  },
  imagePlaceholder: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  imagePlaceholderText: {
    color: '#777777',
    fontSize: 16
  },
  content: {
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  description: {
    fontSize: 14,
    color: '#444444',
    marginBottom: 12
  },
  price: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0c5adb'
  }
});
