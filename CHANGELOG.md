# Change Log

All notable changes to the "vibeguard-extension" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.4] - 2026-02-18

### Added
-   **Report TLDR**: Vibe checks now include a final "TLDR: Can I Commit?" section at the bottom, explicitly listing which files are safe and which are blocked by security risks.

### Changed
-   **Model Cleanup**: Removed legacy model strings. Restricted list to optimized Gemini 2.5 and 3.0 models only:
    -   `gemini-2.5-flash` (Default)
    -   `gemini-2.5-flash-lite`
    -   `gemini-2.5-pro`
    -   `gemini-3-flash-preview`
    -   `gemini-2.5-flash-preview-09-2025`
    -   `gemini-2.5-flash-lite-preview-09-2025`

## [0.0.3] - 2026-02-18

### Added
-   **Model Switching Button**: Added a gear icon (⚙️) in the Source Control title bar to quickly swap between Gemini models without opening settings.
-   **Direct Model Picker**: New command `VibeGuard: Change VibeGuard Model` implemented.

### Changed
-   **Deprecated Models Removed**: Professionally removed Gemini 1.5 versions to favor the superior Gemini 2.5 and 3.0 series.
-   **New Default Model**: Updated default model to `gemini-2.5-flash`.

## [0.0.2] - 2026-02-18

### Added
-   **Official Extension Icon**: Added a sleek neon security shield logo.
-   **Enhanced Documentation**: Added `CONTRIBUTING.md` and `LICENSE.md`.
-   **Updated README**: Improved instructions and added the new branding.
-   **Expanded Model Support**: Added more Gemini model options (1.5, 2.5, 3.0 variants) in settings.

### Fixed
-   **Bug Fix**: Fixed "result.text is not a function" error in Gemini service.
-   **Prompt Tuning**: Improved the AI prompt for cleaner Markdown reports and more consistent "no vulnerabilities" messaging.
-   **Build Stability**: Fixed `tsconfig.json` syntax errors and improved `exclude` patterns for faster, error-free compilation.

## [0.0.1] - 2026-02-17

### Added
-   **Initial Release** of VibeGuard! 🛡️
-   Staged change scanning using Gemini API.
-   Secret detection (API keys, tokens, etc.).
-   Basic vulnerability auditing (SQLi, XSS, etc.).
-   Auto-generated `VIBE_CHECK.md` security report.
-   Support for multiple Gemini models:
    -   `gemini-2.5-flash` (Default)
    -   `gemini-1.5-pro`
    -   `gemini-2.5-flash`
    -   `gemini-2.5-pro`
    -   `gemini-3-flash`
    -   `gemini-3-pro`
    -   `gemini-2-flash-lite`
    -   `gemini-2-flash`
-   Command `vibeguard.setApiKey` for secure key management.
-   Command `vibeguard.scan` for running the Vibe Check.
