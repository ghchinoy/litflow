import { describe, it, expect, vi } from 'vitest';
import { LitFlowRunner } from './lit-flow-runner.js';
import { GraphDescriptor } from '@breadboard-ai/types';

describe('LitFlowRunner (Real Engine)', () => {
  it('should run a simple noop graph', async () => {
    const graph: GraphDescriptor = {
      title: 'Noop Graph',
      nodes: [
        { id: 'node1', type: 'echo', configuration: { text: 'hello' } },
        { id: 'node2', type: 'echo' }
      ],
      edges: [
        { from: 'node1', to: 'node2', out: 'text', in: 'text' }
      ]
    };

    const runner = new LitFlowRunner(graph);
    
    const nodeStartSpy = vi.fn((id) => console.log('Test: nodestart', id));
    runner.addEventListener('nodestart', (e: any) => {
      nodeStartSpy(e.detail.data.node.id);
    });

    runner.addEventListener('nodeend', (e: any) => {
      console.log('Test: nodeend', e.detail.data.node.id);
    });

    const endSpy = vi.fn(() => console.log('Test: end'));
    const runComplete = new Promise<void>((resolve) => {
      runner.addEventListener('end', () => {
        endSpy();
        resolve();
      });
    });

    runner.run();
    await runComplete;
    
    expect(nodeStartSpy).toHaveBeenCalledWith('node1');
    expect(nodeStartSpy).toHaveBeenCalledWith('node2');
    expect(endSpy).toHaveBeenCalled();
  });
});
