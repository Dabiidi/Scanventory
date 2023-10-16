import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import {
  ButtonText,
  ChangeAccContaierText,
  ChangeAccText,
  Container,
  EmailInput,
  Header,
  IntroHeader,
  LoginButton,
  LoginContainer,
  Logo,
  PassInput,
  PasswordContainer,
  StyledErrorText,
  TextAreas,
  TextContainer,
  Texts,
  Title,
  TitleText,
} from "./LoginStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getUserAcc } from "../../services/userAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface FormData {
  email: string;
  password: string;
}
interface LoginformProps {
  navigate: (screen: string, params?: object) => void;
}
interface LandingScreenProps {
  navigation: LoginformProps;
}

interface UserData {
  name: string;
  password: string;
}

const LoginForm: React.FC<LandingScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, setValue, clearErrors } = useForm<FormData>();

  const [error, setError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<UserData | null>(null);

  const [showPassword, setShowPassword] = React.useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { data: account } = getUserAcc();

  const saveUser = async (email: string, password: string) => {
    const value = {
      name: email,
      password: password,
    };

    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(value));
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const onSubmit = async (data: FormData) => {
    const users = account.find((user: any) => user.name === data.email);

    if (users) {
      if (users.pass === data.password) {
        saveUser(users.name, users.pass);
        navigation.navigate("Home", {
          screen: "Menu",
          params: { email: users.name },
        });
      } else {
        setError("Invalid Credentials.");
      }
    } else {
      setError("Invalid Credentials.");
    }
  };
  const getUser = async () => {
    try {
      const savedUser = await AsyncStorage.getItem("userInfo");

      if (savedUser !== null) {
        const userData: UserData = JSON.parse(savedUser);
        if (userData) {
          setUser(userData);

          setValue("email", userData.name);

          setStatus("Found");
        } else {
          console.log("User not found");
        }
      } else {
        console.log("No Data Found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const accStatus = () => {
    let status = "false";
    clearErrors();
    setError(null);
    setValue("email", "");
    setValue("password", "");

    setStatus(status);
  };

  useEffect(() => {
    getUser();
  }, []);
  return (

    <KeyboardAvoidingView
      contentContainerStyle={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Container>
            <Header>
              <ImageBackground
                source={require("../../Images/header.png")}
                resizeMode="cover"
                style={{ flex: 1, position: "relative" }}
                blurRadius={1}
              ></ImageBackground>
            </Header>
            <IntroHeader>
              <Logo source={require("../../Images/Logo1.png")} />
              <TextContainer>
                <Title>Scanventory</Title>
                <TitleText>Empowering Your Inventory Management</TitleText>
              </TextContainer>
            </IntroHeader>
            <LoginContainer>
              {status === "Found" ? (
                <>
                  <Controller
                    control={control}
                    render={({ fieldState }) => (
                      <>
                        <EmailInput
                          editable={false}
                          isError={fieldState.invalid}
                          value={user?.name}
                          style={{ color: "black" }}
                        />
                      </>
                    )}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email format",
                      },
                    }}
                    defaultValue=""
                  />

                  <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <PasswordContainer
                          isError={fieldState.invalid}
                          editable={true}
                        >
                          <PassInput
                            editable={true}
                            isError={fieldState.invalid}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                          />

                          <MaterialCommunityIcons
                            name={showPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#aaa"
                            onPress={toggleShowPassword}
                            style={{ marginRight: 10 }}
                          />
                        </PasswordContainer>
                        {fieldState.invalid || error ? (
                          <StyledErrorText>
                            {fieldState.error
                              ? fieldState.error.message
                              : error
                              ? error
                              : ""}
                          </StyledErrorText>
                        ) : null}
                      </>
                    )}
                    name="password"
                    rules={{ required: "Password is required", minLength: 0 }}
                    defaultValue=""
                  />
                </>
              ) : (
                <>
                  <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <EmailInput
                          editable={true}
                          isError={fieldState.invalid}
                          placeholder="Email"
                          value={field.value}
                          onChangeText={field.onChange}
                          onBlur={field.onBlur}
                        />
                        {fieldState.invalid && (
                          <StyledErrorText>
                            {fieldState.error ? fieldState.error.message : ""}
                          </StyledErrorText>
                        )}
                      </>
                    )}
                    name="email"
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Invalid email format",
                      },
                    }}
                    defaultValue=""
                  />

                  <Controller
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <PasswordContainer
                          isError={fieldState.invalid}
                          editable={true}
                        >
                          <PassInput
                            editable={true}
                            isError={fieldState.invalid}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={field.value}
                            onChangeText={field.onChange}
                            onBlur={field.onBlur}
                          />
                          <MaterialCommunityIcons
                            name={showPassword ? "eye-off" : "eye"}
                            size={24}
                            color="#aaa"
                            onPress={toggleShowPassword}
                            style={{ marginRight: 10 }}
                          />
                        </PasswordContainer>
                        {fieldState.invalid || error ? (
                          <StyledErrorText>
                            {fieldState.error
                              ? fieldState.error.message
                              : error
                              ? error
                              : ""}
                          </StyledErrorText>
                        ) : null}
                      </>
                    )}
                    name="password"
                    rules={{ required: "Password is required", minLength: 0 }}
                    defaultValue=""
                  />
                </>
              )}

              <LoginButton onPress={handleSubmit(onSubmit)}>
                <ButtonText>Login</ButtonText>
              </LoginButton>

              <ChangeAccContaierText>
                <Texts>Not you?</Texts>
                <ChangeAccText onPress={accStatus}>
                  {" "}
                  Switch Account
                </ChangeAccText>
              </ChangeAccContaierText>
              <TextAreas>Version v0.0.1</TextAreas>
            </LoginContainer>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
};

export default LoginForm;
