import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { darkTheme } from "@/const/theme";
import { commonStyles } from "@/styles/common";
import { ICON_SIZE, SUPPORTED_TYPES } from "@/const/const";

import { useNavigation } from "@react-navigation/native";

const CameraHandler = ({ addDocument }: any) => {
  const navigation = useNavigation();
  // const [cameraOpened, setCameraOpened] = useState(false);

  const handleOpenCamera = () => {
    // setCameraOpened(true);
    navigation.navigate("Camera");
  };

  return (
    <>
      {/* {cameraOpened ? (
        <CameraView />
      ) : ( */}
      <TouchableOpacity
        onPress={handleOpenCamera}
        style={[styles.cameraButton, commonStyles.buttonIcon]}
      >
        <Feather
          name="camera"
          size={ICON_SIZE.MEDIUM}
          color={darkTheme.iconColor}
        />
      </TouchableOpacity>
      {/* )} */}
    </>
  );
};

export default CameraHandler;

const styles = StyleSheet.create({
  cameraButton: {
    marginRight: 16,
  },
});
