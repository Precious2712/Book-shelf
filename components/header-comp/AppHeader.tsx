import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { View, Image, TouchableOpacity, StyleSheet } from "react-native"
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
            <Image
                source={{ uri: "https://reactnative.dev/img/header_logo.svg" }}
                style={styles.logo}
                resizeMode="contain"
            />

            <TouchableOpacity onPress={() => router.replace("/home")}>
                <Image
                    source={{ uri: "https://img.icons8.com/ios-filled/50/home.png" }}
                    style={[
                        styles.homeIcon,
                        { tintColor: theme.colors.text },
                    ]}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
    },
    logo: {
        width: 120,
        height: 30,
    },
    homeIcon: {
        width: 22,
        height: 22,
    },
})
