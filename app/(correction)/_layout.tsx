import { Tabs } from 'expo-router'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { IconSymbol } from '@/components/ui/icon-symbol'
import AppHeader from '@/components/header-comp/AppHeader'


export default function DashboardLayout() {
    const colorScheme = useColorScheme()
    const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                headerBackground: () => <AppHeader />,
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    borderTopColor: theme.colors.background,
                    height: 60,
                    paddingTop: 6,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.text + '99',

                headerTitleStyle: {
                    color: '#fff', 
                    fontWeight: '600',
                },

                headerTintColor: '#fff',
            }}
        >
            <Tabs.Screen
                name="right"
                options={{
                    title: 'Right-Ans',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol name="checkmark.circle.fill" size={22} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="wrong"
                options={{
                    title: 'Wrong-Ans',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol name="xmark.circle.fill" size={22} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
