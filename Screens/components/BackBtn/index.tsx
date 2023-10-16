import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";



export const BackButton = () => {
const navigation = useNavigation();

const backPage = () => {
    navigation.goBack();
}

return (
    <>
    <BackBtn onPress={backPage}>
        
    <ButtonText>
    <AntDesign name="arrowleft" size={24} color="white" />

    </ButtonText>

        </BackBtn>
    </>


)

}

const BackBtn = styled.TouchableOpacity``;
const ButtonText = styled.Text`
    

`