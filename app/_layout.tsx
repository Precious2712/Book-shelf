import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <>
      <StatusBar
        translucent={false}
        style={isDark ? 'light' : 'dark'}
        backgroundColor={isDark ? '#000000' : '#ffffff'}
      />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: isDark
              ? DarkTheme.colors.card
              : DefaultTheme.colors.card,
          },
          headerTintColor: isDark
            ? DarkTheme.colors.text
            : DefaultTheme.colors.text,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: 'Home' }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
