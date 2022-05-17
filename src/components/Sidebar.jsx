import styled from "styled-components";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CreateIcon from "@mui/icons-material/Create";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AppsIcon from "@mui/icons-material/Apps";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import SidebarOption from "./SidebarOption";
import { db, auth } from "../firebase";

function Sidebar() {
  const [channels] = useCollection(collection(db, "rooms"));
  const user = useAuthState(auth);

  const sidebarOptions = [
    { title: "Threads", icon: InsertCommentIcon },
    { title: "Mentions & reactions", icon: InboxIcon },
    { title: "Saved items", icon: DraftsIcon },
    { title: "Channel browser", icon: BookmarkBorderIcon },
    { title: "People & user groups", icon: PeopleAltIcon },
    { title: "Apps", icon: AppsIcon },
    { title: "File browser", icon: FileCopyIcon },
    { title: "Show less", icon: ExpandLessIcon },
  ];
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>MY PAPA</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      {sidebarOptions.map((option) => (
        <SidebarOption
          Icon={option.icon}
          title={option.title}
          key={option.title}
        />
      ))}
      <hr />
      <SidebarOption title="Channels" Icon={ExpandMoreIcon} />
      <hr />
      <SidebarOption title="Add Channel" Icon={AddIcon} addChannelOption />

      {channels?.docs.map((doc) => (
        <SidebarOption title={doc.data().name} key={doc.id} id={doc.id} />
      ))}
    </SidebarContainer>
  );
}

export default Sidebar;

const SidebarContainer = styled.div`
  flex: 0.3;
  max-width: 260px;
  margin-top: 60px;
  background-color: var(--slack-color);
  color: white;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #49274b;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #49274b;
  padding: 13px;

  > .MuiSvgIcon-root {
    padding: 8px;
    color: #49274b;
    font-size: 18px;
    background-color: white;
    border-radius: 50%;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 15px;
    font-weight: 900;
    margin-bottom: 5px;
  }

  > h3 {
    display: flex;
    font-size: 13px;
    font-weight: 400;
    align-items: center;

    > .MuiSvgIcon-root {
      font-size: 14px;
      margin-top: 1px;
      margin-right: 2px;
      color: green;
    }
  }
`;
