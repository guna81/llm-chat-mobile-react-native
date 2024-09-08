import React from "react";
import { View, Text, StyleSheet } from "react-native";

import ImagePreview from "./ImagePreview";

const Preview = ({ docs }) => {
  return (
    <View style={styles.previewContainer}>
      {docs.map((doc) => (
        <PreviewItem key={doc.name} data={doc} />
      ))}
    </View>
  );
};

export default Preview;

const styles = StyleSheet.create({
  previewContainer: {
    marginBottom: 24,
    width: "100%",
    height: 200,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    padding: 16,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

function PreviewItem({ data }) {
  if (data.mimeType.includes("image")) {
    return <ImagePreview data={data} />;
  }

  return (
    <View style={previewStyles.docPreview}>
      <Text style={previewStyles.title}>Currently Not Supported</Text>
      <Text style={previewStyles.title}>{data.name}</Text>
    </View>
  );
}

const previewStyles = StyleSheet.create({
  docPreview: {
    position: "relative",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    position: "absolute",
    bottom: 16,
    left: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
});
