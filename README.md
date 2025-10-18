<p align="center">
  <img src="https://storage.googleapis.com/aistudio-ux-team-public/codelab-assets/sparks-logo.png" alt="THE SPARKs Logo" width="150">
</p>

<h1 align="center">THE SPARKs ✨</h1>

<p align="center">
  <strong>Generate short, impactful phrases to spark inspiration, comfort, or a new perspective.</strong>
  <br />
  <br />
  <a href="https://github.com/google/generative-ai-docs/tree/main/demos/the_sparks"><strong>Explore the docs »</strong></a>
</p>

---

## 🚀 About The Project

<p align="center">
  <img src="https://storage.googleapis.com/aistudio-ux-team-public/codelab-assets/sparks-demo.gif" alt="App Demo GIF" width="700">
</p>

**THE SPARKs** is a minimalist web application that leverages the power of the Google Gemini API to generate concise and resonant phrases based on a user's input. Whether you're feeling lost, stressed, or dreaming of something new, this app provides a spark of clarity, like a memorable movie line or a powerful song lyric.

It's designed to be a quick, clean, and beautiful tool for anyone seeking a moment of inspiration.

---

## ✨ Features

*   **AI-Powered Insights:** Utilizes the `gemini-2.5-flash` model for fast, creative, and context-aware quote generation.
*   **Bilingual Support:** Seamlessly switch between English and Thai (ไทย) for a localized experience.
*   **Stunning UI:** A clean, modern interface with beautiful typography and smooth animations.
*   **Light & Dark Modes:** Automatically adapts to your system preference and offers a manual toggle for eye comfort.
*   **Fully Responsive:** Looks and works great on all devices, from desktops to mobile phones.
*   **Zero Dependencies:** Built with vanilla TypeScript and modern web APIs, keeping it lightweight and fast.

---

## 🛠️ Built With

*   [HTML5](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
*   [CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS) (Flexbox, Grid, Custom Properties)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Google Gemini API](https://ai.google.dev/)
*   [Vite](https://vitejs.dev/)

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js (v18.x or later)
*   A Google Gemini API key. You can get a free key from [Google AI Studio](https://ai.google.dev/).

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/the-sparks.git
    cd the-sparks
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Configure your API Key:**
    The application is configured to use the API key from the environment variables. This is a security best practice. The application will automatically have access to `process.env.API_KEY` when run.

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).

---

## 📂 Project Structure

```
/
├── public/
│   └── (static assets)
├── src/
│   ├── index.css         # Main styling
│   └── index.tsx         # Core application logic (TypeScript)
├── index.html            # Entry HTML file
├── package.json          # Project dependencies and scripts
├── README.md             # You are here!
└── vite.config.ts        # Vite configuration
```

---

## 📄 License

Distributed under the Apache 2.0 License. See `LICENSE` for more information.

<p align="center">Made with ❤️ by wiqnnc_</p>
