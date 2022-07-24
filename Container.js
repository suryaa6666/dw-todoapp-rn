import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "native-base";

import TwoOperation from "./src/screen/TwoOperation";

import Calculator from "./src/screen/Calculator";

import Register from "./Register";

import Login from "./Login";

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

export function MyTab() {
  const theme = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="TwoOperation"
        screenOptions={({ route }) => ({
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: theme.colors.primary["300"] },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "TwoOperation") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Calculator") {
              iconName = focused ? "calculator" : "calculator-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary["800"],
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="TwoOperation" component={TwoOperation} />
        <Tab.Screen name="Calculator" component={Calculator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function LoginStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
