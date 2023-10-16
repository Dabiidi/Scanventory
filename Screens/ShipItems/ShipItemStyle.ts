import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;
export const BodyContainer = styled.View`
  align-self: center;
  width: 90%;
`;
export const ButtonContainer = styled.View`
  margin-top: 5%;

  flex-direction: row;
  justify-content: space-evenly;
`;
export const ShadowBoxContainer = styled.View`
  align-items: center;
  border-radius: 10px;
  padding: 20px;
  background-color: #fff;
  justify-content: center;
  flex-direction: column;
  ${Platform.select({
    ios: `
      shadow-color: black;
      shadow-offset: 0px 2px; /* Adjust the offset as needed */
      shadow-opacity: 0.2; /* Adjust the opacity as needed */
      shadow-radius: 4px; /* Adjust the radius as needed */
    `,
    android: `
      elevation: 3; /* Adjust the elevation level as needed */
    `,
  })}
`;

export const ShipLogs = styled.View`
  align-items: center;
  flex-direction: column;
`;
export const OutOfStockLogs = styled.View`
  align-items: center;

  flex-direction: column;
`;
export const ButtonLogs = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #fff;

  border-color: #407dab;
  border-radius: 10px;
`;
export const ButtonText = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: 700;
  text-align: center;
`;
export const Texts = styled.Text`
  font-size: 20px;
  padding: 15px;
  text-align: center;
  font-weight: 700;
`;
