import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-slate-700">
        <nav className="flex justify-between items-center max-w-5xl mx-auto">
          <h1 className="text-xl font-bold">My Portfolio</h1>
          <ul className="flex gap-6">
            <li>
              <a href="#projects" className="hover:text-cyan-400">
                Projects
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-cyan-400">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cyan-400">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col">
        {/* Hero */}
        <section
          id="hero"
          className="flex-grow flex flex-col items-center justify-center p-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            Hi, I’m Samy
          </h1>
          <p className="text-lg text-slate-400 text-center max-w-2xl">
            A React developer building one‑of‑a‑kind portfolios and modern web
            experiences.
          </p>
        </section>

        {/* Projects */}
        <section id="projects" className="p-8 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold">MagnetarStar</h3>
                <p className="text-slate-400 text-sm mt-1">
                  A unique React portfolio built with Tailwind and Vite.
                </p>
              </div>
              {/* Add more project cards here */}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="p-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-slate-400">
              I’m passionate about creating clean, modern, and interactive
              websites. I love experimenting with React, Tailwind, and subtle
              animations to make things feel alive.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="p-8 bg-slate-800">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Get In Touch</h2>
            <p className="text-slate-400 mb-4">
              Want to work together? Reach out through your preferred channel.
            </p>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-md font-medium transition"
            >
              Click me {count}
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-4 border-t border-slate-700 text-center text-slate-500">
        © {new Date().getFullYear()} Samy – MagnetarStar Portfolio
      </footer>
    </div>
  );
}

export default App;
