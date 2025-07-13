interface AnnotationData {
  level: number;
  label: string;
  arrowStyle?: React.CSSProperties;
}

function AnnotationNode({ data }: { data: AnnotationData }) {
  return (
    <>
      <div className="annotation-content">
        <div className="annotation-level">{data.level}.</div>
        <div>{data.label}</div>
      </div>
      {data.arrowStyle && (
        <div className="annotation-arrow" style={data.arrowStyle}>
          ⤹
        </div>
      )}
    </>
  );
}

export default AnnotationNode;
