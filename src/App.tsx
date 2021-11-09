import { set } from "idb-keyval";
import { useEffect, useState } from "react";
import "./App.scss";
import { GuideDisplay } from "./components/GuideDisplay/GuideDisplay";
import { BarcodeScannerComponent } from "./components/Scan/Scan";
import { TopBar } from "./components/TopBar/TopBar";
import { IGuide } from "./models";

interface AppProps {
  updateSW: () => void;
}

function App({ updateSW }: AppProps) {
  const [scannedItem, setScannedItem] = useState<string>("");
  const [scannerActive, setScannerActive] = useState<"active" | "inactive">(
    "active"
  );

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

  const handleScan = (data: string) => {
    console.log("Data: ", data);
    setScannedItem(data);
    setScannerActive("inactive");
  };

  const handleError = (err: unknown) => {
    console.log(err);
    return;
  };

  const handleCloseDisplay = () => {
    setScannedItem("");
    setScannerActive("active");
  };

  return (
    <div className="App">
      <TopBar scanningActive={scannerActive === "active"} syncActive={false} />
      <div className="App__scanner">
        <BarcodeScannerComponent
          width={screen.width}
          height={screen.height}
          onUpdate={(err, result) => {
            if (result) handleScan(result.getText());
            else handleError(err);
          }}
        />
      </div>
      {scannedItem && scannedItem !== "" && (
        <GuideDisplay id={scannedItem} close={handleCloseDisplay} />
      )}
    </div>
  );
}

export default App;
