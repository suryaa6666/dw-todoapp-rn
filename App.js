import "react-native-gesture-handler";
import { extendTheme, NativeBaseProvider } from "native-base";
import { ModalPortal } from "react-native-modals";
import React from "react";
import Container from "./Container";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};

export const theme = extendTheme({ config });

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Container />
      <ModalPortal />
    </NativeBaseProvider>
  );
}
