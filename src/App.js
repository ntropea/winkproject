import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { infoPopup } from "./infoPopup";

function App() {
  const [book, setBook] = useState([]);
  const [researched, setResearched] = useState(false);
  const [event, setEvent] = useState();
  const [elems, setElems] = useState(5);
  const [page, setPage] = useState(1);
  const [close, setClose] = useState(true);
  const [select, setSelect] = useState();

  useEffect(() => {
    async function getter() {
      setBook([]);
      if (book === undefined) return;
      if (event?.target?.value !== "" && event?.target?.value !== undefined) {
        await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=${
            event?.target?.value
          }&startIndex=${elems * page - elems}&maxResults=${elems}`
        )
          .then((res) => res.json())
          .then((end) => setBook(end));
        setResearched(true);
      } else {
        setResearched(false);
        setBook([]);
      }
    }
    getter();
  }, [event, elems, page]);

  useEffect(() => {}, [close]);

  function Button({i}) {
    return (
      <button
        type="button"
        onClick={() => {
          setElems(i);
          setPage(1);
        }}
        className="btn btn-success"
      >
        {i}
      </button>
    )
  }

  function PageSwitch() {
    return (
      <div>
        <button
        type="button"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="btn btn-secondary"
        >
          {"<<"}
        </button>
        <button
        type="button"
        disabled={elems * page >= book?.totalItems || !book?.totalItems}
        onClick={() => setPage(page + 1)}
        className="btn btn-secondary"
        >
          &gt;&gt;
        </button>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Book Finder</p>
        <input
          type="input"
          onChange={(e) => {
            setEvent(e);
            setPage(1);
          }}
          className="form-control form-style"
        />
        {researched && event?.target?.value !== "" ? (
          <div>
            {book?.totalItems ? (
              <small>
                Page {page} of{" "}
                {book?.totalItems % elems === 0
                  ? ~~(book?.totalItems / elems)
                  : ~~(book?.totalItems / elems + 1)}
                ,{" "}
              </small>
            ) : null}
            <small>items per page: </small>
            <Button i={5}/>
            <Button i={10}/>
            <Button i={15}/>
            <Button i={20}/>
            <PageSwitch/>
          </div>
        ) : null}
        {researched && event?.target?.value !== ""
          ? book?.items?.map((item, i) => {
              return (
                <div key={item.id} className="list-group">
                  <a
                    href={"#" + i}
                    className="list-group-item list-style list-group-item-action"
                    onClick={() => {
                      setClose(false);
                      setSelect(item);
                    }}
                  >
                    <div className="w-100 justify-content-between">
                      <h5 className="mb-1">{item?.volumeInfo?.title}</h5>
                      <small className="text-muted">
                        {item?.volumeInfo?.authors?.map((author, index) => {
                          if (index === item?.volumeInfo?.authors?.length - 1) {
                            return author;
                          } else {
                            return (author + ', ');
                          }
                        })}
                      </small>
                    </div>
                    <p className="mb-1">
                      <img
                        alt=""
                        className="image-style"
                        src={
                          item?.volumeInfo?.imageLinks?.smallThumbnail
                            ? item?.volumeInfo?.imageLinks?.smallThumbnail
                            : "https://adriaticaindustriale.it/wp-content/uploads/2020/02/not-found.png"
                        }
                      />
                    </p>
                    <p
                      className="text-style"
                      dangerouslySetInnerHTML={{
                        __html: item?.searchInfo?.textSnippet,
                      }}
                    />
                  </a>
                </div>
              );
            })
          : null}
          {researched && event?.target?.value !== "" ? <PageSwitch/> : null}
      </header>
      {close ? null : infoPopup(setClose, select)}
    </div>
  );
}

export default App;
