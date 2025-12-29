import { expect, test, describe } from 'vitest';
import { html, fixture } from '@open-wc/testing';
import './lit-schema-node';
import { LitSchemaNode } from './lit-schema-node';

describe('LitSchemaNode', () => {
  test('is defined', () => {
    const el = document.createElement('lit-schema-node');
    expect(el).toBeInstanceOf(LitSchemaNode);
  });

  test('renders header label from data', async () => {
    const el = await fixture<LitSchemaNode>(html`
      <lit-schema-node .data="${{ label: 'Gemini 3 Flash' }}"></lit-schema-node>
    `);
    const header = el.querySelector('.header');
    expect(header?.textContent).toContain('Gemini 3 Flash');
  });

  test('renders input handles based on schema', async () => {
    const schema = {
      type: 'object',
      properties: {
        prompt: { title: 'User Prompt', type: 'string' },
        temperature: { title: 'Temperature', type: 'number' }
      }
    };
    
    const el = await fixture<LitSchemaNode>(html`
      <lit-schema-node .data="${{ inputSchema: schema }}"></lit-schema-node>
    `);
    
    const inputs = el.querySelectorAll('.port.input');
    expect(inputs.length).toBe(2);
    
    const labels = Array.from(el.querySelectorAll('.port.input label')).map(l => l.textContent);
    expect(labels).toContain('User Prompt');
    expect(labels).toContain('Temperature');
    
    const handles = el.querySelectorAll('lit-handle[type="target"]');
    expect(handles.length).toBe(2);
  });

  test('renders output handles based on schema', async () => {
    const schema = {
      type: 'object',
      properties: {
        text: { title: 'Result Text', type: 'string' }
      }
    };
    
    const el = await fixture<LitSchemaNode>(html`
      <lit-schema-node .data="${{ outputSchema: schema }}"></lit-schema-node>
    `);
    
    const outputs = el.querySelectorAll('.port.output');
    expect(outputs.length).toBe(1);
    
    const labels = Array.from(el.querySelectorAll('.port.output label')).map(l => l.textContent);
    expect(labels).toContain('Result Text');
    
    const handles = el.querySelectorAll('lit-handle[type="source"]');
    expect(handles.length).toBe(1);
  });
});
