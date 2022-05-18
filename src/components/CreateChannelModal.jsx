import { useRef } from "react";
import { PropTypes } from "prop-types";
import { Modal } from "@mantine/core";

export default function CreateChannelModal(props) {
  const { opened, setOpened, setChannelName } = props;
  const inputRef = useRef();

  const handleClick = () => {
    setChannelName(inputRef.current.value);
    setOpened(false);
  };
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title="Create a channel"
    >
      <p>Name</p>
      <input type="text" ref={inputRef} />
      <button type="submit" onClick={handleClick}>
        Create
      </button>
    </Modal>
  );
}

CreateChannelModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  setOpened: PropTypes.func.isRequired,
  setChannelName: PropTypes.func.isRequired,
};
