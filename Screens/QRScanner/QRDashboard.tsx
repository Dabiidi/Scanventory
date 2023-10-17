import { View, Text, ImageBackground  } from "react-native";
import React from "react";
import {
  Container,
  ButtonAdd,
  ButtonTexts,
  ButtonScan,
  ShadowContainer,
} from "./QRDashboardStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";
import { BackgroundImage } from "../Profile/ProfileStyle";

const QRDashboard = () => {
  const navigation = useNavigation();
  const ScanToSearch = () => {
    navigation.navigate("Main", {
      screen: "ScanSearch",
    });
  };

  const ScanToAdd = () => {
    navigation.navigate("Main", {
      screen: "ScanToAdd",
    });
  };

  return (
    <Container>
      <ShadowContainer>
        <ButtonAdd onPress={ScanToAdd}>
          <MaterialCommunityIcons name="cube-scan" size={100} color="white" />

          <ButtonTexts>Scan to ADD</ButtonTexts>
        </ButtonAdd>
      </ShadowContainer>

      <ShadowContainer>
        <ButtonScan onPress={ScanToSearch}>
          <MaterialCommunityIcons
            name="magnify-scan"
            size={100}
            color="white"
          />

          <ButtonTexts>Scan to Search</ButtonTexts>
        </ButtonScan>
      </ShadowContainer>
    </Container>
  
  );
};

export default QRDashboard;
