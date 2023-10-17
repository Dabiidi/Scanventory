import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState } from "react";

import { useGetItems } from "../../services/ItemsAPI";

export interface Item {
  id: string;
  name: string;
  quantity: number;
  price: number;
  desc: string;
  classification: string;
}

interface ItemContextType {
  inventories: Item[];
  setInventories: React.Dispatch<React.SetStateAction<Item[]>>;
  findInventory: () => void;
  masterInventory: Item[];
  inventoryCount: Item[];
}

const initialContext: ItemContextType = {
  inventories: [],
  setInventories: () => {},
  findInventory: () => {},
  masterInventory: [],
  inventoryCount: [],
};

interface InventoryProviderProp {
  children: React.ReactNode;
}

const InventoryContext = React.createContext<ItemContextType>(initialContext);
const InventoryContent: React.FC<InventoryProviderProp> = ({ children }) => {
  const [inventories, setInventories] = useState<Item[]>([]);
  const [masterInventory, setMasterInventory] = useState<Item[]>([]);
  const [inventoryCount, setInventoryCount] = useState<Item[]>([]);

  const GetItemData = useGetItems();

  React.useEffect(() => {
    if (GetItemData.data && !GetItemData.isLoading) {
      setInventories(GetItemData.data);
      setMasterInventory(GetItemData.data);
      setInventoryCount(GetItemData.data);
    }
    GetItemData.refetch();
  }, [GetItemData.isLoading, GetItemData.data, GetItemData.refetch]);

  if (GetItemData.isLoading && GetItemData.isRefetching)
    return (

       <View
                style={{
                  ...StyleSheet.absoluteFillObject, // Takes the full screen
                  backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 999, // Ensures it's in the foreground
                }}
              >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
  
    );

  if (GetItemData.error) return <Text> Error gathering data.</Text>;
  const findInventory = () => GetItemData.data;

  return (
    <InventoryContext.Provider
      value={{
        inventories,
        inventoryCount,
        setInventories,
        findInventory,
        masterInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};
export const useInventory = () => React.useContext(InventoryContext);

export default InventoryContent;
