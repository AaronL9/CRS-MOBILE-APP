import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function UploadMedia({ onPressHandler }) {
  return (
    <View style={styles.uploadContainer}>
      <Pressable style={styles.uploadButton} onPress={onPressHandler}>
        <Text style={styles.buttonText}>Upload Images/Videos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  uploadContainer: {
    marginVertical: 10,
  },
  uploadButton: {
    // borderWidth: 1,
    // borderColor: Colors.inputBorderColor,
    backgroundColor: Colors.primary400,
    paddingVertical: 8,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
