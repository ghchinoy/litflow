# Changelog

All notable changes to this project will be documented in this file.

## [0.2.6] - 2025-12-29

### Added
- **Events**: `LitFlow` now dispatches a robust `change` event whenever nodes or edges are updated (including dragging, deletions, and connections). This enables reliable external state synchronization.
- **Example**: New "Inspector Designer" example (`examples/designer/`) showcasing a dual-pane authoring tool with live JSON sync, two-way binding, and auto-apply capabilities.

### Improved
- **State Management**: Added `_notifyChange()` internal helper to ensure consistent event emission across all state mutation paths (setters, internal store updates, interactions).

---
