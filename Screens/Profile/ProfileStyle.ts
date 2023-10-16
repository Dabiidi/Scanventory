import { styled } from "styled-components/native";
import { Platform } from "react-native";

export const BoxShadowView = styled.View`
  background-color: #26577c;
  padding: 16px;
  align-items: center;

  border-radius: 30px;
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

export const UploadContainer = styled.View`
  height: 150px;
  width: 150px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 10px;
  background-color: #efefef;

  border-radius: 999px;
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
export const TextUploadImage = styled.Text``;
export const UploadbuttonContainer = styled.View`
  opacity: 0.4;
  position: absolute;
  align-items: center;
  bottom: 0;
  background-color: #fff;
  width: 150px;
  height: 30%;
  justify-self: center;
`;
export const UploadButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.View`
  flex: 1;
  background-color: transparent;
  align-items: center;
  justify-content: center;
`;
export const Logout = styled.TouchableOpacity`
  background-color: #0f2c59;
  border-radius: 20px;
  width: 40%;
  margin-top: 8px;
`;

export const TextStyle = styled.Text`
  font-size: 18px;
  color: #fff;
  padding: 10px 20px;
  text-align: center;
  font-weight: bold;
`;

export const Texts = styled.Text`
  font-size: 20px;
  text-align: center;
  font-weight: 400;
  color: #ffffff;
`;
export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  object-fit: cover;
`;

export const BodyContainer = styled.View`
  height: 70px;
`;
