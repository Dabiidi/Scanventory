import styled from "styled-components/native";
import { BarCodeScanner } from "expo-barcode-scanner";

export const Container = styled.View`
  background-color: #fff;

  flex: 1;
`;
export const Headertext = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;
export const HeaderContainer = styled.View`
  justify-content: center;
  margin-top: 30px;

  align-items: center;
`;

export const ScanData = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

export const HeaderInformation = styled.Text`
  margin-bottom: 2%;
  font-size: 30px;
  margin-left: 20px;
  margin-right: 20px;
  border-width: 2px;
  text-align: center;
  font-weight: 900;
`;

export const ResultHeader = styled.View`
  margin-top: 5%;
  margin-bottom: 5%;
  margin-left: 20px;
  margin-right: 20px;
`;

export const SubmitButtom = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #2f4f4f;
  padding: 3%;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 30px;
`;

export const TextStyleSubmit = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 25px;
  font-weight: 800;
`;

export const BarcodeBox = styled.View`
  height: 300px;
  width: 300px;
  overflow: hidden;
  border-radius: 30px;
  background-color: tomato;
`;

export const StyledBarCodeScanner = styled(BarCodeScanner)`
  width: 300px;
  height: 400px;
`;
export const Texts = styled.Text`
  font-size: 20px;
`;

export const ScanTexts = styled.Text`
  font-size: 20px;
  font-weight: 800;
`;
export const ScanTextsContainer = styled.View`
  flex-direction: row;
  margin-left: 20px;
  margin-right: 20px;
`;
export const ScanAgainButton = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: #ad0000;
  padding: 3%;
  margin-left: 20px;
  margin-right: 20px;
  justify-content: center;
  border-radius: 30px;
`;
export const TextStyle = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 25px;
  font-weight: 800;
`;
