import { StyleSheet, Text, Pressable } from "react-native";
import { Colors } from "../../constants/Colors";

export default function AuthButton({ title, pressHandler }) {
  return (
    <Pressable
      android_ripple={true}
      style={({ pressed }) => [styles.container, pressed && styles.press]}
      onPress={pressHandler}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.accent400,
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  press: {
    opacity: 0.5,
  },
});
