import { BodyScrollView } from "@/components/ui/body-scroll-view";
import Button from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";

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
