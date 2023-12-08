import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { authFields } from "../util/authFieldProps";
import { formatBirthDate } from "../util/dateFormatter";

import { Colors } from "../constants/Colors";
import { statusBarHeight } from "../constants/DeviceSizes";

import AuthField from "../components/authentication/AuthField";
import AuthButton from "../components/authentication/AuthButton";
import AuthNavigator from "../components/authentication/AuthNavigator";
import AuthHeader from "../components/authentication/AuthHeader";

export default function Register({ navigation }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    birthdate: "mm/dd/yyyy",
    sex: "",
    address: "",
    contactNum: "",
    password: "",
  });

  const onChangeUserInputHandler = (key, enteredValue) => {
    setUserInput((prev) => ({ ...prev, [key]: enteredValue }));
  };

  const onChangeDateHandler = (event, selectedDate) => {
    setShowDatePicker(false);
    if (event.type === "set")
      setUserInput((prev) => ({
        ...prev,
        ["birthdate"]: formatBirthDate(selectedDate),
      }));
  };

  const registerHandler = () => {
    console.log(userInput);
  };

  // useEffect(() => {
  //   console.log(showDatePicker);
  // }, [showDatePicker]);

  return (
    <View style={styles.root}>
      <ScrollView>
        <View style={styles.container}>
          <AuthHeader text="Registration" />
          <View style={styles.controlls}>
            {authFields.map((obj) => (
              <AuthField
                key={obj.key}
                inputKey={obj.key}
                value={userInput[obj.key]}
                setValue={onChangeUserInputHandler}
                pressHanlder={
                  obj.key === "birthdate"
                    ? () => {
                        setShowDatePicker(true);
                      }
                    : () => {}
                }
                {...obj.props}
              />
            ))}
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={onChangeDateHandler}
              />
            )}
            <AuthButton
              title="Register"
              pressHandler={registerHandler}
              inputKey={"password"}
            />
            <AuthNavigator
              name="Login"
              text="Already have an account?"
              pressHandler={() => navigation.replace("Login")}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    paddingTop: statusBarHeight + 10,
    flex: 1,
    backgroundColor: Colors.primary400,
  },
  container: {
    paddingHorizontal: 20,
  },
  controlls: {
    gap: 10,
  },
});
