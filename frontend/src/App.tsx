import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AskIPSakti from './pages/AskIPSakti'
import KnowledgeBase from './pages/KnowledgeBase'
import Sources from './pages/Sources'
import About from './pages/About'
import FormulationClassifier from './pages/FormulationClassifier'
import Layout from './components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={<AskIPSakti />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="/about" element={<About />} />
          <Route path="/classifier" element={<FormulationClassifier />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
