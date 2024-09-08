import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { darkTheme } from "@/const/theme";

const History = () => {
  return (
    <View style={styles.historyContainer}>
      <Text style={styles.historyTitle}>History</Text>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  historyContainer: {
    flex: 1,
    width: "100%",
  },
  historyTitle: {
    color: darkTheme.primaryTextColor,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
  },
});
