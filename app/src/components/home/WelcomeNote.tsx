import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { darkTheme } from "@/const/theme";

const WelcomeNote = () => {
  return (
    <View style={styles.welcomeNote}>
      <Text style={styles.welcomeNoteText}>Welcome Buddy,</Text>
    </View>
  );
};

export default WelcomeNote;

const styles = StyleSheet.create({
  welcomeNote: {
    padding: 16,
    width: "100%",
  },
  welcomeNoteText: {
    fontSize: 24,
    fontWeight: "500",
    color: darkTheme.primaryTextColor,
    textAlign: "left",
  },
});
