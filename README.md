# VS Code URL Scheme Grabber README

Fork of [hipdot-vs-code-url-scheme-grabber](https://github.com/ebetancourt/hipdot-vs-code-url-scheme-grabber).

## Features

This extension adds four commands (also available via the editor context menu):

* Copy Link to Current File and Line Number
* Copy Link to Current File and Line Number in Markdown Format
* Copy Link to Current File and Line Number + Selection
* Copy Link to Current File and Line Number + Selection in Markdown Format

Additionally supports SSH-remote and WSL-remote connections — generates correct `vscode-remote` URIs when connected via SSH and to WSL.

The remote type (`ssh-remote` or `wsl`) comes from `vscode.env.remoteName`.


### SSH-remote URL example
[vscode://vscode-remote/ssh-remote+192.168.100.1/path/to/file:123](vscode://vscode-remote/ssh-remote+192.168.100.1/path/to/file:123)

This extension gets the remote IP from `process.env.SSH_CONNECTION`.

### WSL-remote URL example
[vscode://vscode-remote/wsl+Ubuntu/path/to/file:123](vscode://vscode-remote/wsl+Ubuntu/path/to/file:123)

... where `Ubuntu` is the name of the WSL distro as seen from the WSL_DISTRO_NAME env variable that is set under WSL.
This extension gets the distro name from `process.env.WSL_DISTRO_NAME`.

## Extension Settings

This extension contributes following settings, which can be found under the heading "URL Scheme Grabber":

* `hbruUrlSchemeGrabber.includeColumn`: Include the column number in the link to the current file and line number
* `hbruUrlSchemeGrabber.useVSCodeInsiders`: Format the link so that it opens in VSCode Insiders instead of VSCode

## Known Issues

None yet
( + No support for Dev Containers and Tunnels)

## Release Notes

### 2.1.0

Fork of the original extension with the following additions:

- SSH remote support
- WSL remote support
- Context menu sub-menu with all commands
- Renamed commands and configuration namespace

---

## Acknowledgements

Based on the work of [Eric Betancourt](https://github.com/ebetancourt) in [hipdot-vs-code-url-scheme-grabber](https://github.com/ebetancourt/hipdot-vs-code-url-scheme-grabber), which itself was based on [Nisanth Chunduru](https://github.com/nisanthchunduru)'s [vscode-copy-filepath-with-line-number](https://github.com/nisanthchunduru/vscode-copy-filepath-with-line-number).


