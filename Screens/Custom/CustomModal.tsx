import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";

interface CustomModalProps {
  visible: boolean;
  currentAddress: String;
  shipAddress: String;
  ItemName: String;
  total: number;

  onCancel: () => void;
  onConfirm: () => void;
}
const CustomModal: React.FC<CustomModalProps> = ({
  visible,
  currentAddress,
  shipAddress,
  ItemName,
  total,
  onCancel,
  onConfirm,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
            Deliver Item
          </Text>
          <Text>
            {`Deliver `}
            <Text style={{ fontWeight: "bold" }}>{ItemName}</Text>
            {` from `}
            <Text style={{ fontWeight: "bold" }}>{currentAddress}</Text>
            {` to `}
            <Text style={{ fontWeight: "bold" }}>{shipAddress}</Text>
            {` \n\n Total Price: `}
            <Text style={{ fontWeight: "bold" }}>
              ₱{total}
              {`.`}
            </Text>
          </Text>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <TouchableOpacity style={{ marginRight: 20 }} onPress={onCancel}>
              <Text style={{ color: "blue" }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm}>
              <Text style={{ color: "red" }}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomModal;
