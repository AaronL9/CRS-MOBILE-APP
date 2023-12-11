import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import Login from "./screens/Login";
import Register from "./screens/Register";
import Report from "./screens/Report";
import { Colors } from "./constants/Colors";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Register} />
    </Stack.Navigator>
  );
}

function MainAppScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary400 },
        headerTintColor: "white",
        title: "Crime Reporting System",
        headerLeft: () => (
          <Image style={{width: 40, height: 40, marginRight: 6, marginVertical: 12}} source={require("./assets/crs-logo_cropped.png")} />
        ),
      }}
    >
      <Stack.Screen
        name="Report"
        component={Report}
        options={{
          contentStyle: { backgroundColor: Colors.bgDark, paddingTop: 40 },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <AuthStack />
        {/* <MainAppScreen /> */}
      </NavigationContainer>
    </>
  );
}
