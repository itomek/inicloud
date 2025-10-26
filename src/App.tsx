import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Checkov from './components/Checkov'
import WindowSize from './components/WindowSize'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/checkov" element={<Checkov />} />
        <Route path="/window-size" element={<WindowSize />} />
      </Routes>
    </Router>
  )
}

export default App
