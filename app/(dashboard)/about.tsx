import { Text, StyleSheet, View, Image } from 'react-native';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ThemedView } from '@/components/themed-view';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

import { useProduct } from '@/context/useContext';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;
  const isDark = colorScheme === 'dark';

  const { selectedProduct } = useProduct();

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: theme.colors.background },
      ]}
      // safe={false}
    >
      
      <Text
        style={[
          styles.header,
          { color: theme.colors.text },
        ]}
      >
        Selected Product
      </Text>

      {!selectedProduct && (
        <Text
          style={[
            styles.emptyText,
            { color: isDark ? '#aaa' : '#666' },
          ]}
        >
          No product selected yet 🛒
        </Text>
      )}

      {selectedProduct && (
        <View
          style={[
            styles.card,
            { backgroundColor: isDark ? '#111' : '#f9f9f9' },
          ]}
        >
          <Image
            source={{ uri: selectedProduct.image }}
            style={styles.image}
          />

          <Text
            style={[
              styles.name,
              { color: theme.colors.text },
            ]}
          >
            {selectedProduct.name}
          </Text>

          <Text
            style={[
              styles.price,
              { color: isDark ? '#ccc' : '#333' },
            ]}
          >
            ₦{selectedProduct.price.toLocaleString()}
          </Text>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  emptyText: {
    fontSize: 14,
  },

  card: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  image: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 12,
  },

  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    textAlign: 'center',
  },

  price: {
    fontSize: 14,
    fontWeight: '500',
  },
});
