import { Box, Center, Column, Input, Row, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";

function TwoOperation() {
  const [valueA, setValueA] = useState();
  const [valueB, setValueB] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    setResult("Result...");
  }, []);

  const handleChangeValueA = (e) => {
    setValueA(parseInt(e));
  };

  const handleChangeValueB = (e) => {
    setValueB(parseInt(e));
  };

  const CheckOperateNumber = (e) => {
    if (!valueA || !valueB) {
      if (valueA == 0 || valueB == 0) return OperateNumber(e);
      return setResult("Isikan kedua angka terlebih dahulu...")
    }
    OperateNumber(e);
  };

  const OperateNumber = (e) => {
    if (e === "+") {
      setResult(valueA + valueB);
    } else if (e === "-") {
      setResult(valueA - valueB);
    } else if (e === "*") {
      setResult(valueA * valueB);
    } else if (e === "/") {
      setResult(valueA / valueB);
    } else if (e === "%") {
      setResult(valueA % valueB);
    }
  };

  return (
    <Center px={4} flex={1} style={{ backgroundColor: "#FFA0A0" }}>
      <Text color={"#000"} fontSize={20}>
        {result}
      </Text>
      <Box marginBottom={2}>
        <Text color={"#000"} fontSize={20}>
          Value A
        </Text>
        <Input
          w={"80%"}
          borderRadius={"10"}
          backgroundColor={"#FFF"}
          color={"#000"}
          marginTop={2}
          keyboardType={"numeric"}
          onChangeText={handleChangeValueA}
        />
      </Box>

      <Box marginBottom={7}>
        <Text color={"#000"} fontSize={20}>
          Value B
        </Text>
        <Input
          w={"80%"}
          borderRadius={"10"}
          backgroundColor={"#FFF"}
          color={"#000"}
          marginTop={2}
          keyboardType={"numeric"}
          onChangeText={handleChangeValueB}
        />
      </Box>

      <Row space={5}>
        <Column>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF5757",
              width: 80,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => CheckOperateNumber("+")}
          >
            <Text fontSize={50}>+</Text>
          </TouchableOpacity>
        </Column>
        <Column>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF5757",
              width: 80,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => CheckOperateNumber("-")}
          >
            <Text fontSize={50}>-</Text>
          </TouchableOpacity>
        </Column>
        <Column>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF5757",
              width: 80,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => CheckOperateNumber("*")}
          >
            <Text fontSize={50}>*</Text>
          </TouchableOpacity>
        </Column>
      </Row>

      <Row space={5} marginTop={4}>
        <Column>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF5757",
              width: 80,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => CheckOperateNumber("/")}
          >
            <Text fontSize={50}>/</Text>
          </TouchableOpacity>
        </Column>
        <Column>
          <TouchableOpacity
            style={{
              backgroundColor: "#FF5757",
              width: 80,
              height: 80,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
            onPress={() => CheckOperateNumber("%")}
          >
            <Text fontSize={50}>%</Text>
          </TouchableOpacity>
        </Column>
      </Row>
    </Center>
  );
}

export default TwoOperation;
