import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Search, Database, ArrowRight } from 'lucide-react'

const Home = () => {
  const [stats, setStats] = useState({ documents: 0, chunks: 0 })

  useEffect(() => {
    fetch('http://localhost:8000/status')
      .then(res => res.json())
      .then(data => setStats({ documents: data.documents_indexed, chunks: data.total_chunks }))
      .catch(err => console.error('Error fetching stats:', err))
  }, [])

  const quickQuestions = [
    "Can traditional Ayurvedic knowledge be patented?",
    "What is Section 3(p) of the Patents Act?",
    "How does TKDL protect traditional knowledge?",
    "What is ABS compliance in India?"
  ]

  return (
    <div className="max-w-6xl">
      {/* Hero Section */}
      <div className="mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-deepBlue/5 to-saffron/5 rounded-2xl" />
        <div className="relative">
          <h1 className="text-5xl font-bold text-deepBlue mb-4 leading-tight">
            Evidence-Backed IP Guidance for<br />
            <span className="text-saffron">Ayurveda & Traditional Knowledge</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl">
            IP-SAKTI Sahayak uses real RAG (Retrieval-Augmented Generation) to provide accurate, 
            cited answers from actual IP documents. No hallucinations, no fake sources.
          </p>
          <div className="flex gap-4 mb-8">
            <Link
              to="/ask"
              className="bg-deepBlue text-white px-8 py-4 rounded-lg hover:bg-blue-900 transition-all font-medium flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              Ask IP-SAKTI
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Quick Questions */}
          <div className="bg-white/80 backdrop-blur rounded-lg p-4 border border-lightGray">
            <p className="text-sm font-medium text-gray-700 mb-3">Try asking:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, i) => (
                <Link
                  key={i}
                  to="/ask"
                  state={{ question: q }}
                  className="text-sm px-3 py-1.5 bg-deepBlue/5 text-deepBlue rounded-full hover:bg-deepBlue/10 transition-colors cursor-pointer"
                >
                  {q}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        <div className="bg-gradient-to-br from-deepBlue to-blue-900 rounded-xl p-6 text-white shadow-lg">
          <Database className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-3xl font-bold mb-1">{stats.documents}</div>
          <div className="text-sm opacity-80">Documents Indexed</div>
        </div>
        <div className="bg-gradient-to-br from-saffron to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <BookOpen className="w-8 h-8 mb-2 opacity-80" />
          <div className="text-3xl font-bold mb-1">{stats.chunks}</div>
          <div className="text-sm opacity-80">Knowledge Chunks</div>
        </div>
      </div>

      {/* How It Works */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-deepBlue mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-lightGray">
            <div className="w-12 h-12 bg-deepBlue/10 rounded-lg flex items-center justify-center mb-4">
              <Search className="w-6 h-6 text-deepBlue" />
            </div>
            <h3 className="font-semibold text-deepBlue mb-2">ASK</h3>
            <p className="text-gray-600 text-sm">
              Submit your question about Ayurveda IP, traditional knowledge protection, or Indian IP law.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-lightGray">
            <div className="w-12 h-12 bg-deepBlue/10 rounded-lg flex items-center justify-center mb-4">
              <Database className="w-6 h-6 text-deepBlue" />
            </div>
            <h3 className="font-semibold text-deepBlue mb-2">RETRIEVE</h3>
            <p className="text-gray-600 text-sm">
              System searches indexed documents and retrieves the most relevant chunks with page numbers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg border border-lightGray">
            <div className="w-12 h-12 bg-deepBlue/10 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-deepBlue" />
            </div>
            <h3 className="font-semibold text-deepBlue mb-2">UNDERSTAND</h3>
            <p className="text-gray-600 text-sm">
              Get a grounded answer with actual citations, evidence, and source references.
            </p>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-deepBlue mb-6">Key Features</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-saffron rounded-full mt-2" />
            <div>
              <h4 className="font-semibold text-deepBlue">Grounded in Real Documents</h4>
              <p className="text-gray-600 text-sm">Every answer is backed by actual document excerpts with page numbers.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-saffron rounded-full mt-2" />
            <div>
              <h4 className="font-semibold text-deepBlue">Covers Indian IP Law</h4>
              <p className="text-gray-600 text-sm">Includes Patents Act, TKDL, and biodiversity regulations.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-2 h-2 bg-saffron rounded-full mt-2" />
            <div>
              <h4 className="font-semibold text-deepBlue">Designed for Researchers</h4>
              <p className="text-gray-600 text-sm">Professional interface with transparent RAG process visualization.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-lightGray rounded-lg p-6">
        <p className="text-sm text-gray-600">
          <strong>Disclaimer:</strong> IP-SAKTI Sahayak is an academic prototype developed for SIH 2024. 
          The content provided is for informational purposes only and does not constitute legal advice. 
          Always consult qualified legal professionals for IP matters.
        </p>
      </div>
    </div>
  )
}

export default Home
