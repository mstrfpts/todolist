import React from "react";
import { Modal, Button } from "react-bootstrap";

const TaskModal = ({ showModal, setShowModal, task }) => {
  const handleClose = () => {
    setShowModal(false);
  };

  return showModal ? (
    <Modal show={showModal} onHide={handleClose}>
      <div className={"ModalHeader"}>
        <Modal.Header>
          <Modal.Title>{task.title}</Modal.Title>
        </Modal.Header>
        <div className={"ModalBody"}>
          <Modal.Body>{task.description}</Modal.Body>

          {task.supportingImages.length > 0
            ? task.supportingImages.map((image, index) => (
                <span key={index}>
                  <img
                    key={`img ${index}`}
                    style={{
                      height: "100px",
                      width: "100px",
                      marginRight: "10px",
                    }}
                    src={image}
                    alt={image}
                  />
                </span>
              ))
            : null}
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </div>
    </Modal>
  ) : null;
};

export default TaskModal;
