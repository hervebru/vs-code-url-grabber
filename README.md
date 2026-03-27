# VS Code URL Scheme Grabber README

Fork of [hipdot-vs-code-url-scheme-grabber](https://github.com/ebetancourt/hipdot-vs-code-url-scheme-grabber).

Visual Studio Code has a documented way to open VS code using URLs (in the MacOS / iOS world, this is commonly called a URL Scheme or URI Scheme). You can see the documentation here: [Opening VS Code with URLs](https://code.visualstudio.com/docs/editor/command-line#_opening-vs-code-with-urls). This is something I personally use when planning out the steps I will take to implement a feature. However there is no built in way to get the URL from VS Code, so I have been copying the absolute path and manually creating the URLs (with snippets in my notes program of choice).

Other times you might want links that open VS Code to a specific file location:
- When adding tasks for yourself in your task manager
- taking notes on the way a codebase works

## Features

This extension adds four commands (also available via the editor context menu):

* Copy Link to Current File and Line Number
* Copy Link to Current File and Line Number in Markdown Format
* Copy Link to Current File and Line Number + Selection
* Copy Link to Current File and Line Number + Selection in Markdown Format

Additionally supports SSH remote connections — generates correct `vscode-remote` URIs when connected via SSH.

## Extension Settings

This extension contributes following settings, which can be found under the heading "URL Scheme Grabber":

* `hbruUrlSchemeGrabber.includeColumn`: Include the column number in the link to the current file and line number
* `hbruUrlSchemeGrabber.useVSCodeInsiders`: Format the link so that it opens in VSCode Insiders instead of VSCode

## Known Issues

None yet

## Release Notes

### 2.0.0

Fork of the original extension with the following additions:

- SSH remote support
- Context menu sub-menu with all commands
- Renamed commands and configuration namespace

See [CHANGELOG.md](CHANGELOG.md) for details.

---

## Acknowledgements

Based on the work of [Eric Betancourt](https://github.com/ebetancourt) in [hipdot-vs-code-url-scheme-grabber](https://github.com/ebetancourt/hipdot-vs-code-url-scheme-grabber), which itself was based on [Nisanth Chunduru](https://github.com/nisanthchunduru)'s [vscode-copy-filepath-with-line-number](https://github.com/nisanthchunduru/vscode-copy-filepath-with-line-number).

## Contributing

Issue reports and PRs are welcome at [https://github.com/hervebru/vs-code-url-grabber](https://github.com/hervebru/vs-code-url-grabber)


**Enjoy!**
