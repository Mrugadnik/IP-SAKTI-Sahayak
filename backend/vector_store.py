import chromadb
from chromadb.config import Settings
from typing import List, Dict, Tuple
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class VectorStore:
    """Manage ChromaDB vector storage for RAG."""
    
    def __init__(self, persist_directory: str = "./chroma_db"):
        self.persist_directory = persist_directory
        self.client = chromadb.PersistentClient(path=persist_directory)
        self.collection_name = "ip_documents"
        self.collection = self._get_or_create_collection()
        logger.info(f"Vector store initialized at {persist_directory}")
    
    def _get_or_create_collection(self):
        """Get or create the ChromaDB collection."""
        try:
            collection = self.client.get_collection(name=self.collection_name)
            logger.info(f"Loaded existing collection: {self.collection_name}")
            return collection
        except:
            collection = self.client.create_collection(
                name=self.collection_name,
                metadata={"hnsw:space": "cosine"}
            )
            logger.info(f"Created new collection: {self.collection_name}")
            return collection
    
    def add_chunks(self, chunks: List[Dict[str, any]], embeddings: List[List[float]]):
        """
        Add chunks and embeddings to the vector store.
        
        Args:
            chunks: List of chunk dictionaries with metadata
            embeddings: List of embedding vectors
        """
        ids = [f"{chunk['document_name']}_p{chunk['page_num']}_c{chunk['chunk_id']}" for chunk in chunks]
        texts = [chunk['text'] for chunk in chunks]
        metadatas = [
            {
                'document_name': chunk['document_name'],
                'page_num': str(chunk['page_num']),
                'chunk_id': str(chunk['chunk_id']),
                'chunk_index': str(chunk['chunk_index'])
            }
            for chunk in chunks
        ]
        
        self.collection.add(
            ids=ids,
            documents=texts,
            embeddings=embeddings,
            metadatas=metadatas
        )
        logger.info(f"Added {len(chunks)} chunks to vector store")
    
    def query(self, query_embedding: List[float], n_results: int = 5) -> Dict[str, any]:
        """
        Query the vector store for similar chunks.
        
        Args:
            query_embedding: Embedding vector for the query
            n_results: Number of results to return
            
        Returns:
            Dictionary with results including documents, metadatas, and distances
        """
        results = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results,
            include=['documents', 'metadatas', 'distances']
        )
        logger.info(f"Retrieved {len(results['ids'][0])} chunks")
        return results
    
    def get_collection_stats(self) -> Dict[str, any]:
        """Get statistics about the collection."""
        count = self.collection.count()
        logger.info(f"Collection has {count} chunks")
        return {'chunk_count': count}
    
    def get_all_documents(self) -> List[Dict[str, any]]:
        """Get all unique documents in the collection."""
        results = self.collection.get(include=['metadatas'])
        unique_docs = set()
        for metadata in results['metadatas']:
            unique_docs.add(metadata['document_name'])
        return list(unique_docs)
