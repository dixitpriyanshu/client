import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import Button from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
  const { signOut } = useClerk();
  return (
    <BodyScrollView>
      <Button
        onPress={() => {
          console.log("Signing out");
          signOut();
          router.replace("/(auth)");
        }}
      >
        Sign Out
      </Button>
    </BodyScrollView>
  );
}
