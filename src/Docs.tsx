import './Docs.css';
import { DocsDataHeader, SectionContent } from './DocsData.ts';
import challengeIcon from "./assets/challenge.svg"; 
import {formattedDate} from "./components/currentDate.ts";

function Docs() {
   const scrollToSection = (sectionId: string) => {
      const element = document.getElementById(sectionId);
      if (element) {
         element.scrollIntoView({ behavior: 'smooth' });
      }
   };

   const openLink = (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer"); // ✅ Opens in a new tab
  };

   return (
      <>
      <div className = "card-container" style={{padding: '0'}}>
      <div className="card challenges-card-doc">
            <div className="challenge-icon-container"> 
                <img src={challengeIcon} alt="Challenges Icon" className="challenge-icon" />
            </div>
            <h2 className="challenges-title">{DocsDataHeader.title}</h2>
            <h3 className = "last-updated"> Last Updated: {formattedDate}</h3>
      </div>
      <div className="card yellow-card">
         <h2 className="links-title">Chapters</h2>
         <div className='docs-container'>
               <div className="links-buttons">
                  <button className="link-button" onClick={() => scrollToSection('summary')}>
                     Summary
                  </button>
                  <button className="link-button" onClick={() => scrollToSection('units')}>
                        Units
                  </button>
                  <button className="link-button" onClick={() => scrollToSection('basics')}>
                     Basics
                  </button>
                  <button className="link-button" onClick={() => scrollToSection('challenges')}>
                     Challenges
                  </button>
                  <button className="link-button" onClick={() => scrollToSection('abilities')}>
                     Abilities
                  </button>
                  <button className="link-button" onClick={() => scrollToSection('rules')}>
                     Rules
                  </button>
               </div>
         </div>
      </div>
      <div className="card blue-card">
         <h2 className="links-title">Navigation</h2>
         <div className='docs-container'>
               <div className="links-buttons">
                  <button className="link-button" onClick={() => openLink("https://www.google.com/maps/d/edit?mid=1LHKAo0nFRiNAQa3ab6kPW4-RpA7OGSA&usp=sharing")}>
                     Map
                  </button>
                  <button className="link-button" onClick={() => openLink("/")}>
                     Back to Home
                  </button>
               </div>
         </div>
      </div>
      {SectionContent.map((content: any) => (
         <section key={content.sectionid} id={content.sectionid} className='docs-section'>
            <div className={`card ${content.sectionColor}`}>
            <h2>{content.sectionHeader}</h2>
            <div className="docs-section-content" dangerouslySetInnerHTML={{__html:content.sectionContent}}></div>
            </div>
         </section>
      ))}

      </div>
      </>
   )
};

export default Docs;
