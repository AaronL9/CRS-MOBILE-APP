import { StyleSheet, Text, Pressable, View } from "react-native";
import { Colors } from "../../constants/Colors";
import { Entypo } from "@expo/vector-icons";
import { fromatInputDate } from "../../util/dateFormatter";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function DatePicker({ keyName, setUserInput }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateValue, setDateValue] = useState("dd/mm/yyyy");

  const onChangeDateHandler = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === "set") {
      const formattedDate = fromatInputDate(selectedDate);
      setDateValue(formattedDate);
      setUserInput((prev) => ({
        ...prev,
        [keyName]: formattedDate,
      }));
    }
  };

  return (
    <View>
      <Text style={styles.label}>Date</Text>
      <Pressable
        style={styles.dateInput}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateValue}>{dateValue}</Text>
        <Entypo name="calendar" size={24} color="white" />
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={onChangeDateHandler}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    color: "white",
  },
  dateInput: {
    backgroundColor: Colors.bgDark,
    borderRadius: 6,
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "#757575",
  },
  dateValue: {
    color: "white",
    fontSize: 16,
  },
});
