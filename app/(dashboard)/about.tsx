import { DarkThemeApp, LightTheme } from '@/constants/background';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Image, StyleSheet, Text, View } from 'react-native';

import { useProduct } from '@/context/useContext';
import { ThemedView } from '@/components/themed-view';

export default function AboutScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? DarkThemeApp : LightTheme;
  const { selectedProduct } = useProduct();

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: 'white' },
      ]}
    >

      <Text
        style={[
          styles.header,
          { color: 'blue' },
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
            { backgroundColor: '#f9f9f9' },
          ]}
        >
          <Image
            source={{ uri: selectedProduct.image }}
            style={styles.image}
          />

          <Text
            style={[
              styles.name,
              { color: '#7A7A7A' },
            ]}
          >
            {selectedProduct.name}
          </Text>

          <Text
            style={[
              styles.price,
              { color: '#333' },
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
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: -10
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
    // maxWidth: 320,
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
