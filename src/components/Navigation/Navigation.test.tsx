import React from 'react';
import { describe, it, expect } from 'vitest'
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { NavigationItem } from "./Navigation";

describe("CloseButton", () => {
  describe("When rendered with all valid props", () => {
    it("should render a navigation item", () => {
      render(
        <Router>
          <NavigationItem
            icon={<span data-testid="placeholder-icon"></span>}
            label="Test thing"
            to="/"
          />
        </Router>
      );
      expect(screen.getByRole("listitem")).not.toBeNull();
      expect(screen.getByTestId("placeholder-icon")).not.toBeNull();
      expect(screen.getByText("Test thing")).not.toBeNull();
      expect(screen.getByRole("link")).not.toBeNull();
    });
  });
});
