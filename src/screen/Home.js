import {
  Box,
  Center,
  Column,
  Input,
  Row,
  Text,
  useTheme,
  Pressable,
} from "native-base";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { api } from "../helpers/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modal, ModalContent } from "react-native-modals";
import { Ionicons } from "@expo/vector-icons";

function Home({ navigation }) {
  const theme = useTheme();

  const [notes, setNotes] = useState("");
  const [notesData, setNotesData] = useState([]);
  const [selectedNotesUpdateId, setSelectedNotesUpdateId] = useState();
  const [selectedNotesDeleteId, setSelectedNotesDeleteId] = useState();
  const [showModal, setShowModal] = useState(false);

  const getNotesData = async () => {
    try {
      let token = await AsyncStorage.getItem("@auth");
      token = JSON.parse(token);
      let email =await AsyncStorage.getItem("@email");
      email = JSON.parse(email);
      let noteData = await api.get("/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (noteData.status == 401) {
        return console.log(noteData.data.message);
      }
      noteData = noteData.data.filter((item) => {
        return item.email == email
      })
      setNotesData(noteData);
      console.log("berhasil menampilkan data...!", noteData);
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
      if (editNotes.status == 401) {
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
    } catch (error) {
      console.log("add notes failed...", error);
    }
  };

  const handleSubmitDelete = async () => {
    try {
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
    } catch (error) {
      console.log("add notes failed...", error);
    }
  };

  const handleSubmit = async () => {
    if (selectedNotesUpdateId) return handleSubmitEdit();

    try {
      let token = await AsyncStorage.getItem("@auth");
      token = JSON.parse(token);
      let email =await AsyncStorage.getItem("@email");
      email = JSON.parse(email);
      console.log(token);
      const postNotes = await api.post(
        "/todo",
        { name: Date.now().toString(), notes, email},
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

  const TODO = (props) => {
    return (
      <Box w={"100%"} display={"flex"} flexDirection={"row"}>
        <Input
          h={50}
          backgroundColor={"#fff"}
          display={"flex"}
          justifyContent={"center"}
          borderBottomColor={"#000"}
          borderBottomWidth={2}
          paddingHorizontal={10}
          value={props.todo}
          color={"#000"}
          fontSize={15}
          flex={1}
          isReadOnly={true}
        />
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

  return (
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
            return <TODO todo={item.notes} id={item._id} key={index} />;
          })}
        </Box>
      </Center>
      <Modal visible={showModal}>
        <ModalContent>
          <Text color={"#000"} fontSize={20}>
            Apakah anda ingin menghapus todo ini?
          </Text>
          <Box w={"100%"} display={"flex"} flexDirection={"row"} marginTop={10}>
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
  );
}

export default Home;
