# 🛡️ VibeGuard

<p align="center">
  <img src="icon.png" alt="VibeGuard Logo" width="128" height="128" />
</p>

**VibeGuard** is a security-first VS Code extension designed for developers who move fast but want to stay safe. It acts as your "Anti-Gravity Cursor" and Pre-Commit Shield, scanning staged changes via the Gemini API to detect leaked secrets and code vulnerabilities before you push.

## 🚀 Features

-   **🔍 Staged Change Scanning**: Analyzes only the files currently in your Git staging area.
-   **🔑 Secret Detection**: Detects API keys, private keys, tokens, and other high-entropy strings.
-   **🐛 Vulnerability Audit**: partial security audit for common risks like SQL injection, XSS, and insecure endpoints.
-   **📝 Auto-Documentation**: Generates a `VIBE_CHECK.md` report summarizing your changes and flagging risks.
-   **⚡ Gemini Powered**: Uses Google's Gemini 2.5 Flash (and other models) for fast, intelligent analysis.

## 📦 Installation

1.  Install via the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=shawnchee.vibeguard-extension) or [Open VSX](https://open-vsx.org/extension/shawnchee/vibeguard-extension).
2.  Or download the `.vsix` from the releases page and install manually.

## ⚙️ Setup

1.  **Get a Gemini API Key**:
    -   Go to [Google AI Studio](https://aistudio.google.com/).
    -   Create a new API key.
2.  **Set the API Key in VS Code**:
    -   Open the Command Palette (`Ctrl+Shift+P` / `Cmd+Shift+P`).
    -   Run `VibeGuard: Set Gemini API Key`.
    -   Paste your key when prompted.

## 🎮 Usage

1.  **Stage your changes** (`git add .`).
2.  Click the **Vibe Check** button in the Source Control title bar (🛡️ icon) OR run the command `Vibe Guard: Vibe Check (Scan Staged Changes)`.
3.  VibeGuard will analyze your changes and open a **`VIBE_CHECK.md`** report.
    -   **✅ Green**: No significant issues found. You're safe to commit!
    -   **🚨 Red**: Potential vulnerabilities detected. Review the report before pushing.

## 🔧 Configuration

You can customize the Gemini model used for scanning in your VS Code settings:

-   `vibeguard.model`: Select the model (Default: `gemini-2.5-flash`). Supported models:
    -   `gemini-2.5-flash`
    -   `gemini-2.5-pro`
    -   `gemini-3-pro`
    -   `gemini-2-flash-lite`
    -   `gemini-2-flash`
    -   `gemini-3-flash`

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the [MIT License](LICENSE.md).

---

Based on the VibeGuard concept. Stay safe, code fast.
