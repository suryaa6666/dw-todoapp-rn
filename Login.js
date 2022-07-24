import React, { useState } from "react";

import { Box, Center, Input, Text } from "native-base";

import { TouchableOpacity } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { api } from "./src/helpers/api";

export default function Login({ navigation }) {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (name, text) => {
    setLoginForm({
      ...loginForm,
      [name]: text,
    });
    console.log(loginForm);
  };

  const handleSubmit = async () => {
    // console.log(await AsyncStorage.getItem("@auth"));
    try {
      const login = await api.post("/auth/login", loginForm);
      if (login.status >= 400) {
        return console.log("login gagal...", login.data.message);
      }
      console.log("login berhasil...", login.data);
      const tokenStringified = JSON.stringify(login.data.token);
      const emailStringified = JSON.stringify(login.data.user.email);
      await AsyncStorage.setItem("@auth", tokenStringified);
      await AsyncStorage.setItem("@email", emailStringified);
      console.log("email stringified", emailStringified);
      navigation.navigate("Home");
    } catch (error) {
      console.log("error login...", error);
    }
  };

  return (
    <Center flex={1}>
      <Box display={"flex"} justifyContent={"flex-start"} w={"80%"}>
        <Text color={"#000"} fontSize={40} fontWeight={"bold"}>
          Login
        </Text>
      </Box>
      <Box>
        <Text color={"#000"} fontSize={20}>
          Email
        </Text>
        <Input
          w={"80%"}
          h={50}
          backgroundColor={"#FFF"}
          placeholder={"Email..."}
          fontSize={15}
          color={"#000"}
          onChangeText={(txt) => handleChange("email", txt)}
        ></Input>
      </Box>
      <Box>
        <Text color={"#000"} fontSize={20}>
          Password
        </Text>
        <Input
          w={"80%"}
          h={50}
          backgroundColor={"#FFF"}
          placeholder={"Password..."}
          type={"password"}
          fontSize={15}
          color={"#000"}
          onChangeText={(txt) => handleChange("password", txt)}
        ></Input>
      </Box>
      <Box display={"flex"} justifyContent={"center"} w={"80%"}>
        <TouchableOpacity
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: 50,
            backgroundColor: "#9389",
            borderRadius: 10,
            marginVertical: 10,
          }}
          onPress={() => handleSubmit()}
        >
          <Text fontSize={30}>Login</Text>
        </TouchableOpacity>
      </Box>
      <Box display={"flex"} justifyContent={"flex-start"} w={"80%"}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text color={"#000"}>Belum punya akun? Register disini...</Text>
        </TouchableOpacity>
      </Box>
    </Center>
  );
}
