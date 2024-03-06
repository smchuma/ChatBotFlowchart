export default function FlowBar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className=" border-blue-200 p-4 text-sm  w-64  text-white">
      <>
        {/* <h3 className="text-xl mb-4 text-white">Chat Nodes</h3> */}
        <div
          className="bg-blue-500 p-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-white hover:bg-blue-500 hover:text-white transition-colors duration-200"
          onDragStart={(event) => onDragStart(event, "textnode")}
          draggable
        >
          DRAG TO ADD
        </div>
      </>
    </aside>
  );
}
