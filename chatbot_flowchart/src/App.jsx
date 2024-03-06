import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Flow from "./pages/Flow/Flow";
import Layout from "./components/Layout";
import "reactflow/dist/base.css";
import "./App.css";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/flow/:id" element={<Flow />} />
      </Route>
    </Routes>
  );
};

export default App;
