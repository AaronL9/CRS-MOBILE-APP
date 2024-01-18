import { useEffect, useState } from "react";
import { Button, StyleSheet, View, ScrollView } from "react-native";

// utility
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
import { pickMedia } from "../util/mediaPicker";
import Uploads from "../components/report/upload_preview/Uploads";
import { Colors } from "../constants/Colors";

export default function Report() {
  const [reportDetails, setReportDetails] = useState({
    reportType: "Crime",
    crime: "",
    accidentTypes: accidentTypes[0],
    description: "",
    date: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const removeFileHanlder = (indexId) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexId));
  };

  const onChangeHandler = (key, value) => {
    setReportDetails((prevValue) => ({ ...prevValue, [key]: value }));
  };

  function reportTypeSubOptions(reportType) {
    switch (reportType) {
      case "Crime":
        return (
          <Dropdown
            label="Crime"
            options={crimes}
            onChangeHandler={onChangeHandler}
            keyName="crime"
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
        <Dropdown
          label="Location"
          options={locationOptions}
          onChangeHandler={onChangeHandler}
          keyName="location"
        />
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
          <Button title="Submit" />
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
