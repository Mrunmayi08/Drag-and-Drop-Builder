import ColumnComp from "./Column";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const RowComponent = ({
  row,
  rowIndex,
  blockIndex,
  onMoveRowUp,
  onMoveRowDown,
  onAddColumn,
  onDragHandlers,
  onAddRow,
}) => {
  return (
    <div
      className="row row_container"
      draggable
      onDragStart={() => onDragHandlers.handleDragStart(rowIndex)}
      onDragOver={(e) => onDragHandlers.handleDragOver(rowIndex, e)}
      onDragEnd={onDragHandlers.handleDragEnd}
    >
      <div className="row-controls">
        <span className="arrow top-icon blue-tp">
          <i className="fas fa-arrow-up" onClick={onMoveRowUp}></i>
          <i className="fas fa-arrow-down" onClick={onMoveRowDown}></i>
        </span>
        <span className="icon bottom-icon blue-plus">
          <FontAwesomeIcon icon={faPlus} onClick={() => onAddRow(blockIndex)} />
        </span>
      </div>
      {row.columns.map((col, colIndex) => (
        <ColumnComp
          key={colIndex}
          column={col}
          blockIndex={blockIndex}
          rowIndex={rowIndex}
          colIndex={colIndex}
          onAddColumn={onAddColumn}
        />
      ))}
    </div>
  );
};
export default RowComponent;
