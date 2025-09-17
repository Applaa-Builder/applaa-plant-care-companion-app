import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/colors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc, trpcClient } from '@/lib/trpc';

// Create a client
const queryClient = new QueryClient();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function RootLayoutNav() {
  return (
    <Stack
        screenOptions={{
          headerBackTitle: "Back",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTintColor: Colors.primary,
          headerTitleStyle: {
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
      <StatusBar style="dark" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="plant/[id]" 
          options={{ 
            title: "Plant Details",
            headerBackTitle: "My Plants",
          }} 
        />
        <Stack.Screen 
          name="tip/[id]" 
          options={{ 
            title: "Plant Care Tip",
            headerBackTitle: "Tips",
          }} 
        />
    </Stack>
  );
}