
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Country from "./components/Country/main.country";
import ErrorNotFound from "./components/Error/main.error";
import Home from "./components/Home/main.home";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home title="Mini Public Holiday"/>} />
          <Route path="country" element={<Country title="Mini Public Holiday"/>} />
          <Route path="*" element={<ErrorNotFound></ErrorNotFound>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
