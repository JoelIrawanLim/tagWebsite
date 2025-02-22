import { useState, useEffect } from 'react'
import './App.css'
import Card from "./components/card";
import TimeCard from "./components/time";
import ChallengesCard from './components/logo';
import LinksCard from "./components/links";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // ✅ Shrinks cards when scrolled > 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      <div className="card-container">
        <div className={`sticky-header ${isScrolled ? "scrolled" : ""}`}>
          <ChallengesCard></ChallengesCard>
        </div>
        <div className="page-content">
          <TimeCard />
          <Card difficulty='easy' />
          <Card difficulty='normal'/>
          <Card difficulty='hard' />
          <LinksCard />
        </div>
      </div>
    </>
  )
}

export default App
