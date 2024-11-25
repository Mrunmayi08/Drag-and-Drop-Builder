const ColumnComp = ({
  column,
  blockIndex,
  rowIndex,
  colIndex,
  onAddColumn,
}) => {
  return (
    <div className="column" onClick={() => onAddColumn(rowIndex, colIndex)}>
      {column ? (
        column.type === "image" ? (
          <img
            src={column.src}
            alt=""
            style={{ maxWidth: "100%", height: "auto" }}
          />
        ) : (
          <h3>{column.content}</h3>
        )
      ) : (
        <div>Add Element</div>
      )}
    </div>
  );
};
export default ColumnComp;
