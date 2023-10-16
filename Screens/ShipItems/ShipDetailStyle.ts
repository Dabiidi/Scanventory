import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #fff;
  flex: 1;
`;
export const TextHeader = styled.Text`
  font-size: 30px;
  color: #000;
  text-align: center;
  font-weight: 600;
`;
export const ItemHeader = styled.View`
  margin-top: 10px;
  padding: 20px;
  width: 90%;
  background-color: #12486b;
  align-self: center;

  align-content: center;
`;
export const MapContainer = styled.View`
  flex-direction: row;
`;

export const LocContainer = styled.View`
  flex-direction: column;
  background-color: #ffffff;
`;

export const LocationText = styled.Text`
  font-size: 15px;
  text-align: left;
  font-weight: 400;
  color: #000;
  text-align: center;
`;
export const LocateText = styled.Text`
  font-size: 15px;
  text-align: left;
  font-weight: 700;
  color: #000;
  text-align: center;
`;

export const ShippingContainer = styled.View`
  align-items: center;
`;

export const Name = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
export const Quantity = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const Price = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const Desc = styled.Text`
  font-size: 16px;
  color: #fff;
`;
export const Classification = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const ButtonText = styled.Text`
  font-size: 20px;
  font-weight: 400;
  color: #fff;
  text-align: center;
`;
export const ShipButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 90%;
  background-color: #12486b;
  height: 40px;
  justify-content: center;
  border-radius: 20px;
`;

export const QuantityShipContainer = styled.View`
  flex-direction: row;
  border-color: #12486b;
  border-width: 3px;
  margin-top: 5px;
  justify-content: space-between;
  padding: 5px;
  width: 90%;
`;

export const QuantityText = styled.TextInput`
  border-bottom-width: 2px;
  border-bottom-color: #000000;
  font-size: 15px;

  text-align: center;
  width: 20%;
`;
export const ButtonIncrement = styled.TouchableOpacity``;
export const ButtonDecrement = styled.TouchableOpacity``;
export const QuantityTextButton = styled.Text`
  justify-content: center;
  align-self: center;
  right: 1px;
  font-weight: 700;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  position: relative;
  left: 45px;
`;
