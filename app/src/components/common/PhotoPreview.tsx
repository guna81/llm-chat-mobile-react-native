import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { darkTheme } from "@/const/theme";
import { ICON_SIZE } from "@/const/const";

const PhotoPreview = ({ photoUri, handleClosePreview }) => {
  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleClosePreview()}
        >
          <Ionicons
            name="chevron-back-outline"
            size={ICON_SIZE.LARGE}
            color={darkTheme.iconColor}
          />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: photoUri }} style={styles.preview} />
    </View>
  );
};

export default PhotoPreview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  preview: {
    width: "100%",
    height: "100%",
  },

  actions: {
    width: "100%",
    padding: 8,
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    // justifyContent: "center",
    // alignItems: "center",
    zIndex: 1,
  },
  button: {
    // padding: 10,
    // borderRadius: 5,
  },
});
