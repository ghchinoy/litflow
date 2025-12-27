import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Position } from '@xyflow/system';
import './lit-handle';

@customElement('lit-gemini-prompt-node')
export class LitGeminiPromptNode extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String, attribute: 'data-id', reflect: true })
  nodeId = '';

  @property({ type: Object })
  set data(val: any) {
    this._data = val;
    if (val.prompt) this.prompt = val.prompt;
  }
  get data() { return this._data; }
  private _data: any = {};

  @property({ type: String })
  prompt = '';

  private _onInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.prompt = target.value;
    this.dispatchEvent(new CustomEvent('node-data-change', {
      bubbles: true,
      composed: true,
      detail: { id: this.nodeId, data: { prompt: this.prompt } }
    }));
  }

  render() {
    return html`
      <div class="gemini-node prompt-node" style="
        padding: 12px;
        background: var(--md-sys-color-surface-container-high);
        border-radius: 12px;
        width: 200px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 8px;
        border: 1px solid var(--md-sys-color-outline-variant);
        text-align: left;
      ">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 18px;">✨</span>
          <span style="font-size: 12px; font-weight: bold; color: var(--md-sys-color-primary);">GEMINI PROMPT</span>
        </div>
        <textarea
          style="
            width: 100%;
            height: 80px;
            border-radius: 8px;
            border: 1px solid var(--md-sys-color-outline);
            padding: 8px;
            font-family: inherit;
            font-size: 12px;
            resize: none;
            box-sizing: border-box;
            background: var(--md-sys-color-surface);
            color: var(--md-sys-color-on-surface);
          "
          placeholder="Enter prompt..."
          .value="${this.prompt}"
          @input="${this._onInput}"
        ></textarea>
        <button
          style="
            width: 100%;
            padding: 8px;
            border-radius: 8px;
            border: none;
            background: var(--md-sys-color-primary);
            color: var(--md-sys-color-on-primary);
            font-size: 12px;
            font-weight: bold;
            cursor: pointer;
          "
          @click="${() => this.dispatchEvent(new CustomEvent('gemini-generate', { bubbles: true, composed: true, detail: { id: this.nodeId, prompt: this.prompt } }))}"
        >
          Generate
        </button>
        <lit-handle type="source" data-handlepos="${Position.Bottom}" data-nodeid="${this.nodeId}"></lit-handle>
      </div>
    `;
  }
}
