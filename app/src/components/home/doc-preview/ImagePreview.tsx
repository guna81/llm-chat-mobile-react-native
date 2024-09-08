import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";

const PreviewImage = ({ data }) => {
  console.log("image", data);

  return (
    <Image
      style={styles.image}
      resizeMode="cover"
      source={{
        uri: data.uri,
      }}
    />
  );
};

export default PreviewImage;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});
