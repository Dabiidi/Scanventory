import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: #12486B;
  justify-content: center;
`;
export const Header = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
  align-items: center;
  border-bottom-left-radius: 100px;
`;
export const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;
export const Body = styled.View`
  margin-top: 25px;
  align-items: center;
  width: 100%;
`;

export const Texts = styled.Text`
  font-size: 30px;
  font-weight: bold;
`;
export const Textbody = styled.Text`
  font-size: 30px;
  font-weight: 500;
  color: white;
`;
export const Input = styled.TextInput`
  border-bottom-width: 2px;
  border-bottom-color: black;
  font-size: 15px;
  color: #fff;
  width: 80%;
  margin-top: 20px;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;
  margin-top: 15px;
`;
export const SubmitButton = styled.TouchableOpacity`
  background-color: #0A2647;
  width: 80%;
  padding: 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
`;
export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
`;

export const PickerContainer = styled.View`
  width: 90%;
  margin-left: 5px;
  margin-top: 10px;
  justify-content: center;
`;

export const InputQuantity = styled.TextInput`
  border-bottom-width: 2px;
  border-bottom-color: black;
  font-size: 15px;

  color: #fff;
  text-align: center;
  width: 30%;
`;

export const QuantText = styled.Text`
  font-size: 15px;
  color: #fff;
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  margin-top: 20px;
  width: 80%;
`;

export const ButtonIncrement = styled.TouchableOpacity``;

export const ButtonDecrement = styled.TouchableOpacity``;

export const QuantityContainer1 = styled.View`
  flex-direction: row;
  align-items: center;

  justify-content: center;
  width: 30%;
  justify-content: space-between;
`;

export const BoxShadowView = styled.View`
  width: 90%;
  margin-top: 5%;
  align-items: center;
  flex-direction: column;
  background-color: #12486B;
  height: 75%;
  padding-bottom: 10px;
  align-self: center;
  ${Platform.select({
    ios: `
      shadow-color: black;
      shadow-offset: 0px 2px; /* Adjust the offset as needed */
      shadow-opacity: 0.2; /* Adjust the opacity as needed */
      shadow-radius: 4px; /* Adjust the radius as needed */
    `,
    android: `
      elevation: 50; /* Adjust the elevation level as needed */
    `,
  })}
`;
