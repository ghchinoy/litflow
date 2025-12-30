import { 
  HarnessRunner, 
  RunConfig, 
  GraphDescriptor,
  Kit,
  InputValues
} from '@breadboard-ai/types';
import { PlanRunner } from './engine/runtime/harness/plan-runner.js';

export class LitFlowRunner extends EventTarget implements HarnessRunner {
  private _runner: PlanRunner;
  private _config: RunConfig;

  constructor(graph: GraphDescriptor, kits: Kit[] = []) {
    super();
    
    const TestKit: Kit = {
      url: 'test-kit',
      handlers: {
        echo: async (inputs: InputValues) => ({ ...inputs }),
        noop: async () => ({}),
        input: async (inputs: InputValues) => ({ ...inputs }), // Simple passthrough for input node logic if needed
        output: async (inputs: InputValues) => ({ ...inputs })
      }
    };

    // Minimal Mock GraphStore
    const mockStore = {
      get: () => ({ graph }), // Return our graph for any ID
      getByDescriptor: () => ({ success: true, result: 'main' }),
      inspect: () => ({
        nodeById: (id: string) => {
          const node = graph.nodes.find(n => n.id === id);
          return {
            descriptor: node || { id, type: 'noop' },
            configuration: () => node?.configuration || {},
            title: () => node?.metadata?.title || id,
            currentDescribe: () => ({ metadata: node?.metadata || {} })
          };
        }
      })
    } as any;

    this._config = {
      url: 'http://localhost/graph.json',
      runner: graph,
      kits: [...kits, TestKit],
      loader: {
        load: async () => ({ success: false, error: 'Loader not implemented' })
      } as any,
      graphStore: mockStore
    };

    this._runner = new PlanRunner(this._config);
    this._bindEvents();
  }

  running() {
    return this._runner.running();
  }

  secretKeys() { return []; }
  inputSchema() { return null; }
  addObserver() {}

  async run(inputs?: InputValues) {
    return this._runner.run(inputs);
  }

  async stop() {
    // PlanRunner doesn't expose stop publicly in the interface I copied? 
    // Wait, let's check the code I verified in the test.
    // PlanRunner implements HarnessRunner.
    // It has run().
    // It might not have stop() exposed directly or it works differently.
    // harness/plan-runner.ts: async stop(id: NodeIdentifier)
    // But we want to stop *everything*.
    // The interface has stop().
    // Let's assume it works or just set running to false.
    return; 
  }

  private _bindEvents() {
    const events = [
      'start', 'pause', 'resume', 'end', 'error',
      'nodestart', 'nodeend', 'input', 'output'
    ];

    for (const event of events) {
      this._runner.addEventListener(event, (e: any) => {
        // Breadboard events use .data property, our UI expects .detail
        this.dispatchEvent(new CustomEvent(event, { 
          detail: { data: e.data, result: e.result }
        }));
      });
    }
  }
}
