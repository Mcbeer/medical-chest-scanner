import { useState } from "react";
import { BiBulb } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BarcodeScannerComponent } from "../BarcodeScannerComponent/BarcodeScannerComponent";
import "./Scan.scss";

export const Scan = () => {
  const navigate = useNavigate();
  const [torchActive, setTorchActive] = useState(false);

  const handleScan = (code: string) => {
    if (code) {
      navigate(`/guide/${code}`);
    }
  };

  const handleError = (err: unknown) => {
    if (err) {
      console.error(err);
    }
  };

  const handleSetTorch = () => {
    setTorchActive(!torchActive);
  };

  return (
    <>
      <div className="Scan__torch" onClick={handleSetTorch}>
        <BiBulb style={{ pointerEvents: "none" }} size="2rem" />
      </div>
      <BarcodeScannerComponent
        torch={torchActive}
        onUpdate={(err, result) => {
          if (result) handleScan(result.getText());
          else handleError(err);
        }}
      />
      <ScanTarget />
    </>
  );
};

const ScanTarget = () => (
  <div className="ScanTarget">
    <div className="ScanTarget__border-one"></div>
    <div className="ScanTarget__border-two"></div>
    <div className="ScanTarget__border-three"></div>
    <div className="ScanTarget__border-four"></div>
  </div>
);
