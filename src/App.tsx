import { set } from "idb-keyval";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { GuideDisplay } from "./components/GuideDisplay/GuideDisplay";
import { Scan } from "./components/Scan/Scan";
import { TopBar } from "./components/TopBar/TopBar";
import { ScanContextProvider } from "./context/ScanContext";
import { IGuide } from "./models";

function App() {
  useEffect(() => {
    const myfunction = async () => {
      const data: IGuide = {
        id: "2.1",
        data: "This is my data, it's very pretty",
      };
      await set(data.id, data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
    myfunction();
  }, []);

  return (
    <Router>
      <ScanContextProvider>
        <div className="App">
          <TopBar scanningActive={true} syncActive={false} />
          <Routes>
            <Route path="/" element={<Scan />} />
            <Route path="guide/:id" element={<GuideDisplay />} />
          </Routes>
        </div>
      </ScanContextProvider>
    </Router>
  );
}

export default App;
