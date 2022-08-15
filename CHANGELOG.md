# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed

- Exported name of the IIFE build (`ISO13616`)

### Added
### Changed

- Moved CI/CD to GitHub Actions
- Updated dependencies

### Removed


## [3.0.0] - 2021-06-16

### Added

- Typescript types
- ES Modules
- `match` method

### Changed

- Updated CI/CD settings be Node.js versions 12, 14, and 16
- Library rewritten to Typescript
- Instead of a fully static ISO13616 class, all functions are now exported individually (making `[Symbol.match]` no longer a viable option)

### Removed

- **BREAKING** (implicit) default export
- **BREAKING** `[Symbol.match]` syntax, move to using `ISO13616.match` instead


## [2.0.0] - 2020-10-03

### Fixed
- **BREAKING** The full checksum range is 02-98 (ISO13616-1:2020), not 03-99


## [1.0.5] - 2020-09-06

### Changed
- Updated CI/CD settings to use Node.js versions 8-14, removing Node.js 7

### Security
- Updated to the latest versions of dependencies (acorn, lodash, handlebars (dev) subdependencies)

## [1.0.4] - 2019-08-28

### Changed
- Updated [@konfirm/iso7064](https://github.com/konfirm/node-iso7064), allowing for more efficient configuration of the Mod97_10 calculator

## [1.0.3] - 2019-08-27

### Changed
- Removed unnecessary alphabet declaration

## [1.0.2] - 2019-08-26

### Changed
- Implemented (Immutable) Alphabet instead of string value for checksums

### Security
- Updated dependencies (removed package-lock.json, which possibly holds back updates)


## [1.0.1] - 2019-07-17

### Security
- Updated dependencies to resolve CVE-2019-10744 (lodash < 4.17.13 (dev) subdependency)


## [1.0.0] - 2019-07-03

First release

[unreleased]: https://github.com/konfirm/node-iso13616/compare/v2.0.0...HEAD
[2.0.0]: https://github.com/konfirm/node-iso13616/compare/v1.0.5...v2.0.0
[1.0.5]: https://github.com/konfirm/node-iso13616/compare/v1.0.4...v1.0.5
[1.0.4]: https://github.com/konfirm/node-iso13616/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/konfirm/node-iso13616/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/konfirm/node-iso13616/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/konfirm/node-iso13616/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/konfirm/node-iso13616/releases/tag/v1.0.0
