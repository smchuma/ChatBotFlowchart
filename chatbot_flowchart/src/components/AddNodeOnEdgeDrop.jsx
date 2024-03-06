// import { useCallback, useRef } from "react";
// import ReactFlow, {
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   useReactFlow,
// } from "reactflow";
// import "reactflow/dist/style.css";

// const initialNodes = [
//   {
//     id: "0",
//     type: "input",
//     data: { label: "Welcome" },
//     position: { x: 0, y: 50 },
//   },
// ];

// let id = 1;
// const getId = () => `${id++}`;

// const AddNodeOnEdgeDrop = () => {
//   const reactFlowWrapper = useRef(null);
//   const connectingNodeId = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState([]);
//   const { screenToFlowPosition } = useReactFlow();
//   const onConnect = useCallback((params) => {
//     // reset the start node on connections
//     connectingNodeId.current = null;
//     setEdges((eds) => addEdge(params, eds));
//   }, []);

//   const onConnectStart = useCallback((_, { nodeId }) => {
//     connectingNodeId.current = nodeId;
//   }, []);

//   const onConnectEnd = useCallback(
//     (event) => {
//       if (!connectingNodeId.current) return;

//       const targetIsPane = event.target.classList.contains("react-flow__pane");

//       if (targetIsPane) {
//         const userInput = window.prompt("Enter node label:");

//         if (userInput !== null && userInput !== "") {
//           const id = getId();
//           const newNode = {
//             id,
//             position: screenToFlowPosition({
//               x: event.clientX,
//               y: event.clientY,
//             }),
//             data: { label: userInput },
//             origin: [0.5, 0.0],
//           };

//           setNodes((nds) => nds.concat(newNode));
//           setEdges((eds) =>
//             eds.concat({ id, source: connectingNodeId.current, target: id })
//           );
//         }
//       }
//     },
//     [screenToFlowPosition]
//   );

//   return (
//     <div ref={reactFlowWrapper} style={{ width: "100vw", height: "100vh" }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         onEdgesChange={onEdgesChange}
//         onConnect={onConnect}
//         onConnectStart={onConnectStart}
//         onConnectEnd={onConnectEnd}
//         fitView
//         fitViewOptions={{ padding: 2 }}
//         nodeOrigin={[0.5, 0]}
//       />
//     </div>
//   );
// };

// export default AddNodeOnEdgeDrop;
