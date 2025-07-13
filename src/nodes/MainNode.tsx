import { Handle, Position } from "@xyflow/react";

interface NodeData {
  label: string;
}

interface MainNodeProps {
  data: NodeData;
  positionAbsoluteX: number;
  positionAbsoluteY: number;
}

const MainNode = ({
  data,
}: // positionAbsoluteX,
// positionAbsoluteY,
MainNodeProps) => {
  return (
    <div className="p-4 bg-white shadow rounded border">
      <div>{data.label}</div>

      <Handle
        type="target"
        position={Position.Left}
        id="a"
        style={{ background: "blue" }}
      />

      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ background: "green" }}
      />

      <Handle
        type="source"
        position={Position.Bottom}
        id="c"
        style={{ background: "red" }}
      />
    </div>
  );
};

export default MainNode;
