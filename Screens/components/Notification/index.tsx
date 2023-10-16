import { Ionicons } from "@expo/vector-icons";
import { HeaderContainer, HeaderTapIcon } from "../../Home/HomeStyle";
import { Badge } from "react-native-paper";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import Toast from "react-native-toast-message";
import { useInventory } from "../../Context/InventoryContent";

export const AlertMsg = () => {
  const [notifClick, setNotifClick] = React.useState(false);

  const navigation = useNavigation();
  const { inventoryCount } = useInventory();

  const [lowStock, useLowStock] = React.useState(0);

  const ToastMessage = () => {
    setNotifClick(true);

    Toast.show({
      type: "success",
      text1: "New Notification",

      text2: `You have ${lowStock} low stock items.`,
      autoHide: true,
      visibilityTime: 1500,
      position: "top",

      onPress: () => {
        navigation.navigate("Main", { screen: "NotificationScreen" });
      },
    });
  };
  React.useEffect(() => {
    console.log("test");
    const filteredInventoryLowStock = inventoryCount.filter(
      (inv) => inv.quantity < 5
    );
    useLowStock(filteredInventoryLowStock.length);
  }, [lowStock]);

  return (
    <HeaderContainer>
      <HeaderTapIcon onPress={ToastMessage}>
        <Ionicons name="notifications-circle-outline" size={35} color="white" />
        <Badge style={styles.badge}>{notifClick ? 0 : lowStock}</Badge>
      </HeaderTapIcon>
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -6,
  },
});
