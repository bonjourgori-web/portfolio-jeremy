import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Formation from './components/Formation'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ShaderBackground from './components/ShaderBackground'
import CustomCursor from './components/CustomCursor'
import CVGenerator from './components/CVGenerator'

function AppInner() {
  useSmoothScroll()
  return (
    <div style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Formation />
      <Contact />
      <CVGenerator />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <ShaderBackground />
      <AppInner />
    </ThemeProvider>
  )
}

export default App
