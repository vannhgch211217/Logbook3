import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import {
  Alert,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "@/app/(tabs)/index";
import { useState } from "react";

const styles = StyleSheet.create({
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
  groupInput: {
    marginBottom: 15,
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

const DetailScreen = () => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route: RouteProp<RootStackParamList, "Edit"> = useRoute();
  const [title, setTitle] = useState(route.params?.title || "");
  const [status, setStatus] = useState(route.params?.status || false);

  const handleUpdate = () => {
    if (!title) {
      Alert.alert("Empty", "Please enter a title");
      return;
    }

    const updatedTodo = { id: route.params.id, title, status };

    navigation.navigate("Home", { updatedTodo });
  };

  return (
    <ThemedView style={{ padding: 30, flex:1, backgroundColor: "#E5E5E5" }}>
      <Text style={styles.text}>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />

      <View style={styles.groupInput}>
        <Text style={styles.text}>Status</Text>
        <View style={styles.radioContainer}>
          <TouchableOpacity onPress={() => setStatus(true)} style={styles.radioButton}>
            <Text style={status ? styles.radioSelected : styles.radioUnselected}>
              Completed
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setStatus(false)} style={styles.radioButton}>
            <Text style={!status ? styles.radioSelected : styles.radioUnselected}>
              Not Completed
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Button title="Update" onPress={handleUpdate} />
    </ThemedView>
  );
};

export default DetailScreen;
