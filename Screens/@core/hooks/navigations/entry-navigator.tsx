import LandingPage from "../../../LandingPage/LandingPage";
import LoginScreen from "../../../Login/LoginScreen";
  import { createNativeStackNavigator } from "@react-navigation/native-stack";

  import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
  import { MainNavigator, TabNavigator } from "./main-navigator";

  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

export function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={MainNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
