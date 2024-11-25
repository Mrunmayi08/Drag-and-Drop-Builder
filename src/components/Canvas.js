import RowComponent from "./Row";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Canvas = ({
  borderColor,
  onAddBlock,
  block,
  blockIndex,
  onMoveRowUp,
  onMoveRowDown,
  onAddRow,
  onAddColumn,
  onDragHandlers,
  setSelectedBlockIndex,
}) => {
  return (
    <div
      className={`canvas ${block ? "canvas_container" : ""}`}
      onClick={setSelectedBlockIndex}
      style={{ borderColor }}
    >
      {!block ? (
        <button className="add-block" onClick={() => onAddBlock()}>
          Add Rows
        </button>
      ) : (
        <>
          <span className="arrow top-icon green-tp">
            <i
              className="fas fa-arrow-up"
              onClick={() => onMoveRowUp(blockIndex)}
            ></i>
            <i
              className="fas fa-arrow-down"
              onClick={() => onMoveRowDown(blockIndex)}
            ></i>
          </span>
          <span
            className="icon bottom-icon green-plus"
            onClick={() => onAddBlock()}
          >
            <FontAwesomeIcon icon={faPlus} />
          </span>
          {block.rows.length === 0 && (
            <button onClick={onAddRow}>Add Column</button>
          )}
          {block.rows.map((row, rowIndex) => (
            <RowComponent
              key={row.id}
              row={row}
              rowIndex={rowIndex}
              blockIndex={blockIndex}
              onMoveRowUp={() => onMoveRowUp(blockIndex, rowIndex)}
              onMoveRowDown={() => onMoveRowDown(blockIndex, rowIndex)}
              onAddColumn={onAddColumn}
              onDragHandlers={onDragHandlers}
              onAddRow={(blockIndex) => onAddRow(blockIndex)}
            />
          ))}
        </>
      )}
    </div>
  );
};
export default Canvas;
