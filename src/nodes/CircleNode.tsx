import { Handle, Position } from "@xyflow/react";

interface CircleNodeData {
  label?: string;
}

interface CircleNodeProps {
  data: CircleNodeData;
}

const CircleNode = ({ data }: CircleNodeProps) => {
  return (
    <div>
      <div>{data.label || "no node connected"}</div>
      <Handle type="target" position={Position.Top} className="custom-handle" />
    </div>
  );
};

export default CircleNode;
