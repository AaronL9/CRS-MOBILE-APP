import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { crimes, reportType } from "../util/reportData";
import Dropdown from "../components/report/Dropdown";
import TextArea from "../components/report/TextArea";
import DatePicker from "../components/report/DatePicker";
import { Colors } from "../constants/Colors";
import LocationField from "../components/report/LocationField";

export default function Report() {
  const [reportDetails, setReportDetails] = useState({
    reportType: "",
    crime: "",
    description: "",
    date: "",
  });

  const onChangeHandler = (key, value) => {
    setReportDetails((prevValue) => ({ ...prevValue, [key]: value }));
  };

  useEffect(() => {
    console.log(reportDetails);
  }, [reportDetails]);

  return (
    <View style={styles.rootConainer}>
      <Text style={styles.title}>Report an Incident</Text>
      <Dropdown
        label="Report Type"
        options={reportType}
        onChangeHandler={onChangeHandler}
        keyName="reportType"
      />
      <Dropdown
        label="Crime"
        options={crimes}
        onChangeHandler={onChangeHandler}
        keyName="crime"
      />
      <TextArea label="Description" onChangeHanlder={onChangeHandler} />
      <LocationField />
      <DatePicker setUserInput={setReportDetails} keyName={"date"} />
      <View style={{marginVertical: 12}}>
        <Button title="Submit" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootConainer: {
    width: "80%",
    alignSelf: "center",
    gap: 12,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    marginBottom: 16,
  },
});
