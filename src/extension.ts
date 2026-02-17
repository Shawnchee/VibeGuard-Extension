import * as vscode from 'vscode';
import { GitUtils } from './utils/git';
import { GeminiService } from './services/gemini';

const API_KEY_SECRET = 'vibeguard.apiKey';

export function activate(context: vscode.ExtensionContext) {
    const gitUtils = new GitUtils();
    const geminiService = new GeminiService();
    const outputChannel = vscode.window.createOutputChannel('VibeGuard Security Report');

    // Command: Set API Key
    const setApiKeyCommand = vscode.commands.registerCommand('vibeguard.setApiKey', async () => {
        const apiKey = await vscode.window.showInputBox({
            prompt: 'Enter your Gemini API Key',
            password: true,
            ignoreFocusOut: true,
        });

        if (apiKey) {
            await context.secrets.store(API_KEY_SECRET, apiKey);
            vscode.window.showInformationMessage('VibeGuard API Key saved.');
        }
    });

    // Command: Scan Staged Changes
    const scanCommand = vscode.commands.registerCommand('vibeguard.scan', async () => {
        const apiKey = await context.secrets.get(API_KEY_SECRET);
        if (!apiKey) {
            vscode.window.showErrorMessage('VibeGuard API Key not found. Please set it first.');
            await vscode.commands.executeCommand('vibeguard.setApiKey');
            return;
        }

        await geminiService.setApiKey(apiKey);

        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "🛡️ VibeGuard: Scanning Staged Changes...",
            cancellable: false
        }, async () => {
            try {
                const diff = await gitUtils.getStagedChanges();
                if (!diff) {
                    vscode.window.showInformationMessage('No staged changes to scan.');
                    return;
                }

                const report = await geminiService.scanChanges(diff);

                outputChannel.clear();
                outputChannel.appendLine(report);
                outputChannel.show();

                // Basic heuristic for success/failure notification
                if (report.includes("🚨") || report.includes("High Risk")) {
                    vscode.window.showWarningMessage("VibeGuard found potential security issues! Check the Output panel.");
                } else {
                    vscode.window.showInformationMessage("✅ Vibe Check Passed: No obvious threats found.");
                }

            } catch (error: any) {
                vscode.window.showErrorMessage(`Vibe Check Failed: ${error.message}`);
                outputChannel.appendLine(`Error: ${error.message}`);
                outputChannel.show();
            }
        });
    });

    context.subscriptions.push(setApiKeyCommand, scanCommand, outputChannel);
}

export function deactivate() { }
