import React from "react";
import {
  Modal,
  ScrollView,
  Text,
  StyleSheet,
  View,
  BackHandler,
 
} from "react-native";
import {
  useRoute,
  RouteProp,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import {
  Body,
  Container,
  Greetings,
  Header,
  AddButton,
  ButtonText,
  TextBody,
  ReportButton,
  InfoContainer,
  ShipButton,
  ButtonShip,
  TextWrapper1,
  TextCount,
  SalesText,
  BoxShadowView,
  AddContainer,
  ReportContainer,
  ShipContaier,
  BackgroundImage,
  HeaderContainer,

  TextHeader,
} from "./HomeStyle";

import { useInventory } from "../Context/InventoryContent";
import { AntDesign, Ionicons, MaterialIcons, Octicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { useGetShipping } from "../../services/shippingAPI";

import { ActivityIndicator } from "react-native-paper";
type DashboardScreenRouteParams = {
  email: string;
};

interface ShipItem {
  total: number;
  // Add other properties as needed
}

const HomeScreen: React.FC = () => {
  const [notificationCount, setNotificationCount] = React.useState(0);

  const navigation = useNavigation();
  const [noStock, useNoStock] = React.useState(0);
  const [haveStock, useHaveStock] = React.useState(0);
  const { inventoryCount } = useInventory();
  const [loading, setLoading] = React.useState(false);
  const [infoModalVisible, setInfoModalVisible] = React.useState(false);
  const [totalInventoryModalVisible, setInventoryModalVisible] =
    React.useState(false);
  const route =
    useRoute<RouteProp<Record<string, DashboardScreenRouteParams>, string>>();
  const { email } = route.params;

  const filterInventory = (inventory: any) => {
    return useNoStock(inventory.filter((inv: any) => inv.quantity === 0));
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        // Return true to stop default back navigaton
        // Return false to keep default back navigaton
        return true;
      };

      // Add Event Listener for hardwareBackPress
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        // Once the Screen gets blur Remove Event Listener
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  React.useEffect(() => {



      setLoading(true);



    const filteredInventoryNoStock = inventoryCount.filter(
      (inv) => inv.quantity === 0
    );
    useNoStock(filteredInventoryNoStock.length);
    setNotificationCount(filteredInventoryNoStock.length);
    const filteredInventoryhaveStock = inventoryCount.filter(
      (inv) => inv.quantity > 0
    );
    useHaveStock(filteredInventoryhaveStock.length);
    
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000); 

    return () => clearTimeout(loadingTimeout);

  }, [inventoryCount]);

  const navigateToAdd = () => {
    console.log("Click");

    navigation.navigate("Main", {
      screen: "AddInventory",
    });
  };

  const navigateToReport = () => {
    navigation.navigate("Main", {
      screen: "Report Screen",
    });
  };

  const navigateToShip = () => {
    navigation.navigate("Main", {
      screen: "ShipItem",
    });
  };

  const NavigateToLogs = () => {
    navigation.navigate("Main", {
      screen: "OutOfStock",
    });
  };

  const NavigateToStock = () => {
    navigation.navigate("Main", {
      screen: "ShipLogs",
    });
  };


  const { data, isLoading, isError } = useGetShipping();

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError || data === undefined || data === null) {
    return (
      <View>
        <Text>Error fetching ship items</Text>
      </View>
    );
  }

  const totalSales = data.reduce(
    (total: number, item: ShipItem) => total + item.total,
    0
  );
  const setModalTimeouts = (type: string) => {
    if (type === "info") {
      setInfoModalVisible(true);
    } else {
      setInventoryModalVisible(true);
    }

    setTimeout(() => {
      setInfoModalVisible(false);
      setInventoryModalVisible(false);
    }, 2000);
  };
  return (
    <Container>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {loading && (
                <View
                style={{
                  ...StyleSheet.absoluteFillObject, // Takes the full screen
                  backgroundColor: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 999, // Ensures it's in the foreground
                }}
              >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}

        <StatusBar style="dark" />
        <Header>
       

          <BackgroundImage source={require("../../Images/HomeBackground.png")}>
     
            <BoxShadowView>
              <SalesText>Total Sales: ₱{totalSales.toFixed(2)}</SalesText>
              <AntDesign
                onPress={() => setModalTimeouts("info")}
                name="exclamationcircleo"
                size={24}
                color="#ffffff"
              />
            </BoxShadowView>
            <BoxShadowView>
              <SalesText>
                Total Inventory Count: {inventoryCount.length}
              </SalesText>
              <AntDesign
                onPress={() => setModalTimeouts("")}
                name="exclamationcircleo"
                size={24}
                color="#ffffff"
              />
            </BoxShadowView>
          </BackgroundImage>
        </Header>
      
        <Body>
          <AddContainer>
            <AddButton onPress={navigateToAdd}>
              <Octicons
                style={{ alignSelf: "center" }}
                name="diff-added"
                size={70}
                color="#26577c"
              />
            </AddButton>
            <ButtonText>Add Item</ButtonText>
          </AddContainer>

          <ShipContaier>
            <ShipButton onPress={navigateToShip}>
              <Octicons
                style={{ alignSelf: "center" }}
                name="package-dependents"
                size={70}
                color="#26577c"
              />
            </ShipButton>
            <ButtonShip>Ship Item</ButtonShip>
          </ShipContaier>
          
          <ReportContainer>
            <ReportButton onPress={navigateToReport}>
              <Octicons
                style={{ alignSelf: "center" }}
                name="report"
                size={70}
                color="#26577c"
              />
            </ReportButton>
            <ButtonText>Reports</ButtonText>
          </ReportContainer>

        </Body>

        <Greetings>Summary</Greetings>
        <InfoContainer>
          <TextWrapper1 onPress={NavigateToLogs}>
            <TextBody>Unavailable Item/s</TextBody>
            <TextCount>{noStock}</TextCount>
          </TextWrapper1>

          <TextWrapper1 onPress={navigateToShip}>
            <TextBody>Available Item/s </TextBody>
            <TextCount>{haveStock}</TextCount>
          </TextWrapper1>

          <TextWrapper1 onPress={NavigateToStock}>
            <TextBody>Shipped Item/s</TextBody>
            <TextCount>{data.length}</TextCount>
          </TextWrapper1>
       
        </InfoContainer>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={infoModalVisible}
        onRequestClose={() => {
          setInfoModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            right: 30,
            top: 70,
            position: "absolute",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text>Total Sales</Text>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={totalInventoryModalVisible}
        onRequestClose={() => {
          setInventoryModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            right: 10,
            top: 140,
            position: "absolute",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <Text>Overall Quantity of the Inventory</Text>
          </View>
        </View>
      </Modal>
    </Container>
  );
};

export default HomeScreen;
