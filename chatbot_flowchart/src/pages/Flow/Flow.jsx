import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
  useReactFlow,
  Controls,
  Background,
  MarkerType,
} from "reactflow";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextNode from "@/components/TextNode";
import InputNode from "@/components/InputNode";
import { useTagContext } from "@/context/TagContext";
import Modal from "@/components/Modal";
import FlowBar from "@/components/FlowBar";
import useFlow from "@/hooks/useFlow";
import { useParams } from "react-router-dom";
import MyChatBot from "@/components/MyChatBot";

// Initial node setup
const initialNodes = [];

let id = 0;

// Function for generating unique IDs for nodes
const getId = () => `node_${id++}`;

const Flow = () => {
  // Define custom node types
  const nodeTypes = useMemo(
    () => ({
      textnode: TextNode,
      inputnode: InputNode,
    }),
    []
  );

  // States and hooks setup
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedElements, setSelectedElements] = useState([]);
  const [nodeName, setNodeName] = useState("");
  const { screenToFlowPosition } = useReactFlow();
  const connectingNodeId = useRef(null);
  const { updateFlow, state, setStore } = useFlow();
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  const filtered = state?.flows?.filter((s) => s.id == id);

  const {
    tags,
    setTags,
    tagInput,
    setTagInput,
    selectedNodeId,
    setSelectedNodeId,
  } = useTagContext();

  const handleTagChange = (event) => {
    setTagInput(event.target.value);
  };

  // Update nodes data when nodeName or selectedElements changes
  useEffect(() => {
    if (selectedElements.length > 0) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedElements[0]?.id) {
            node.data = {
              ...node.data,
              label: nodeName,
              nodes: nodes,
            };
          }
          return node;
        })
      );
    } else {
      setNodeName(""); // Clear nodeName when no node is selected
    }
  }, [nodeName, selectedElements, setNodes]);

  // Handle node click
  const onNodeClick = useCallback((event, node) => {
    setSelectedElements([node]);
    setSelectedNodeId(node.id);
    setNodeName(node.data.label);
    setNodes((nodes) =>
      nodes.map((n) => ({
        ...n,
        selected: n.id === node.id,
      }))
    );
    setOpen(true);
  }, []);

  // Setup viewport
  const { setViewport } = useReactFlow();

  // Check for empty target handles
  const checkEmptyTargetHandles = () => {
    let emptyTargetHandles = 0;
    edges.forEach((edge) => {
      if (!edge.targetHandle) {
        emptyTargetHandles++;
      }
    });
    return emptyTargetHandles;
  };

  // Check if any node is unconnected
  const isNodeUnconnected = useCallback(() => {
    let unconnectedNodes = nodes.filter(
      (node) =>
        !edges.find(
          (edge) => edge.source === node.id || edge.target === node.id
        )
    );

    return unconnectedNodes.length > 0;
  }, [nodes, edges]);

  const onSave = useCallback(async () => {
    if (reactFlowInstance) {
      const emptyTargetHandles = checkEmptyTargetHandles();

      if (nodes.length > 1 && (emptyTargetHandles > 1 || isNodeUnconnected())) {
        alert(
          "Error: More than one node has an empty target handle or there are unconnected nodes."
        );
      } else {
        const flow = reactFlowInstance.toObject();

        const flowData = {
          id: id,
          data: JSON.stringify(flow),
        };

        try {
          await updateFlow.mutateAsync(flowData);
          alert("Save successful!");
        } catch (error) {
          console.error("Error saving flow:", error);
          alert("Error saving flow. Please try again.");
        }
      }
    }
  }, [reactFlowInstance, nodes, isNodeUnconnected]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      setIsLoading(false);
      const flowData = filtered?.[0]?.data;
      const flow = JSON.parse(flowData);

      if (flow) {
        const { x = 0, y = 0, zoom = 1 } = flow.viewport;
        setNodes(flow.nodes || []);
        setEdges(flow.edges || []);
        setViewport({ x, y, zoom });
      }
    };

    restoreFlow();
  }, [setNodes, setViewport, filtered, setEdges]);

  useEffect(() => {
    onRestore();
  }, []);

  // Handle edge connection
  const onConnect = useCallback((params) => {
    // reset the start node on connections
    connectingNodeId.current = null;
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onConnectStart = useCallback((_, { nodeId }) => {
    connectingNodeId.current = nodeId;
  }, []);

  const onConnectEnd = useCallback(
    (event) => {
      if (!connectingNodeId.current) return;

      const targetIsPane = event.target.classList.contains("react-flow__pane");

      if (targetIsPane) {
        const id = getId();
        const newNode = {
          id,
          type: "textnode",
          position: screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
          }),
          data: {
            label: "textInput",
          },
          origin: [0.5, 0.0],
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) =>
          eds.concat({
            id,
            source: connectingNodeId.current,
            target: id,
            type: "smoothstep",
          })
        );
      }
    },
    [screenToFlowPosition]
  );

  // Enable drop effect on drag over
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handle drop event to add a new node
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setEdges, setNodes]
  );

  const rfStyle = {
    backgroundColor: "#ffffff",
  };

  //modal
  const [open, setOpen] = useState(false);

  const handleInputChange = (event) => {
    setNodeName(event.target.value);
  };

  //creating tags

  const handleTagCreate = () => {
    if (tagInput.trim() !== "" && selectedNodeId) {
      const newNodeId = getId();

      const newNode = {
        id: newNodeId,
        type: "inputnode",
        position: {
          x: selectedElements[0].position.x + Math.random() * -100,
          y: selectedElements[0].position.y + Math.random() * 100,
        },
        data: {
          label: tagInput,
          tags: [...(tags[selectedNodeId] || []), tagInput],
        },
      };

      setTags((prevTags) => ({
        ...prevTags,
        [selectedNodeId]: [...(prevTags[selectedNodeId] || []), tagInput],
      }));

      setTagInput("");
      setNodes((prevNodes) => [...prevNodes, newNode]);
      setEdges((prevEdges) => [
        ...prevEdges,
        {
          id: getId(),
          source: selectedElements[0].id,
          target: newNode.id,
          type: "smoothstep",
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: "#0040ff",
            width: 30,
            height: 30,
          },
          label: tagInput,
          size: 5,
        },
      ]);
    }
  };

  setStore(nodes);
  console.log(nodes);

  return (
    <div className="flex flex-row min-h-screen lg:flex-row">
      <div className="flex-grow h-screen" ref={reactFlowWrapper}>
        {isLoading ? (
          ""
        ) : (
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={rfStyle}
            onNodeClick={onNodeClick}
            onPaneClick={() => {
              setSelectedElements([]); // Reset selected elements when clicking on pane
              setNodes((nodes) =>
                nodes.map((n) => ({
                  ...n,
                  selected: false, // Reset selected state of nodes when clicking on pane
                }))
              );
            }}
            fitView
          >
            <Background variant="dots" gap={12} size={1} />
            <Controls />

            <div className="flex justify-end ">
              <Panel className="">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={onRestore}
                >
                  restore flow
                </button>
                <button
                  className=" m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  "
                  onClick={onSave}
                >
                  save flow
                </button>

                <FlowBar />
              </Panel>
            </div>
          </ReactFlow>
        )}
      </div>

      <Modal open={open} selectedNode={selectedElements[0]}>
        {selectedElements[0] && (
          <div>
            <Tabs defaultValue="account" className="w-[450px]">
              <TabsList>
                <TabsTrigger value="account">Message Node</TabsTrigger>
                <TabsTrigger value="password">Quick Replies</TabsTrigger>
              </TabsList>
              <TabsContent value="account" className="mx-4 w-full ">
                <label className="block mb-4  text-sm font-medium text-black mt-5 ">
                  Node Name:
                </label>
                <input
                  type="text"
                  className=" my-5 block w-full pt-2 px-3 pb-3 text-black border border-gray-500 rounded-lg bg-white focus:outline-none focus:border-blue-500"
                  value={nodeName}
                  onChange={handleInputChange}
                />
              </TabsContent>
              <TabsContent value="password" className="mx-4">
                <p className="py-2 text-black mt-7 ">
                  {" "}
                  Add Quick Replies Nodes
                </p>

                <div className="flex gap-2 items-center flex-row mb-7">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagChange}
                    placeholder="Enter Tag"
                    className="px-3  py-2 border bg-transparent border-gray-300 rounded-md w-full focus:outline-none"
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        handleTagCreate();
                      }
                    }}
                  />
                  <button
                    onClick={handleTagCreate}
                    className=" bg-blue-500 w-32 text-white rounded p-2 hover:bg-blue-600"
                  >
                    Add
                  </button>
                </div>
                <div className="flex mb-5 ">
                  {selectedNodeId &&
                    tags[selectedNodeId] &&
                    tags[selectedNodeId].map((tag, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 text-white rounded-full p-2 px-3 mr-2 mb-2"
                      >
                        {tag}
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-start mx-4">
              <button
                className="mt-4 bg-blue-500 w-32 text-white rounded p-2 hover:bg-blue-600"
                onClick={() => setOpen(false)}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </Modal>
      <MyChatBot />
    </div>
  );
};

export default Flow;
