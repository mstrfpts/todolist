import React from "react";
import { Modal, Button } from "react-bootstrap";

const TaskModal = ({ showTaskModal, setShowTaskModal, task }) => {
  const handleClose = () => {
    console.log("derd handle close");
    setShowTaskModal(false);
  };

  console.log("derd close", showTaskModal);

  return (
    <Modal show={showTaskModal} onHide={handleClose}>
      <div className={"ModalHeader"}>
        <Modal.Header>
          <Modal.Title>{task.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{task.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default TaskModal;
