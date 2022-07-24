import React, { useState } from "react";

import { Box, Center, Input, Text } from "native-base";

import { TouchableOpacity } from "react-native";

import { api } from "./src/helpers/api";

export default function Register({ navigation }) {
  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const handleChange = (name, text) => {
    setRegisterForm({
      ...registerForm,
      [name]: text,
    });
    console.log(registerForm);
  };

  const handleSubmit = async () => {
    try {
      await api.post(
        "/auth/register",
        registerForm
      );
      navigation.navigate("Login");
      console.log("register berhasil...");
    } catch (error) {
      console.log("error registering...", error);
    }
  };

  return (
    <Center flex={1}>
      <Box display={"flex"} justifyContent={"flex-start"} w={"80%"}>
        <Text color={"#000"} fontSize={40} fontWeight={"bold"}>
          Register
        </Text>
      </Box>
      <Box>
        <Text color={"#000"} fontSize={20}>
          Name
        </Text>
        <Input
          w={"80%"}
          h={50}
          backgroundColor={"#FFF"}
          placeholder={"Name..."}
          fontSize={15}
          color={"#000"}
          name={"name"}
          onChangeText={(txt) => handleChange("firstName", txt)}
        ></Input>
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
          name={"email"}
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
          name={"password"}
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
          <Text fontSize={30}>Register</Text>
        </TouchableOpacity>
      </Box>
      <Box display={"flex"} justifyContent={"flex-start"} w={"80%"}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text color={"#000"}>Sudah punya akun? Login disini...</Text>
        </TouchableOpacity>
      </Box>
    </Center>
  );
}
