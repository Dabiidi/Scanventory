import { TextInput } from "react-native";
import { styled } from "styled-components/native";

export const SearchInput = styled(TextInput).attrs({
  placeholder: "Search an Item",
  placeholderTextColor: "#000",
})`
  font-weight: 800;
  flex-direction: row;
  align-items: center;
  padding: 10px;

  width: 70%;
  color: #000;
`;
export const SearchContainer = styled.View`
  border-radius: 10px;
  flex-direction: row;
  justify-content: space-between;
  border-color: #000000;
  border-bottom-width: 2px;
  border-bottom-color: black;
`;

export const PickerContainer = styled.View`
  padding: 10px;
  justify-content: center;
  height: 50px;
  margin-bottom: 5px;
  background-color: #12486b;
  border-radius: 10px;
  margin-top: 10px;
`;
