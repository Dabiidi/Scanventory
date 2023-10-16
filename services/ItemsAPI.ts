import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const useGetItems = () => {
  return useQuery({
    queryKey: ["Items"],
    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.110.110:4000/inventoryapp/itemlist"
      );
      return response.data;
    },
    refetchInterval: 5000, // 5 seconds in milliseconds (adjust as needed)
    staleTime: 5000, // 5 seconds in milliseconds
  });
};

export const useGetLogs = () => {
  return useQuery({
    queryKey: ["itemLogs"],
    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.110.110:4000/inventoryapp/itemlogs"
      );
      return response.data;
    },
    refetchInterval: 5000, // 5 seconds in milliseconds (adjust as needed)
    staleTime: 5000, // 5 seconds in milliseconds
  });
};

export const useDeleteInventory = (id: string, name: string) => {
  const navigation = useNavigation();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `http://192.168.110.110:4000/inventoryapp/itemlist/${id}`
      );

      return res.data;
    },
    onSuccess: () => {
      Alert.alert("Delete", `Item ${name} Successfully deleted.`);
      navigation.goBack();
      console.log("test");
    },
  });
};

//ADD API
export const useUpdateInventory = () => {
  const updateItem = async (data: any) => {
    const response = await axios.put(
      `http://192.168.110.110:4000/inventoryapp/itemlist/${data.id}`,
      data.data
    );

    return response;
  };

  return useMutation(updateItem);
};

//ADD API
export const UseAddItem = () => {
  const addItem = async (data: any) => {
    const response = await axios.post(
      "http://192.168.110.110:4000/inventoryapp/itemlist",
      data
    );

    console.log("Item Added", response.data);
  };

  return useMutation(addItem);
};

export const saveLogs = () => {
  const res = async (logData: any) => {
    const response = await axios.post(
      "http://192.168.110.110:4000/inventoryapp/itemlogs",
      logData
    );

    console.log("Added Logs", response.data);

    return response.data;
  };
  return useMutation(res);
};

export const useDeleteItemsLogs = () => {
  const navigation = useNavigation();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        "http://192.168.110.110:4000/inventoryapp/itemlogs"
      );
      return res.data;
    },
    onSuccess: () => {
      Alert.alert("Delete", `Item Logs Successfully deleted.`);
      navigation.goBack();
      console.log("test");
    },
  });
};

export const UseCheckItemExistance = () => {
  const navigation = useNavigation();

  const res = async (itemName: string) => {
    const response = await axios.get(
      `http://192.168.110.110:4000/inventoryapp/itemlist/${itemName}`
    );

    console.log("Exist Item Inventory", response.data);
    return response.data;
  };

  return useMutation(res);
};
