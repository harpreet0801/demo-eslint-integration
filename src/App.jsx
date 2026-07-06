import './App.css'

function App() {
  return (
    <div className="container">
      <h1>Hello World! 🌍</h1>
      <p>Welcome to your React app with Docker & CI/CD Pipeline</p>
      <div className="info">
        <h2>This app is running in a Docker container with Nginx!</h2>
        <ul>
          <li>Built with React + Vite</li>
          <li>Containerized with Docker</li>
          <li>Served by Nginx</li>
          <li>Deployed via CI/CD Pipeline</li>
        </ul>
      </div>
    </div>
  )
}

export default App
