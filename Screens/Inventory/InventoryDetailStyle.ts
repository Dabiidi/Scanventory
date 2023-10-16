import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: 16px;
  background-color: #12486b;
  border-radius: 8px;
  margin-top: 15%;
  justify-self: center;
  margin-left: 5%;
  margin-bottom: 5%;
  margin-right: 5%;
`;

export const UploadContainer = styled.View`
  height: 50%;
  width: 90%;
  align-self: center;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 5%;
  background-color: #efefef;
  border-radius: 8px;
  ${Platform.select({
    ios: `
      shadow-color: black;
      shadow-offset: 0px 2px; 
      shadow-opacity: 0.2;
      shadow-radius: 4px;
    `,
    android: `
      elevation: 10;
    `,
  })}
`;
export const TextUploadImage = styled.Text`
  font-size: 18px;
`;
export const UploadButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const UploadbuttonContainer = styled.View`
  opacity: 0.4;
  position: absolute;
  align-items: center;
  bottom: 0;
  background-color: #fff;
  width: 100%;
  height: 20%;
  justify-self: center;
`;
export const PickerContainer = styled.View`
  width: 50%;
  padding: 5px;
  justify-content: center;
  flex: 1;
  color: #fff;
`;

export const NameContainer = styled.View`
  height: 30px;
  background-color: #12486b;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
export const TextInputs = styled.TextInput`
  background-color: #12486b;
  width: 50%;
  border-bottom-width: 1px;
  border-bottom-color: black;
  height: 22px;
  margin-left: 10px;
  color: #fff;
  font-size: 18px;
`;

export const Total = styled.Text`
  font-size: 16px;
  margin-bottom: 4px;
  color: #fff;
`;

export const Price = styled.Text`
  font-size: 16px;
  margin-bottom: 3px;
  color: #fff;
`;

export const Desc = styled.Text`
  font-size: 16px;
  margin-bottom: 3px;
  color: #fff;
`;

export const Classification = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: #fff;
`;

export const Buttons = styled.TouchableOpacity`
  background-color: #35a29f;
  border-radius: 50px;
  height: 50px;
  justify-content: center;
  width: 50px;
  flex: 1;
  align-items: center;
`;

export const ButtonText = styled.Text`
  font-size: 23px;
  font-weight: 400;
  color: #fff;
`;
export const EditTexts = styled.Text`
  font-size: 23px;
  font-weight: 400;
  color: #fff;
`;
export const QuantityContainer = styled.View`
  height: 30px;
  background-color: #12486b;
  flex-direction: row;
  margin-bottom: 10px;
`;
export const PriceContainer = styled.View`
  height: 30px;
  background-color: #12486b;
  flex-direction: row;
  margin-bottom: 10px;
`;
export const DescContainer = styled.View`
  height: 30px;
  background-color: #12486b;
  flex-direction: row;
  margin-bottom: 10px;
`;

export const ClassificationContainer = styled.View`
  height: 30px;
  background-color: #12486b;
  flex-direction: row;
  margin-bottom: 10px;
`;
export const ButtonContainer = styled.View`
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const CancelButton = styled.Text`
  font-size: 23px;

  font-weight: 400;
  color: #fff;
`;

export const InfoContainer = styled.Text`
  background-color: #000;
  height: 40px;
  text-align: center;
`;
export const ButtonDelete = styled.TouchableOpacity`
  background-color: #ad0000;
  border-radius: 50px;
  height: 50px;
  justify-content: center;
  margin-left: 10px;
  width: 50px;
  flex: 1;
  align-items: center;
`;

export const Texts = styled.Text`
  color: #fff;
  font-size: 30px;
`;
