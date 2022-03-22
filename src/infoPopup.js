export function infoPopup(setClose, select) {
  return (
    <div className="popup-overlay">
      <div className="info-box" data-closeable>
        <button type="button" className="close close-button" aria-label="Close" onClick={() => setClose(true)}>
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="row">
            <img
                alt=""
                className="popup-image-style"
                src={select?.volumeInfo?.imageLinks?.smallThumbnail}
            />
        </div>
        <div className="row">
          <div className="column">{select.volumeInfo?.title}</div>
          <div className="column">colonna 2</div>
        </div>
      </div>
    </div>
  );
}
