import { KeyboardAvoidingView, TextInput } from "react-native";
import { styled } from "styled-components/native";

export const Container = styled.View`
  background-color: #12486B;
  flex: 1;
  justify-content: center;
`;
export const Header = styled.View`
  background-color: #12486B ;
  height: 20%;
  flex: 1;
`;

export const LoginContainer = styled.View`
  padding-top: 40px;

  background-color: #fff;
  justify-content: center;
  padding-bottom: 30px;
`;

export const IntroHeader = styled.View`
  padding-top: 40px;
  border-top-right-radius: 40px;
  border-top-left-radius: 40px;
  background-color: #fff;
  flex-direction: row;
  justify-content: center;
`;
export const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

export const TextContainer = styled.View`
  margin-left: 13px;
  margin-top: 5px;
`;

export const Title = styled.Text`
  margin-top: 10px;
  font-size: 30px;
  font-weight: bold;
`;

export const TitleText = styled.Text`
  font-size: 12px;
  padding-right: 10px;
  font-weight: 500;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #1f4172;
  height: 60px;
  width: 85%;
  align-self: center;

  border-radius: 40px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 23px;
  font-weight: 400;
  color: #fff;
`;

export const ChangeAccText = styled.Text`
  color: blue;
`;

export const Texts = styled.Text`
  font-weight: 700;
`;

export const ChangeAccContaierText = styled.View`
  margin-top: 3%;
  flex-direction: row;
  justify-content: center;
`;

export const EmailInput = styled.TextInput<{
  isError: boolean;
}>`
  background-color: ${({ editable }) => (editable ? "white" : "#DCDCDC")};
  height: 50px;
  border-width: 1px;
  width: 85%;
  align-self: center;
  border-radius: 30px;
  margin-bottom: 10px;
  padding-left: 23px;
  border-color: ${({ isError }) => (isError ? "red" : "gray")};
`;

export const StyledErrorText = styled.Text`
  color: red;
  margin-bottom: 10px;
  text-align: center;
`;

export const PassInput = styled.TextInput<{
  isError: boolean;
}>`
  height: 50px;
  padding: 8px;
  flex: 1;
  border-color: ${({ isError }) => (isError ? "red" : "gray")};
`;

export const PasswordContainer = styled.View<{
  isError: boolean;
  editable: boolean;
}>`
  padding-left: 15px;
  flex-direction: row;
  align-items: center;
  border-color: ${({ isError }) => (isError ? "red" : "gray")};
  border-width: 1px;
  border-radius: 30px;
  width: 85%;
  align-self: center;
  margin-bottom: 10px;
  background-color: ${({ editable }) => (editable ? "white" : "#DCDCDC")};
`;

export const TextAreas = styled.Text`
  font-size: 10px;
  margin-top: 1%;
  font-weight: 500;
  align-self: center;
`;
