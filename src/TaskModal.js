import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

const TaskModal = ({ showModal, setShowModal, addTask }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [validated, setValidated] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const getTimeStamp = () => {
    return `${new Date().getYear() + 1900}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
  };

  useEffect(() => {
    console.log("derd, imageurls", imageUrls);
    console.log("derd, imageurls", taskDetails);
    setTaskDetails({ ...taskDetails, supportingImages: imageUrls });
    console.log("derd, imageurls", imageUrls);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrls]);

  const initialTaskDetails = {
    title: "",
    description: "",
    dueDate: getTimeStamp(),
    complete: false,
    supportingImages: [],
  };
  const [taskDetails, setTaskDetails] = useState(initialTaskDetails);
  const handleClose = () => {
    setTaskDetails(initialTaskDetails);
    setShowModal(false);
    setValidated(false);
  };

  const taskTitleChangeHandler = (event) => {
    setTaskDetails({ ...taskDetails, title: event.target.value });
  };

  const taskDescriptionChangeHandler = (event) => {
    setTaskDetails({ ...taskDetails, description: event.target.value });
  };

  const taskDueDateChangeHandler = (event) => {
    setTaskDetails({ ...taskDetails, dueDate: event.target.value });
  };

  const handleChange = (event) => {
    setImageUrls([...imageUrls, URL.createObjectURL(event.target.files[0])]);
    //setTaskDetails({ ...taskDetails, supportingImages: imageUrls });
  };

  const handleSubmit = (event) => {
    setTaskDetails({ ...taskDetails, supportingImages: imageUrls });

    const form = event.currentTarget;
    console.log("derd submit", taskDetails);
    console.log("derd, handlesubmit", form.checkValidity());
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      console.log("derd valid true", taskDetails);
      addTask(taskDetails);
      setTaskDetails(initialTaskDetails);
      handleClose();
    }
    setValidated(true);
    console.log("submit event", event);
    console.log("submit event", taskDetails);
  };

  console.log("derd shw", taskDetails);
  console.log("derd shw", imageUrls);
  return (
    <Modal show={showModal} onHide={handleClose}>
      <div className={"ModalHeader"}>
        <Modal.Header>
          <Modal.Title>New Task</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Please enter you task details in the below fields
        </Modal.Body>

        <div>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="formBasic1">
              <Form.Label>Task Title *</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter Task Title`}
                value={taskDetails.title}
                onChange={(e) => taskTitleChangeHandler(e)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid task title.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBasic2">
              <Form.Label>Task Description *</Form.Label>
              <Form.Control
                type="text"
                placeholder={`Enter Task Description`}
                value={taskDetails.description}
                onChange={(e) => taskDescriptionChangeHandler(e)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid task description.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formBasic2">
              <Form.Label>Supporting Images </Form.Label>
              <Form.Control
                type="date"
                placeholder={`Due Date`}
                value={taskDetails.dueDate}
                onChange={(e) => taskDueDateChangeHandler(e)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid task description.
              </Form.Control.Feedback>
            </Form.Group>

            {/*<DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />*/}

            {/*<Form onSubmit={handleSubmit}>*/}
            <Form.Group controlId="formBasic2">
              <Form.Label>Supporting Images </Form.Label>
              <input type="file" onChange={handleChange} />
              <Form.Control.Feedback type="invalid">
                Please provide a valid Image type.
              </Form.Control.Feedback>
            </Form.Group>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button type="submit">Save Changes</Button>
            </Modal.Footer>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
