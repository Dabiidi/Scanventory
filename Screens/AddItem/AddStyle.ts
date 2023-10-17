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
  margin-top: 10px;
  color: white;
`;
export const Input = styled.TextInput`
  margin-top: 5px;
  font-size: 15px;
  height: 30px;
  padding-left:5px;
  border-radius: 5px;
  background-color: #fff;
  width: 80%;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  padding: 20px;
  align-items: center;

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
  width: 80%;
  border-radius: 10px;
  justify-content: center;
  left: 3px;
  height: 40px;
  margin-top: 10px;
  background-color: #fff;

`;

export const InputQuantity = styled.TextInput`
  height: 30px;
  padding-left: 5px;
  font-size: 15px;
  border-radius: 5px;
  color: #000;

`;

export const InputTexts = styled.Text`
color: #fff;
align-self: flex-start;
padding-left: 37px;
font-size: 20px;
`
export const QuantText = styled.View`

  height: 25px;
  width: 1px;
  background-color: black;
  

 
`;

export const QuantityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content:flex-end;
  justify-content:space-between;
  background-color: transparent;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 5px;
    margin-top: 5px;
  width: 80%;
`;

export const ButtonIncrement = styled.TouchableOpacity`
align-self: flex-end;
justify-self: flex-end;

`;

export const ButtonDecrement = styled.TouchableOpacity`
align-self: flex-end;

justify-self: flex-end;`;


export const QuantityContainer1 = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: transparent;
  justify-self: flex-end;
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
