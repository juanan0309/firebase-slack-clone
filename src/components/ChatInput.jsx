/* eslint-disable react/forbid-prop-types */
import { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Button } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../firebase";

export default function ChatInput(props) {
  const { channelName, channelId, chatRef } = props;
  const [user] = useAuthState(auth);

  const inputRef = useRef(null);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    await addDoc(collection(db, "rooms", channelId, "messages"), {
      message: inputRef.current.value,
      timestamp: serverTimestamp(),
      user: user?.displayName,
      userImage: user.photoURL,
    });

    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    return true;
  };

  const handleEnterSubmit = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
      inputRef.current.value = "";
    }
  };

  return (
    <ChatInputContainer onSubmit={sendMessage}>
      <form>
        <input
          placeholder={`Message #${channelName}`}
          ref={inputRef}
          onKeyPress={(e) => handleEnterSubmit(e)}
        />
        <Button hidden type="submit">
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
}

ChatInput.propTypes = {
  channelName: PropTypes.string,
  channelId: PropTypes.string,
  chatRef: PropTypes.object,
};

ChatInput.defaultProps = {
  channelName: "",
  channelId: "",
  chatRef: null,
};

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;

    > input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 20px;
      outline: none;
    }

    > button {
      display: none !important;
    }
  }
`;
