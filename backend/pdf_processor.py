from pypdf import PdfReader
from typing import List, Dict
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class PDFProcessor:
    """Extract text from PDFs with page tracking."""
    
    def __init__(self):
        pass
    
    def extract_text(self, pdf_path: str) -> List[Dict[str, any]]:
        """
        Extract text from PDF with page numbers.
        
        Args:
            pdf_path: Path to PDF file
            
        Returns:
            List of dictionaries with 'page_num' and 'text' keys
        """
        pages = []
        try:
            reader = PdfReader(pdf_path)
            logger.info(f"Opened PDF: {pdf_path} with {len(reader.pages)} pages")
            
            for page_num, page in enumerate(reader.pages):
                text = page.extract_text()
                if text and text.strip():
                    pages.append({
                        'page_num': page_num + 1,  # 1-indexed
                        'text': text.strip()
                    })
            
            logger.info(f"Extracted text from {len(pages)} pages")
            return pages
            
        except Exception as e:
            logger.error(f"Error extracting text from PDF: {e}")
            raise
    
    def get_document_info(self, pdf_path: str) -> Dict[str, any]:
        """Get basic metadata about the PDF."""
        try:
            reader = PdfReader(pdf_path)
            metadata = reader.metadata
            info = {
                'page_count': len(reader.pages),
                'title': metadata.get('/Title', pdf_path.split('/')[-1]) if metadata else pdf_path.split('/')[-1],
                'author': metadata.get('/Author', 'Unknown') if metadata else 'Unknown',
            }
            return info
        except Exception as e:
            logger.error(f"Error getting PDF info: {e}")
            return {'page_count': 0, 'title': pdf_path, 'author': 'Unknown'}
