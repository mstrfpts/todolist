import React, { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

const AddTaskModal = ({
  showModal,
  setShowModal,
  addTask,
  updateTask,
  getTimeStamp,
  newTask,
  taskToBeUpdated,
}) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [validated, setValidated] = useState(false);
  //const [startDate, setStartDate] = useState(new Date());
  console.log("derd, newTask", newTask);
  console.log("derd, newTask", taskToBeUpdated);

  const initialTaskDetails = {
    title: "",
    description: "",
    dueDate: getTimeStamp(),
    complete: false,
    supportingImages: [],
  };
  const [taskDetails, setTaskDetails] = useState(initialTaskDetails);

  useEffect(() => {
    if (!newTask && typeof taskToBeUpdated !== "undefined") {
      setTaskDetails({
        title: taskToBeUpdated.title,
        description: taskToBeUpdated.description,
        dueDate: taskToBeUpdated.dueDate,
        complete: taskToBeUpdated.complete,
        id: taskToBeUpdated.id,
        supportingImages: taskToBeUpdated.supportingImages,
      });
      setImageUrls(taskToBeUpdated.supportingImages);
    } else {
      setTaskDetails(initialTaskDetails);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskToBeUpdated, newTask, showModal]);

  useEffect(() => {
    setTaskDetails({ ...taskDetails, supportingImages: imageUrls });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrls]);

  const handleClose = () => {
    setTaskDetails(initialTaskDetails);
    setShowModal(false);
    setValidated(false);
  };

  const deleteImageHandler = (imageIndex) => {
    //need to fix a bug in clearing last image in preview
    //it tries to submit the form on deleting last image and there fails the validation checks
    //or submits the form
    let newImageUrls = imageUrls.splice(imageIndex, 1);
    setImageUrls(newImageUrls);
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

  const taskCompleteCheckboxHandler = (event) => {
    setTaskDetails({ ...taskDetails, complete: event.target.checked });
    console.log("derd, checkbox", taskDetails);
  };

  const handleChange = (event) => {
    setImageUrls([...imageUrls, URL.createObjectURL(event.target.files[0])]);
  };

  const handleSubmit = (event) => {
    setTaskDetails({ ...taskDetails, supportingImages: imageUrls });

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      newTask ? addTask(taskDetails) : updateTask(taskDetails);
      setTaskDetails(initialTaskDetails);
      handleClose();
    }
    setValidated(true);
  };
  console.log("derd, newTask", taskDetails.complete);

  return (
    <Modal show={showModal} onHide={handleClose}>
      <div className={"ModalHeader"}>
        <Modal.Header>
          <Modal.Title>{newTask ? "New Task" : "View Task"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {`Please ${
            newTask ? `enter` : `View/edit`
          } you task details in the below fields`}
        </Modal.Body>

        <div className={"ModalBody"}>
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
              <Form.Label>Due Date </Form.Label>
              <Form.Control
                type="date"
                placeholder={`Due Date`}
                value={taskDetails.dueDate}
                onChange={(e) => taskDueDateChangeHandler(e)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                checked={taskDetails.complete}
                label={"Complete"}
                onChange={(e) => taskCompleteCheckboxHandler(e)}
              />
            </Form.Group>

            <Form.Group controlId="formBasic3">
              <Form.Label>Supporting Images </Form.Label>
              <div className={"ThumbnailContainer"}>
                {imageUrls.length > 0
                  ? imageUrls.map((image, index) => (
                      <span key={index}>
                        <img
                          key={`img ${index}`}
                          style={{
                            height: "50px",
                            width: "50px",
                            marginRight: "10px",
                          }}
                          src={image}
                          alt={image}
                        />
                        <button
                          key={`button ${index}`}
                          className={"ThumbnailButton"}
                          onClick={() => deleteImageHandler(index)}
                        >
                          X
                        </button>
                      </span>
                    ))
                  : null}
              </div>

              <input type="file" onChange={handleChange} />
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

export default AddTaskModal;
