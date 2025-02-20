import { useState } from 'react'
import './App.css'
import Card from "./components/card";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Vite + React</h1>
      <Card title="Card 1" difficulty="easy" description="This is the first card." />
      <Card title="Card 1" difficulty="normal" description="This is the first card." />
      <Card title="Card 1" difficulty="hard" description="This is the first card." />
      <p className="read-the-docs">
        Click on the V
      </p>
    </>
  )
}

export default App
