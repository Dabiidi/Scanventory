import React, { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Swiper from "react-native-swiper";
import {
  Container,
  GetStartedButton,
  Header,
  Logo,
  SlideImage,
  SlideText,
  SwiperContainer,
  TextButton,
  Title,
} from "./LandingPageStyle";

const LandingPage: React.FC = () => {
  const navigation = useNavigation();

  const Images: any[] = [
    require("../../Images/1.png"),
    require("../../Images/2.png"),
    require("../../Images/3.png"),
  ];

  const description = [
    "Monitor Inventory",
    "Check Inventory Items",
    "Ship Inventory Items",
  ];

  const navigateToScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <Container>
      <Header>
        <Logo source={require("../../Images/Logo1.png")} />
        <Title>Scanventory</Title>
      </Header>
      <SwiperContainer>
        <Swiper
          loop={true}
          showsButtons={true}
          showsPagination={true}
          autoplay={true}
        >
          {Images.map((image, index) => (
            <View key={index}>
              <SlideImage source={image} />
              <SlideText>{description[index]}</SlideText>
            </View>
          ))}
        </Swiper>
      </SwiperContainer>
      <GetStartedButton onPress={navigateToScreen}>
        <TextButton>Get Started</TextButton>
      </GetStartedButton>
    </Container>
  );
};

export default LandingPage;
