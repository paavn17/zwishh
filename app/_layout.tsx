import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Platform } from "react-native";
import Constants from 'expo-constants';
import './globals.css'
export default function RootLayout() {
  const statusBarHeight = Platform.OS === 'android' ? Constants.statusBarHeight : 0;

  return (
    <>
      {/* Blue status bar background */}
      <View style={{ height: statusBarHeight, backgroundColor: '#00D4FF' }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#00D4FF' }} edges={['left', 'right']}>
        <StatusBar style="light" translucent backgroundColor="#00D4FF" />
        
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
        </Stack>
      </SafeAreaView>
    </>
  );
}