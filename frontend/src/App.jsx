import { Outlet } from "react-router-dom";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}

export default App;
