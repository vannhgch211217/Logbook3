import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { RootStackParamList } from "@/app/(tabs)/index";
import CreateModal from "./create.modal";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import * as SQLite from "expo-sqlite";

interface ITodo {
  id: number;
  title: string;
  status: boolean;
}

const initializeDatabase = async () => {
  const db = await SQLite.openDatabaseAsync("todo.db");
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, status BOOLEAN);
  `);
  return db;
};

const HomeScreen = (props: any) => {
  const navigation: NavigationProp<RootStackParamList> = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, "Home">>();
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [db, setDb] = useState<any>(null);

  useEffect(() => {
    const initializeDatabaseAndLoadTodos = async () => {
      const database = await initializeDatabase();
      setDb(database);
      loadTodos(database);
    };

    initializeDatabaseAndLoadTodos();

    if (route.params?.updatedTodo) {
      updateTodo(route.params.updatedTodo);
    }
  }, [route.params]);

  const loadTodos = async (database: any) => {
    const allTodos = await database.getAllAsync("SELECT * FROM todos;");
    setTodos(allTodos);
  };

  const addNew = async (item: ITodo) => {
    const result = await db.runAsync(
      "INSERT INTO todos (title,status) VALUES (?,?);",
      [item.title, item.status]
    );
    if (result.changes > 0) {
      loadTodos(db);
    }
  };

  const deleteTodo = async (deleteId: number) => {
    const result = await db.runAsync(
      "DELETE FROM todos WHERE id = ?;",
      deleteId
    );
    if (result.changes > 0) {
      loadTodos(db);
    }
  };

  const updateTodo = async (updatedTodo: ITodo) => {
    const result = await db.runAsync(
      "UPDATE todos SET (title,status) = (?,?) WHERE id = ?;",
      [updatedTodo.title, updatedTodo.status, updatedTodo.id]
    );
    if (result.changes > 0) {
      loadTodos(db);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Button title="Add" onPress={() => setModalVisible(true)} />
      <ThemedView style={styles.container}>
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            return (
              <ThemedView style={styles.reviewItem}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Edit", item)}
                  style={{ flex: 1 }}
                >
                  <ThemedText style={{ color: "black" }}>
                    {item.title}
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity>
                  {item.status ? (
                    <MaterialCommunityIcons
                      name="sticker-check-outline"
                      size={24}
                      color="green"
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="sticker-remove-outline"
                      size={24}
                      color="red"
                    />
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                  <FontAwesome
                    paddingLeft={10}
                    name="trash"
                    size={24}
                    color="black"
                  />
                </TouchableOpacity>
              </ThemedView>
            );
          }}
        />
      </ThemedView>
      <CreateModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        addNew={addNew}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E5E5E5",
    flex: 1,
  },
  reviewItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    margin: 15,
    backgroundColor: "white",
    borderRadius: 100,
  },
});

export default HomeScreen;
