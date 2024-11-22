import AntDesign from "@expo/vector-icons/AntDesign";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

interface IProps {
  modalVisible: boolean;
  setModalVisible: (v: boolean) => void;
  addNew: any;
}
const CreateModal = (props: IProps) => {
  const { modalVisible, setModalVisible, addNew } = props;
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = () => {
    if (!title) {
      Alert.alert("Empty", "Please enter title");
      return;
    }
    addNew({ title, status });
    setModalVisible(false);
    setTitle("");
    setStatus(false);
  };
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.container}>
          <View style={styles.header}>
            {/* header */}
            <Text style={{fontSize:25}}>Add new todo</Text>
            <AntDesign
              onPress={() => {
                setModalVisible(!modalVisible), setTitle("");
              }}
              name="closecircleo"
              size={24}
              color="black"
            />
          </View>

          <View>
            {/* Body */}
            <View style={styles.groupInput}>
              <Text style={styles.text}>Title</Text>
              <TextInput
                value={title}
                onChangeText={(v) => setTitle(v)}
                style={styles.input}
              ></TextInput>
            </View>
          </View>
          <View style={styles.groupInput}>
            <Text style={styles.text}>Status</Text>
            <View style={styles.radioContainer}>
              <TouchableOpacity
                onPress={() => setStatus(true)}
                style={styles.radioButton}
              >
                <Text style={status ? styles.radioSelected : styles.radioUnselected}>
                  Completed
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setStatus(false)}
                style={styles.radioButton}
              >
                <Text style={!status ? styles.radioSelected : styles.radioUnselected}>
                  Not Completed
                </Text>
              </TouchableOpacity>
            </View>
        </View>
          <View>
            <Button title="Add" onPress={() => handleSubmit()} />
          </View>
        </View>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingVertical: 10,
    borderColor: "black",
    alignItems: "center", 
    marginBottom: 20,
  },
  groupInput: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderBlockColor: "black",
    paddingVertical: 5,
    borderRadius: 5,
  },
  text: {
    fontWeight: 400,
    fontSize: 20,
    marginVertical: 10,
  },
  radioContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioButton: {
    padding: 10,
    flex: 1,
    alignItems: "center",
  },
  radioSelected: {
    fontWeight: "bold",
    color: "blue",
  },
  radioUnselected: {
    color: "black",
  },
});
export default CreateModal;