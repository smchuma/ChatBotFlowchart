import PropTypes from "prop-types";

import { Handle, Position } from "reactflow";

//custome node
function TextNode({ data, selected }) {
  return (
    <div
      className={`w-44 pb-4  shadow-md rounded-md bg-white   ${
        selected ? "border-solid border-2 border-indigo-500/100" : ""
      } `}
    >
      <div className="flex flex-col">
        <div className="max-h-max px-2 py-1 text-left text-black text-xs font-bold rounded-t-md bg-blue-500">
          ✉️Message
        </div>

        {data.label == "Yes" || data.label == "No" || data.label == "Other" ? (
          <div className="flex justify-end ">
            <p className="text-[8px] px-1 border-2 border-blue-100 mt-1 mr-1 rounded-full ">
              {data.label}
            </p>
          </div>
        ) : (
          ""
        )}

        <div className="px-3 py-2 ">
          <div className="text-xs font-normal text-black">
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
        className="w-5 bottom-0 rounded-full bg-blue-400 "
      />
    </div>
  );
}

TextNode.propTypes = {
  data: PropTypes.object,
  selected: PropTypes.bool,
};

export default TextNode;
