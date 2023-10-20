import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  useGetShipping,
  useDeleteShippingLogs,
} from "../../services/shippingAPI"; // Make sure to import your hook
import styled from "styled-components/native";
import moment from "moment";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { AntDesign } from "@expo/vector-icons";

interface ShippingItem {
  _id: string;
  name: string;
  quantityToShip: number;
  total: number;
  destination: string;
  createdAt: string;
}

const ShipLogs = () => {
  const [selected, setSelected] = React.useState("");
  const [showCalendar, setShowCalendar] = React.useState(false);
  const [defaultDate, setDefaultDate] = React.useState(""); // Search data

  const [search, setSearch] = React.useState(""); // Search data
  const { data: shipItems, isLoading, isError } = useGetShipping();
  const [itemLogsFilter, setItemLogsFilter] = React.useState<ShippingItem[]>(
    []
  );
  const calendarRef = React.useRef(null);

  const {
    data,
    isError: Errorship,
    mutateAsync,
  } = useDeleteShippingLogs(defaultDate);

  // Check if shipItems is undefined or null
  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError || shipItems === undefined || shipItems === null) {
    return (
      <View>
        <Text>Error fetching ship items</Text>
      </View>
    );
  }

  // Calculate total sales by summing up the 'total' property of all items

  const hideCalendar = () => {
    setShowCalendar(false);
  };

  const onClear = () => {
    if (itemLogsFilter && itemLogsFilter.length > 0) {
      if (search === "") {
        Alert.alert(
          "Clear Shipping Logs",
          "Are you sure to clear all shipping logs?",
          [
            {
              text: "No",
            },

            {
              text: "Yes",

              onPress: () => {
                mutateAsync();
              },
            },
          ],
          {
            cancelable: true,
          }
        );
      } else {
        Alert.alert(
          "Clear Shipping Logs",
          ` Are you sure to clear ${itemLogsFilter.length} shipping logs?`,
          [
            {
              text: "No",
            },

            {
              text: "Yes",

              onPress: () => {
                mutateAsync();
              },
            },
          ],
          {
            cancelable: true,
          }
        );
      }
    } else {
      Alert.alert("Date Empty", "No items found in the selected date range.");
    }
  };

  const formatDate = (timestamp: string) => {
    try {
      const formattedDate = moment(timestamp).format("MMMM DD, YYYY");
      return formattedDate;
    } catch (error) {
      console.error("Error formatting timestamp:", error);
      return "Invalid Timestamp";
    }
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View>
        <Text>Error fetching ship items</Text>
      </View>
    );
  }
  // calendar filter
  const calendarFilter = (text: string | null) => {
    try {
      if (text !== null || (text !== undefined && text !== "")) {
        if (text!.length > 1) {
          console.log("text", text === "");
          const filtered = shipItems.filter((item: ShippingItem) => {
            const itemDate = moment(item.createdAt).format("MMMM DD, YYYY");

            if (itemDate === selected) {
              return item;
            }
          });

          setSearch(text!);
          setItemLogsFilter(filtered);

          const defaultFormat = moment(text, "MMMM DD, YYYY").format(
            "YYYY-M-DD"
          );
          console.log("asdsadsa", defaultFormat);
          setDefaultDate(defaultFormat.toString());
        } else {
          setSearch("");
          setItemLogsFilter(shipItems);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (search === null) {
      setItemLogsFilter(shipItems);
    }
  }, [search]);

  React.useEffect(() => {
    if (shipItems && !shipItems.isLoading) {
      setItemLogsFilter(shipItems);
    }
  }, [shipItems.isLoading, shipItems]);

  React.useEffect(() => {
    calendarFilter(selected);
  }, [selected]);
  return (
    <>
      <TouchableWithoutFeedback onPress={hideCalendar}>
        <MainContaier>
          <ClearButton onPress={onClear}>
            <ButtonText>Clear Shipping Logs</ButtonText>
          </ClearButton>
          <SearchFilter>
            <DateInput
            
              clearTextOnFocus
              placeholder="Filter ship logs using date."
              onChangeText={(text) => {
              
                calendarFilter(text)}
              
              }

                
              value={search}
              onFocus={() => setItemLogsFilter(shipItems)}
            ></DateInput>

            <CalendarButton>
              <AntDesign
                onPress={() => setShowCalendar(!showCalendar)}
                name="calendar"
                size={40}
                color="black"
              />
            </CalendarButton>
          </SearchFilter>
          {showCalendar && (
            <FloatingCalendar>
              <Calendar
                style={{
                  height: 300,
                  width: 300,
                }}
                enableSwipeMonths
                onDayPress={(day) => {
                  setSelected(formatDate(day.dateString));
                  calendarFilter(selected);
                }}
                markedDates={{
                  [selected]: {
                    selected: true,
                    disableTouchEvent: true,
                    selectedColor: "orange",
                  },
                }}
              />
            </FloatingCalendar>
          )}

          <FlatList
            data={itemLogsFilter}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Container>
                <Name>Item Name: {item.name}</Name>
                <InfoText>Quantity To Ship: {item.quantityToShip}</InfoText>
                <InfoText>Total Sales: ₱{item.total}</InfoText>
                <InfoText>Destination: {item.destination}</InfoText>
                <InfoText>Shipped Date: {formatDate(item.createdAt)}</InfoText>
              </Container>
            )}
          />
        </MainContaier>
      </TouchableWithoutFeedback>
    </>
  );
};

const Container = styled.View`
  background-color: #12486b;
  padding: 20px;
  margin-top: 8px;
  border-radius: 8px;
  width: 90%;

  align-self: center;
`;
const SearchFilter = styled.View`
  margin-top: 2%;
  justify-content: space-between;
  padding: 10px;

  flex-direction: row;
  border-width: 2px;
  width: 90%;
  align-self: center;
`;

const DateInput = styled.TextInput``;

const TextFilter = styled.Text`
  font-size: 20px;
  align-self: center;
`;
const FloatingCalendar = styled.View`
  position: absolute;
  top: 110px;
  left: 20px;
  z-index: 1;

  border-radius: 8px;
  padding: 10px;
`;
const MainContaier = styled.View`
  flex: 1;
`;
const Name = styled.Text`
  font-weight: bold;
  font-size: 20px;
  color: #fff;
`;

const InfoText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;
const CalendarButton = styled.TouchableOpacity``;
const ClearButton = styled.TouchableOpacity`
  height: 50px;
  border-radius: 10px;
  padding-top: 10px;
  margin-top: 10px;
  width: 90%;
  align-self: center;
  background-color: #ad0000;
`;
const ButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: #ffffff;
`;
export default ShipLogs;
