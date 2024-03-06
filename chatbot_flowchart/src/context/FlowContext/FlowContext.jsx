import { createContext, useEffect, useReducer, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

const baseUrl = "http://127.0.0.1:8000/api/flow";

export const FlowContext = createContext();

export const FlowReducer = (state, action) => {
  switch (action.type) {
    case "GET_FLOWS":
      return {
        ...state,
        flows: action.payload,
      };
    case "CREATE_FLOW":
      return {
        ...state,
        flows: [action.payload, ...state.flows],
      };
    case "DELETE_FLOW":
      return {
        flows: state.flows.filter((flow) => flow.id !== action.payload),
      };

    case "UPDATE_FLOW":
      return {
        ...state,
        flows: state.flows.map((flow) =>
          flow.id === action.payload.id ? action.payload : flow
        ),
      };

    default:
      return state;
  }
};

export const FlowProvider = ({ children }) => {
  const [store, setStore] = useState([]);
  const [state, dispatch] = useReducer(FlowReducer, {
    flows: null,
  });
  const [loading, setLoading] = useState(false);

  const {
    isLoading,
    data: flows,
    refetch,
    error,
  } = useQuery(
    "flowData",
    async () => {
      const flowResponse = await axios.get(baseUrl);
      return flowResponse?.data;
    },

    {
      staleTime: Infinity,
    }
  );

  if (error) {
    console.log(error);
  }

  const createFlow = useMutation(
    async (flowData) => {
      const response = await axios.post(`${baseUrl}`, flowData);

      return response?.data;
    },

    {
      onSuccess: () => {
        refetch();
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setLoading(error);
      },
      onMutate: () => {
        setLoading(true);
      },
    }
  );

  const deleteFlow = useMutation(
    async (flowId) => {
      const response = await fetch(`${baseUrl}/${flowId}`, {
        method: "DELETE",
      });
      return response.json();
    },
    {
      onSuccess: async () => {
        await refetch();
        setLoading(false);
      },
      onError: (err) => {
        console.log(err);
        setLoading(false);
      },
      staleTime: 60000,
      onMutate: () => {
        setLoading(true);
      },
    }
  );

  const updateFlow = useMutation(
    async ({ id, data }) => {
      const response = await axios.patch(`${baseUrl}/${id}`, {
        data: data,
      });
      console.log(response);
      return response?.data;
    },

    {
      onSuccess: async () => {
        await refetch();
        setLoading(false);
      },
      onError: (error) => {
        console.log(error);
        setLoading(false);
      },
      onMutate: () => {
        setLoading(true);
      },
    }
  );

  useEffect(() => {
    if (flows) {
      dispatch({ type: "GET_FLOWS", payload: flows });
    }
  }, [dispatch, flows]);

  return (
    <FlowContext.Provider
      value={{
        state,
        dispatch,
        isLoading,
        createFlow,
        deleteFlow,
        updateFlow,
        store,
        setStore,
      }}
    >
      {loading && "loading.."}
      {children}
    </FlowContext.Provider>
  );
};

FlowProvider.propTypes = {
  children: PropTypes.node.isRequired,
  fetchUser: PropTypes.bool,
};

export default FlowContext;
