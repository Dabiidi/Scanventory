import { View, ActivityIndicator, Image, Alert } from "react-native";
import React, { useEffect } from "react";

import * as ImagePicker from "expo-image-picker";

import { useNavigation } from "@react-navigation/native";
import {
  Logout,
  TextStyle,
  Container,
  Texts,
  BackgroundImage,
  UploadContainer,
  UploadButton,
  TextUploadImage,
  UploadbuttonContainer,
  BoxShadowView,
  BodyContainer,
} from "./ProfileStyle";
import { getUserAcc, useUploadImage } from "../../services/userAPI";
import { AntDesign } from "@expo/vector-icons";
/*  */

const Profile = () => {
  const [image, setImage] = React.useState<any>(null);
  const navigation = useNavigation();
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());
  const [imageLoading, setImageLoading] = React.useState(false);

  const { data, isLoading: isLoadingUser } = getUserAcc();

  useEffect(() => {
    if (imageLoading) {
      setImageLoading(false);
    }
  }, [image]);

  const uploadImageMutation = useUploadImage();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageLoading(true);
      const payload = { id: data[0]._id, profilePicture: result.assets[0].uri };

      try {
        // console.log(uploadImageMutation.isLoading);
        await uploadImageMutation.mutateAsync(payload);

        setImage(data[0].profilePicture);
      } catch (error) {
        // Handle error if necessary
        console.error("Error uploading image:", error);
      }
    }
  };

  const CaptureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,

      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      setImageLoading(true);
      const payload = { id: data[0]._id, profilePicture: result.assets[0].uri };

      try {
        await uploadImageMutation.mutateAsync(payload);

        setImage(data[0].profilePicture);
      } catch (error) {
        // Handle error if necessary
        console.error("Error uploading image:", error);
      }
    }
  };

  const showImagePickerOptions = async () => {
    // Present the user with options to choose between camera and library
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();

    if (status) {
      Alert.alert(
        "Select Image Source",
        "Choose an image source for your profile picture:",
        [
          {
            text: "Camera",
            onPress: CaptureImage,
          },
          {
            text: "Image Library",
            onPress: pickImage,
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } else {
      Alert.alert(
        "Select Image Source",
        "You need to give permission to access your image library",
        [
          {
            text: "OK",
            onPress: () => console.log("OK Pressed"),
          },
        ]
      );
    }
  };

  const navigateToScreen = () => {
    navigation.navigate("Login");
  };

  React.useEffect(() => {
    setImage(data[0].profilePicture);

    // console.log("Loading?", isL  oadingUser);
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, [data]);

  return (
    <BackgroundImage source={require("../../Images/Details.png")}>
      <Container>
        <BoxShadowView>
          <UploadContainer>
            {image && (
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
            )}
            <UploadbuttonContainer>
              <UploadButton onPress={showImagePickerOptions}>
                <TextUploadImage>
                  {image ? "Edit" : "Upload"} Image
                </TextUploadImage>
                <AntDesign name="camera" size={20} color="black" />
              </UploadButton>
              {imageLoading && (
                <View
                  style={{
                    flex: 1,

                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 300,
                      width: 150,

                      backgroundColor: "gray",
                    }}
                  >
                    <ActivityIndicator
                      style={{ marginTop: 60, opacity: 9 }}
                      size="large"
                      color="#000000"
                    />
                  </View>
                </View>
              )}
            </UploadbuttonContainer>
          </UploadContainer>

          <Texts>Welcome! {data[0].name} </Texts>
          <Texts>
            {currentDateTime.toLocaleDateString()} |{" "}
            {currentDateTime.toLocaleTimeString()}
          </Texts>

          <BodyContainer>
            <Logout onPress={navigateToScreen}>
              <TextStyle>Logout</TextStyle>
            </Logout>
          </BodyContainer>
        </BoxShadowView>
      </Container>
    </BackgroundImage>
  );
};
export default Profile;
