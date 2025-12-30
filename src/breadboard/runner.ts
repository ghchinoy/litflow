import type { 
  HarnessRunner, 
  RunConfig, 
  RunLifecycleEvent, 
  RunNodeStartEvent, 
  RunNodeEndEvent, 
  RunInputEvent, 
  RunOutputEvent,
  NodeIdentifier
} from '@breadboard-ai/types';

export class MockRunner extends EventTarget implements HarnessRunner {
  config: RunConfig;
  private _running = false;

  constructor(config: RunConfig) {
    super();
    this.config = config;
  }

  running(): boolean {
    return this._running;
  }

  async run(inputs?: Record<string, any>): Promise<boolean> {
    this._running = true;
    this.dispatchEvent(new CustomEvent('start', { detail: { timestamp: Date.now() } }));

    // Simulate graph execution
    await this._simulateNode('prompt', 'working', 500);
    await this._simulateNode('prompt', 'succeeded', 0, { prompt: 'Hello' });

    await this._simulateNode('gemini', 'working', 1500);
    // Simulate output
    this.dispatchEvent(new CustomEvent('output', { 
      detail: { 
        data: { 
          node: { id: 'gemini' }, 
          outputs: { response: 'Hello from Gemini!' } 
        } 
      } 
    }));
    await this._simulateNode('gemini', 'succeeded', 0);

    // Simulate final output node receiving data
    await this._simulateNode('output', 'working', 500);
    // In a real runner, the input event would carry the data. 
    // Here we just simulate the node showing it.
    this.dispatchEvent(new CustomEvent('output', { 
      detail: { 
        data: { 
          node: { id: 'output' }, 
          outputs: { result: 'Hello from Gemini!' } 
        } 
      } 
    }));
    await this._simulateNode('output', 'succeeded', 0);

    this.dispatchEvent(new CustomEvent('end', { detail: { timestamp: Date.now() } }));
    this._running = false;
    return true;
  }

  async stop(): Promise<void> {
    this._running = false;
  }

  private async _simulateNode(id: NodeIdentifier, state: string, delay: number, outputs?: any) {
    if (state === 'working') {
      this.dispatchEvent(new CustomEvent('nodestart', { 
        detail: { data: { node: { id }, timestamp: Date.now() } } 
      }));
    } else if (state === 'succeeded') {
      this.dispatchEvent(new CustomEvent('nodeend', { 
        detail: { data: { node: { id }, outputs, timestamp: Date.now() } } 
      }));
    }

    if (delay) await new Promise(r => setTimeout(r, delay));
  }
}
