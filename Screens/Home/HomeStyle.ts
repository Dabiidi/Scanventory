import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  background-color: #fff;
  flex: 1;

`;

export const Logo = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const HeaderTapIcon = styled.TouchableOpacity`
`
export const HeaderContainer = styled.View`
flex-direction: row;
justify-content: space-between;
padding-left: 10px;
padding-right: 15px;
padding-top: 5px;

`
export const TextHeader = styled.Text`
font-size:20px;
font-weight: bold;
padding: 10px;
color: #ffffff;
`
export const BackgroundImage = styled.ImageBackground`
  flex: 1;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
  justify-content: center;
  align-items: center;
  
`;
export const Header = styled.View`

  height: 30%;
  background-color: #12486b;
  border-bottom-right-radius: 30px;
  border-bottom-left-radius: 30px;
`;

export const TopText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;

export const SalesText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #ffffff;
`;

export const InfoContainer = styled.View`
  margin-top: 3%;
  flex: 2;
`;

export const Texts = styled.Text`
  font-size: 20px;
  font-weight: 400;
`;
export const TextWrapper1 = styled.TouchableOpacity`
  background-color: #12486b;

  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  align-self: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 20px;
  padding-top: 20px;
  border-radius: 10px;
  align-items: center;
  margin-bottom: 10px;
`;
export const TextCount = styled.Text`
  font-size: 30px;

  font-weight: 700;
  color: #fff;
`;
export const TextBody = styled.Text`
  font-size: 20px;
  text-align: center;

  font-weight: 800;
  color: #fff;
`;

export const Greetings = styled.Text`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #000000;
`;

export const Body = styled.View`
  margin-top: 5%;
  flex-direction: row;
  justify-content: space-evenly;
  margin-bottom: 5%;
  height: 20%;
`;

export const ReportButton = styled.TouchableOpacity`
  flex-direction: column;
`;

export const AddButton = styled.TouchableOpacity`
  flex-direction: column;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin-left: 20px;
  margin-right: 16px;
  text-align: center;
`;
export const AddContainer = styled.View`
  align-items: center;
  border-radius: 10px;
  justify-content: center;
  background-color: #fff;
  flex-direction: column;
  ${Platform.select({
    ios: `
      shadow-color: black;
      shadow-offset: 0px 2px; 
      shadow-opacity: 0.1; 
      shadow-radius: 4px; 
    `,
    android: `
      elevation: 3; 
    `,
  })}
`;
export const ButtonShip = styled.Text`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

export const ReportContainer = styled.View`
  align-items: center;
  border-radius: 10px;
  width:31%;
  justify-content: center;
  background-color: #fff;

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

export const ShipContaier = styled.View`
  align-items: center;
  width: 30%;
  border-radius: 10px;
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

export const ShipButton = styled.TouchableOpacity`
  width: 80%;
`;
export const BoxShadowView = styled.View`
  justify-content: space-between;
  flex-direction: row;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 10px;
  background-color: #12486b;
  width: 80%;
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
