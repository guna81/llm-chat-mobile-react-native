import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { darkTheme } from "@/const/theme";

const History = () => {
  return (
    <View>
      <Text style={styles.historyTitle}>History</Text>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  historyTitle: {
    color: darkTheme.primaryTextColor,
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 16,
  },
});
