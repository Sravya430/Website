import React from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MarkerType,
  type Edge,
  type Node
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  { 
    id: '1', 
    data: { label: '📄 PDF/Data' }, 
    position: { x: 0, y: 100 },
    style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6', borderRadius: '8px' }
  },
  { 
    id: '2', 
    data: { label: '🔪 Chunking' }, 
    position: { x: 200, y: 100 },
    style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6', borderRadius: '8px' }
  },
  { 
    id: '3', 
    data: { label: '🔢 Embedding' }, 
    position: { x: 400, y: 100 },
    style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6', borderRadius: '8px' }
  },
  { 
    id: '4', 
    data: { label: '🗄️ Vector DB' }, 
    position: { x: 600, y: 100 },
    style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6', borderRadius: '8px' }
  },
  { 
    id: '5', 
    data: { label: '🔍 Retriever' }, 
    position: { x: 600, y: 250 },
    style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6', borderRadius: '8px' }
  },
  { 
    id: '6', 
    data: { label: '🤖 LLM Response' }, 
    position: { x: 400, y: 250 },
    style: { background: '#1e293b', color: '#fff', border: '1px solid #3b82f6', borderRadius: '8px' }
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, style: { stroke: '#3b82f6' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, style: { stroke: '#3b82f6' } },
  { id: 'e3-4', source: '3', target: '4', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, style: { stroke: '#3b82f6' } },
  { id: 'e4-5', source: '4', target: '5', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, style: { stroke: '#3b82f6' } },
  { id: 'e5-6', source: '5', target: '6', animated: true, markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, style: { stroke: '#3b82f6' } },
];

export const RagPipeline: React.FC = () => {
  return (
    <div className="h-[400px] w-full border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll={false}
        zoomOnScroll={false}
        zoomOnPinch={false}
        zoomOnDoubleClick={false}
        preventScrolling={true}
      >
        <Background color="#334155" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};
