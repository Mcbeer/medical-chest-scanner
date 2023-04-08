import { BrowserRouter as Router } from "react-router-dom"
import { GuideListItem } from "./GuidesList"
import { render, screen } from "@testing-library/react"

describe("GuidesListItem", () => {
    describe("When rendered with valid props", () => {
        it("should return an accessible version of the component", ()  => {
            // Only id and name are shown
            render(<Router>
                <GuideListItem id={'123'} name={'Liquid Oxygen'}/>
                </Router>);
                expect(screen.getByText("123")).toBeInTheDocument();
                expect(screen.getByText("Liquid Oxygen")).toBeInTheDocument();
                // This should render a link to the full guide
                expect(screen.getByRole("link")).toBeInTheDocument();
            
        })
    })


})