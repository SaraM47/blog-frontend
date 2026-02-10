import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Routing from "./routing";
import Navigation from "./components/Navigation";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navigation />
        <Routing />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
