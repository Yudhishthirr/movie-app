import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import './global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    // Hide the splash screen after the app is ready
    const prepare = async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(...);
        
        // Artificially delay for demonstration purposes (remove if not needed)
        // Remove this delay if you want the splash screen to hide immediately
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  return (
    // for the route gruop headers
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Home",
          headerTitleAlign: "center", 
          headerShown:false
        }}
      />
      <Stack.Screen
        name="movies/[id]"
        options={{
          headerShown:false
        }}
      />
    </Stack>
  );
}

