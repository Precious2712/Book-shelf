import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { useRouter } from "expo-router"
import { useColorScheme } from '@/hooks/use-color-scheme'

export default function AppHeader() {
    const colorScheme = useColorScheme()
    const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme
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
