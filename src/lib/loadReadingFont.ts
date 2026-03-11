const READING_FONT_ID = "source-serif-4-font";
const READING_FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;500&display=swap";

let fontLoadPromise: Promise<void> | null = null;

export const loadReadingFont = () => {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  if (document.getElementById(READING_FONT_ID)) {
    return Promise.resolve();
  }

  if (fontLoadPromise) {
    return fontLoadPromise;
  }

  fontLoadPromise = new Promise((resolve) => {
    const link = document.createElement("link");
    link.id = READING_FONT_ID;
    link.rel = "stylesheet";
    link.href = READING_FONT_HREF;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });

  return fontLoadPromise;
};
