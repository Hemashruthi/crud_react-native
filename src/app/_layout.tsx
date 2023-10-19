import { Stack } from "expo-router";
import PostProvider from "../Hooks/useContextHook";

export default function RootLayout() {
  return (
    <PostProvider>
      <Stack initialRouteName="index"
      screenOptions={{
        headerShown: false,
      }} />
      </PostProvider>
  );
}