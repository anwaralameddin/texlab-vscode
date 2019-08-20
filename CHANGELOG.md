# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.0] - 20.08.2019

### Added

- Provide symbols for BibTeX fields and BibTeX strings
- Provide symbols for LaTeX labels
- Provide DEB, RPM and AUR packages
- Show theorem name when hovering over theorem references
- Show Unicode glyps when completing symbols

### Changed

- Use LocationLink for "peek definition" when possible
- Node.js is no longer a dependency
- Allow installing the language server through a package manager

## [1.3.0] - 06.08.2019

### Added

- Provide document symbols for BibTeX entries and LaTeX sections

### Changed

- Hovering over a package does not require an internet connection anymore
- The Linux server binaries do not depend on `libssl` anymore ([#55](https://github.com/latex-lsp/texlab/issues/55))

### Fixed

- Build cancellation has been reimplemented ([#47](https://github.com/latex-lsp/texlab/issues/47), [#63](https://github.com/latex-lsp/texlab/issues/63))

## [1.2.0] - 23.07.2019

### Added

- Add completion support for `\RequirePackage`
- Filter completion list based on the contents of the reference

### Changed

- The index mechanism has been removed. Packages are now indexed with a script beforehand.

## [1.1.0] - 13.07.2019

### Added

- Add section name and caption to label completion
- Show section name and caption when hovering over labels
- Add some missing kernel commands with stars
- Add support for comma-separated imports
- Add setting to lint after a change occurs

### Changed

- Improve completion at the end of the file

### Fixed

- Fix preselect for environments with missing braces

## [1.0.0] - 04.07.2019

### Added

- Add support citations with multiple keys ([#22](https://github.com/latex-lsp/texlab/issues/22))
- Add support for the cleveref package ([#21](https://github.com/latex-lsp/texlab/issues/21))
- Implement "Go to Definition" for commands ([#15](https://github.com/latex-lsp/texlab/issues/15))
- Provide preview for user-defined commands
- Provide completion and preview for theorem environments

### Changed

- Java is no longer a required dependency
- Node.js is an optional dependency required to display citations
- Reduce extension size
- Download the language server on first usage instead of bundling it with the extension
- Improve performance of completion
- Improve startup time
- The server no longer depends on a workspace folder
- "Find all References" works from a reference instead
  of just the definition ([#25](https://github.com/latex-lsp/texlab/issues/25))
- All configuration items are now optional
- Provide only math labels when completing \eqref
- Preselect the matching environment name ([#29](https://github.com/latex-lsp/texlab/issues/29))

### Fixed

- Let the client decide whether to include the declaration
  when finding all references ([#25](https://github.com/latex-lsp/texlab/issues/25))
- Renaming a label with colons now works as expected ([#30](https://github.com/latex-lsp/texlab/issues/30))
- Handle colons when completing labels and citations ([#30](https://github.com/latex-lsp/texlab/issues/30))
- Do not crash when encountering a BibTeX entry with
  a `crossref` field ([#16](https://github.com/latex-lsp/texlab/issues/16))
- Hovering over uppercase BibTeX fields now shows the documentation
  ([#17](https://github.com/latex-lsp/texlab/issues/17))
- Do not depend on extensions when resolving included files ([#22](https://github.com/latex-lsp/texlab/issues/22))
- Do not depend on the `workspace/configuration` request (#[22](https://github.com/latex-lsp/texlab/issues/22))
- Prevent completion from triggering too often

## [0.4.2] - 10.04.2019

### Fixed

- Fix completion inside `\( \)`. ([#14](https://github.com/latex-lsp/texlab/issues/14))
- Do not crash on invalid requests.

## [0.4.1] - 30.03.2019

### Changed

- Improve startup time

### Fixed

- Improve MiKTeX support ([#8](https://github.com/latex-lsp/texlab-vscode/issues/8))

## [0.4.0] - 09.03.2019

### Added

- Add linting support for LaTeX via [ChkTeX](https://www.nongnu.org/chktex/)

### Changed

- Analyze referenced files that are not part of the current workspace
- Improve completion for includes
- Improve performance of completion

## [0.3.1] - 05.03.2019

### Fixed

- Fix extension bundle

## [0.3.0] - 05.03.2019

### Added

- Show preview when hovering over math expressions
- Show package name when hovering over a command

### Changed

- Store completion database in `~/.texlab` directory

### Fixed

- Fix crash when editing a BibTeX file
- Fix crash when hovering over invalid BibTeX entries
- Fix a bug where the completion does not get triggered correctly

## [0.2.0] - 01.03.2019

### Added

- Show bibliography when completing citations
- Show bibliography when hovering over citations
- Completion for equation references

### Fixed

- Fix completion of file includes
- Prevent server crash when opening a locked file

## [0.1.2] - 16.02.2019

### Fixed

- Do not display an error when PDF viewers return a non-zero
  exit code while performing forward search

## [0.1.1] - 15.02.2019

### Changed

- Reduce installation size

### Fixed

- Fix rendering of completion symbols

## [0.1.0] - 15.02.2019

- Initial release
