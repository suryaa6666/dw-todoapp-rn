import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Center,
  Input,
  Pressable,
  Text,
  useTheme,
  Checkbox,
  View,
} from "native-base";
import React, { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Modal, ModalContent } from "react-native-modals";
import { api } from "../helpers/api";

function Home({ navigation }) {
  const theme = useTheme();

  const [notes, setNotes] = useState("");
  const [notesData, setNotesData] = useState([]);
  const [selectedNotesUpdateId, setSelectedNotesUpdateId] = useState();
  const [selectedNotesDeleteId, setSelectedNotesDeleteId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const getNotesData = async () => {
    try {
      setIsProcessing(true);
      let token = await AsyncStorage.getItem("@auth");
      token = JSON.parse(token);
      let email = await AsyncStorage.getItem("@email");
      email = JSON.parse(email);
      let noteData = await api.get("/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (noteData.status >= 400) {
        return console.log(noteData.data.message);
      }
      noteData = noteData.data.filter((item) => {
        return item.email == email;
      });
      setNotesData(noteData);
      console.log("berhasil menampilkan data...!", noteData);
      setIsProcessing(false);
    } catch (error) {
      console.log("error, cannot fetch data...", error);
    }
  };

  useEffect(() => {
    getNotesData();
  }, []);

  const handleChange = async (text) => {
    setNotes(text);
  };

  const handleSubmitEdit = async () => {
    try {
      setIsProcessing(true);
      let token = await AsyncStorage.getItem("@auth");
      token = JSON.parse(token);
      const editNotes = await api.patch(
        `/todo/${selectedNotesUpdateId}`,
        { notes },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (editNotes.status >= 400) {
        return console.log(editNotes.data.message);
      }
      setNotes("");
      const filterUpdatedNotes = notesData?.map((item) => {
        if (item._id == selectedNotesUpdateId) {
          item.notes = editNotes.data.notes;
        }
        return item;
      });
      console.log("filter updated notes", filterUpdatedNotes);
      setSelectedNotesUpdateId(null);
      console.log("tugas berhasil di edit...!", editNotes.data);
      setNotesData(filterUpdatedNotes);
      setIsProcessing(false);
    } catch (error) {
      console.log("add notes failed...", error);
    }
  };

  const handleSubmitDelete = async () => {
    try {
      setIsProcessing(true);
      let token = await AsyncStorage.getItem("@auth");
      token = JSON.parse(token);
      const deleteNotes = await api.delete(`/todo/${selectedNotesDeleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (deleteNotes.status == 401) {
        return console.log(deleteNotes.data.message);
      }
      const filterDeletedNotes = notesData?.filter((item) => {
        return item._id != selectedNotesDeleteId;
      });
      setShowModal(false);
      setSelectedNotesDeleteId(null);
      console.log("tugas berhasil di dihapus...!", deleteNotes.data);
      setNotesData(filterDeletedNotes);
      setIsProcessing(false);
    } catch (error) {
      console.log("add notes failed...", error);
    }
  };

  const handleSubmit = async () => {
    if (selectedNotesUpdateId) return handleSubmitEdit();

    try {
      setIsProcessing(true);
      let token = await AsyncStorage.getItem("@auth");
      token = JSON.parse(token);
      let email = await AsyncStorage.getItem("@email");
      email = JSON.parse(email);
      console.log(token);
      const postNotes = await api.post(
        "/todo",
        { name: Date.now().toString(), notes, email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (postNotes.status == 401) {
        return console.log(postNotes.data.message);
      }
      setNotesData([...notesData, postNotes.data]);
      console.log("tugas berhasil ditambahkan...!", postNotes.data);
      setIsProcessing(false);
    } catch (error) {
      console.log("add notes failed...", error);
    }
  };

  const handleEditNotes = (id, todo) => {
    console.log("props edit : ", id, todo);
    setSelectedNotesUpdateId(id);
    setNotes(todo);
  };

  const handleDeleteNotes = (id) => {
    console.log("props delete : ", id);
    setSelectedNotesDeleteId(id);
    setShowModal(true);
  };

  const handleChangeTodoCheck = async (isDone, id) => {
    console.log("todo check", isDone, id);
    try {
      setIsProcessing(true);
      let token = await AsyncStorage.getItem("@auth");
      token = JSON.parse(token);
      let email = await AsyncStorage.getItem("@email");
      email = JSON.parse(email);
      let isDoneToNumber = isDone ? 1 : 0;
      const editTodoCheck = await api.patch(
        `/todo/${id}`,
        { isDone: isDoneToNumber },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (editTodoCheck.status >= 400) {
        return console.log(editTodoCheck.data.message);
      }
      let noteData = await api.get("/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (noteData.status >= 400) {
        return console.log(noteData.data.message);
      }
      noteData = noteData.data.filter((item) => {
        return item.email == email;
      });
      const updatedTodo = noteData.map((item) => {
        if (item._id == editTodoCheck.data._id) {
          item.isDone = isDoneToNumber;
        }
        return item;
      });
      setNotesData(updatedTodo);
      console.log("updated todo", updatedTodo);
      console.log("check : ", editTodoCheck.data);
      console.log("berhasil check", isDone);
      setIsProcessing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const TODO = (props) => {
    return (
      <Box w={"100%"} display={"flex"} flexDirection={"row"}>
        <Box
          h={50}
          backgroundColor={"#fff"}
          display={"flex"}
          justifyContent={"center"}
          borderBottomColor={"#000"}
          borderBottomWidth={2}
          paddingHorizontal={10}
          flex={1}
        >
          <Checkbox
            isChecked={props.isDone ? true : false}
            colorScheme="green"
            onChange={(e) => handleChangeTodoCheck(e, props.id)}
          >
            <Text
              color={"#000"}
              fontSize={15}
              style={{
                marginLeft: 5,
              }}
            >
              {props.todo}
            </Text>
          </Checkbox>
        </Box>
        <Pressable
          w={30}
          h={30}
          top={"20%"}
          right={30}
          position={"absolute"}
          onPress={() => handleEditNotes(props.id, props.todo)}
        >
          <Ionicons
            name="create"
            size={28}
            color={theme.colors.primary["500"]}
          />
        </Pressable>
        <Pressable
          w={30}
          h={30}
          top={"20%"}
          right={0}
          position={"absolute"}
          onPress={() => handleDeleteNotes(props.id)}
        >
          <Ionicons name="trash" size={28} color={theme.colors.danger["500"]} />
        </Pressable>
      </Box>
    );
  };

  const Processing = (props) => {
    if (props.process) {
      return (
        <View
          w={"100%"}
          h={"100%"}
          backgroundColor={"#000"}
          opacity={"0.2"}
          position={"absolute"}
        >
          <Center marginTop={20}>
            <Box position={"absolute"}>
              <ActivityIndicator size={100} color="#0000ff" />
            </Box>
          </Center>
        </View>
      );
    }
    return <View></View>;
  };

  return (
    <View w={"100%"} h={"100%"}>
      <ScrollView>
        <Center marginVertical={20}>
          <Box display={"flex"} justifyContent={"center"}>
            <Input
              w={"80%"}
              backgroundColor={"#FFF"}
              placeholder={
                selectedNotesUpdateId
                  ? "nama tugas baru..."
                  : "tambahkan tugas..."
              }
              color={"#000"}
              fontSize={15}
              onChangeText={handleChange}
              value={notes}
            />
            <TouchableOpacity
              style={{
                backgroundColor: selectedNotesUpdateId
                  ? theme.colors.warning["500"]
                  : theme.colors.primary["500"],
                height: 40,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                marginTop: 10,
              }}
              onPress={() => handleSubmit()}
            >
              <Text fontSize={20}>
                {selectedNotesUpdateId ? "Edit" : "Tambahkan"}
              </Text>
            </TouchableOpacity>
          </Box>
          <Box w={"100%"} marginVertical={20}>
            {notesData?.map((item, index) => {
              return (
                <TODO
                  todo={item.notes}
                  id={item._id}
                  isDone={item.isDone}
                  key={index}
                />
              );
            })}
          </Box>
        </Center>
        <Modal visible={showModal}>
          <ModalContent>
            <Text color={"#000"} fontSize={20}>
              Apakah anda ingin menghapus todo ini?
            </Text>
            <Box
              w={"100%"}
              display={"flex"}
              flexDirection={"row"}
              marginTop={10}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.success["500"],
                  paddingVertical: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
                onPress={handleSubmitDelete}
              >
                <Text fontSize={20}>Ya</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.colors.danger["500"],
                  paddingVertical: 10,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
                onPress={() => {
                  setShowModal(false);
                  setSelectedNotesDeleteId();
                }}
              >
                <Text fontSize={20}>Tidak</Text>
              </TouchableOpacity>
            </Box>
          </ModalContent>
        </Modal>
      </ScrollView>
      <Processing process={isProcessing} />
    </View>
  );
}

export default Home;
