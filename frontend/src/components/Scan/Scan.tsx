import { Outlet, useNavigate } from "react-router-dom";
import { BarcodeScannerComponent } from "../BarcodeScannerComponent/BarcodeScannerComponent";

export const Scan = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <BarcodeScannerComponent
        width={window.innerWidth}
        height={window.innerHeight}
        onUpdate={(err, result) => {
          if (result) handleScan(result.getText());
          else handleError(err);
        }}
      />
      <Outlet />
    </>
  );
};
