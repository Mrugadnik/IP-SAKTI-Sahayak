from sentence_transformers import SentenceTransformer
from typing import List
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class EmbeddingGenerator:
    """Generate embeddings using Sentence Transformers."""
    
    def __init__(self, model_name: str = "all-MiniLM-L6-v2"):
        logger.info(f"Loading embedding model: {model_name}")
        self.model = SentenceTransformer(model_name)
        logger.info("Embedding model loaded successfully")
    
    def generate_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Generate embeddings for a list of texts.
        
        Args:
            texts: List of text strings
            
        Returns:
            List of embedding vectors
        """
        logger.info(f"Generating embeddings for {len(texts)} texts")
        embeddings = self.model.encode(texts, show_progress_bar=True)
        logger.info(f"Generated embeddings with shape: {embeddings.shape}")
        return embeddings.tolist()
    
    def generate_query_embedding(self, query: str) -> List[float]:
        """
        Generate embedding for a single query.
        
        Args:
            query: Query string
            
        Returns:
            Embedding vector
        """
        logger.info(f"Generating embedding for query: {query[:50]}...")
        embedding = self.model.encode(query)
        return embedding.tolist()
