import { render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import App from "./App";

describe("App", () => {
  it("renders key sections and navigation targets", () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );

    expect(screen.getByRole("heading", { name: "Lucas Santana" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Six projects/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Contact" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Resume" })).toHaveAttribute(
      "href",
      "/CV_LucasSantana_Dev(EN).pdf",
    );
  });

  it("has no critical accessibility violations", async () => {
    const { container } = render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );

    const result = await axe(container);
    expect(result.violations).toHaveLength(0);
  });
});
