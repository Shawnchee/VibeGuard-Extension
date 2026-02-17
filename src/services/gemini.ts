import * as vscode from 'vscode';
// @ts-ignore
import { GoogleGenAI } from '@google/genai';

export class GeminiService {
    private genAI: any = null;

    async setApiKey(apiKey: string) {
        // Dynamic import to avoid issues if module isn't installed yet in dev
        const { GoogleGenAI } = await import("@google/genai");
        this.genAI = new GoogleGenAI({ apiKey: apiKey });
    }

    async scanChanges(diff: string): Promise<string> {
        if (!this.genAI) {
            throw new Error('Gemini API key not set. Please set it using "VibeGuard: Set API Key".');
        }

        const config = vscode.workspace.getConfiguration('vibeguard');
        const modelName = config.get<string>('model', 'gemini-2.5-flash');

        const prompt = `
        You are VibeGuard, a security-first code reviewer.
        Analyze the following git diff for security vulnerabilities and leaked secrets.

        TASKS:
        1. **Secret Detection**: Look for API keys, private keys, tokens, or high-entropy strings.
        2. **Vulnerability Audit**: Identify security risks like SQL injection, XSS, insecure endpoints, etc.
        3. **Summary**: Briefly summarize the changes.

        OUTPUT FORMAT (Markdown):
        
        ## 🛡️ Vibe Check Report

        ### 🚨 Security Alerts
        - [High/Medium/Low] <Description of vulnerability or secret>
        
        **IF NO VULNERABILITIES ARE FOUND:**
        Return exactly: "✅ No significant security issues found. Safe to commit." under this checks section.

        ### 📝 Change Summary
        <Brief summary of what the code does>

        ### 📋 TLDR: Can I Commit?
        **[Safe to Commit]**
        - <File A>
        - <File B>

        **[CANNOT COMMIT - RISKS DETECTED]**
        - <File C> (Reason: <Brief reason>)

        ---
        GIT DIFF:
        ${diff}
        `;

        try {
            const result = await this.genAI.models.generateContent({
                model: modelName,
                contents: prompt,
            });
            return result.text;

        } catch (error: any) {
            throw new Error(`Vibe Check failed: ${error.message}`);
        }
    }
}
