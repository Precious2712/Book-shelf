import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { useProduct } from "@/context/useContext";
import { bookData } from "@/data/book";
import { auth, db } from "@/lib/firebase";
import AppHeader from "@/components/header-comp/AppHeader";

interface Book {
    id: string;
    title: string;
    description: string;
    image: string;
    price: string;
}

export function HomePage() {
    const { setUserId } = useProduct();

    const router = useRouter();

    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [modalVisible, setModalVisible] = useState(false);


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                setUserId(null);
                router.replace("/login");
                return;
            }

            setUserId(user.uid); 
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
        setSelectedBook(book);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedBook(null);
    };

    return (
        <View style={styles.container}>
            
            {/* <AppHeader/> */}

            <FlatList<Book>
                data={books}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />

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

            
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        
                        <Pressable style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeText}>✕</Text>
                        </Pressable>

                        {selectedBook && (
                            <>
                                <Image
                                    source={{ uri: selectedBook.image }}
                                    style={styles.modalImage}
                                />

                                <Text style={styles.modalTitle}>
                                    {selectedBook.title}
                                </Text>

                                <Text style={styles.modalDescription}>
                                    {selectedBook.description}
                                </Text>

                                <Text style={styles.modalPrice}>
                                    {selectedBook.price}
                                </Text>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
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

    /* Modal styles */
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        padding: 16,
    },
    modalCard: {
        backgroundColor: "#ffffff",
        borderRadius: 16,
        padding: 16,
    },
    closeButton: {
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 10,
    },
    closeText: {
        fontSize: 20,
        fontWeight: "700",
    },
    modalImage: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 12,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 6,
    },
    modalDescription: {
        fontSize: 14,
        color: "#444",
        marginBottom: 10,
    },
    modalPrice: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2563eb",
    },
});
