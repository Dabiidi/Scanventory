import styled from "styled-components/native";

export const Container = styled.View`

  flex: 1;
  padding: 20px;

  border-radius: 8px;

`;

export const TimeDate = styled.Text`
  font-weight: 300;
  font-size: 20px;
  color: #fff;
`;
export const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;
export const Header = styled.Text`
  align-items: center;
  justify-content: center;

  height: 50px;
`;

export const InfoText = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: #000;
`;
export const ItemContainer = styled.View`
  margin-bottom: 5px;
  background-color: #12486b;
  padding: 20px;
  margin-top: 8px;

  border-radius: 8px;
`;

export const ClearButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 10px;
  padding-top: 10px;
  margin-bottom: 10px;
  width: 90%; 
  align-self: center;
  background-color: #ad0000;
`;
export const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #ffffff;
`;
