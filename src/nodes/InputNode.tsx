import { Handle, Position } from "@xyflow/react";

interface InputNodeData {
  label: string;
}

interface InputNodeProps {
  data: InputNodeData;
}

const InputNode = ({ data }: InputNodeProps) => {
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
