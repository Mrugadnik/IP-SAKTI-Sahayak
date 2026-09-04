import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/ask', label: 'Ask IP-SAKTI' },
    { path: '/classifier', label: 'Formulation Classifier' },
    { path: '/knowledge-base', label: 'Knowledge Base' },
    { path: '/sources', label: 'Sources' },
    { path: '/about', label: 'About' },
  ]

  return (
    <div className="min-h-screen bg-offWhite">
      {/* Header */}
      <header className="bg-white border-b border-lightGray">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-deepBlue">IP-SAKTI SAHAYAK</h1>
              <p className="text-xs text-gray-600">Evidence-backed IP guidance for Ayurveda & Traditional Knowledge</p>
            </div>
          </div>
          <Link
            to="/ask"
            className="bg-deepBlue text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Ask IP-SAKTI
          </Link>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-lightGray min-h-screen p-6">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-4 py-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? 'bg-saffron/10 text-saffron font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* RAG System Status */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">RAG System Status</h3>
            <SystemStatus />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

const SystemStatus = () => {
  const [status, setStatus] = React.useState<{ vector_index_loaded: boolean; documents_indexed: number; total_chunks: number } | null>(null)

  React.useEffect(() => {
    fetch('http://localhost:8000/status')
      .then(res => res.json())
      .then(data => setStatus(data))
      .catch(err => console.error('Error fetching status:', err))
  }, [])

  if (!status) return <div className="text-sm text-gray-500">Loading...</div>

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status.vector_index_loaded ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm text-gray-600">Vector index loaded</span>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${status.documents_indexed > 0 ? 'bg-green-500' : 'bg-yellow-500'}`} />
        <span className="text-sm text-gray-600">{status.documents_indexed} documents indexed</span>
      </div>
    </div>
  )
}

export default Layout
