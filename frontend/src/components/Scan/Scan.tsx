import { useMemo, useState } from "react";
import { BiBulb } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { BarcodeScannerComponent } from "../BarcodeScannerComponent/BarcodeScannerComponent";
import "./Scan.scss";

export const Scan = () => {
  const navigate = useNavigate();
  const [torchActive, setTorchActive] = useState(false);

  const handleScan = (code: string) => {
    if (code) {
      navigate(`/guides/${code}`);
    }
  };

  const handleSetTorch = () => {
    setTorchActive(!torchActive);
  };

  const isIOS = useMemo(() => {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
    // iPad on iOS 13 detection
    || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  }, [])

  return (
    <>
      {!isIOS && <div
        className="Scan__torch"
        style={{
          boxShadow: torchActive ? "0px 0px 15px #fff" : "0px 0px 0px#fff",
        }}
        onClick={handleSetTorch}
      >
        <BiBulb style={{ pointerEvents: "none" }} size="2rem" />
      </div>}
      <BarcodeScannerComponent
        torch={torchActive}
        onUpdate={(result) => {
          if (result) handleScan(result.getText());
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
