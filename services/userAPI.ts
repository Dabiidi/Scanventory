import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getUserAcc = () => {
  return useQuery({
    queryKey: ["Users"], // Use the email as part of the query key
    queryFn: async () => {
      try {
        const response = await axios.get(
          "http://192.168.110.110:4000/inventoryapp/userlogs"
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    refetchInterval: 5000,
    staleTime: 5000,
  });
};

export const useUploadImage = () => {
  const uploadImageMutation = useMutation(
    async (formData: any) => {
      try {
        const response = await axios.put(
          `http://192.168.110.110:4000/inventoryapp/userlogs/${formData.id}`,
          {
            ...formData,
          }
        );

        return response.data;
      } catch (error) {
        throw error;
      }
    },
    {
      onSuccess: () => {
        // Handle successful image upload, e.g., show a success message
        console.log("Image uploaded successfully");
      },
      onError: (error) => {
        // Handle error during image upload, e.g., show an error message
        console.error("Error uploading image:", error);
      },
    }
  );

  return uploadImageMutation;
};
