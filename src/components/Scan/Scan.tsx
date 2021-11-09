import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ScanContext } from "../../context/ScanContext";
import { BarcodeScannerComponent } from "../BarcodeScannerComponent/BarcodeScannerComponent";

export const Scan = () => {
  const { setScannedId } = useContext(ScanContext);

  const handleScan = (code: string) => {
    if (code) {
      setScannedId(code);
    }
  };

  const handleError = (err: unknown) => {
    if (err) {
      console.error(err);
    }
  };

  return (
    <>
      <BarcodeScannerComponent
        width={screen.width}
        height={screen.height}
        onUpdate={(err, result) => {
          if (result) handleScan(result.getText());
          else handleError(err);
        }}
      />
      <Outlet />
    </>
  );
};
