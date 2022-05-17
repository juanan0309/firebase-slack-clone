import styled from "styled-components";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getDoc, doc, query, orderBy } from "firebase/firestore";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { db } from "../firebase";
import Message from "./Message";

export default function Chat() {
  const roomId = useSelector(selectRoomId);
  const [roomDetails, setRoomDetails] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    if (roomId) {
      getDoc(doc(db, "rooms", roomId)).then((res) => setRoomDetails(res));
    }
  }, [roomId]);

  const [roomMessages, loading] = useCollection(
    roomId &&
      query(collection(db, "rooms", roomId, "messages"), orderBy("timestamp"))
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs?.map((docu) => {
              const { message, timestamp, user, userImage } = docu.data();

              return (
                <Message
                  key={docu.id}
                  user={user}
                  userImage={userImage}
                  message={message}
                  timestamp={timestamp}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            channelId={roomId}
            channelName={roomDetails?.data().name || ""}
            chatRef={chatRef}
          />
        </>
      )}
    </ChatContainer>
  );
}

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  background-color: white;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;

    > .MuiSvgIcon-root {
      margin-left: 10px;
      font-size: 18px;
    }
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;

    > .MuiSvgIcon-root {
      margin-right: 5px !important;
      font-size: 16px;
    }
  }
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 100px;
`;
