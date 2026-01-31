import AppHeader from '@/components/header-comp/AppHeader';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { DarkThemeApp, LightTheme } from '@/constants/background';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Tabs } from 'expo-router';


export default function DashboardLayout() {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? DarkThemeApp : LightTheme;

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                header: () => <AppHeader />,
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
                    fontSize: 18,
                },

                headerTintColor: '#fff',
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol name="house.fill" size={22} color={color} />
                    ),
                    // headerShown:true
                }}
            />

            <Tabs.Screen
                name="about"
                options={{
                    title: 'About',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol name="info.circle.fill" size={22} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="exam"
                options={{
                    title: 'Exam',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol name="doc.text.fill" size={22} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="products"
                options={{
                    title: 'Products',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol name="cart.fill" size={22} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
