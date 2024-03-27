import { render, screen } from "@testing-library/react"
import { Home } from "./Home";

describe("Home Component", () => {
    it("should render Home with sandslash menssage", () => {
        render (<Home />);

        screen.getByText("sandslash");
    })
});

export default {};