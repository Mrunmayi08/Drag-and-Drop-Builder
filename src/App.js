import React, { useState, useCallback, lazy, Suspense } from "react";
import "./App.scss";
import "./reset.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RowDrawer from "./components/RowDrawer";
import Canvas from "./components/Canvas";
import PreviewModal from "./components/Preview";
import NavBar from "./components/navbar";
import SideNav from "./components/sideNav/SideNav";

function App() {
  const [isRowDrawerOpen, setIsRowDrawerOpen] = useState(false);
  const [isColumnDrawerOpen, setIsColumnDrawerOpen] = useState(false);
  const [isImageDrawer, setIsImageDrawer] = useState(false);
  const [selectedRowInd, setSelectedRowInd] = useState(0);
  const [selectedColumn, setSelectedColumn] = useState(0);
  const [draggedElement, setDraggedElement] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedBlockIndex, setSelectedBlockIndex] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false); // Controls preview modal
  const [savedLayout, setSavedLayout] = useState(null);

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleSave = () => {
    setSavedLayout(blocks);
    localStorage.setItem(`block_${blocks[0].id}`, JSON.stringify(blocks));
    setIsPreviewOpen(false);
    alert("Layout saved successfully!");
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  const addBlock = () => {
    setBlocks([...blocks, { id: Date.now(), rows: [] }]);
  };

  const addRow = useCallback((blockIndex) => {
    setSelectedBlock(blockIndex);
    setIsRowDrawerOpen(true);
  }, []);

  const addRowToBlock = useCallback(
    (columnCount = 1) => {
      if (columnCount <= 0) return;
      const updatedBlocks = [...blocks];
      updatedBlocks[selectedBlock].rows.push({
        columns: Array(columnCount).fill(null),
      });
      setBlocks(updatedBlocks);
      setIsRowDrawerOpen(false);
    },
    [blocks, isRowDrawerOpen]
  );

  const addElementToColumn = (blockIndex, rowIndex, columnIndex) => {
    setSelectedBlockIndex(blockIndex);
    setSelectedRowInd(rowIndex);
    setSelectedColumn(columnIndex);
    setIsColumnDrawerOpen(true);
  };

  const updateRowElement = (blockIndex, rowIndex, columnIndex, element) => {
    const updatedBlocks = [...blocks];
    updatedBlocks[selectedBlockIndex].rows[rowIndex].columns[columnIndex] =
      element;
    setBlocks(updatedBlocks);
  };

  const imageCallback = (url, text, type) => {
    if (type === "Image") {
      updateRowElement(selectedBlockIndex, selectedRowInd, selectedColumn, {
        type: "image",
        src: url,
      });
    } else {
      updateRowElement(selectedBlockIndex, selectedRowInd, selectedColumn, {
        type: "text",
        content: text,
      });
    }

    setIsImageDrawer(!isImageDrawer);
  };

  const columnCallback = (elementType) => {
    setIsColumnDrawerOpen(false);
    if (elementType === "Image") {
      setIsImageDrawer(true);
    } else {
      imageCallback("", "Default Text", "text");
    }
  };

  const handleClose = () => {
    // if (isRowDrawerOpen) {
    //   setIsRowDrawerOpen(!isRowDrawerOpen);
    // } else {
    //   setIsColumnDrawerOpen(!isColumnDrawerOpen);
    // }
    setIsRowDrawerOpen(false);
    setIsColumnDrawerOpen(false);
    setIsImageDrawer(false);
    setSelectedBlock("");
  };

  const handleDragStart = (blockIndex, rowIndex) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block, bIndex) => {
        if (bIndex === blockIndex) {
          const updatedRows = block.rows.map((row, rIndex) => ({
            ...row,
            isDragging: rIndex === rowIndex,
          }));
          return { ...block, rows: updatedRows };
        }
        return block;
      })
    );
  };

  const handleDragOver = (blockIndex, rowIndex) => {
    const block = blocks[blockIndex];
    const draggingRowIndex = block.rows.findIndex((row) => row.isDragging);

    if (draggingRowIndex === rowIndex) return;

    const updatedRows = [...block.rows];
    const [draggingRow] = updatedRows.splice(draggingRowIndex, 1);
    updatedRows.splice(rowIndex, 0, draggingRow);

    setBlocks((prevBlocks) =>
      prevBlocks.map((block, bIndex) =>
        bIndex === blockIndex ? { ...block, rows: updatedRows } : block
      )
    );
  };

  const handleDragEnd = (blockIndex) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block, bIndex) =>
        bIndex === blockIndex
          ? {
              ...block,
              rows: block.rows.map((row) => ({ ...row, isDragging: false })),
            }
          : block
      )
    );
  };

  const moveRowUp = (blockIndex, rowIndex) => {
    const block = blocks[blockIndex];
    if (rowIndex === 0) return;
    const newRows = [...block.rows];
    [newRows[rowIndex], newRows[rowIndex - 1]] = [
      newRows[rowIndex - 1],
      newRows[rowIndex],
    ];

    setBlocks((prevBlocks) =>
      prevBlocks.map((block, bIndex) =>
        bIndex === blockIndex ? { ...block, rows: newRows } : block
      )
    );
  };

  const moveRowDown = (blockIndex, rowIndex) => {
    const block = blocks[blockIndex];
    if (rowIndex === block.rows.length - 1) return;
    const newRows = [...block.rows];
    [newRows[rowIndex], newRows[rowIndex + 1]] = [
      newRows[rowIndex + 1],
      newRows[rowIndex],
    ];

    setBlocks((prevBlocks) =>
      prevBlocks.map((block, bIndex) =>
        bIndex === blockIndex ? { ...block, rows: newRows } : block
      )
    );
  };
  console.log("blocks", blocks);
  return (
    <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="app_content">
          <NavBar
            addBlock={addBlock}
            handlePreview={handlePreview}
            handleSave={handleSave}
            savedLayout={blocks.every((block) => block?.rows?.length === 0)}
          />
          <SideNav />
          <div className="main_container">
            {blocks.length === 0 ? (
              <Canvas
                borderColor={blocks.length > 0 ? "#4cbb17" : "#ccc"}
                onAddBlock={addBlock}
              />
            ) : (
              blocks.map((block, blockIndex) => (
                <Canvas
                  key={block.id}
                  setSelectedBlockIndex={() =>
                    setSelectedBlockIndex(blockIndex)
                  }
                  borderColor="#4cbb17"
                  block={block}
                  blockIndex={blockIndex}
                  onMoveRowUp={moveRowUp}
                  onMoveRowDown={moveRowDown}
                  onAddRow={() => addRow(blockIndex)}
                  onAddColumn={(rowIndex, colIndex) =>
                    addElementToColumn(blockIndex, rowIndex, colIndex)
                  }
                  onAddBlock={addBlock}
                  onDragHandlers={{
                    handleDragStart: (rowIndex) =>
                      handleDragStart(blockIndex, rowIndex),
                    handleDragOver: (rowIndex, e) => {
                      e.preventDefault();
                      handleDragOver(blockIndex, rowIndex);
                    },
                    handleDragEnd: () => handleDragEnd(blockIndex),
                  }}
                />
              ))
            )}
          </div>

          {(isRowDrawerOpen || isColumnDrawerOpen || isImageDrawer) && (
            <RowDrawer
              isOpen={isRowDrawerOpen || isColumnDrawerOpen || isImageDrawer}
              addRow={(count) => addRowToBlock(count)}
              columnCallback={(type) => columnCallback(type)}
              onClose={handleClose}
              isRowDrawerOpen={isRowDrawerOpen}
              isImageDrawer={isImageDrawer}
              isColumnDrawerOpen={isColumnDrawerOpen}
              imageCallback={(url, text, type) =>
                imageCallback(url, text, type)
              }
              handleDragStart={(count) => addRowToBlock(count)}
            />
          )}
          {isPreviewOpen && (
            <PreviewModal
              isOpen={isPreviewOpen}
              blocks={[blocks[selectedBlockIndex]]}
              onClose={closePreview}
            />
          )}
        </div>
      </Suspense>
    </div>
  );
}

export default App;
