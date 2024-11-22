import "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import DetailScreen from "@/components/todo/edit";
import HomeScreen from "@/components/todo/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AppHeader from "../../components/navigation/app.header";

type RootStackParamList = {
  Home: { updatedTodo?: { id: number; title: string; status: boolean } };
  Edit: { id: number; title: string; status: boolean };
};
export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: '#50C2C9',
          }}}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ header: () => <AppHeader /> }}
        />
        <Stack.Screen name="Edit" component={DetailScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
}
export type { RootStackParamList };