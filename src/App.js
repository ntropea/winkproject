import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [book, setBook] = useState([]);
  const [researched, setResearched] = useState(false);

  async function getter(e) {
    if (!book)
      return;
    if (e.target.value !== "") {
      await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${e.target.value}`
      )
        .then((res) => res.json())
        .then((end) => setBook(end))
      setResearched(true);
    } else {
      setResearched(false);
      setBook([]);
    }
  }

  useEffect(() => {
    console.log(book);
  }, [book]);

  return (
    <div className="App">
      <header className="App-header">
        <p>Book Finder</p>
        <input
          type="input"
          onChange={(e) => getter(e)}
          className="form-control form-style"
        />
        {researched === true && book !== undefined
          ? book.items.map((item) => {
              return(
                <div className="list-group">
                  <a
                    href="#1"
                    className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{item?.volumeInfo?.title}</h5>
                      <small className="text-muted">{item?.volumeInfo?.authors}</small>
                    </div>
                    <p className="mb-1">
                    <img alt="" className="image-style" src={item?.volumeInfo?.imageLinks?.smallThumbnail}/>
                    </p>
                    <p className="mb-1">
                      {item?.searchInfo?.textSnippet}
                    </p>
                    <small className="text-muted">
                      Donec id elit non mi porta.
                    </small>
                  </a>
                </div>
              );
            })
          : null}
      </header>
    </div>
  );
}

export default App;
