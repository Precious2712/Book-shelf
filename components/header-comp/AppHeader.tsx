import { SafeAreaView } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

import logo from '../../assets/images/favicon.png'
import { DarkThemeApp, LightTheme } from '@/constants/background';
import { ThemedView } from '../themed-view';

export default function AppHeader() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? DarkThemeApp : LightTheme;
    const router = useRouter();

    return (
        <ThemedView safe style={[styles.container, { backgroundColor: 'blue' }]}>
            <View style={styles.left}>
                <Image source={logo} style={styles.logo} />
                <Text style={[styles.title, { color: theme.colors.text }]}>Library</Text>
            </View>

            <View style={styles.iconRow}>
                <TouchableOpacity onPress={() => router.replace("/home")}>
                    <Image
                        source={{ uri: "https://img.icons8.com/ios-filled/50/home.png" }}
                        style={[styles.icon, { tintColor: theme.colors.text }]}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/right")}>
                    <Image
                        source={{ uri: "https://img.icons8.com/ios-filled/50/checkmark.png" }}
                        style={[styles.icon, { tintColor: theme.colors.text }]}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => router.replace("/wrong")}>
                    <Image
                        source={{ uri: "https://img.icons8.com/ios-filled/50/checkmark.png" }}
                        style={[
                            styles.icon,
                            { tintColor: theme.colors.text, transform: [{ rotate: '180deg' }] },
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 10,
        // paddingVertical: 100,
        height: 90
    },
    left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    logo: {
        width: 28,
        height: 28,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
    },
    icon: {
        width: 18,
        height: 18,
    },
});
