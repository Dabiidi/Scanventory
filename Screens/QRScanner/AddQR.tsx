import React, { useState, useEffect } from "react";
import { Alert, ScrollView } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";
import {
  BarcodeBox,
  ScanAgainButton,
  StyledBarCodeScanner,
  SubmitButtom,
  TextStyle,
  Container,
  Texts,
  TextStyleSubmit,
  ResultHeader,
  ScanData,
  HeaderInformation,
  HeaderContainer,
  ScanTexts,
  ScanTextsContainer,
  Headertext,
} from "./AddQRStyle";
import { UseAddItem, UseCheckItemExistance } from "../../services/ItemsAPI";

const AddQR = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [desc, setDesc] = useState<string>("");
  const [classification, setClassification] = useState<string>("");

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setText(data);

    const [Name, quant, itemPrice, Description, classification] =
      data.split(",");
    setName(Name);
    setQuantity(parseInt(quant));
    setPrice(parseFloat(itemPrice));
    setDesc(Description);
    setClassification(classification);
  };

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const scanFalse = () => {
    setScanned(false);
    setName("");
    setText("");
    setQuantity(0);
    setPrice(0);
    setDesc("");
    setClassification("");
  };

  const { isLoading: loadingCheck, mutateAsync: loadingAsync } =
    UseCheckItemExistance();

  const { isLoading, mutateAsync } = UseAddItem();

  const saveItem = async (name: string) => {
    try {
      await mutateAsync({
        name: name,
        quantity,
        price,
        desc,
        classification,
      });

      Alert.alert(`Inventory Item ${name} added successfully.`);
      setName("");
      setQuantity(0);
      setPrice(0);
      setDesc("");
      setClassification("");
    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred");
    }
  };

  const handleSave = async () => {
    if (!name || !quantity || !price || !desc || !classification) {
      Alert.alert("Error", "Please fill in all fields before submitting.");
      return;
    }
    const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    console.log("capitalizedName", capitalizedName)
    
    const nameExists = await loadingAsync(capitalizedName);


  //  const existingName = nameExists.name.toUpperCase();
  
  //  const inputName = capitalizedName.toUpperCase();
  
  //   console.log("text",existingName)

    if (nameExists.exists !== false ) {
          Alert.alert("Error", `Item ${capitalizedName} is already Exists.`);
          return;
    }
    Alert.alert(
      "Save Item",
      `Are you sure to save ${capitalizedName}? `,
      [
        {
          text: "No",
        },
        {
          text: "Yes",

          onPress: () => saveItem(capitalizedName),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  return (
    <>
      <Container>
        <ScrollView>
          <HeaderContainer>
            <Headertext>Scan QR to add an item</Headertext>
            <BarcodeBox>
              <StyledBarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              />
            </BarcodeBox>
          </HeaderContainer>
          <ResultHeader>
            <Texts>Scanned Data:</Texts>
            <ScanData>{text}</ScanData>
          </ResultHeader>

          <HeaderInformation>ITEM INFORMATION</HeaderInformation>
          <ScanTextsContainer>
            <Texts>Item Name:</Texts>
            <ScanTexts> {name}</ScanTexts>
          </ScanTextsContainer>

          <ScanTextsContainer>
            <Texts>Item Quantity:</Texts>
            <ScanTexts> {quantity}</ScanTexts>
          </ScanTextsContainer>
          <ScanTextsContainer>
            <Texts>Item Price:</Texts>
            <ScanTexts> ₱{price}</ScanTexts>
          </ScanTextsContainer>
          <ScanTextsContainer>
            <Texts>Item Description:</Texts>
            <ScanTexts> {desc}</ScanTexts>
          </ScanTextsContainer>
          <ScanTextsContainer>
            <Texts>Item Classification:</Texts>
            <ScanTexts> {classification}</ScanTexts>
          </ScanTextsContainer>

          <SubmitButtom onPress={handleSave}>
            <TextStyleSubmit>Submit</TextStyleSubmit>
          </SubmitButtom>
          {scanned && (
            <ScanAgainButton onPress={scanFalse}>
              <TextStyle>Scan Again</TextStyle>
            </ScanAgainButton>
          )}
        </ScrollView>
      </Container>
    </>
  );
};

export default AddQR;
