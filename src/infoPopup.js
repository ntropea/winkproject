export function infoPopup(setClose, select) {
  return (
    <div className="popup-overlay">
      <div className="card info-box" data-closeable>
        <button
          type="button"
          className="close close-button btn-danger"
          aria-label="Close"
          onClick={() => setClose(true)}
        >
          <span aria-hidden="true">&times;</span>
        </button>
        <div className="card-body">
          <p className="title">
            <b>Title: </b>
            {select.volumeInfo?.title}
          </p>
          <p><b>Authors: </b>{select.volumeInfo?.authors}</p>
          <img
            alt=""
            className="card-img-left popup-image-style"
            src={select?.volumeInfo?.imageLinks?.smallThumbnail}
          />
          <p className="popup-text-style"
            dangerouslySetInnerHTML={{
              __html: select?.searchInfo?.textSnippet,
            }}
          />
          <button type="button" className="btn btn-light">
            <a href={select?.volumeInfo.infoLink}>BUY IT NOW &gt;&gt;</a>
          </button>
        </div>
      </div>
    </div>
  );
}
