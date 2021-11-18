import { render } from "@testing-library/react";
import { BarcodeScannerComponent } from "./BarcodeScannerComponent";

describe("BarcodeScannerComponent", () => {
  it("renders without crashing", () => {
    const element = render(<BarcodeScannerComponent onUpdate={() => {}} />);

    expect(element).toBeTruthy();
  });
});
