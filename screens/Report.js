import { useContext, useEffect, useState } from "react";
import { Button, StyleSheet, View, ScrollView, Alert } from "react-native";
import { AuthContext } from "../context/authContext";
import { Colors } from "../constants/Colors";
import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../config/firebase";

// utility
import { pickImages, pickVideos } from "../util/mediaPicker";
import {
  accidentTypes,
  arsonFireTypes,
  crimes,
  hazardList,
  locationOptions,
  murderTypes,
  reportType,
} from "../util/reportData";
import { extractFilename } from "../util/stringFormatter";

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
    murder_type: "Homicide",
    photoURL: [],
    videoURL: [],
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isUploadingVideos, setIsUploadingVideos] = useState(false);

  const removeImageHanlder = (indexId) => {
    setImages((prev) => prev.filter((_, index) => index !== indexId));
  };
  const removeVideoHanlder = (indexId) => {
    setVideos((prev) => prev.filter((_, index) => index !== indexId));
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

  const uploadImages = async (images, docRef) => {
    const imageUrls = [];

    await Promise.all(
      images.map(async ({ uri }) => {
        const filename = extractFilename(uri);
        const file = await fetch(uri);
        const blob = await file.blob();

        const storageRef = ref(storage, `reports/${docRef}/images/${filename}`);
        await uploadBytes(storageRef, blob);

        const imageUrl = await getDownloadURL(storageRef);
        imageUrls.push(imageUrl);
      })
    );

    return imageUrls;
  };

  const uploadVideos = async (videos, docRef) => {
    const videoUrls = [];

    await Promise.all(
      videos.map(async ({ uri }) => {
        const filename = extractFilename(uri);
        const file = await fetch(uri);
        const blob = await file.blob();

        const storageRef = ref(storage, `reports/${docRef}/videos/${filename}`);
        await uploadBytes(storageRef, blob);

        const videoUrl = await getDownloadURL(storageRef);
        videoUrls.push(videoUrl);
      })
    );

    return videoUrls;
  };

  const submitHandler = async () => {
    setIsSubmitting(true);
    const endpoints =
      reportDetails.reportType === "Crime"
        ? "crime-reports"
        : "accident-reports";

    try {
      reportDetails.photoURL = await uploadImages(images, authCtx.user.uid);
      reportDetails.videoURL = await uploadVideos(videos, authCtx.user.uid);
      await axios({
        method: "post",
        url: `https://crs-api.onrender.com/api/${endpoints}`,
        data: reportDetails,
        headers: { "Content-Type": "application/json" },
      });
      Alert.alert("Submitted Successfully");
    } catch (error) {
      console.log(error.message);
    }
    console.log(reportDetails);
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
        {reportDetails.type_crime === "Murder" && (
          <Dropdown
            label="Murder type"
            options={murderTypes}
            onChangeHandler={onChangeHandler}
            keyName="murder_type"
          />
        )}
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
        <View style={styles.uploadBtn}>
          <UploadMedia
            onPressHandler={pickImages.bind(
              this,
              setImages,
              setIsUploadingImage,
              images
            )}
            label={"Upload images"}
            icon={"camera"}
          />
          <UploadMedia
            onPressHandler={pickVideos.bind(
              this,
              setVideos,
              setIsUploadingVideos,
              videos
            )}
            label={"Upload video"}
            icon={"video"}
          />
        </View>
        <Uploads
          files={images}
          onRemove={removeImageHanlder}
          isLoading={isUploadingImage}
          label="images uploaded"
        />
        <Uploads
          files={videos}
          onRemove={removeVideoHanlder}
          isLoading={isUploadingVideos}
          label="videos uploaded"
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
  uploadBtn: {
    marginVertical: 8,
    gap: 16,
  },
});
