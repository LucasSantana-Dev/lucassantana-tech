import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import App from "./App";

describe("App", () => {
  it("renders core sections with terminal-style labels and nav links", async () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );

    // Hero renders name in a terminal-style span, not a heading
    expect(screen.getByText("Lucas Santana")).toBeInTheDocument();

    // Section labels (terminal-style spans, not headings)
    expect(screen.getByText("# about")).toBeInTheDocument();
    expect(screen.getByText("# now")).toBeInTheDocument();
    expect(screen.getByText("# selected builds")).toBeInTheDocument();
    expect(screen.getByText("# more details")).toBeInTheDocument();

    // Nav links are lowercase
    expect(screen.getByRole("link", { name: "about" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "now" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "contact" })).toBeInTheDocument();

    // MoreDetails starts expanded (initial state true)
    const detailsToggle = screen.getByRole("button", { name: /hide details/i });
    expect(detailsToggle).toHaveAttribute("aria-expanded", "true");

    // Click to collapse
    fireEvent.click(detailsToggle);
    expect(
      await screen.findByRole("button", { name: /show more details/i }),
    ).toHaveAttribute("aria-expanded", "false");
  });

  it("shows five projects by default and reveals all on toggle", () => {
    const { container } = render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );

    // 5 projects visible by default
    expect(container.querySelectorAll(".project-row")).toHaveLength(5);

    // Load more button
    const loadMore = screen.getByRole("button", { name: /load 1 more/i });
    fireEvent.click(loadMore);

    // All 6 projects visible
    expect(container.querySelectorAll(".project-row")).toHaveLength(6);
  });

  it(
    "has no critical accessibility violations",
    async () => {
      const { container } = render(
        <HelmetProvider>
          <App />
        </HelmetProvider>,
      );

      const result = await axe(container);
      expect(result.violations).toHaveLength(0);
    },
    15000,
  );
});
