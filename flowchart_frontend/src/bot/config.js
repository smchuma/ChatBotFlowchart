import Todos from "@/components/Todos.jsx";
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(`Send a message to initiate simulation`),
  ],
  botName: "FlowBot",
  state: {
    todos: [],
  },

  widgets: [
    {
      widgetName: "Todos",
      widgetFunc: (props) => <Todos {...props} />,
      props: {},

      mapStateToProps: ["todos"],
    },
  ],
};

export default config;
