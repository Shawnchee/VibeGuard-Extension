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

                // Write report to markdown file
                const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
                if (!workspaceFolder) {
                    throw new Error('No workspace folder open');
                }

                const reportUri = vscode.Uri.joinPath(workspaceFolder.uri, 'VIBE_CHECK.md');
                await vscode.workspace.fs.writeFile(reportUri, Buffer.from(report, 'utf-8'));

                // Open the report
                const document = await vscode.workspace.openTextDocument(reportUri);
                await vscode.window.showTextDocument(document, { preview: false });

                // Also show output channel for quick reference
                outputChannel.clear();
                outputChannel.appendLine(report);
                // outputChannel.show(); // Don't show output channel if we're showing the file

                // Basic heuristic for success/failure notification
                if (report.includes("✅")) {
                    vscode.window.showInformationMessage("✅ Vibe Check Passed: No significant security issues found.");
                } else {
                    vscode.window.showWarningMessage("VibeGuard found potential security issues! Check the VIBE_CHECK.md report.");
                }

            } catch (error: any) {
                vscode.window.showErrorMessage(`Vibe Check Failed: ${error.message}`);
                outputChannel.appendLine(`Error: ${error.message}`);
                outputChannel.show();
            }
        });
    });

    // Command: Change Model
    const changeModelCommand = vscode.commands.registerCommand('vibeguard.changeModel', async () => {
        const config = vscode.workspace.getConfiguration('vibeguard');
        const currentModel = config.get<string>('model', 'gemini-2.5-flash');

        // Pick models from package.json enum
        const models = [
            "gemini-2.5-flash",
            "gemini-2.5-pro",
            "gemini-3-pro",
            "gemini-2-flash-lite",
            "gemini-2-flash",
            "gemini-3-flash"
        ];

        const selected = await vscode.window.showQuickPick(
            models.map(m => ({
                label: m,
                description: m === currentModel ? '(Current)' : ''
            })),
            { placeHolder: 'Select Gemini Model for VibeGuard' }
        );

        if (selected) {
            await config.update('model', selected.label, vscode.ConfigurationTarget.Global);
            vscode.window.showInformationMessage(`VibeGuard model updated to ${selected.label}`);
        }
    });

    context.subscriptions.push(setApiKeyCommand, scanCommand, changeModelCommand, outputChannel);
}

export function deactivate() { }
