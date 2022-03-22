import "./App.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [book, setBook] = useState([]);
  const [researched, setResearched] = useState(false);
  const [event, setEvent] = useState();

  
  useEffect(() => {
    async function getter() {
      setBook([])
      if (book === undefined)
        return;
      if (event?.target?.value !== "" && event?.target?.value !== undefined) {
        await fetch(`https://www.googleapis.com/books/v1/volumes?q=${event?.target?.value}`)
          .then((res) => res.json())
          .then((end) => setBook(end))
        setResearched(true);
      } else {
        setResearched(false);
        setBook([]);
      }
    }
    getter();
  }, [event]);
  
  console.log(book, event?.target?.value);

  return (
    <div className="App">
      <header className="App-header">
        <p>Book Finder</p>
        <input
          type="input"
          onChange={(e) => setEvent(e)}
          className="form-control form-style"
        />
        {researched === true && event?.target?.value !== '' 
          ? book?.items?.map((item, i) => {
              return(
                <div key={item.id} className="list-group">
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
