import { Signal, signal } from '@lit-labs/signals';
import {
  type NodeBase,
  type EdgeBase,
  type InternalNodeBase,
  type CoordinateExtent,
  type NodeOrigin,
  type SnapGrid,
  type Transform,
  type PanZoomInstance,
  infiniteExtent,
} from '@xyflow/system';

export interface FlowState {
  nodes: Signal<NodeBase[]>;
  edges: Signal<EdgeBase[]>;
  nodeLookup: Map<string, InternalNodeBase>;
  parentLookup: Map<string, Map<string, InternalNodeBase>>;
  nodeExtent: CoordinateExtent;
  snapGrid: SnapGrid;
  snapToGrid: boolean;
  nodeOrigin: NodeOrigin;
  multiSelectionActive: boolean;
  transform: Signal<Transform>;
  autoPanOnNodeDrag: boolean;
  nodesDraggable: boolean;
  selectNodesOnDrag: boolean;
  nodeDragThreshold: number;
  panZoom: PanZoomInstance | null;
  domNode: Element | null;
}

export function createInitialState(): FlowState {
  return {
    nodes: signal([]),
    edges: signal([]),
    nodeLookup: new Map(),
    parentLookup: new Map(),
    nodeExtent: infiniteExtent,
    snapGrid: [15, 15],
    snapToGrid: false,
    nodeOrigin: [0, 0],
    multiSelectionActive: false,
    transform: signal([0, 0, 1]),
    autoPanOnNodeDrag: true,
    nodesDraggable: true,
    selectNodesOnDrag: true,
    nodeDragThreshold: 0,
    panZoom: null,
    domNode: null,
  };
}