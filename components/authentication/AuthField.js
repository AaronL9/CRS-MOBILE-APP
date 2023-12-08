import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/Colors";

export default function AuthField({
  label,
  setValue,
  value,
  pressHanlder = () => {},
  inputKey,
  isPasswordField = false,
  isEditable = true,
  mode = "text",
}) {
  return (
    <Pressable style={styles.container} onPress={pressHanlder}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.textInput}
        value={value}
        autoCapitalize="none"
        secureTextEntry={isPasswordField}
        onChangeText={setValue.bind(this, inputKey)}
        editable={isEditable}
        inputMode={mode}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 18,
    color: "#99adba",
  },
  textInput: {
    backgroundColor: Colors.inputBgColor,
    fontSize: 18,
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 4,
  },
});
