import React from "react";
import { View, Text, FlatList } from "react-native";
import styled from "styled-components/native";
import { useInventory } from "../Context/InventoryContent";

const OutofStockItems = () => {
  const { inventories } = useInventory();

  const filterInventory = (inventory: any) => {
    return inventory.filter((inv: any) => inv.quantity === 0);
  };

  return (
    <>
      <FlatList
        data={filterInventory(inventories)}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Container>
            <Name>Item Name: {item.name}</Name>
            <InfoText>Quantity Left: {item.quantity}</InfoText>
            <InfoText>Price: ₱{item.price}</InfoText>
            <InfoText>Description: {item.desc}</InfoText>
          </Container>
        )}
        scrollEnabled
      />
    </>
  );
};

const Container = styled.View`
  background-color: #707575;
  padding: 20px;
  margin-top: 8px;
  border-radius: 8px;
  flex: 1;
  width: 90%;
  align-self: center;
`;

const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

const InfoText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;

export default OutofStockItems;
