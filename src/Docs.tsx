import './Docs.css';
import { DocsDataHeader, SectionContent } from './DocsData.ts';

function Docs() {
   return (
      <>
      <div className='docs-container'>
         <h1>{DocsDataHeader.title}</h1>
         <h3>{DocsDataHeader.lastUpdated}</h3>
         <img src={DocsDataHeader.imageURL} alt="docs image"></img>
         <div className='docs-header-content' dangerouslySetInnerHTML={{__html:DocsDataHeader.headerContent}}></div>
      </div>
      {SectionContent.map((content: any) => (
         <section key={content.sectionid} id={content.sectionid} className='docs-section'>
            <h2>{content.sectionHeader}</h2>
            <div className="docs-section-content" dangerouslySetInnerHTML={{__html:content.sectionContent}}></div>
         </section>
      ))}
      </>
   )
};

export default Docs;
