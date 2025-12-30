import { describe, it, expect } from 'vitest';
import { createPlan } from '../runtime/static/create-plan.js';
import { GraphDescriptor } from '@breadboard-ai/types';

describe('Breadboard Orchestrator (Synced)', () => {
  it('should create an execution plan for a simple graph', () => {
    const graph: GraphDescriptor = {
      nodes: [
        { id: 'input', type: 'input' },
        { id: 'echo', type: 'echo' },
        { id: 'output', type: 'output' }
      ],
      edges: [
        { from: 'input', to: 'echo', out: 'text', in: 'text' },
        { from: 'echo', to: 'output', out: 'text', in: 'text' }
      ]
    };

    const plan = createPlan(graph);

    // Verify stages
    expect(plan.stages.length).toBeGreaterThan(0);
    
    // Stage 0 should contain input
    const stage0Ids = plan.stages[0].map(p => p.node.id);
    expect(stage0Ids).toContain('input');

    // Stage 1 should contain echo (since it depends on input)
    const stage1Ids = plan.stages[1].map(p => p.node.id);
    expect(stage1Ids).toContain('echo');

    // Stage 2 should contain output
    const stage2Ids = plan.stages[2].map(p => p.node.id);
    expect(stage2Ids).toContain('output');
  });
});
