import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./components/Home/main.home";
import Country from "./components/Country/main.country";
import ErrorNotFound from "./components/Error/main.error";

function App() {
  const title = "Mini Public Holiday Apps" 
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home title={title} />} />
          <Route path="country" element={<Country title={title}/>} />
          <Route path="*" element={<ErrorNotFound></ErrorNotFound>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
