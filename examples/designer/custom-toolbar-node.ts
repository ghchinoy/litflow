import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('custom-toolbar-node')
export class CustomToolbarNode extends LitElement {
  createRenderRoot() { return this; }
  
  @property({ type: Object }) data: any = {};
  @property({ type: String }) nodeId = '';
  @property({ type: Boolean }) selected = false;
  @property({ type: Boolean }) resizable = false;

  willUpdate(changedProperties: Map<string, any>) {
    if (this.hasAttribute('selected') !== this.selected) {
      this.selected = this.hasAttribute('selected');
    }
  }

  render() {
    const label = this.data ? this.data.label : '';
    return html`
      <lit-node 
        .data="${this.data}" 
        .nodeId="${this.nodeId}" 
        ?selected="${this.selected}"
        ?resizable="${this.resizable}"
        label="${label}"
      >
        ${this.selected 
          ? html`
            <lit-node-toolbar slot="toolbar">
              <button @click="${(e: MouseEvent) => this._duplicate(e)}">Duplicate</button>
              <button @click="${(e: MouseEvent) => this._delete(e)}" style="color: var(--md-sys-color-error)">Delete</button>
            </lit-node-toolbar>` 
          : ''
        }
        <div style="padding: 10px; font-size: 12px; color: #666;">
          Custom content area.
        </div>
      </lit-node>
    `;
  }

  _duplicate(e: MouseEvent) {
    e.stopPropagation();
    const flow = document.getElementById('flow') as any;
    const node = flow.nodes.find((n: any) => n.id === this.nodeId);
    if (!node) return;
    
    const newNode = JSON.parse(JSON.stringify(node));
    newNode.id = 'node_' + Date.now();
    newNode.position.x += 50;
    newNode.position.y += 50;
    newNode.selected = false;
    
    flow.nodes = [...flow.nodes, newNode];
  }

  _delete(e: MouseEvent) {
    e.stopPropagation();
    const flow = document.getElementById('flow') as any;
    flow.nodes = flow.nodes.filter((n: any) => n.id !== this.nodeId);
  }
}
