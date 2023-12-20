import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { AuthContext } from "../../context/authContext";

export default function MenuBtn() {
  const authCtx = useContext(AuthContext);

  return (
    <Menu>
      <MenuTrigger
        children={<MaterialIcons name="more-vert" size={24} color="white" />}
        customStyles={{ triggerOuterWrapper: { marginRight: 5 } }}
      />
      <MenuOptions>
        <MenuOption
          onSelect={() => authCtx.setIsLogin(false)}
          text="Logout"
        />
      </MenuOptions>
    </Menu>
  );
}
