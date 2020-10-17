import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

const TaskModal = ({ showModal, setShowModal, setFile }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const handleClose = () => {
    //    setTaskDetails(initialTaskDetails);
    setShowModal(false);
    //  setValidated(false);
  };

  const handleSubmit = (event) => {
    console.log("submit is", event.target);
    setFile(imageUrl);
  };

  const handleChange = (event) => {
    console.log("submit is", event.target.files[0]);
    console.log("submit agian", URL.createObjectURL(event.target.files[0]));
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  console.log("derd shw", showModal);
  return (
    <Modal show={showModal} onHide={handleClose}>
      <div className={"ModalHeader"}>
        <Modal.Header>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>
      </div>
      <Modal.Body>Please enter you task details in the below fields</Modal.Body>

      <Form onSubmit={handleSubmit}>
        <input type="file" onChange={handleChange} />

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit">Save Changes</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default TaskModal;
