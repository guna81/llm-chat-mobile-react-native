import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { darkTheme } from "@/const/theme";
import { ICON_SIZE, SUPPORTED_TYPES } from "@/const/const";
import { Feather } from "@expo/vector-icons";
import { commonStyles } from "@/styles/common";
import * as DocumentPicker from "expo-document-picker";

const FilePicker = ({ addDocument }: any) => {
  const [files, setFiles] = useState([]);
  const handleChooseDocuments = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: SUPPORTED_TYPES,
      copyToCacheDirectory: false,
    });
    console.log({ result });
    setFiles(result.assets);
    addDocument(result);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleChooseDocuments}
        style={[styles.button, commonStyles.buttonIcon]}
      >
        <Feather
          name="file"
          size={ICON_SIZE.MEDIUM}
          color={darkTheme.iconColor}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FilePicker;

const styles = StyleSheet.create({
  button: {
    marginRight: 16,
  },
});
