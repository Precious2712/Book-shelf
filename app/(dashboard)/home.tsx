import { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import { bookData } from "@/data/book";


interface Book {
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
}


export function HomePage() {
    const router = useRouter();

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.replace("/login");
            }
        });

        return unsubscribe;
    }, []);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const docRef = doc(db, "Book", "defaultBook");
                const snap = await getDoc(docRef);

                if (!snap.exists()) {

                    await setDoc(docRef, { bookData });
                    setBooks(bookData);
                } else {
                    const data = snap.data();

                    if (data && Array.isArray(data.bookData)) {
                        setBooks(data.bookData as Book[]);
                    }
                }
            } catch (error) {
                console.log("Fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);


    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    const handleBookPress = (book: Book) => {
        console.log("Selected book:", book.id);
    };



    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <FlatList<Book>
                    data={books}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    columnWrapperStyle={styles.row}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                source={{ uri: item.image }}
                                style={styles.image}
                            />

                            <Text style={styles.title} numberOfLines={2}>
                                {item.title}
                            </Text>

                            <Text style={styles.price}>{item.price}</Text>

                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => handleBookPress(item)}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.buttonText}>View Book</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>


        </View>
    );
}

export default HomePage;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: "#ffffff",
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    row: {
        justifyContent: "space-between",
    },
    card: {
        width: "48%",
        backgroundColor: "#f9fafb",
        borderRadius: 12,
        marginBottom: 16,
        padding: 10,
        elevation: 3,
    },
    image: {
        width: "100%",
        height: 160,
        borderRadius: 10,
        marginBottom: 8,
    },
    title: {
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 4,
    },
    price: {
        fontSize: 13,
        color: "#2563eb",
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
