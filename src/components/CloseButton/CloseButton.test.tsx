import React from 'react';
import { render, screen } from "@testing-library/react";
import { CloseButton } from "./CloseButton";

describe("CloseButton", () => {
  describe("When rendered with all valid props", () => {
    render(<CloseButton onClick={() => {
      // I do nothing
    }} />);
    it("should render a button element", () => {
      expect(screen.getByRole("button")).toBeInTheDocument();
      expect(screen.getByTestId("close-button")).toBeInTheDocument();
    });
  });
});
