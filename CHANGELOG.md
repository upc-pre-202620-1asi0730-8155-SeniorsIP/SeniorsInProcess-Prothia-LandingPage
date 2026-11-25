# Changelog

All notable changes to this project are documented in this file.

This project follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [3.0.1] - 2026-11-24

### Added

- Added Tomás Homola to the team section with his profile photo and localized
  team-member information.

### Changed

- Updated team-member translation keys so every profile has a stable, unique
  identifier.

## [2.0.1] - 2026-11-12

### Changed

- Replaced the placeholder product-video block with an embedded YouTube demo.
- Updated the product-video duration to 01:24 minutes and refined the official
  presentation details.
- Added consistent English and Spanish accessibility labels for the video
  embed.

### Removed

- Removed the temporary poster-style product-video placeholder and its unused
  modal playback controls.

## [2.0.0] - 2026-11-12

### Added

- Added an embedded YouTube video to the About the Team section.
- Added localized English and Spanish accessibility text for team media.

### Changed

- Updated the About the Team media presentation for a clearer, more engaging
  product experience.
- Removed trust-item content from the final call-to-action banner.

### Removed

- Removed the temporary team-video placeholder and the associated modal
  playback controls.

## [1.0.1] - 2026-11-08

### Added

- Added a footer language selector for English and Spanish.
- Added persisted language selection using browser storage.
- Applied localization to the security, consent, privacy, terms, and
  accessibility legal pages.

### Changed

- Updated call-to-action copy and routing so the localized experience directs
  users to the hosted Prothia web application.
- Added responsive styling for the footer language controls.

## [1.0.0] - 2026-09-17

### Added

- Released the initial public Prothia landing page.
- Added an animated responsive hero sequence and dedicated sections for
  audiences, features, plans, testimonials, team, FAQ, and calls to action.
- Added English and Spanish internationalization for the landing page.
- Added standalone terms of service, privacy, accessibility, informed consent,
  and medical data security pages.
- Added demo-request and registration calls to action.
- Added the initial project assets, scripts, styles, and footer navigation.

### Changed

- Consolidated shared front-end styles in `css/styles.css` for responsive,
  maintainable layout behavior.
- Updated page interactions and navigation through `js/main.js` and
  `js/translations.js`.

### Removed

- Removed the standalone contact section in favor of a focused conversion
  flow.
