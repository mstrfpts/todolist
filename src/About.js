import React from "react";

const About = () => {
  return (
    <div style={{ marginTop: "20px" }}>
      <p>
        {" "}
        <p>
          1.The App has a message on the landing page stating there are no task
          and requesting you to add tasks.
        </p>
        <p>
          {" "}
          2. There is an arrow below the message which can be used to add tasks.
        </p>
        <p>
          {" "}
          3. On clicking the Add tasks button, you would see a modal to add your
          task details and images if needed.
        </p>
        <p> 4. The modal has a validation over the details added.</p>
        5. The tasks added are persisted in local storage and can survive a
        refresh.
      </p>
      <p>
        {" "}
        6. Upon adding a task, you will be show the tasks on the main page.
      </p>
      <p>
        {" "}
        7. The tasks have due date information and the color of the task box
        indicates the status.
      </p>
      <p>Tech details:</p>
      <p>
        {" "}
        1. The app has been completed using React Template(npm create-react-app)
      </p>
      <p> 2. It uses React functional components and Hooks.</p>
      <p>
        {" "}
        3. The styling has been squeezed into a single file, which would be
        split accross files further down.
      </p>
      <p>
        {" "}
        4. The site may not be very responsive again something, I would take on
        later.
      </p>
    </div>
  );
};

export default About;
