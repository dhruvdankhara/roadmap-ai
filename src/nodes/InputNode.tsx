import { Handle, Position } from "@xyflow/react";

const InputNode = ({ data }) => {
  return (
    <div className="p-4 bg-white ">
      <div>{data.label}</div>

      <Handle
        type="source"
        position={Position.Right}
        id="1"
        style={{ background: "green" }}
      />
    </div>
  );
};

export default InputNode;
