import { useEffect } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

export function HomePage() {
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace("/");
            }

            const uid = user?.uid
        });
        
        return unsubscribe;
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
}

export default HomePage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
