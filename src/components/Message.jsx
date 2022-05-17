/* eslint-disable react/forbid-prop-types */
import styled from "styled-components";
import PropTypes from "prop-types";

export default function Message(props) {
  const { message, user, userImage, timestamp } = props;
  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
}

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  > img {
    height: 50px;
    border-radius: 8px;
  }
`;

const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-size: 10px;
    font-weight: 300;
    margin-left: 4px;
  }
`;

Message.propTypes = {
  message: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  userImage: PropTypes.string.isRequired,
  timestamp: PropTypes.object.isRequired,
};
