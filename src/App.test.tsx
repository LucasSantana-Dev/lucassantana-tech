import { fireEvent, render, screen } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { describe, expect, it } from "vitest";
import { axe } from "vitest-axe";
import App from "./App";

describe("App", () => {
  it("renders core sections, keeps details collapsed, and expands on demand", async () => {
    render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );

    expect(screen.getByRole("heading", { name: "Lucas Santana" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Digital business card for collaboration and delivery/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /What I am building right now/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Selected builds that show product and systems execution/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Dive deeper into experience and technical depth/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: /Community leadership and mentorship/i }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /Architecture thinking/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Now" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Projects" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Skills" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Reach Me" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download resume/i })).toHaveAttribute(
      "href",
      "/CV_LucasSantana_Dev(EN).pdf",
    );
    expect(screen.getAllByRole("link", { name: /Join Discord/i }).length).toBeGreaterThanOrEqual(3);

    const detailsToggle = screen.getByRole("button", { name: /Show more details/i });
    expect(detailsToggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(detailsToggle);
    expect(await screen.findByRole("button", { name: /Hide details/i })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  });

  it("shows three projects by default and reveals all projects on toggle", () => {
    const { container } = render(
      <HelmetProvider>
        <App />
      </HelmetProvider>,
    );

    expect(container.querySelectorAll(".project-card")).toHaveLength(3);
    expect(screen.queryByAltText("LinkedIn Engage store promo image")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Show more projects/i }));
    expect(container.querySelectorAll(".project-card")).toHaveLength(6);
    expect(screen.getByAltText("LinkedIn Engage store promo image")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Show fewer projects/i }));
    expect(container.querySelectorAll(".project-card")).toHaveLength(3);
    expect(screen.queryByAltText("LinkedIn Engage store promo image")).not.toBeInTheDocument();
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
