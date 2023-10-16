import {
  ActivityIndicator,
  Alert,
  Button,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import {
  Container,
  Input,
  Header,
  Texts,
  SubmitButton,
  ButtonText,
  Logo,
  Body,
  ButtonContainer,
  PickerContainer,
  QuantityContainer,
  ButtonIncrement,
  ButtonDecrement,
  InputQuantity,
  QuantText,
  QuantityContainer1,
  Textbody,
  BoxShadowView,
} from "../AddItem/AddStyle";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import {
  UseAddItem,
  UseCheckItemExistance,
  saveLogs,
} from "../../services/ItemsAPI";
import { AntDesign } from "@expo/vector-icons";

const AddItemScreen = () => {
  const [name, setName] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<number>(0);
  const [price, setPrice] = React.useState<number>(0);
  const [desc, setDesc] = React.useState<string>("");
  const navigation = useNavigation();
  const [classification, setClassification] = React.useState<string | null>(
    null
  );
  const [image, setImage] = React.useState<string | null>(null);

  const { isLoading: loadingCheck, mutateAsync: loadingAsync } =
    UseCheckItemExistance();

  const [count, setCount] = React.useState(0);

  const [loadingSubmit, setLoadingSubmit] = React.useState(false);

  const { isLoading, mutateAsync, data } = UseAddItem();
  const { isLoading: loadingLogs, mutateAsync: mutateLogs } = saveLogs();

  const handleSubmit = async () => {
    if (!name || !quantity || !price || !desc || !classification) {
      Alert.alert("Error", "Please fill in all fields before submitting");
      return;
    }
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    const nameExists = await loadingAsync(capitalizedName);

    if (nameExists.exists !== false) {
      Alert.alert("Error", `Item ${name} is already Exists.`);
      return;
    }
    setLoadingSubmit(true);
    try {
      await mutateAsync({
        name: capitalizedName,
        quantity,
        price,
        desc,
        classification,
        image,
      });

      await mutateLogs({
        itemName: name,
        action: `Added ${name} to the inventory.`,
      });

      if (loadingSubmit == false) {
        Alert.alert(`Inventory Item name ${name} added successfully.`);
        setName("");
        setQuantity(0);
        setPrice(0);
        setDesc("");

        navigation.goBack();
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred");
    }
  };

  const handleCancel = () => {
    // Alert.alert("Cancel", "Cancel Adding Item");

    navigation.goBack();
  };

  const handleClickIncrementQuant = () => {
    console.log("count", count);
    setCount(count + 1);
    setQuantity(count + 1);
  };

  const handleClickDecrimentQuant = () => {
    if (count > 0) {
      console.log("count", count);
      setCount(count - 1);
      setQuantity(count - 1);
    }
  };
  React.useEffect(() => {
    if (!isLoading) {
      setLoadingSubmit(false);
    }
  }, [isLoading]);

  const classificationOptions = [
    "School Supplies",
    "Hardware",
    "Accessories",
    "Balls",
  ];

  return (
    <Container>
      {loadingSubmit && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        >
          <ActivityIndicator
            style={{ marginTop: 100, opacity: 9 }}
            size="large"
            color="#000000"
          />
        </View>
      )}

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header>
          <Texts>ADD INVENTORY ITEM </Texts>
          <Logo source={require("../../Images/AddInventory.png")}></Logo>
        </Header>

        <BoxShadowView>
          <Textbody>Item Details </Textbody>
          <Body>
            <Input
              placeholder="Item Name"
              placeholderTextColor={"white"}
              autoCapitalize="words"
              onChangeText={(text) => setName(text)}
              value={name}
            />

            <QuantityContainer>
              <QuantText>Quantity:</QuantText>
              <QuantityContainer1>
                <ButtonDecrement onPress={handleClickDecrimentQuant}>
                  <AntDesign name="minus" size={30} color="black" />
                </ButtonDecrement>
                <InputQuantity
                  placeholder="0"
                  placeholderTextColor={"white"}
                  onChangeText={(text) => setQuantity(parseInt(text))}
                  value={quantity ? quantity.toString() : ""}
                  keyboardType="numeric"
                  inputMode="numeric"
                />
                <ButtonIncrement onPress={handleClickIncrementQuant}>
                  <AntDesign name="plus" size={30} color="black" />
                </ButtonIncrement>
              </QuantityContainer1>
            </QuantityContainer>

            <Input
              placeholder="Price"
              placeholderTextColor={"white"}
              onChangeText={(text) => setPrice(parseFloat(text))}
              value={price ? price.toString() : ""}
              keyboardType="numeric"
            />
            <Input
              placeholder="Description"
              placeholderTextColor={"white"}
              autoCapitalize="words"
              onChangeText={(text) => setDesc(text)}
              value={desc}
            />
          </Body>
          {Platform.OS === "ios" ? (
            <PickerContainer>
              <Text style={{ color:"#fff" , left:"5%" , fontSize:20}}>Classification</Text>
              <Picker
                selectedValue={classification}
                onValueChange={(itemValue) => setClassification(itemValue)}
                style={{ color: "#fff",top:"5%"}}
              >
                <Picker.Item
                  label="Select Classification"
                  color="#fff"
                  
                  value={null}
                  style={{ backgroundColor: "white" }}
                  
                />

                {classificationOptions.map((option, index) => (
                  <Picker.Item
                  
                    color="#fff"
                    key={index}
                    label={option}
                    value={option}
                  />
                ))}
              </Picker>
            </PickerContainer>
          ) : (
            <PickerContainer>
              <Picker
                selectedValue={classification}
                onValueChange={(itemValue) => setClassification(itemValue)}
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
          )}

          <ButtonContainer>
            <SubmitButton onPress={handleSubmit}>
              <ButtonText>Submit</ButtonText>
            </SubmitButton>
            <SubmitButton onPress={handleCancel}>
              <ButtonText>Cancel</ButtonText>
            </SubmitButton>
          </ButtonContainer>
        </BoxShadowView>
      </ScrollView>
    </Container>
  );
};

export default AddItemScreen;
