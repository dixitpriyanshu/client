import React from "react";
import * as Haptics from "expo-haptics";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import Button from "@/components/ui/button";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { router, Stack } from "expo-router";
import { FlatList, Pressable } from "react-native";
import { Platform, StyleSheet } from "react-native";
import { IconCircle } from "@/components/ui/IconCircle";
import { backgroundColors } from "@/constants/Colors";
import { useShoppingListIds } from "@/stores/ShoppingListsStore";
import ShoppingListItem from "@/components/ShoppingListItem";

const ICON_COLOR = "#007AFF";

const handleNewListPress = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  router.push("/list/new");
};

const handleProfilePress = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  router.push("/profile");
};

const renderEmptyList = () => (
  <BodyScrollView contentContainerStyle={styles.emptyStateContainer}>
    <IconCircle
      emoji="🛒"
      backgroundColor={
        backgroundColors[Math.floor(Math.random() * backgroundColors.length)]
      }
    />
    <Button onPress={handleNewListPress} variant="ghost">
      Create your first list
    </Button>
  </BodyScrollView>
);

export default function HomeScreen() {
  const shoppingListIds = useShoppingListIds();

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
        <FlatList
          data={shoppingListIds}
          renderItem={({ item: listId }) => (
            <ShoppingListItem listId={listId} />
          )}
          contentContainerStyle={styles.listContainer}
          contentInsetAdjustmentBehavior="automatic"
          ListEmptyComponent={renderEmptyList}
        />
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
