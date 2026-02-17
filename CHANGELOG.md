# Change Log

All notable changes to the "vibeguard-extension" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.1] - 2026-02-17

### Added
-   **Initial Release** of VibeGuard! 🛡️
-   Staged change scanning using Gemini API.
-   Secret detection (API keys, tokens, etc.).
-   Basic vulnerability auditing (SQLi, XSS, etc.).
-   Auto-generated `VIBE_CHECK.md` security report.
-   Support for multiple Gemini models:
    -   `gemini-1.5-flash` (Default)
    -   `gemini-1.5-pro`
    -   `gemini-2.5-flash`
    -   `gemini-2.5-pro`
    -   `gemini-3-flash`
    -   `gemini-3-pro`
    -   `gemini-2-flash-lite`
    -   `gemini-2-flash`
-   Command `vibeguard.setApiKey` for secure key management.
-   Command `vibeguard.scan` for running the Vibe Check.
