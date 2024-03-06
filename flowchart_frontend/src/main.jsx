import React from "react";
import ReactDOM from "react-dom/client";
import { ReactFlowProvider } from "reactflow";
import App from "./App.jsx";
import { TagProvider } from "./context/TagContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { FlowProvider } from "./context/FlowContext/FlowContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import "react-chatbotify/dist/react-chatbotify.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ReactFlowProvider>
          <FlowProvider>
            <TagProvider>
              <App />
            </TagProvider>
          </FlowProvider>
        </ReactFlowProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
