import { FormEvent } from "react";

export default function App() {
  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    alert("Prevented");
  }
  return (
    <>
      <header className="wrapper">
        <h1>Hello World: I love Potatoes!</h1>
        <form method="post" onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Filter by title,companies,experties..."
          />
          <label>
            <input type="checkbox" value="fulltime" /> Full Time Only
          </label>
          <button>Search</button>
        </form>
      </header>

      <main className="wrapper">
        <a href="#">
          <article className="card">
            <img
              width={50}
              height={50}
              src="https://via.placeholder.com/50"
              alt="Company Logo"
            />
          </article>
        </a>
      </main>
    </>
  );
}
