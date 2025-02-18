import React from "react";
import * as Haptics from "expo-haptics";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useClerk } from "@clerk/clerk-expo";
import { router, Stack } from "expo-router";
import { Pressable } from "react-native";
import { Platform, StyleSheet } from "react-native";

const ICON_COLOR = "#007AFF";

const handleNewListPress = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  router.push("/list/new");
};

const handleProfilePress = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  router.push("/profile");
};

export default function HomeScreen() {
  const { signOut } = useClerk();

  const renderHeaderRight = () => (
    <Pressable onPress={handleNewListPress} style={styles.headerButton}>
      <IconSymbol name="plus" color={ICON_COLOR} />
    </Pressable>
  );

  const renderHeaderLeft = () => (
    <Pressable
      onPress={handleProfilePress}
      style={[styles.headerButton, styles.headerButtonLeft]}
    >
      <IconSymbol
        name="gear"
        color={ICON_COLOR}
        style={{ marginRight: Platform.select({ default: 0, android: 8 }) }}
      />
    </Pressable>
  );
  return (
    <>
      <Stack.Screen
        options={{
          title: "Shopping lists",
          headerRight: renderHeaderRight,
          headerLeft: renderHeaderLeft,
        }}
      />
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
    </>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 8,
  },
  emptyStateContainer: {
    alignItems: "center",
    gap: 8,
    paddingTop: 100,
  },
  headerButton: {
    padding: 8,
    paddingRight: 0,
    marginHorizontal: Platform.select({ web: 16, default: 0 }),
  },
  headerButtonLeft: {
    paddingLeft: 0,
  },
});
