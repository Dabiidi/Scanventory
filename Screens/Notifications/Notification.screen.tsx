import { View, Text, FlatList } from "react-native";
import React from "react";
import { useGetItems } from "../../services/ItemsAPI";
import {
  Container,

} from "./NotificatiionStyle";
import { useNavigation } from "@react-navigation/native";
import InventoryComponent from "../Inventory/Inventory";
const NotificationScreen = () => {
  const navigation = useNavigation();
  const [lowStockCount, setLowStockCount] = React.useState();
  const { data, isLoading } = useGetItems();


  const navigateToScreen = (inventory: any) => {
    navigation.navigate("Main", {
      screen: "Inventory Detail",

      params: { inventory },
    });
  };

  React.useEffect(() => {
    const filteredLowStockQuantity = data.filter(
      (item: any) => item.quantity < 5
    );
    setLowStockCount(filteredLowStockQuantity);
  }, [data]);

  return (
    <>
      <Container>
        <FlatList
          data={lowStockCount}
          renderItem={({ item }) => (
            <InventoryComponent
            onPress={() => navigateToScreen(item)}
            item={item}
          />
          )}
          scrollEnabled
          keyExtractor={(item, index) => item.id || index.toString()}
        />
      </Container>
    </>
  );
};

export default NotificationScreen;
