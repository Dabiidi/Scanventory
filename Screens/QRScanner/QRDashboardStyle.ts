import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #12486b;
`;
export const ShadowContainer = styled.View`
  justify-content: center;
  margin-top: 20px;
  background-color: #12486b;
  height: 45%;
  width: 90%;
  border-radius: 10px;
  margin-bottom: 10px;
  ${Platform.select({
    ios: `
      shadow-color: black;
      shadow-offset: 0px 2px; /* Adjust the offset as needed */
      shadow-opacity: 1.0; /* Adjust the opacity as needed */
      shadow-radius: 4px; /* Adjust the radius as needed */
    `,
    android: `
      elevation: 15; /* Adjust the elevation level as needed */
    `,
  })}
`;
export const ButtonAdd = styled.TouchableOpacity`
  background-color: #12486b;

  align-items: center;
`;

export const ButtonTexts = styled.Text`
  text-align: center;
  font-size: 30px;
  color: #ffffff;
`;

export const ButtonScan = styled.TouchableOpacity`
  background-color: #12486b;

  align-items: center;
`;
