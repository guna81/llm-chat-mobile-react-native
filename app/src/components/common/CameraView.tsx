import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useRef } from "react";
// import useCamera from "@/hooks/useCamera";
// import { Camera } from "expo-camera";
import {
  CameraView as Camera,
  CameraType,
  useCameraPermissions,
} from "expo-camera";
import { Feather } from "@expo/vector-icons";
import { ICON_SIZE } from "@/const/const";
import { darkTheme } from "@/const/theme";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import PhotoPreview from "./PhotoPreview";

const CameraView = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);

  // const { permission, requestPermission, facing, toggleCameraFacing } =
  //   useCamera();
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleCapturePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync();
      console.log({ photo });

      setPhotoUri(photo.uri);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseCamera = () => {
    // setCameraOpened(false);
    navigation.navigate("Home");
  };

  const handleClosePreview = () => {
    setPhotoUri(null);
  };

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission]);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  return (
    <View style={styles.container}>
      {photoUri && (
        <PhotoPreview
          photoUri={photoUri}
          handleClosePreview={handleClosePreview}
        />
      )}
      {!photoUri && isFocused && (
        // <Camera ref={cameraRef} style={styles.camera} type={facing}>
        <Camera ref={cameraRef} style={styles.camera} facing={facing}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <MaterialIcons
                name="cameraswitch"
                size={ICON_SIZE.LARGE}
                color={darkTheme.iconColor}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleCapturePhoto}
            >
              <Feather
                name="camera"
                size={ICON_SIZE.LARGE}
                color={darkTheme.iconColor}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleCloseCamera}>
              <AntDesign
                name="closecircleo"
                size={ICON_SIZE.LARGE}
                color={darkTheme.iconColor}
              />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    width: "100%",
    padding: 24,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
