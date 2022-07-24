import * as React from "react";

import { Box, Center, Input, Text } from "native-base";

import { TouchableOpacity } from "react-native";

export default function Login({ navigation }) {
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
