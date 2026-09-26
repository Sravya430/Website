import { ArrowRight } from 'lucide-react';
export const RagPipeline = () => (
  <figure className="rag-pipeline"><figcaption className="margin-label">Conceptual RAG flow · based on the documented stack</figcaption><ol>{['PostgreSQL question bank','ChromaDB retrieval','OpenAI generation','FastAPI delivery'].map((step,index)=><li key={step}><span className="flow-number">0{index+1}</span><span>{step}</span>{index<3&&<ArrowRight size={17} aria-hidden="true" />}</li>)}</ol><p>Retrieved context supports question generation; the backend exposes it to the web platform.</p></figure>
);
