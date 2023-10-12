'use client'
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/router";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  collection,
  orderBy,
  doc,
  query,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import getOtherEmail from "@/utils/getOtherEmail";
import { useEffect, useState } from "react";
import { useRef } from "react";

const Topbar = ({ email }) => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center">
      <Avatar src="" marginEnd={3} marginLeft={3} />
      <Heading size="lg">{email}</Heading>
    </Flex>
  );
};

const Bottombar = ({id, user}) => {
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });
    setInput("");
  };

  return (
    <FormControl p={3} onSubmit={sendMessage} as="from">
      <Input
        placeholder="Type a message..."
        autocomplete="off"
        onChange={(e) => setInput(e.target.value)} value={input}
      />
      <Button type="submit" hidden>
        Submit
      </Button>
    </FormControl>
  );
};

export default function Chat() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  // const bottomOfChat = useRef();

  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);
  console.log(messages);

  const [chat] = useDocumentData(doc(db, "chats", id));
  console.log(chat);

  const getMessages = () => {
    messages?.map((msg) => {
      const sender = msg.sender === user.email;

      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-start" : "flex-end"}
          bg={sender ? "blue.100" : "green.100"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text}</Text>
        </Flex>
      )
    })

    // useEffect(()=> 
    // setTimeout(
    //   bottomOfChat.current.scrollIntoView({
    //     behavior: "smoooth",
    //     block: "start",
    //   }),100)
    //   , [messages])
  }

  return (
    <Flex h="100vh">
      <Sidebar />

      <Flex flex={1} direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />
        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflow="scroll"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >{getMessages()}</Flex>
        <Bottombar id={id} user={user} />
      </Flex>
    </Flex>
  );
}

{/* <div ref={bottomOfChat}></div>; */}
