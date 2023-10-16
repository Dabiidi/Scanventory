import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddItem from "../../../AddItem/AddItemScreen";
import QRDashboard from "../../../QRScanner/QRDashboard";
import InventoryDetail from "../../../Inventory/InventoryDetail";
import ShipItemDetails from "../../../ShipItems/ShipItemDetails";
import ReportScreen from "../../../Report/ReportScreen";
import ScantoSearch from "../../../QRScanner/SearchQR";
import ScanToAdd from "../../../QRScanner/AddQR";
import ShipItems from "../../../ShipItems/ShipItems";
import OutofStockItems from "../../../ShipItems/OutofStockItems";
import ShipLogs from "../../../ShipItems/ShipLogs";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,

} from "@expo/vector-icons";
import styled from "styled-components/native";
import HomeScreen from "../../../Home/HomeScreen";
import InventoryList from "../../../Inventory/InventoryList";
import Profile from "../../../Profile/Profile";
import { Text, View } from "react-native";
import NotificationScreen from "../../../Notifications/Notification.screen";
import { BackButton } from "../../../components/BackBtn";
import { AlertMsg } from "../../../components/Notification";
const RenderDetaiScreen = (props: any) => <InventoryDetail {...props} />;
const RenderShipScreen = (props: any) => <ShipItemDetails {...props} />;

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="AddInventory"
        component={AddItem}
        options={{
          title: "Inventory",
          headerBackVisible: false,
          headerTintColor: "white",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="QRDashboard"
        component={QRDashboard}
        options={{
          title: "QR Scanner",
          headerBackVisible: true,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="Inventory Detail"
        component={RenderDetaiScreen}
        options={{
          title: "Inventory Details",
          headerLeft: () => <BackButton/>,
          headerBackVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="Report Screen"
        component={ReportScreen}
        options={{
          title: "Inventory Logs",
          headerBackVisible: false,
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerShown: true,
          headerLeft: () => <BackButton/>,
          headerTitleStyle: { 
            color: "white",
          },
        
          headerStyle: {
            backgroundColor: "#12486B",
          },
       
        }}
      />
      <Stack.Screen
        name="ScanSearch"
        component={ScantoSearch}
        options={{
          title: "Scan to Search",
          headerLeft: () => <BackButton/>,
          headerBackVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />

<Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: "Low Item Stocks",
          headerLeft: () => <BackButton/>,
          headerBackVisible: false,
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />


      <Stack.Screen
        name="ScanToAdd"
        
        component={ScanToAdd}
        options={{
          title: "Scan to Add Item",
          headerLeft: () => <BackButton/>,
          headerBackVisible: false,
          headerTitleAlign: "center",
        
       
        
          headerTintColor: "white",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="ShipItem"
        component={ShipItems}
        options={{
          title: "Ship Items Dashboard",
          headerBackVisible: false,
          headerLeft: () => <BackButton/>,
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="ShipItemDetails"
        component={RenderShipScreen}
        options={{
          title: "Ship Item",
          headerBackVisible: true,
          headerTintColor: "white",
          headerTitleAlign: "center",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="OutOfStock"
        component={OutofStockItems}
        options={{
          title: "Unavailable Items",
          headerBackVisible: false,
          headerLeft: () => <BackButton/>,
          headerTitleAlign: "center",
          headerTintColor: "white",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
      <Stack.Screen
        name="ShipLogs"
        component={ShipLogs}
        options={{
          title: "Shipping Logs",
          headerBackVisible: false,
          headerLeft: () => <BackButton/>,

          headerTitleAlign: "center",
          headerTintColor: "white",
          headerShown: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#12486B",
          },
        }}
      />
    </Stack.Navigator>
  );
}

export function TabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Menu">
      <Tab.Screen
        name="Menu"
        component={HomeScreen}
        
        options={{
          title:"Dashboard",
          headerRight: () => <AlertMsg/>,
          headerTitleAlign:"left",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#12486B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory List"
        component={InventoryList}
        options={{
          
          headerStyle: {
            backgroundColor: "#12486B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="inventory" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan QR"
        component={QRDashboard}
        options={{
          headerStyle: {
            backgroundColor: "#12486B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color="black"
            />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerStyle: {
            backgroundColor: "#12486B",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}




