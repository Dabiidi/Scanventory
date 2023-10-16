import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  background-color: white;
`;

export const GetStartedButton = styled.TouchableOpacity`
  background-color: #12486b;
  border-radius: 30px;
  width: 40%;
  align-self: center;

  padding: 20px;
`;
export const Title = styled.Text`
  margin-top: 25px;
  padding-left: 15px;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
`;
export const Header = styled.View`
  border-top-right-radius: 40px;
  padding-bottom: 10px;
  margin-bottom: 40px;
  border-top-left-radius: 40px;
  background-color: #fff;
  flex-direction: row;
  justify-content: center;
`;
export const Logo = styled.Image`
  width: 100px;
  height: 100px;
`;

export const TextButton = styled.Text`
  color: #fff;
  text-align: center;
`;
export const SwiperContainer = styled.View`
  background-color: #fff;
  height: 350px;
  width: 400px;
  align-self: center;
`;
export const SlideImage = styled.Image`
  width: 100%;
  height: 90%;
`;
export const SlideText = styled.Text`
  font-size: 16px;
  font-weight: 700;
  text-decoration: solid;
  text-align: center;
  margin-top: -5px;
  color: #000000;
`;
