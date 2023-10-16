import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import { useInventory } from "../Context/InventoryContent";
import InventoryComponent from "../Inventory/Inventory";
import { useNavigation } from "@react-navigation/native";
import {
  ButtonLogs,
  ButtonText,
  Texts,
  Container,
  BodyContainer,
  ButtonContainer,
  ShipLogs,
  OutOfStockLogs,
  ShadowBoxContainer,
} from "./ShipItemStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const ShipItems = () => {
  const navigation = useNavigation();
  const { inventories, setInventories } = useInventory();

  const navigateToScreen = (inventory: any) => {
    navigation.navigate("ShipItemDetails", { inventory });
  };

  const NavigateToLogs = () => {
    navigation.navigate("OutOfStock");
  };

  const NavigateToStock = () => {
    navigation.navigate("ShipLogs");
  };

  const filterInventory = (inventory: any) => {
    return inventory.filter((inv: any) => inv.quantity > 0);
  };

  return (
    <>
      <Container>
 


        <ButtonContainer>
          <ShipLogs>
            <ShadowBoxContainer>
              <MaterialCommunityIcons
                onPress={NavigateToStock}
                name="clipboard-list-outline"
                size={70}
                color="#26577c"
              />
              <ButtonLogs onPress={NavigateToStock}>
                <ButtonText>Shipping Logs</ButtonText>
              </ButtonLogs>
            </ShadowBoxContainer>
          </ShipLogs>

          <OutOfStockLogs>
            <ShadowBoxContainer>
              <MaterialCommunityIcons
                onPress={NavigateToLogs}
                name="close-box-outline"
                size={70}
                color="#26577c"
              />
              <ButtonLogs onPress={NavigateToLogs}>
                <ButtonText>Out Of Stock</ButtonText>
              </ButtonLogs>
            </ShadowBoxContainer>
          </OutOfStockLogs>
        </ButtonContainer>
        <Texts> Available Items: (Click to Ship)</Texts>
        <FlatList
            data={filterInventory(inventories)}
            renderItem={({ item }) => (
              <InventoryComponent
                onPress={() => navigateToScreen(item)}
                item={item}
              />
            )}
            // renderItem={({item}) => (<InventoryComponent items={[item]} onPress={() => navigateToScreen(item) }></InventoryComponent>)}
            // keyExtractor={(item, index) => `${item.name}_${index}`}
            scrollEnabled
            keyExtractor={(item) => item.name}
          />
  
   
     
      </Container>
    </>
  );
};

export default ShipItems;
