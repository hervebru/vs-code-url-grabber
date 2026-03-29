// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let outputChannel: vscode.LogOutputChannel;

class NoTextEditorOpen extends Error {
}

class DocumentIsUntitled extends Error {
}

function copyCurrentFilePathWithCurrentLineNumber(markdown: boolean = false, includeHighlightedTextAsCodeBlock: boolean = false): string {
	let editor = vscode.window.activeTextEditor;
	if (!editor) {
		throw new NoTextEditorOpen;
	}

	let document = editor.document;
	if (document.isUntitled) {
		throw new DocumentIsUntitled;
	}

	const scheme = document.uri.scheme;
	const authority = document.uri.authority;
	const path = document.uri.path;
	const remoteName = vscode.env.remoteName;

	// When the extension runs on a remote host (SSH, WSL, etc.), files appear
	// as local (scheme='file') from the remote's perspective. We need to
	// reconstruct the vscode-remote URI using env.remoteName and the server IP
	// from SSH_CONNECTION (format: client_ip client_port server_ip server_port).
	let fileIdentifier: string;
	if (remoteName === 'ssh-remote') {
		const sshConnection = process.env.SSH_CONNECTION;
		const serverIp = sshConnection?.split(' ')[2];
		if (serverIp) {
			fileIdentifier = `vscode-remote/${remoteName}+${serverIp}`;
		} else {
			fileIdentifier = 'file';
		}
	} else if (remoteName === 'wsl') {
		const distroName = process.env.WSL_DISTRO_NAME;
		if (distroName) {
			fileIdentifier = `vscode-remote/wsl+${distroName}`;
		} else {
			fileIdentifier = 'file';
		}
	} else if (remoteName) {
		fileIdentifier = `vscode-remote/${remoteName}`;
	} else if (scheme === 'file') {
		fileIdentifier = 'file';
	} else {
		fileIdentifier = `${scheme}/${authority}`;
	}

	console.log(`[URL Scheme Grabber] document.uri.scheme: ${scheme}`);
	console.log(`[URL Scheme Grabber] document.uri.authority: ${authority}`);
	console.log(`[URL Scheme Grabber] document.uri.toString(): ${document.uri.toString()}`);
	console.log(`[URL Scheme Grabber] vscode.env.remoteName: ${remoteName}`);
	console.log(`[URL Scheme Grabber] SSH_CONNECTION: ${process.env.SSH_CONNECTION}`);
	console.log(`[URL Scheme Grabber] WSL_DISTRO_NAME: ${process.env.WSL_DISTRO_NAME}`);
	console.log(`[URL Scheme Grabber] fileIdentifier: ${fileIdentifier}`);
	outputChannel.info(`document.uri.scheme: ${scheme}`);
	outputChannel.info(`document.uri.authority: ${authority}`);
	outputChannel.info(`document.uri.toString(): ${document.uri.toString()}`);
	outputChannel.info(`vscode.env.remoteName: ${remoteName}`);
	outputChannel.info(`process.env.SSH_CONNECTION: ${process.env.SSH_CONNECTION}`);
	outputChannel.info(`process.env.WSL_DISTRO_NAME: ${process.env.WSL_DISTRO_NAME}`);
	outputChannel.info(`Resulting URL: ${fileIdentifier}`);

	const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.path;
	const relativePath = workspaceRoot
		? path.replace(workspaceRoot, "")
		: path;
	const lineNumber = editor.selection.active.line + 1;
	const columnNumber = editor.selection.active.character + 1;
	const config = vscode.workspace.getConfiguration('hbruUrlSchemeGrabber');
	const includeColumn = config.get('includeColumn');
	const useVSCodeInsiders = config.get('useVSCodeInsiders');
	const protocol = useVSCodeInsiders ? 'vscode-insiders' : 'vscode';

	const url = `${protocol}://${fileIdentifier}${path}:${lineNumber}${includeColumn ? `:${columnNumber}` : ''}`;
	// return markdown ? `[${relativePath}:${lineNumber}${includeColumn ? `:${columnNumber}` : ''}](${url})` : url;
	let output = markdown ? `[${relativePath}:${lineNumber}${includeColumn ? `:${columnNumber}` : ''}](${url})` : url;

	const selectedText = editor.document.getText(editor.selection);
	// Should probably ignore `includeHighlightedTextAsCodeBlock` if we are returning the raw URL?
	if (includeHighlightedTextAsCodeBlock && selectedText.length) {
		const codeBlock = "```" + document.languageId + "\n" + selectedText + "\n```";
		// TODO: optionally de-indent to the appropriate (minimum) level
		output += "\n" + codeBlock;
	}

	return output;
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	outputChannel = vscode.window.createOutputChannel('URL Scheme Grabber', { log: true });
	context.subscriptions.push(outputChannel);
	const version = context.extension.packageJSON.version;
	console.log(`Extension "hbru-vs-code-url-scheme-grabber" v${version} is now active.`);
	outputChannel.info(`Extension "hbru-vs-code-url-scheme-grabber" v${version} is now active.`);
	//outputChannel.show(true);

	let copyRawLink = vscode.commands.registerCommand('hbru-vs-code-url-scheme-grabber.copyLink', () => {
		let filePathWithLineNumber;
		try {
			filePathWithLineNumber = copyCurrentFilePathWithCurrentLineNumber();
		} catch (e) {
			if (e instanceof NoTextEditorOpen) {
			} else if (e instanceof DocumentIsUntitled) {
			} else {
				throw e;
			}
		}

		if (!filePathWithLineNumber) {
			throw new Error("Could not get file path with line number.");
		}

		vscode.env.clipboard.writeText(filePathWithLineNumber).then(() => {
			vscode.window.showInformationMessage('URL Copied to Clipboard');
		});
	});

	context.subscriptions.push(copyRawLink);

	let copyMarkdownLink = vscode.commands.registerCommand('hbru-vs-code-url-scheme-grabber.copyMarkdownLink', () => {
		let filePathWithLineNumber;
		try {
			filePathWithLineNumber = copyCurrentFilePathWithCurrentLineNumber(true, false);
		} catch (e) {
			if (e instanceof NoTextEditorOpen) {
			} else if (e instanceof DocumentIsUntitled) {
			} else {
				throw e;
			}
		}

		if (!filePathWithLineNumber) {
			throw new Error("Could not get file path with line number.");
		}

		vscode.env.clipboard.writeText(filePathWithLineNumber).then(() => {
			vscode.window.showInformationMessage('Markdown URL Copied to Clipboard');
		});
	});

	context.subscriptions.push(copyMarkdownLink);

	let copyLinkAndSelection = vscode.commands.registerCommand('hbru-vs-code-url-scheme-grabber.copyLinkAndSelection', () => {
		let filePathWithLineNumberAndCode;
		try {
			filePathWithLineNumberAndCode = copyCurrentFilePathWithCurrentLineNumber(false, true);
		} catch (e) {
			if (e instanceof NoTextEditorOpen) {
			} else if (e instanceof DocumentIsUntitled) {
			} else {
				throw e;
			}
		}

		if (!filePathWithLineNumberAndCode) {
			throw new Error("Could not get file path with line number.");
		}

		vscode.env.clipboard.writeText(filePathWithLineNumberAndCode).then(() => {
			vscode.window.showInformationMessage('URL+Selection Copied to Clipboard');
		});
	});

	context.subscriptions.push(copyLinkAndSelection);


	let copyMarkdownLinkAndSelection = vscode.commands.registerCommand('hbru-vs-code-url-scheme-grabber.copyMarkdownLinkAndSelection', () => {
		let filePathWithLineNumberAndCode;
		try {
			filePathWithLineNumberAndCode = copyCurrentFilePathWithCurrentLineNumber(true, true);
		} catch (e) {
			if (e instanceof NoTextEditorOpen) {
			} else if (e instanceof DocumentIsUntitled) {
			} else {
				throw e;
			}
		}

		if (!filePathWithLineNumberAndCode) {
			throw new Error("Could not get file path with line number.");
		}

		vscode.env.clipboard.writeText(filePathWithLineNumberAndCode).then(() => {
			vscode.window.showInformationMessage('Markdown URL+Selection Copied to Clipboard');
		});
	});

	context.subscriptions.push(copyMarkdownLinkAndSelection);




}

// This method is called when your extension is deactivated
export function deactivate() { }
