import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import {
  Container,
  Name,
  Quantity,
  Price,
  Desc,
  Classification,
  LocationText,
  ShippingContainer,
  ItemHeader,
  LocContainer,
  MapContainer,
  LocateText,
  ButtonText,
  ShipButton,
  QuantityText,
  QuantityShipContainer,
  ButtonDecrement,
  ButtonIncrement,
  QuantityTextButton,
  ButtonContainer,
} from "./ShipDetailStyle";
import CustomModal from "../Custom/CustomModal";
import { AntDesign } from "@expo/vector-icons";

type Items = {
  _id: string;
  name: string;
  quantity: number;
  price: number;
  desc: string;
  classification: string;
};

type ShipItemDetailsRouteParams = {
  ShipItemDetails: {
    inventory: Items;
  };
};

const ShipItemDetails: React.FC<{
  route: RouteProp<ShipItemDetailsRouteParams, "ShipItemDetails">;
}> = ({ route }) => {
  const navigation = useNavigation();
  const [total, setTotal] = React.useState(0);
  const { inventory } = route.params;
  const [currentAddress, setCurrentAddress] = useState("");

  const [quantityToShip, setQuantityToShip] = React.useState<number>(0);

  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 0, // Initial latitude
    longitude: 0, // Initial longitude
  });

  const [selectedPlaceName, setSelectedPlaceName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [count, setCount] = React.useState(0);
  const userLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission Denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync();
      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setCurrentLocation(coords);

      let getAddress = await Location.reverseGeocodeAsync(coords);
      const formattedAddress = `${getAddress[0].name}, ${getAddress[0].street}, ${getAddress[0].city}, ${getAddress[0].region}`;
      setCurrentAddress(formattedAddress);

      setMapRegion({
        ...coords,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
      return getAddress;
    } catch (error) {
      console.error("Error getting user location:", error);
    }
  };

  const shipItem = async () => {
    if (!selectedPlaceName && !quantityToShip === null) {
      Alert.alert("Error", "Please fill in all fields before submitting");
      return;
    }
    try {
      const response = await fetch(
        "http://192.168.110.110:4000/inventoryapp/ship-items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemId: inventory._id,
            itemName: inventory.name,
            quantityToShip: quantityToShip,
            destination: selectedPlaceName,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        Alert.alert(
          "Ship Status",
          `Items shipped successfully.\nShipped quantity: ${data.shippedQuantity}`
        );
        navigation.goBack();
      } else {
        Alert.alert("Ship Status", `Item ${inventory.name} shipped Failed.`);
      }
    } catch (error) {
      Alert.alert("Ship Status", `Item ${inventory.name} shipped Failed.`);
    }
  };



  const submitItem = async () => {
    const quantitySelected = quantityToShip;

    if (quantityToShip === 0 || selectedPlaceName === "") {
      Alert.alert(
        "Error",
        "Please fill in the destination or quantity before submitting."
      );
    } else if (quantitySelected === 0) {
      Alert.alert("Error", "Selected quantity cannot be zero.");
    } else if (quantitySelected > inventory.quantity) {
      Alert.alert(
        "Error",
        "Selected quantity is greater than available quantity."
      );
    } else {
      const totalAmount = quantitySelected * inventory.price;
      setTotal(totalAmount);
      setIsModalVisible(true);
    }
  };

  const handleClickIncrementQuant = () => {
    console.log("count", count);
    setCount(count + 1);
    setQuantityToShip(count + 1);
  };

  const handleClickDecrimentQuant = () => {
    if (count > 0) {
      console.log("count", count);
      setCount(count - 1);
      setQuantityToShip(count - 1);
    }
  };

  const handleMapTap = async (e: any) => {
    const tappedLocation = e.nativeEvent.coordinate;
    setSelectedLocation(tappedLocation);

    
    try {
      const getAddress = await Location.reverseGeocodeAsync(tappedLocation);
      if (getAddress.length > 0) {
        const formattedAddress = `${getAddress[0].name}, ${getAddress[0].street}, ${getAddress[0].city}, ${getAddress[0].region}`;
        setSelectedPlaceName(formattedAddress);

        console.log("textors", formattedAddress);
      } else {
        setSelectedPlaceName("Location not found");
      }
    } catch (error) {
      console.error("Error getting place name:", error);
      setSelectedPlaceName("Location not found");
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      // Reset the state when navigating away
      setMapRegion({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      });
      setSelectedLocation({
        latitude: 0,
        longitude: 0,
      });
      setSelectedPlaceName("");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <>
      <Container>
        <MapContainer>
          <MapView style={styles.map} region={mapRegion} onPress={handleMapTap}>
            <Marker
              coordinate={selectedLocation}
              title="Selected Location"
              draggable={true}
              onDragEnd={(e) => {
                setSelectedLocation(e.nativeEvent.coordinate);
                handleMapTap(e);
              }}
            />

            <Marker coordinate={currentLocation} title="My Location" />
          </MapView>
        </MapContainer>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -50}
          style={styles.quantityContainer}
        >
          <LocContainer>
            <LocationText>User Location </LocationText>
            <LocateText>{currentAddress}</LocateText>
            <LocationText>Selected Destination</LocationText>
            <LocateText>{selectedPlaceName}</LocateText>
          </LocContainer>

          <ItemHeader>
            <Name>Item Name:{inventory.name}</Name>

            <Quantity>Quantity:{inventory.quantity}</Quantity>

            <Price>Price: ₱{inventory.price}</Price>

            <Desc>Description:{inventory.desc}</Desc>

            <Classification>
              Classification:{inventory.classification}
            </Classification>
          </ItemHeader>

          <ShippingContainer>
            <QuantityShipContainer>
              <QuantityTextButton>Quantity to Ship: </QuantityTextButton>
              <ButtonContainer>
                <ButtonDecrement onPress={handleClickDecrimentQuant}>
                  <AntDesign name="minus" size={30} color="black" />
                </ButtonDecrement>
                <QuantityText
                  placeholderTextColor={"black"}
                  placeholder="0"
                  keyboardType="numeric"
                  value={quantityToShip ? quantityToShip.toString() : ""}
                  onChangeText={(text) => setQuantityToShip(parseInt(text))}
                />
                <ButtonIncrement onPress={handleClickIncrementQuant}>
                  <AntDesign name="plus" size={30} color="black" />
                </ButtonIncrement>
              </ButtonContainer>
            </QuantityShipContainer>
            <ShipButton onPress={submitItem}>
              <ButtonText>Ship Item</ButtonText>
            </ShipButton>
          </ShippingContainer>
        </KeyboardAvoidingView>

        <CustomModal
          visible={isModalVisible}
          ItemName={inventory.name}
          total={total}
          currentAddress={currentAddress}
          shipAddress={selectedPlaceName}
          onCancel={() => setIsModalVisible(false)}
          onConfirm={shipItem} // You can call shipItem when the user confirms
        />
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    width: "100%",
  },
  quantityContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
});

export default ShipItemDetails;
