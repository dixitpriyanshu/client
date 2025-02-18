import { ThemedText } from "@/components/ThemedText";
import { BodyScrollView } from "@/components/ui/body-scroll-view";
import Button from "@/components/ui/button";
import { IconCircle } from "@/components/ui/IconCircle";
import TextInput from "@/components/ui/text-input";
import { backgroundColors, emojies } from "@/constants/Colors";
import { Href, router } from "expo-router";
import React, { useMemo, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";

const handleDismissTo = (screen: Href) => {
  if (router.canDismiss()) {
    router.dismiss();
    setTimeout(() => {
      router.push(screen);
    }, 100);
  }
};

const isValidUUID = (id: string | null) => {
  if (!id) return false;
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export default function NewListScreen() {
  const [listId, setListId] = useState("");
  const randomEmoji = useMemo(
    () => emojies[Math.floor(Math.random() * emojies.length)],
    []
  );

  const randomBackgroundColor = useMemo(
    () => backgroundColors[Math.floor(Math.random() * backgroundColors.length)],
    []
  );

  const isValidListId = useMemo(() => isValidUUID(listId), [listId]);

  const joinShoppingListCallback = (listId: string) => {
    console.log("Joining shopping list with id", listId);
  };
  const handleJoinList = () => {
    console.log("Handle Join List");
  };
  return (
    <BodyScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <View style={styles.heroSection}>
          <IconCircle
            style={styles.iconCircle}
            size={60}
            emoji={randomEmoji}
            backgroundColor={randomBackgroundColor}
          />
          <ThemedText type="subtitle" style={styles.title}>
            Better Together
          </ThemedText>
          <ThemedText type="defaultSemiBold" style={styles.subtitle}>
            Create shared shopping lists and collaborate in real-time with
            family and friends
          </ThemedText>
        </View>

        <View style={styles.actionSection}>
          <Button onPress={() => handleDismissTo("/list/new/create")}>
            Create new list
          </Button>

          <View style={styles.divider}>
            <View style={styles.line} />
            <ThemedText type="default" style={styles.orText}>
              or join existing
            </ThemedText>
            <View style={styles.line} />
          </View>

          <View style={styles.joinSection}>
            <TextInput
              placeholder="Enter a list code"
              value={listId}
              onChangeText={setListId}
              onSubmitEditing={(e) => {
                joinShoppingListCallback(e.nativeEvent.text);
              }}
              containerStyle={{ marginBottom: 0 }}
            />
            <Button onPress={handleJoinList} disabled={!isValidListId}>
              Join list
            </Button>
            <Button
              variant="ghost"
              onPress={() => handleDismissTo("/list/new/scan")}
            >
              Scan QR code
            </Button>
          </View>
        </View>
      </View>
    </BodyScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    padding: 16,
    marginBottom: 100,
  },
  container: {
    gap: 32,
  },
  heroSection: {
    alignItems: "center",
    gap: 16,
    marginTop: 32,
  },
  iconCircle: {
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "gray",
    paddingHorizontal: 24,
    lineHeight: 24,
  },
  actionSection: {
    gap: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(150, 150, 150, 0.2)",
  },
  orText: {
    color: "gray",
  },
  joinSection: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  textInput: {
    flex: 1,
  },
  qrButton: {
    marginBottom: 16,
  },
  joinButton: {
    marginTop: 8,
  },
});
