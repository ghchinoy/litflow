import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { Schema } from '@breadboard-ai/types';
import './lit-handle';
import { m3Tokens } from './theme';

@customElement('lit-schema-node')
export class LitSchemaNode extends LitElement {
  static styles = [
    m3Tokens,
    css`
      :host {
        display: block;
        min-width: 200px;
        background: var(--md-sys-color-surface-container);
        color: var(--md-sys-color-on-surface);
        border: 1px solid var(--md-sys-color-outline);
        border-radius: var(--md-sys-shape-corner-medium);
        box-shadow: var(--md-sys-elevation-1);
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      :host([selected]) {
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
      }

      .port.input {
        justify-content: flex-start;
      }

      .port.output {
        justify-content: flex-end;
      }

      /* Handle Positioning Overrides */
      lit-handle {
        position: absolute;
      }
      
      .port.input lit-handle {
        left: -22px; /* 16px padding + 6px offset */
      }

      .port.output lit-handle {
        right: -22px;
      }

      label {
        font-size: 12px;
        color: var(--md-sys-color-on-surface-variant);
      }
    `
  ];

  @property({ type: String })
  label = 'Node';

  @property({ type: Object })
  inputSchema: Schema = { properties: {} };

  @property({ type: Object })
  outputSchema: Schema = { properties: {} };

  @property({ type: Object })
  data: any = {};

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
      <div class="header">
        <span class="icon">🧩</span>
        <span>${this.data?.label || this.label}</span>
      </div>
      <div class="content">
        ${inputs.length > 0 ? html`
          <div class="inputs">
            ${map(inputs, ([name, schema]) => html`
              <div class="port input">
                <lit-handle type="target" position="left" id="${name}"></lit-handle>
                <label>${schema.title || name}</label>
              </div>
            `)}
          </div>
        ` : ''}

        ${outputs.length > 0 ? html`
          <div class="outputs">
            ${map(outputs, ([name, schema]) => html`
              <div class="port output">
                <label>${schema.title || name}</label>
                <lit-handle type="source" position="right" id="${name}"></lit-handle>
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }
}
