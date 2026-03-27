# Change Log

All notable changes to the "hbru-vs-code-url-scheme-grabber" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [2.0.0]

Fork of [hipdot-vs-code-url-scheme-grabber](https://github.com/ebetancourt/hipdot-vs-code-url-scheme-grabber).

### Added
- SSH remote support — generates correct `vscode-remote` URIs when connected via SSH
- Context menu sub-menu with all four commands in the editor
- Copy Link + Selection (non-markdown) command

### Changed
- Renamed commands and configuration namespace from `hipdot` to `hbru`
- Use `vscode.workspace.workspaceFolders` instead of deprecated `rootPath`