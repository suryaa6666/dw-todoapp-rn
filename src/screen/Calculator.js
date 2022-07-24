import { Box, Center, Column, Input, Row, Text } from "native-base";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";

function Calculator() {
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState(0);
  const [calculatorNumber, setCalculatorNumber] = useState("0");
  const [lastType, setLastType] = useState();

  const ResetCalculatorState = () => {
    setShowResult(false);
    setResult(0);
    setCalculatorNumber("0");
    setLastType();
  };

  const PressCalculatorButton = (type) => {
    if (type == "+") {
      setShowResult(false);
      if (lastType == "=") {
        setLastType(type);
        setCalculatorNumber("");
        return;
      }
      setLastType(type);
      setResult(result + parseInt(calculatorNumber));
      setCalculatorNumber("");
    } else if (type == "-") {
      setShowResult(false);
      if (lastType == "=") {
        setLastType(type);
        setCalculatorNumber("");
        return;
      }
      setLastType(type);
      setResult(result - parseInt(calculatorNumber));
      setCalculatorNumber("");
    } else if (type == "/") {
      setShowResult(false);
      if (lastType == "=") {
        setLastType(type);
        setCalculatorNumber("");
        return;
      }
      if (!lastType) {
        setLastType(type);
        setCalculatorNumber("");
        setResult(result + parseInt(calculatorNumber));
        return;
      }
      setLastType(type);
      setResult(result / parseInt(calculatorNumber));
      setCalculatorNumber("");
    } else if (type == "*") {
      setShowResult(false);
      if (lastType == "=") {
        setLastType(type);
        setCalculatorNumber("");
        return;
      }
      if (!lastType) {
        setLastType(type);
        setCalculatorNumber("");
        setResult(result + parseInt(calculatorNumber));
        return;
      }
      setLastType(type);
      setResult(result * parseInt(calculatorNumber));
      setCalculatorNumber("");
    } else if (type == "%") {
      setShowResult(false);
      if (lastType == "=") {
        setLastType(type);
        setCalculatorNumber("");
        return;
      }
      if (!lastType) {
        setLastType(type);
        setCalculatorNumber("");
        setResult(result + parseInt(calculatorNumber));
        return;
      }
      setLastType(type);
      setResult(result % parseInt(calculatorNumber));
      setCalculatorNumber("");
    } else if (type == "=") {
      if (lastType == "+") setResult(result + parseInt(calculatorNumber));
      else if (lastType == "-") setResult(result - parseInt(calculatorNumber));
      else if (lastType == "/") setResult(result / parseInt(calculatorNumber));
      else if (lastType == "*") setResult(result * parseInt(calculatorNumber));
      else if (lastType == "%") setResult(result % parseInt(calculatorNumber));
      setShowResult(true);
      setLastType(type);
    } else {
      setShowResult(false);
      if (calculatorNumber[0] == "0") return setCalculatorNumber(type);
      setCalculatorNumber(calculatorNumber + type);
    }
  };

  const CalculatorButton = (props) => {
    return (
      <Column>
        <TouchableOpacity
          style={{
            backgroundColor: props.color,
            width: 70,
            height: 70,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => PressCalculatorButton(props.type)}
        >
          <Text fontSize={50}>{props.type}</Text>
        </TouchableOpacity>
      </Column>
    );
  };

  CalculatorButton.defaultProps = {
    color: "#FF5757",
  };

  return (
    <Center px={4} flex={1} style={{ backgroundColor: "#FFA0A0" }}>
      <Box>
        <Text color={"#FFF"} fontSize={20}>
          Display
        </Text>
        <Input
          w={"100%"}
          h={70}
          borderRadius={"10"}
          backgroundColor={"#ECECEC"}
          color={"#000"}
          marginTop={2}
          keyboardType={"numeric"}
          isReadOnly={true}
          fontSize={40}
          value={showResult ? result.toString() : calculatorNumber.toString()}
        />
      </Box>

      <Box w={"90%"}>
        <TouchableOpacity
          style={{
            backgroundColor: "#FF5757",
            width: "100%",
            height: 50,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            marginVertical: 10,
          }}
          onPress={ResetCalculatorState}
        >
          <Text fontSize={30}>Reset</Text>
        </TouchableOpacity>
      </Box>

      <Row space={5}>
        <CalculatorButton type={"1"} />
        <CalculatorButton type={"2"} />
        <CalculatorButton type={"-"} color={"#930707"} />
        <CalculatorButton type={"+"} color={"#930707"} />
      </Row>

      <Row space={5} marginTop={4}>
        <CalculatorButton type={"3"} />
        <CalculatorButton type={"4"} />
        <CalculatorButton type={"/"} color={"#930707"} />
        <CalculatorButton type={"*"} color={"#930707"} />
      </Row>

      <Row space={5} marginTop={4}>
        <CalculatorButton type={"5"} />
        <CalculatorButton type={"6"} />
        <CalculatorButton type={"%"} color={"#930707"} />
        <CalculatorButton type={"="} color={"#930707"} />
      </Row>

      <Row space={5} marginTop={4}>
        <CalculatorButton type={"7"} />
        <CalculatorButton type={"8"} />
        <CalculatorButton type={"9"} />
        <CalculatorButton type={"0"} />
      </Row>
    </Center>
  );
}

export default Calculator;
