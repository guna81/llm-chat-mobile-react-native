import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { darkTheme } from "@/const/theme";
import { ScrollView } from "react-native-gesture-handler";

const samepleData = [
  {
    name: "Sample 1",
    description: "Sample 1 description",
  },
  {
    name: "Sample 2",
    description: "Sample 2 description",
  },
  {
    name: "Sample 2",
    description: "Sample 2 description",
  },
  {
    name: "Sample 2",
    description: "Sample 2 description",
  },
];

const SamplePrompts = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.promptSamples}
    >
      {samepleData.map((item, i) => (
        <PromtCard key={i} data={item} />
      ))}
    </ScrollView>
  );
};

export default SamplePrompts;

const PromtCard = ({ data }) => {
  return (
    <View style={styles.promptCard}>
      <Text style={styles.promptText}>{data.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  promptSamples: {
    padding: 16,
    gap: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  promptCard: {
    width: 160,
    height: 160,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: darkTheme.primaryBackgroundColor,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promptText: {
    fontSize: 16,
    fontWeight: "500",
    color: darkTheme.primaryTextColor,
  },
});
