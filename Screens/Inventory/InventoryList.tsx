import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import InventoryComponent from "../Inventory/Inventory";

import { useNavigation } from "@react-navigation/native";

import { useInventory } from "../Context/InventoryContent";
import {
  PickerContainer,
  SearchContainer,
  SearchInput,
} from "./InventoryStyle";
import { Picker } from "@react-native-picker/picker";
import { useGetItems } from "../../services/ItemsAPI";
import { EvilIcons } from "@expo/vector-icons";
import ModalPicker from "react-native-modal-selector";

const InventoryList = ({}) => {
  const navigation = useNavigation();
  const { inventories, setInventories, masterInventory } = useInventory();
  const [search, setSearch] = React.useState(""); // Search data
  const [masterDataSource, setMasterDataSource] = React.useState([]); // All data
  const [loading, setLoading] = React.useState(false);
  const [initValue, setInitValue] = React.useState(
    "Select Classification Filter"
  ); // State for initValue

  const [selectedClassification, setSelectedClassification] = React.useState<
    string | null
  >(null);

  const classificationOptions = [

    "School Supplies",
    "Hardware",
    "Accessories",
    "Balls",
    // Add more classification options as needed
  ];

  const applyClassificationFilter = (selectedClassification: string | null) => {
    if (selectedClassification) {
      const newData = masterInventory.filter(function (item) {
        // Applying filter for the inserted text in the search bar (Checking the name)
        const itemData = item.classification
          ? item.classification.toUpperCase()
          : "".toUpperCase();
        const textData = selectedClassification.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setInventories(newData);
      setSearch(selectedClassification);
    } else {
      setInventories(masterDataSource);
      setSearch("");
    }
  };

  const navigateToScreen = (inventory: any) => {
    navigation.navigate("Main", {
      screen: "Inventory Detail",

      params: { inventory },
    });
  };

  const searchFilterFunction = (text: any) => {
    // Check if searched text is not blank
    if (text) {
      const newData = inventories.filter(function (item) {
        // Applying filter for the inserted text in the search bar (Checking the name)
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setInventories(newData);
      setSearch(text);
    } else {
      // Update FilteredDataSource with masterDataSource
      setInventories(masterDataSource);
      setSearch(text);
    }
  };

  const GetItemData = useGetItems();

  const filterChoice = (text: string) => {
    if (text) {
      setInitValue(text);
    } else {
      setInitValue("Select Filter");
    }
  };
  React.useEffect(() => {
    setLoading(true);
    if (GetItemData.data && !GetItemData.isLoading) {
      setInventories(GetItemData.data);
      setMasterDataSource(GetItemData.data);
      GetItemData.refetch();
    }
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimeout);
  }, [GetItemData.isLoading, GetItemData.data, GetItemData.refetch]);

  if (GetItemData.isLoading)
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

    const handleCancel = () => {
      // Handle cancel logic here
      console.log("Canceled");
  
    };
  
  if (GetItemData.error) return <Text> Error data</Text>;
  //<AntDesign name="search1" size={40} color="black" style={{ left: 8 }} />
  return (
    <Container>
      {loading && (
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
      )}
      <SearchContainer>
        <SearchInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          onChangeText={(text) => searchFilterFunction(text)}
          value={search}
        />

        <EvilIcons name="search" size={50} color="black" />
      </SearchContainer>
      {Platform.OS === "ios" ? (
        <PickerContainer>
          <ModalPicker
            scrollEnabled
            animationType="fade"
            data={classificationOptions.map((option) => ({
              key: option,
              label: option,
            }))}
            initValue={initValue}
            onChange={(option) => {
              
              filterChoice(option.key);
              setSelectedClassification(option.key);
              setInventories(masterDataSource);
              applyClassificationFilter(option.key);
               // text field
            }}
          
            initValueTextStyle={{ color: "white" }}
     
            cancelText="Cancel" // Set the default cancel text here
            optionTextStyle={{ color: "black" }} // Style for the options
            cancelTextStyle={{ color: "red", fontWeight: "bold" }} // Style for the cancel button text
            overlayStyle={{ backgroundColor: "rgba(0,0,0,0.7)" }} // Style for the overlay
          />
        </PickerContainer>
      ) : (
        <PickerContainer>
          <Picker
            selectedValue={selectedClassification}
            onValueChange={(itemValue) => {
              setSelectedClassification(itemValue);
              setInventories(masterDataSource);
              applyClassificationFilter(itemValue);
            }}
            style={{
              color: "#fff",
            }}
          >
            <Picker.Item label="Select Classification Filter" value={null} />
            {classificationOptions.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
        </PickerContainer>
      )}

      {GetItemData.isLoading ? (
        <Text>Loading ....</Text>
      ) : GetItemData.isError ? (
        <Text>Error:</Text>
      ) : inventories.length > 0 ? (
        <FlatList
          data={inventories}
          renderItem={({ item }) => (
            <InventoryComponent
              onPress={() => navigateToScreen(item)}
              item={item}
            />
          )}
          scrollEnabled
          keyExtractor={(item, index) => item.id || index.toString()}
        />
      ) : (
        <ImageContainer>
          <EmptyLogo source={require("../../Images/empty-box.png")}></EmptyLogo>

          <InfoText> No Item Found.</InfoText>
        </ImageContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  background-color: #fff;
  padding: 20px;

  flex: 1;
`;

const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

const ImageContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 40px;
`;
const EmptyLogo = styled.Image`
  width: 75%;
  height: 60%;
`;
const InfoText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #ff0000;
`;

export default InventoryList;
