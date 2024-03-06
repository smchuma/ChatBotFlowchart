import PropTypes from "prop-types";

import { Handle, Position } from "reactflow";

//custome node
function InputNode({ data, selected }) {
  return (
    <div
      className={`w-20 rounded-md border-2 border-blue-100 bg-blue-500  ${
        selected ? "border-solid border-2 border-indigo-500/100" : ""
      } `}
    >
      <div className="flex flex-col px-2 ">
        <div className="p-1 ">
          <div className="text-[8px] font-normal text-white text-center ">
            {data.label ?? "Text Node"}
          </div>
        </div>
      </div>
      <Handle
        id="a"
        type="target"
        position={Position.Top}
        className="w-1 rounded-full bg-red-500"
      />
      <Handle
        id="b"
        type="source"
        position={Position.Bottom}
        className="w-1 bottom-0 rounded-full bg-blue-400 "
      />
    </div>
  );
}

InputNode.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.bool,
};

export default InputNode;
