from typing import List, Dict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class Chunker:
    """Create page-aware chunks from extracted text."""
    
    def __init__(self, chunk_size: int = 500, chunk_overlap: int = 50):
        self.chunk_size = chunk_size
        self.chunk_overlap = chunk_overlap
    
    def create_chunks(self, pages: List[Dict[str, any]], document_name: str) -> List[Dict[str, any]]:
        """
        Create page-aware chunks from extracted pages.
        
        Args:
            pages: List of dictionaries with 'page_num' and 'text'
            document_name: Name of the source document
            
        Returns:
            List of chunks with metadata
        """
        chunks = []
        chunk_id = 0
        
        for page in pages:
            text = page['text']
            page_num = page['page_num']
            
            # Split text into chunks
            words = text.split()
            current_chunk = []
            current_length = 0
            
            for word in words:
                current_chunk.append(word)
                current_length += len(word) + 1  # +1 for space
                
                if current_length >= self.chunk_size:
                    chunk_text = ' '.join(current_chunk)
                    chunks.append({
                        'chunk_id': chunk_id,
                        'text': chunk_text,
                        'document_name': document_name,
                        'page_num': page_num,
                        'chunk_index': len([c for c in chunks if c['page_num'] == page_num])
                    })
                    chunk_id += 1
                    
                    # Keep overlap
                    overlap_words = current_chunk[-self.chunk_overlap:] if self.chunk_overlap > 0 else []
                    current_chunk = overlap_words
                    current_length = sum(len(w) + 1 for w in overlap_words)
            
            # Add remaining text as last chunk
            if current_chunk:
                chunk_text = ' '.join(current_chunk)
                chunks.append({
                    'chunk_id': chunk_id,
                    'text': chunk_text,
                    'document_name': document_name,
                    'page_num': page_num,
                    'chunk_index': len([c for c in chunks if c['page_num'] == page_num])
                })
                chunk_id += 1
        
        logger.info(f"Created {len(chunks)} chunks from {len(pages)} pages")
        return chunks
