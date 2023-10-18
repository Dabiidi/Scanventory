import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useNavigation } from "@react-navigation/native";
import { Alert } from "react-native";

export const useGetShipping = () => {
  return useQuery({
    queryKey: ["ShipItems"],
    queryFn: async () => {
      const response = await axios.get(
        "http://192.168.110.110:4000/inventoryapp/ship-items"
      );
      return response.data;
    },
    refetchInterval: 5000,
  });
};

export const useDeleteShippingLogs = (date: string) => {


  const navigation = useNavigation();
  return useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `http://192.168.110.110:4000/inventoryapp/ship-items`,
        { data: { type: date === "" ? "all" : "filtered", date } }
      );
      return res.data;
    },
    onSuccess: () => {
      Alert.alert("Delete", `Shipping Logs Successfully deleted.`);
      navigation.goBack();
      console.log("test");
    },
  });
}


