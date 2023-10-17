import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface ClassPickerProps {
  onClassificationChange: (classification: string | null) => void;
}

export const ClassPicker: React.FC<ClassPickerProps> = ({
  onClassificationChange,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [classification, setClassification] = useState<string | null>(null);
  const [pickerText, setPickerText] = useState("Show Choices");

  const classificationOptions = [
    "School Supplies",
    "Hardware",
    "Accessories",
    "Balls",
  ];
  const handlePickerChange = (itemValue: string | null) => {
    setClassification(itemValue);
    if (itemValue) {
      setPickerText(itemValue);
      onClassificationChange(itemValue);
    } else {
      setPickerText("Show Picker");
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ color: "#fff", fontSize: 20, alignSelf: "flex-start" }}>
          {pickerText}
        </Text>
      </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
      
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Picker
                  selectedValue={classification}
                  onValueChange={(itemValue: any) =>
                    handlePickerChange(itemValue)
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Select Classification" value={null} />
                  {classificationOptions.map((option, index) => (
                    <Picker.Item key={index} label={option} value={option} />
                  ))}
                </Picker>

                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
    
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  picker: {
    width: "90%",
    alignSelf: "center",
  },
  closeButton: {
    padding: 15,
    alignItems: "center",
    backgroundColor: "#171bff",
  },
  closeButtonText: {
    fontSize:12,
    fontWeight:"bold",
    color: "#fff",
  },
});
