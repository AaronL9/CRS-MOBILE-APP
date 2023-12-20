import { StyleSheet, View } from "react-native";
import { accidentTypes, severityLevels } from "../../../util/reportData";
import Dropdown from "../Dropdown";
import InputField from "../InputField";

export default function Accident({ onChangeHandler }) {
  return (
    <View style={styles.container}>
      <InputField label="No. of Casualties" />
      <InputField label="No. of Injury" />
      <Dropdown
        label="Injury Severity"
        options={severityLevels}
        onChangeHandler={onChangeHandler}
        keyName='injurySeverity' 
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { gap: 16 } });
