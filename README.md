# IP-SAKTI Sahayak

A real RAG-based Ayurveda & Traditional Knowledge IP assistant for SIH 2026.

## Features

- **Real RAG Implementation**: PDF → text extraction → page-aware chunking → embeddings → ChromaDB → retrieval → LLM answer
- **Evidence-Backed Answers**: Every answer includes actual retrieved chunks with document names, page numbers, and relevance scores
- **Transparent Process**: "Show RAG Process" visualization shows the complete pipeline from question to answer
- **Professional UI**: Clean design with off-white background, deep blue and saffron accents

## Tech Stack

### Backend
- Python + FastAPI
- ChromaDB (Vector Database)
- Sentence Transformers (`all-MiniLM-L6-v2`) - Embeddings
- PyMuPDF (PDF Processing)
- Groq API (Llama 3) - LLM

### Frontend
- React + TypeScript
- Tailwind CSS
- React Router
- Lucide Icons

## Setup

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
```

3. Activate the virtual environment:
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file with your Groq API key:
```bash
cp .env.example .env
```

Edit `.env` and add your Groq API key:
```
GROQ_API_KEY=your_actual_groq_api_key_here
CHROMA_PERSIST_DIRECTORY=./chroma_db
EMBEDDING_MODEL=all-MiniLM-L6-v2
```

6. Run the backend server:
```bash
python main.py
```

The backend will run on `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## Usage

1. **Upload Documents**: Go to "Knowledge Base" and upload PDF documents about IP law, Ayurveda, and traditional knowledge
2. **Ask Questions**: Go to "Ask IP-SAKTI" and submit questions about IP topics
3. **View Evidence**: Each answer shows the retrieved chunks with document names, page numbers, and relevance scores
4. **Explore RAG Process**: Click "Show RAG Process" to see how the system processes your question

## API Endpoints

- `POST /upload` - Upload and index a PDF document
- `POST /query` - Query the RAG system with a question
- `GET /status` - Get system status (indexed documents, chunks)
- `GET /documents` - Get list of indexed documents

## RAG Pipeline

1. **Document Ingestion**: PDF text extraction with PyMuPDF, tracking page numbers
2. **Chunking**: Page-aware chunks (500 chars) with 50-char overlap
3. **Embedding**: Sentence Transformers (all-MiniLM-L6-v2) generates 384-dim vectors
4. **Storage**: ChromaDB with cosine similarity
5. **Query**: Question embedding → retrieve top 5 chunks
6. **Generation**: Groq API (Llama 3) with retrieved context, instructed to cite sources

## Important Notes

- The system only uses retrieved context for answers
- If evidence is insufficient, it clearly states so
- Answers are grounded in retrieved context and source information
- If sufficient evidence is unavailable, the system states that instead of guessing
- API keys are stored in `.env` only
- This is an academic prototype for SIH 2026, not legal advice

## Disclaimer

IP-SAKTI Sahayak is an academic prototype developed for Smart India Hackathon 2026. The system provides AI-assisted informational guidance based on retrieved documents. Content is for informational purposes only and does not constitute legal advice. Always consult qualified legal professionals for IP matters.
