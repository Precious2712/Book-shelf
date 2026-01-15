import { Text, StyleSheet } from 'react-native'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { ThemedView } from '@/components/themed-view'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'


export default function ProductsScreen() {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

    return (
        <ThemedView style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={[styles.text, { color: theme.colors.text }]}>
                Welcome to Exam Screen 🛒
            </Text>
        </ThemedView>
    )


}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
    },
})
