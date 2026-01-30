import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from "expo-router";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { DarkThemeApp, LightTheme } from '@/constants/background';

export default function AppHeader() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? DarkThemeApp : LightTheme;
    
    const router = useRouter()

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
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
                            {
                                tintColor: theme.colors.text,
                                transform: [{ rotate: '180deg' }],
                            },
                        ]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        height: 56,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingHorizontal: 16,
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 12
    },
    icon: {
        width: 17,
        height: 17,
    },
})
