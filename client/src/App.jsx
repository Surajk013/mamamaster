import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import './App.css'
import Hero from './pages/Home'

// Placeholder components
const About = () => <div className="p-8">About Us</div>
const Courses = () => <div className="p-8">Courses</div>
const Testimonials = () => <div className="p-8">Testimonials</div>
const Contact = () => <div className="p-8">Contact Us</div>
const SignIn = () => <div className="p-8">Sign-in</div>
const Register = () => <div className="p-8">Register</div>

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
