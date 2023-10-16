import { NavigatorScreenParams } from "@react-navigation/native";

declare global {
  namespace ReactNavigation {
    interface RootParamList
      extends RootStackParamList,
        EntryStackParamList,
        MainStackParamList {}
  }
}
export type RootStackParamList = {
  Entry: NavigatorScreenParams<EntryStackParamList> | undefined;
  Main: NavigatorScreenParams<MainStackParamList> | undefined;
};

export type EntryStackParamList = {
  Landing: undefined;
  Login: undefined;
  Home: undefined;
  Main: undefined;
};

export type MainStackParamList = {
  AddInventory: undefined;
  QRDashboard: undefined;
  "Inventory Detail": {} | undefined;
  "Report Screen": undefined;
  ScanSearch: undefined;
  ScanToAdd: undefined;
  ShipItem: undefined;
  ShipItemDetails: {} | undefined;
  OutOfStock: undefined;
  ShipLogs: undefined;
  NotificationScreen: undefined;
};
