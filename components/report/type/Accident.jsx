import { StyleSheet, View } from "react-native";
import { accidentTypes, severityLevels } from "../../../util/reportData";
import Dropdown from "../Dropdown";
import InputField from "../InputField";

export default function Accident({ onChangeHandler }) {
  return (
    <View style={styles.container}>
      <InputField
        label="No. of Casualties"
        type={"number-pad"}
        onChangeHandler={onChangeHandler}
        keyName="casualties"
      />
      <InputField
        label="No. of Injury"
        type={"number-pad"}
        keyName="injured"
        onChangeHandler={onChangeHandler}
      />
      <Dropdown
        label="Injury Severity"
        options={severityLevels}
        onChangeHandler={onChangeHandler}
        keyName="fatalities"
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { gap: 16 } });
