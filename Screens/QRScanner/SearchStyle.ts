import styled from "styled-components/native";
import { BarCodeScanner } from "expo-barcode-scanner";

export const Container = styled.View`
  flex: 1;
`;
export const HeaderContainer = styled.View`
  justify-content: center;
  margin-top: 30px;
  align-items: center;
`;
export const ScanAgainButton = styled.TouchableOpacity`
  background-color: #ad0000;
  justify-content: center;
  border-radius: 30px;
  padding: 5px;
  width: 90%;
  align-self: center;
`;
export const TextStyle = styled.Text`
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
  background-color: transparent;
`;

export const StyledBarCodeScanner = styled(BarCodeScanner)`
  width: 400px;
  height: 400px;
`;
export const Texts = styled.Text`
  color: #000;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
export const DataContainer = styled.View`
  padding: 20px;
`;
export const OutputData = styled.Text`
  font-size: 20px;
`;
export const ResultHeader = styled.View`
  margin-top: 5%;
  margin-bottom: 5%;
`;

export const ScanTextsContainer = styled.View`
  flex-direction: row;
`;
export const ScanTexts = styled.Text`
  font-size: 20px;
  font-weight: 800;
`;

export const HeaderInformation = styled.Text`
  font-size: 30px;
  border-width: 2px;
  text-align: center;
  font-weight: 900;
  margin-bottom: 10px;
`;
