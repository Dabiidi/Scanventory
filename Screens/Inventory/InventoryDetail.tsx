import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  Alert,
  ImageBackground,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { RouteProp, useNavigation } from "@react-navigation/native";
import {
  Container,
  Name,
  Total,
  Price,
  Desc,
  Classification,
  InfoContainer,
  TextInputs,
  EditTexts,
  NameContainer,
  QuantityContainer,
  PriceContainer,
  DescContainer,
  ClassificationContainer,
  CancelButton,
  ButtonContainer,
  Buttons,
  Texts,
  PickerContainer,
  ButtonDelete,
  UploadContainer,
  UploadbuttonContainer,
  UploadButton,
  TextUploadImage,
  PickerContainerIOS,
  ClassificationIOS,
} from "./InventoryDetailStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as ImagePicker from "expo-image-picker";

import { Picker } from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";

import {
  useDeleteInventory,
  useUpdateInventory,
  saveLogs,
  useGetItems,
} from "../../services/ItemsAPI";
import { AntDesign } from "@expo/vector-icons";
import ModalPicker from "react-native-modal-selector";
type Items = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  desc: string;
  classification: string;
  itemImage: string;
  [key: string]: string | number;
};
type InventoryDetailRouteParamList = {
  "Inventory Detail": {
    inventory: Items;
  };
};
type Props = {
  route: RouteProp<InventoryDetailRouteParamList, "Inventory Detail">;
};
const InventoryDetail: React.FC<Props> = ({ route }: Props) => {
  const { inventory } = route.params;
  // console.log("Item ID", inventory._id);
  const navigation = useNavigation();
  const [image, setImage] = React.useState<string | null>(null);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [editedInventory, setEditedInventory] = useState<Items>(
    inventory as Items
  );
  const [editMode, setEditMode] = useState(false);
  const [originalInventory, setOriginalInventory] = useState<Items>(inventory);
  const [editableField, setEditableField] = useState<string | null>(null);
  const [changesMade, setChangesMade] = useState<string>();
  const queryClient = useQueryClient();
  const [selectedClassification, setSelectedClassification] =useState<string | null>(null)

  const { isLoading, mutateAsync: mutateLogs } = saveLogs();
  const { data: DataInvent } = useGetItems();

  const handleInputChange = async (fieldName: string, value: any) => {
    if (editedInventory[fieldName] !== value) {
      const changeDescription = `Changed ${fieldName} from "${editedInventory[fieldName]}" to "${value}."`;
      setChangesMade(changeDescription);
    }

    if (
      fieldName !== "name" &&
      fieldName !== "desc" &&
      fieldName !== "classification" &&
      (value === "" || value === null || isNaN(Number(value)))
    ) {
      value = 0;
    }

    setEditedInventory({
      ...editedInventory,
      [fieldName]: value,
    });
  };

  const CancelMode = () => {
    if (originalInventory) {
      setEditedInventory({ ...originalInventory });
      Alert.alert("Cancel", "Cancelled Editing Item.");
    }

    setEditMode(false);
    setEditableField(null);
  };

  const {
    isLoading: loadingUpdate,
    mutateAsync: mutateUpdate,
    data,
    isSuccess,
  } = useUpdateInventory();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = result.assets[0].uri;

      const data = {
        ...editedInventory,
        itemImage: result.assets[0].uri,
      };
      try {
        const payload = { id: editedInventory._id, data: data };
        await mutateUpdate(payload);
        setImageLoading(true);

        const matchingItem = DataInvent.find(
          (item: any) => item._id === inventory._id
        );

        if (matchingItem) {
          setImage(matchingItem.itemImage);
        }
      } catch (error) {
        // Handle error if necessary
        console.error("Error uploading image:", error);
      }
    }
  };

  useEffect(() => {
    if (imageLoading) {
      setImageLoading(false);
    }
  }, [image]);

  const CaptureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      try {
        const newImage = result.assets[0].uri;

        const data = {
          ...editedInventory,
          itemImage: result.assets[0].uri,
        };

        const payload = { id: editedInventory._id, data: data };

        await mutateUpdate(payload);
        setImageLoading(true);

        const matchingItem = DataInvent.find(
          (item: any) => item._id === inventory._id
        );

        if (matchingItem) {
          setImage(matchingItem.itemImage);
        }
      } catch (error) {
        // Handle error if necessary
        console.error("Error uploading image:", error);
      }
    }
  };

  const showImagePickerOptions = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status) {
      Alert.alert(
        "Select Image Source",
        "Choose an image source for your item picture:",
        [
          {
            text: "Camera",
            onPress: CaptureImage,
          },
          {
            text: "Image Library",
            onPress: pickImage,
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } else {
      Alert.alert(
        "Select Image Source",
        "You need to give permission to access your image library",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]
      );
    }
  };
  const handleSave = async () => {
    if (
      !editedInventory.name ||
      !editedInventory.quantity ||
      !editedInventory.price ||
      !editedInventory.desc ||
      !editedInventory.classification
    ) {
      Alert.alert("Error", "Fields must not be empty!");
      return;
    }

    const dataChanged =
      editedInventory.name !== originalInventory.name ||
      editedInventory.quantity !== originalInventory.quantity ||
      editedInventory.price !== originalInventory.price ||
      editedInventory.desc !== originalInventory.desc ||
      editedInventory.classification !== originalInventory.classification;
    editedInventory.itemImage !== originalInventory.itemImage;

    if (dataChanged) {
      const payload = { id: editedInventory._id, data: editedInventory };

      try {
        const updateResult = await mutateUpdate(payload);

        if (updateResult.status === 200) {
          await mutateLogs({
            itemName: editedInventory.name,
            action: changesMade,
          });
          queryClient.invalidateQueries(["Items"]);

          Alert.alert(
            "Success",
            `${editedInventory.name} updated successfully.`
          );
          setEditMode(false);
          setEditableField(null);
        } else {
          Alert.alert("Error", data?.data.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Error updating inventory item:", error);
        Alert.alert("Error", "Something went wrong");
      }
      navigation.goBack();
    } else {
      Alert.alert("No Changes", "No changes were made.");
      CancelMode();
      return;
    }
  };

  const classificationOptions = [
    "School Supplies",
    "Hardware",
    "Accessories",
    "Balls",
  ];

  const { mutateAsync } = useDeleteInventory(
    editedInventory._id,
    editedInventory.name
  );

  const displayDeleteAlert = () => {
    Alert.alert(
      "Delete an item",
      "This action will delete your item in your inventory!",
      [
        {
          text: "No",
          onPress: () => console.log("no thanks"),
        },
        {
          text: "Delete",

          onPress: () => mutateAsync(),
        },
      ],
      {
        cancelable: true,
      }
    );
  };
  const handleSelection = (option : any) => {
    console.log("gasfsa", option)
    setSelectedClassification(option.label);
    handleInputChange("classification", option.label);
    // Do something with the selected option
  };

  React.useEffect(() => {
    const matchingItem = DataInvent.find(
      (item: any) => item._id === inventory._id
    );

    if (matchingItem) {
      setImage(matchingItem.itemImage);
    }
  }, [editedInventory, inventory, image, DataInvent]);
  return (
    <>
      <ImageBackground
        source={require("../../Images/header.png")}
        resizeMode="cover"
        style={{ flex: 1, position: "relative" }}
        blurRadius={1}
      >
        <Container>
          <UploadContainer>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 350, height: 310 }}
              />
            )}
            <UploadbuttonContainer>
              <UploadButton onPress={showImagePickerOptions}>
                <TextUploadImage>
                  {image ? "Edit" : "Upload"} Image
                </TextUploadImage>
                <AntDesign name="camera" size={30} color="black" />
              </UploadButton>
              {imageLoading && (
                <View
                  style={{
                    flex: 1,

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 600,
                      width: 400,

                      backgroundColor: "gray",
                    }}
                  >
                    <ActivityIndicator
                      style={{
                        marginTop: 140,
                        opacity: 9,
                      }}
                      size="large"
                      color="#000000"
                    />
                  </View>
                </View>
              )}
            </UploadbuttonContainer>
          </UploadContainer>

          <NameContainer>
            <Name>Item Name: {editedInventory.name}</Name>
          </NameContainer>

          <QuantityContainer>
            <Total>Quantity: </Total>
            {editMode ? (
              <TextInputs
                value={editedInventory.quantity.toString()}
                onChangeText={(value) =>
                  handleInputChange("quantity", parseInt(value))
                }
                keyboardType="numeric"
              />
            ) : (
              <Total
                onPress={() => {
                  if (editMode) setEditableField("quantity");
                  console.log(editMode);
                }}
              >
                {editedInventory.quantity}
              </Total>
            )}
          </QuantityContainer>

          <PriceContainer>
            <Price>Price: </Price>
            {editMode ? (
              <TextInputs
                value={editedInventory.price.toString()}
                onChangeText={(value) =>
                  handleInputChange("price", parseFloat(value))
                }
                keyboardType="numeric"
              />
            ) : (
              <Price
                onPress={() => {
                  if (editMode) setEditableField("price");
                }}
              >
                {editedInventory.price}
              </Price>
            )}
          </PriceContainer>

          <DescContainer>
            <Desc>Description: </Desc>
            {editMode ? (
              <TextInputs
                value={editedInventory.desc}
                onChangeText={(value) => handleInputChange("desc", value)}
              />
            ) : (
              <Desc
                onPress={() => {
                  if (editMode) setEditableField("desc");
                }}
              >
                {editedInventory.desc}
              </Desc>
            )}
          </DescContainer>
          {Platform.OS === "ios" ? (
            <ClassificationContainer>
              <ClassificationIOS>Classification: </ClassificationIOS>

              {editMode ? (
                <PickerContainerIOS>
                  <ModalPicker
                    scrollEnabled
                    animationType="fade"
                    data={classificationOptions.map((option) => ({
                      key: option,
                      label: option,
                    }))}
                    initValue={selectedClassification || editedInventory.classification}
                    onChange={(option) => {
                      handleSelection(option)
                    }}
                    cancelText="Cancel" // Set the default cancel text here
                    optionTextStyle={{ color: "black" }} // Style for the options
                    sectionTextStyle={{ color: "gray" }} // Style for the section titles (if you have sections)
                    cancelTextStyle={{ color: "red", fontWeight: "bold" }} // Style for the cancel button text
                    overlayStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }} // Style for the overlay
                  />
                  
                </PickerContainerIOS>
              ) : (
                <Classification
                  onPress={() => {
                    if (editMode) setEditableField("classification");
                  }}
                >
                  {editedInventory.classification}
                </Classification>
              )}
            </ClassificationContainer>
          ) : (
            <ClassificationContainer>
              <Classification>Classification: </Classification>

              {editMode ? (
                <PickerContainer>
                  <Picker
                    selectedValue={editedInventory.classification}
                    onValueChange={(value) =>
                      handleInputChange("classification", value)



                      
                    }
                    style={{
                      color: "#fff",
                    }}
                  >
                    <Picker.Item label="Select Classification" value={null} />
                    {classificationOptions.map((option, index) => (
                      <Picker.Item key={index} label={option} value={option} />
                    ))}
                  </Picker>
                </PickerContainer>
              ) : (
                <Classification
                  onPress={() => {
                    if (editMode) setEditableField("classification");
                  }}
                >
                  {editedInventory.classification}
                </Classification>
              )}
            </ClassificationContainer>
          )}

          <ButtonContainer>
            {!editMode ? (
              <>
                <Buttons onPress={() => setEditMode(true)}>
                  <EditTexts>Edit Item</EditTexts>
                </Buttons>
                <ButtonDelete onPress={() => displayDeleteAlert()}>
                  <EditTexts>Delete Item</EditTexts>
                </ButtonDelete>
              </>
            ) : (
              <>
                <Buttons onPress={handleSave}>
                  <EditTexts>Save</EditTexts>
                </Buttons>
                <ButtonDelete onPress={CancelMode}>
                  <CancelButton>Cancel</CancelButton>
                </ButtonDelete>
              </>
            )}
          </ButtonContainer>
        </Container>
      </ImageBackground>
    </>
  );
};
export default InventoryDetail;
