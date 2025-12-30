import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { Schema } from '@breadboard-ai/types';
import './lit-handle';
import './lit-chiclet';

@customElement('lit-schema-node')
export class LitSchemaNode extends LitElement {
  @property({ type: String })
  label = 'Node';

  @property({ type: Object })
  inputSchema: Schema = { properties: {} };

  @property({ type: Object })
  outputSchema: Schema = { properties: {} };

  @property({ type: Object })
  data: any = {};

  @property({ type: String })
  status: 'idle' | 'working' | 'success' | 'error' = 'idle';

  createRenderRoot() {
    return this;
  }

  render() {
    // Fallback to reading from 'data' if top-level properties are empty
    const inputSchema = this.inputSchema?.properties && Object.keys(this.inputSchema.properties).length > 0 
      ? this.inputSchema 
      : (this.data?.inputSchema || { properties: {} });

    const outputSchema = this.outputSchema?.properties && Object.keys(this.outputSchema.properties).length > 0 
      ? this.outputSchema 
      : (this.data?.outputSchema || { properties: {} });

    const inputs = Object.entries(inputSchema.properties || {});
    const outputs = Object.entries(outputSchema.properties || {});

    return html`
      <style>
        :host {
          --md-sys-color-surface-container: #f3edf7;
          --md-sys-color-on-surface: #1b1b1f;
          --md-sys-color-outline: #74777f;
          --md-sys-color-surface-container-high: #ece6f0;
          --md-sys-color-outline-variant: #c4c6d0;
          --md-sys-color-on-surface-variant: #44474f;
          --md-sys-color-primary: #005ac1;
          --md-sys-color-error: #ba1a1a;
          --md-sys-shape-corner-medium: 12px;
          --md-sys-elevation-1: 0px 1px 3px 1px rgba(0, 0, 0, 0.15);
          display: block;
        }

        .node-container {
          display: flex;
          flex-direction: column;
          min-width: 200px;
          background: var(--md-sys-color-surface-container);
          color: var(--md-sys-color-on-surface);
          border: 1px solid var(--md-sys-color-outline);
          border-radius: var(--md-sys-shape-corner-medium);
          box-shadow: var(--md-sys-elevation-1);
          box-sizing: border-box;
          position: relative;
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .node-container.working {
          border-color: var(--md-sys-color-primary);
          box-shadow: 0 0 8px rgba(0, 90, 193, 0.4);
        }

        .node-container.error {
          border-color: var(--md-sys-color-error);
        }

        /* Selected state style injection from parent would be needed, or we check attribute manually */
        :host([selected]) .node-container {
          border: 2px solid var(--md-sys-color-primary);
          margin: -1px;
        }

        .header {
          background: var(--md-sys-color-surface-container-high);
          padding: 12px 16px;
          font-weight: 500;
          border-bottom: 1px solid var(--md-sys-color-outline-variant);
          display: flex;
          align-items: center;
          gap: 8px;
          border-radius: var(--md-sys-shape-corner-medium) var(--md-sys-shape-corner-medium) 0 0;
          margin: 0;
        }

        .content {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .port {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 24px;
          width: 100%;
        }

        .port.input {
          justify-content: flex-start;
        }

        .port.output {
          justify-content: flex-end;
        }

        /* Handle Positioning */
        lit-handle {
          position: absolute;
          z-index: 10;
        }
        
        .port.input lit-handle {
          left: -22px !important;
          top: 50%;
          transform: translateY(-50%);
        }

        .port.output lit-handle {
          left: auto !important;
          right: -22px !important;
          top: 50%;
          transform: translateY(-50%);
        }

        label {
          font-size: 12px;
          color: var(--md-sys-color-on-surface-variant);
          pointer-events: none;
        }
      </style>
      <div class="node-container ${this.status}">
        <div class="header">
          <span class="icon">🧩</span>
          <span>${this.data?.label || this.label}</span>
        </div>
        <div class="content">
          ${inputs.length > 0 ? html`
            <div class="inputs">
              ${map(inputs, ([name, schema]: [string, any]) => html`
                <div class="port input">
                  <lit-handle type="target" position="left" data-handleid="${name}" id="${name}"></lit-handle>
                  ${this.data?.[name] 
                    ? html`<lit-chiclet 
                        type="input" 
                        .label="${schema.title || name}" 
                        .value="${this.data[name]}"
                        icon="${schema.behavior?.includes('llm-content') ? '✨' : '📄'}"
                      ></lit-chiclet>`
                    : html`<label>${schema.title || name}</label>`
                  }
                </div>
              `)}
            </div>
          ` : ''}

          ${outputs.length > 0 ? html`
            <div class="outputs">
              ${map(outputs, ([name, schema]: [string, any]) => html`
                <div class="port output">
                  ${this.data?.[name]
                    ? html`<lit-chiclet 
                        type="generative" 
                        .label="${schema.title || name}" 
                        .value="${this.data[name]}"
                        icon="🪄"
                      ></lit-chiclet>`
                    : html`<label>${schema.title || name}</label>`
                  }
                  <lit-handle type="source" position="right" data-handleid="${name}" id="${name}"></lit-handle>
                </div>
              `)}
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }
}