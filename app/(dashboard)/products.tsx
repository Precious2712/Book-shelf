import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useColorScheme } from '@/hooks/use-color-scheme';
import productsData from '@/data/product';
import { useProduct } from '@/context/useContext';

type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
};

export default function ProductsScreen() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    const { setSelectedProduct } = useProduct();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const ref = doc(db, 'Book', 'new-product-id');
            const snap = await getDoc(ref);

            if (!snap.exists()) {
                const productsWithId: Product[] = productsData.map(
                    (item, index) => ({
                        id: String(index + 1),
                        ...item,
                    })
                );

                await setDoc(ref, { products: productsWithId });
                setProducts(productsWithId);
            } else {
                const data = snap.data();

                if (data && Array.isArray(data.products)) {
                    setProducts(data.products as Product[]);
                }
            }
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const handleProductPress = (item: Product) => {
        setSelectedProduct(item);
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: isDark ? '#000' : '#fff' },
            ]}
        >
            <FlatList
                data={products}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.card,
                            { backgroundColor: isDark ? '#111' : '#f9f9f9' },
                        ]}
                    >
                        <Image source={{ uri: item.image }} style={styles.image} />

                        <Text
                            style={[
                                styles.name,
                                { color: isDark ? '#fff' : '#000' },
                            ]}
                        >
                            {item.name}
                        </Text>

                        <Text
                            style={[
                                styles.price,
                                { color: isDark ? '#ccc' : '#333' },
                            ]}
                        >
                            ₦{item.price.toLocaleString()}
                        </Text>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleProductPress(item)}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.buttonText}>Select</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        justifyContent: 'space-between',
    },
    card: {
        width: '48%',
        borderRadius: 12,
        padding: 10,
        marginBottom: 12,
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 8,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
    },
    price: {
        fontSize: 13,
        fontWeight: '500',
    },
    button: {
        marginTop: 8,
        backgroundColor: "#1e40af",
        paddingVertical: 8,
        borderRadius: 8,
        alignItems: "center",
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 13,
        fontWeight: "600",
    },

});
