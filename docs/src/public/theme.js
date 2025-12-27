import { css as o } from "lit";
const r = o`
  :host {
    /* Colors - Light Theme Defaults */
    --md-sys-color-primary: #005ac1;
    --md-sys-color-on-primary: #ffffff;
    --md-sys-color-primary-container: #d8e2ff;
    --md-sys-color-on-primary-container: #001a41;
    
    --md-sys-color-secondary: #575e71;
    --md-sys-color-on-secondary: #ffffff;
    --md-sys-color-secondary-container: #dbe2f9;
    --md-sys-color-on-secondary-container: #141b2c;
    
    --md-sys-color-surface: #fefbff;
    --md-sys-color-on-surface: #1b1b1f;
    --md-sys-color-surface-variant: #e1e2ec;
    --md-sys-color-on-surface-variant: #44474f;
    
    --md-sys-color-outline: #74777f;
    --md-sys-color-outline-variant: #c4c6d0;
    
    --md-sys-color-background: #fefbff;
    --md-sys-color-on-background: #1b1b1f;

    --md-sys-color-error: #ba1a1a;
    --md-sys-color-on-error: #ffffff;

    /* Typography */
    --md-sys-typescale-body-medium-font: Roboto, sans-serif;
    --md-sys-typescale-body-medium-size: 14px;
    --md-sys-typescale-label-small-size: 11px;
    --md-sys-typescale-label-medium-size: 12px;

    /* Elevation */
    --md-sys-elevation-1: 0px 1px 3px 1px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
    --md-sys-elevation-2: 0px 2px 6px 2px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.3);
    
    /* Shape */
    --md-sys-shape-corner-small: 8px;
    --md-sys-shape-corner-medium: 12px;
    --md-sys-shape-corner-extra-small: 4px;

    /* LitFlow Specific Tokens (mapped to M3) */
    --lit-flow-node-bg: var(--md-sys-color-surface);
    --lit-flow-node-border: var(--md-sys-color-outline-variant);
    --lit-flow-node-selected-border: var(--md-sys-color-primary);
    --lit-flow-node-text: var(--md-sys-color-on-surface);
    
    --lit-flow-handle-source: var(--md-sys-color-secondary);
    --lit-flow-handle-target: var(--md-sys-color-primary);
    --lit-flow-handle-outline: var(--md-sys-color-surface);

    --lit-flow-controls-bg: var(--md-sys-color-surface);
    --lit-flow-controls-button-text: var(--md-sys-color-on-surface);
    
    --lit-flow-minimap-bg: var(--md-sys-color-surface);
    --lit-flow-minimap-mask: rgba(0, 0, 0, 0.08);
  }
`;
export {
  r as m3Tokens
};
//# sourceMappingURL=theme.js.map
