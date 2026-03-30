# Code URL Grabber README

Fork of [hipdot-vs-code-url-scheme-grabber](https://github.com/ebetancourt/hipdot-vs-code-url-scheme-grabber).

## Features

This extension adds four commands (also available via the editor context sub-menu `Code URL Grabber`):

* Copy Link to Current File and Line Number.
* Copy Link to Current File and Line Number in Markdown Format.
* Copy Link to Current File and Line Number + Selection.
* Copy Link to Current File and Line Number + Selection in Markdown Format.

Additionally supports SSH-remote and WSL-remote connections.

The remote type (`ssh-remote` or `wsl`) comes from `vscode.env.remoteName`.


### SSH-remote URL example
[vscode://vscode-remote/ssh-remote+192.168.100.1/path/to/file:123](vscode://vscode-remote/ssh-remote%2B192.168.100.1/path/to/file:123)

This extension gets the remote IP from `process.env.SSH_CONNECTION`.
If your ssh-remote connects using the FQDN, **you must specify the FQDN in the settings**.

### WSL-remote URL example
[vscode://vscode-remote/wsl+Ubuntu/path/to/file:123](vscode://vscode-remote/wsl+Ubuntu/path/to/file:123)

... where `Ubuntu` is the name of the WSL distro as seen from the WSL_DISTRO_NAME env variable that is set under WSL.
This extension gets the distro name from `process.env.WSL_DISTRO_NAME`.

## Extension Settings

This extension contributes the following settings, which can be found under the heading "Code URL Grabber":

* `hbruCodeUrlGrabber.includeColumn`: Include the column number in the link to the current file and line number.
* `hbruCodeUrlGrabber.sshRemoteFqdn`: The FQDN of your SSH remote host (use this if ssh-remote is configured to connect using a DNS name instead of IP address). _This is a workaround as I haven't found a way to get the remote FQDN from the API_.
* `hbruCodeUrlGrabber.useVSCodeInsiders`: Use a `vscode-insiders://` scheme so that the link opens in VSCode Insiders.
* `hbruCodeUrlGrabber.useCursor`: Use a `cursor://` scheme so that the link opens in Cursor (In Cursor, the settings are under File -> Preferences -> VS Code settings).

## Known Issues

None yet
( + No support for Dev Containers and Tunnels)


---

## Acknowledgements

Based on the work of [Eric Betancourt](https://github.com/ebetancourt) in [hipdot-vs-code-url-scheme-grabber](https://github.com/ebetancourt/hipdot-vs-code-url-scheme-grabber), which itself was based on [Nisanth Chunduru](https://github.com/nisanthchunduru)'s [vscode-copy-filepath-with-line-number](https://github.com/nisanthchunduru/vscode-copy-filepath-with-line-number).


