import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, View, ScrollView, Alert } from "react-native";
import { AuthContext } from "../context/authContext";
import { Colors } from "../constants/Colors";
import axios from "axios";

// utility
import { pickMedia } from "../util/mediaPicker";
import {
  accidentTypes,
  arsonFireTypes,
  crimes,
  hazardList,
  locationOptions,
  reportType,
} from "../util/reportData";

// components
import Dropdown from "../components/report/Dropdown";
import TextArea from "../components/report/TextArea";
import DatePicker from "../components/report/DatePicker";
import UploadMedia from "../components/report/UploadMedia";
import Accident from "../components/report/type/Accident";
import Uploads from "../components/report/upload_preview/Uploads";
import InputField from "../components/report/InputField";

export default function Report() {
  const authCtx = useContext(AuthContext);
  const defaultReportDetails = {
    reportType: "Crime",
    type_crime: "robbery",
    name_crime: "robbery",
    accidentTypes: accidentTypes[0],
    description: "",
    location: {
      street: "",
      barangay: "Bacayao Norte",
      municipality: "Dagupan City",
    },
    date: "",
    incident_date: "",
    casualties: 0,
    fatalitites: "minor",
    injured: 0,
    vehicle_type: "Car",
    userId: authCtx.user.uid,
  };
  const [reportDetails, setReportDetails] = useState(defaultReportDetails);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState([]);
  const removeFileHanlder = (indexId) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexId));
  };

  const onChangeHandler = (key, value, subKey) => {
    if (key === "location")
      setReportDetails((prevValue) => ({
        ...prevValue,
        [key]: { ...prevValue.location, [subKey]: value },
      }));
    else
      setReportDetails((prevValue) => ({
        ...prevValue,
        [key]: value,
        name_crime: prevValue.type_crime,
        incident_date: prevValue.date,
      }));
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    const endpoints =
      reportDetails.reportType === "Crime"
        ? "crime-reports"
        : "accident-reports";

    try {
      const data = await axios({
        method: "post",
        url: `https://crs-api.onrender.com/api/${endpoints}`,
        data: reportDetails,
        headers: { "Content-Type": "application/json" },
      });
      Alert.alert("Submitted Successfully");
    } catch (error) {
      console.log(error.message);
    }
    setIsSubmitting(false);
  };

  function reportTypeSubOptions(reportType) {
    switch (reportType) {
      case "Crime":
        return (
          <Dropdown
            label="Crime"
            options={crimes}
            onChangeHandler={onChangeHandler}
            keyName="type_crime"
          />
        );
      case "Accident":
        return (
          <Dropdown
            label="Accident Type"
            options={accidentTypes}
            onChangeHandler={onChangeHandler}
            keyName="accidentType"
          />
        );
      case "Hazards":
        return (
          <Dropdown
            label="Hazard Type"
            options={hazardList}
            onChangeHandler={onChangeHandler}
            keyName="hazardType"
          />
        );
      case "Arson/Fire":
        return (
          <Dropdown
            label="Arson/Fire Type"
            options={arsonFireTypes}
            onChangeHandler={onChangeHandler}
            keyName="arsonFireType"
          />
        );
    }
  }

  useEffect(() => {}, [reportDetails]);

  return (
    <ScrollView style={{ paddingTop: 25, backgroundColor: Colors.bgDark }}>
      <View style={styles.rootConainer}>
        <Dropdown
          label="Report Type"
          options={reportType}
          onChangeHandler={onChangeHandler}
          keyName="reportType"
        />
        {reportTypeSubOptions(reportDetails.reportType)}
        <Accident onChangeHandler={onChangeHandler} />
        <TextArea label="Description" onChangeHanlder={onChangeHandler} />
        <View>
          <Dropdown
            label="Barangay"
            options={locationOptions}
            onChangeHandler={onChangeHandler}
            keyName="location"
            subKey="barangay"
          />
          <InputField
            label="Street"
            onChangeHandler={onChangeHandler}
            type={"default"}
            keyName={"location"}
            subKey="street"
          />
        </View>
        <DatePicker setUserInput={setReportDetails} keyName={"date"} />
        <UploadMedia
          onPressHandler={pickMedia.bind(this, setFiles, setIsLoading)}
        />
        <Uploads
          files={files}
          onRemove={removeFileHanlder}
          isLoading={isLoading}
        />
        <View style={{ marginVertical: 12 }}>
          <Button
            title={isSubmitting ? "submitting..." : "SUBMIT"}
            disabled={isSubmitting}
            onPress={submitHandler}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootConainer: {
    width: "80%",
    alignSelf: "center",
    gap: 12,
    marginBottom: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    color: "white",
    marginBottom: 16,
  },
});
