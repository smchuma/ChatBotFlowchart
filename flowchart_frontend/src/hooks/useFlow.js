import FlowContext from "@/context/FlowContext/FlowContext";
import { useContext } from "react";

const useFlow = () => {
  const {
    state,
    isLoading,
    createFlow,
    deleteFlow,
    updateFlow,
    store,
    setStore,
  } = useContext(FlowContext);

  return {
    state,
    isLoading,
    createFlow,
    deleteFlow,
    updateFlow,
    store,
    setStore,
  };
};

export default useFlow;
