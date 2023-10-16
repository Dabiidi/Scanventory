import React, { useState, useEffect } from "react";
import { View, Button, Alert, ScrollView } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import {
  BarcodeBox,
  StyledBarCodeScanner,
  Texts,
  Container,
  OutputData,
  HeaderContainer,
  DataContainer,
  HeaderInformation,
  ScanTexts,
  ScanTextsContainer,
  ResultHeader,
  ScanAgainButton,
  TextStyle,
} from "./SearchStyle";
import { UseCheckItemExistance } from "../../services/ItemsAPI";

const ScantoSearch = () => {
  const [hasPermission, setHasPermission] = useState<Boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const [itemData, setItemData] = useState<any | null>(null);
  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const scanFalse = () => {
    setScanned(false);
    setText("");
    setItemData("");
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const { isLoading: loadingCheck, mutateAsync: loadingAsync } =
    UseCheckItemExistance();

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setText(data);

    const [Name] = data.split(",");
    // Check the database for the item using the item's name
    const itemExists = await loadingAsync(Name);

    if (itemExists.name && itemExists) {
      // Fetch and display item data from the database
      Alert.alert("Item Found ", `Item ${itemExists.name} Found! `);
      setItemData(itemExists);
    } else {
      Alert.alert("Item Not Found", `Item ${data} doesn't exist.`);

      setItemData(null);
    }
  };

  if (hasPermission === false) {
    return (
      <View>
        <Texts style={{ margin: 10 }}> No access to camera.</Texts>
        <Button
          title={"allow camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <>
      <Container>
        <ScrollView>
          <HeaderContainer>
            <Texts>Scan QR to Search an Item</Texts>

            <BarcodeBox>
              <StyledBarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              />
            </BarcodeBox>
          </HeaderContainer>

          <DataContainer>
            <ResultHeader>
              <OutputData>Scanned Data:</OutputData>
              <ScanTexts>{text}</ScanTexts>
            </ResultHeader>
            <HeaderInformation>ITEM INFORMATION</HeaderInformation>
            <ScanTextsContainer>
              <OutputData>Item Name:</OutputData>
              <ScanTexts> {itemData?.name}</ScanTexts>
            </ScanTextsContainer>
            <ScanTextsContainer>
              <OutputData>Item Quantity:</OutputData>
              <ScanTexts> {itemData?.quantity}</ScanTexts>
            </ScanTextsContainer>
            <ScanTextsContainer>
              <OutputData>Item Price:</OutputData>
              <ScanTexts> {itemData?.price}</ScanTexts>
            </ScanTextsContainer>
            <ScanTextsContainer>
              <OutputData>Item Description:</OutputData>
              <ScanTexts> {itemData?.desc}</ScanTexts>
            </ScanTextsContainer>
            <ScanTextsContainer>
              <OutputData>Item Classification:</OutputData>
              <ScanTexts> {itemData?.classification}</ScanTexts>
            </ScanTextsContainer>
          </DataContainer>
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

export default ScantoSearch;
