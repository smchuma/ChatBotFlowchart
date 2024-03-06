import axios from "axios";
import { useState } from "react";
import ChatBot from "react-chatbotify";
import "react-chatbotify/dist/react-chatbotify.css";

const MyChatBot = () => {
  const [answer, setAnswer] = useState(
    "Send a message to start simulating with FlowBot."
  );
  const [buttons, setButtons] = useState([]);

  const options = {
    footerStyle: { display: "none" },
    audio: { disabled: false },
    header: {
      title: "Simulate with FlowBot",
      showAvatar: false,
    },
  };

  const flow = {
    start: {
      message: answer,
      options: buttons,
      function: async (params) => {
        try {
          const response = await axios.post(
            `http://127.0.0.1:9000/api/message`,
            {
              user_message: params.userInput,
            }
          );
          const data = JSON.parse(response.data);
          setAnswer(data.message);
          setButtons(data.buttons);
        } catch (error) {
          console.error("Error fetching data:", error);
          setAnswer("I'm sorry, I'm not able to answer that question.");
          setButtons([]);
        }
      },
      path: "end",
    },
    end: {
      message: answer,
      options: buttons,
      function: async (params) => {
        try {
          const response = await axios.post(
            `http://127.0.0.1:9000/api/message`,
            { user_message: params.userInput }
          );
          const data = JSON.parse(response.data);
          console.log(data);
          setAnswer(data.message);
          setButtons(data.buttons);
        } catch (error) {
          console.error("Error fetching data:", error);
          setAnswer("I'm sorry, I'm not able to answer that question.");
        }
      },
      path: "start",
    },
  };

  return <ChatBot options={options} flow={flow} />;
};

export default MyChatBot;
