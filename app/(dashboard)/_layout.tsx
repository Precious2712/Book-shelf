import { Tabs } from 'expo-router'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { useColorScheme } from '@/hooks/use-color-scheme'
import { IconSymbol } from '@/components/ui/icon-symbol'

export default function DashboardLayout() {
  const colorScheme = useColorScheme()
  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          height: 60,
          paddingTop: 6,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text + '99',
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol name="house.fill" size={22} color={color} />
          ),
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
