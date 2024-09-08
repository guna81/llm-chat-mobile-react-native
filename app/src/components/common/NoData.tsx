import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { darkTheme } from "@/const/theme";

const NoData = ({ title = "No Data" }) => {
  return (
    <View style={styles.noData}>
      <Text style={styles.noDataText}>{title}</Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  noData: {
    padding: 16,
  },
  noDataText: {
    fontSize: 16,
    color: darkTheme.secondaryTextColor,
    textAlign: "center",
  },
});
