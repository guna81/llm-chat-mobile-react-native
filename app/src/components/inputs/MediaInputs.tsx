import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { ICON_SIZE, SUPPORTED_TYPES } from "@/const/const";
import MicHandler from "../inputs/MicHandler";
import CameraHandler from "../inputs/CameraHandler";

const MediaInput = () => {
  const [selectedDocs, setSelectedDocs] = useState([]);
  const handleChooseDocuments = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: SUPPORTED_TYPES,
      copyToCacheDirectory: false,
    });
    console.log({ result });
    setSelectedDocs(result.assets);
  };

  return (
    <View style={styles.mediaInputContainer}>
      <MicHandler />
      <CameraHandler />
    </View>
  );
};

export default MediaInput;

const styles = StyleSheet.create({
  // media input
  mediaInputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
