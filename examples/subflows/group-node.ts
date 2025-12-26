import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('group-node')
export class GroupNode extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String, attribute: 'data-id', reflect: true })
  nodeId = '';

  @property({ type: String, reflect: true })
  type = 'group';

  @property({ type: Boolean })
  collapsed = false;

  @property({ type: String })
  collapsedLabel = '(Collapsed)';

  @property({ type: Object })
  set data(val: any) {
    this._data = val;
    this.collapsed = !!val.collapsed;
    if (val.collapsedLabel) this.collapsedLabel = val.collapsedLabel;
  }

  get data() {
    return this._data;
  }

  private _data: any = {};

  private _toggleCollapse(e: Event) {
    e.stopPropagation();
    // We don't toggle locally anymore; we let the parent flow update the data
    this.dispatchEvent(new CustomEvent('group-collapse', {
      bubbles: true,
      composed: true,
      detail: {
        id: this.nodeId,
        collapsed: !this.collapsed
      }
    }));
  }

  render() {
    return html`
      <div class="group-node-container" style="
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.03);
        border: 2px dashed var(--md-sys-color-outline-variant);
        border-radius: var(--md-sys-shape-corner-small);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        padding: ${this.collapsed ? '8px' : '12px'};
        transition: background 0.2s ease;
        min-width: inherit;
        min-height: inherit;
      ">
        <div style="display: flex; width: 100%; justify-content: space-between; align-items: center; margin-bottom: ${this.collapsed ? '4px' : '10px'};">
          <div style="font-size: 11px; color: var(--md-sys-color-on-surface-variant); text-transform: uppercase; font-weight: bold; pointer-events: none;">
            ${this.data.label}
          </div>
          <button 
            @click="${this._toggleCollapse}"
            style="font-size: 10px; cursor: pointer; padding: 2px 8px; border-radius: 4px; border: 1px solid #ccc; background: white;"
          >
            ${this.collapsed ? 'Expand' : 'Collapse'}
          </button>
        </div>

        ${this.collapsed 
          ? html`
              <div style="flex-grow: 1; display: flex; align-items: center; justify-content: center; color: #666; font-size: 11px; text-align: center; line-height: 1.2;">
                ${this.collapsedLabel}
              </div>
              <lit-handle type="target" data-handlepos="top" data-nodeid="${this.nodeId}"></lit-handle>
              <lit-handle type="source" data-handlepos="bottom" data-nodeid="${this.nodeId}"></lit-handle>
            ` 
          : ''}
      </div>
    `;
  }
}
