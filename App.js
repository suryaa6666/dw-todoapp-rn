import 'react-native-gesture-handler';
import { extendTheme, NativeBaseProvider } from "native-base";
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
      </NativeBaseProvider>
  );
}
