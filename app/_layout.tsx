import 'react-native-reanimated';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ProductProvider } from '@/context/useContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import Toast from 'react-native-toast-message';

import { DarkThemeApp, LightTheme } from '@/constants/background';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? DarkThemeApp : LightTheme;

  return (
    <>

      <StatusBar
        translucent={false}
        style={isDark ? 'light' : 'dark'}
        backgroundColor={theme.colors.background}
      />


      <ProductProvider>

        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.primary,
            headerTitleStyle: {
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen name="index" options={{ title: 'Create Account' }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
          <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
          <Stack.Screen name="(correction)" options={{ headerShown: false }} />
        </Stack>
      </ProductProvider>

      <Toast />
    </>
  );
}
