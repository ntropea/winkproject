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
          <p>
            <b>{select.volumeInfo?.authors ? "Authors: " : null}</b>
            {select.volumeInfo?.authors?.map((author) => {
              return author + " ";
            })}
          </p>
          <img
            alt=""
            className="card-img-left popup-image-style"
            src={
              select?.volumeInfo?.imageLinks?.smallThumbnail
                ? select?.volumeInfo?.imageLinks?.smallThumbnail
                : "https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found.png"
            }
          />
          <p
            className="popup-text-style"
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
