import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar";
import AppRoutes from "./AppRoutes";

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
  );
}

export default App;
