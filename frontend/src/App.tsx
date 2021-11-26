import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.scss";
import { DataHandler } from "./components/DataHandler/DataHandler";
import { GuideDisplay } from "./components/GuideDisplay/GuideDisplay";
import { Scan } from "./components/Scan/Scan";
import { TopBar } from "./components/TopBar/TopBar";
import { GuideContextProvider } from "./context/GuideContext";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const App = () => {
  return (
    <GuideContextProvider>
      <DataHandler />
      <Router>
        <div className="App">
          <TopBar />
          <Routes>
            <Route path="/" element={<Scan />} />
            <Route path="guide/:id" element={<GuideDisplay />} />
          </Routes>
        </div>
      </Router>
    </GuideContextProvider>
  );
};

export default App;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({
  onSuccess: (registration) => {
    console.log("Service Worker Registered", registration);
  },
  onUpdate: (updated) => {
    console.log("Service Worker Updated", updated);
  },
});
