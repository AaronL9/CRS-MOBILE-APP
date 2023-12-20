import { Alert, Linking } from "react-native";
import * as ImagePicker from "expo-image-picker";

const verifyMediaLibrary = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== "granted") {
    Alert.alert(
      "Permission Denied",
      "Please allow the Files and Media permission in the app settings",
      [
        { text: "cancel" },
        { text: "Go to settings", onPress: () => Linking.openSettings() },
      ]
    );
    return false;
  }

  return true;
};

export const pickMedia = async (setFiles, setIsLoading) => {
  const permission = await verifyMediaLibrary();
  if (!permission) return;

  setIsLoading(true);
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 0,
      allowsMultipleSelection: true,
      selectionLimit: 3,
    });

    if (!result.canceled) {
      setFiles((prev) => prev.concat(result.assets));
    }
  } catch (error) {
    console.log(permission);
    console.log("Error while selecting file: ", error);
  }
  setIsLoading(false);
};