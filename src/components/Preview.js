const PreviewModal = ({ isOpen, blocks, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h3>Preview Layout</h3>
        <div className="preview-layout">
          {blocks?.map((block, blockIndex) => (
            <div className="canvas" key={block.id}>
              {block?.rows?.map((row, rowIndex) => (
                <div className="row" key={rowIndex}>
                  {row?.columns?.map((col, colIndex) => (
                    <div className="column" key={colIndex}>
                      {col ? (
                        col.type === "image" ? (
                          <img
                            src={col.src}
                            alt=""
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        ) : (
                          <h3>{col.content}</h3>
                        )
                      ) : (
                        <div>Empty</div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
export default PreviewModal;
