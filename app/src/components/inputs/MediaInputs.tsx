import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { ICON_SIZE, SUPPORTED_TYPES } from "@/const/const";
import MicHandler from "../inputs/MicHandler";
import CameraHandler from "../inputs/CameraHandler";
import FilePicker from "./FilePicker";
import { useUploadFileMutation } from "@/store/services/chat";

const MediaInput = () => {
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const [selectedDocs, setSelectedDocs] = useState([]);

  const addDocument: any = async (doc) => {
    // setSelectedDocs((prev) => [...prev, doc]);
    const form = new FormData();
    form.append("file", doc);
    const res = await uploadFile(form);
    console.log({ res });
  };

  const clearDocuments: any = () => {
    setSelectedDocs([]);
  };

  return (
    <View style={styles.mediaInputContainer}>
      {/* <MicHandler /> */}
      <CameraHandler addDocument={addDocument} />
      <FilePicker addDocument={addDocument} />
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
