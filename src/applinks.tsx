import {BrowserRouter, Routes, Route} from 'react-router-dom';
import App from './App';
import Docs from './Docs';

function Links() {
   return (
   <BrowserRouter>
      <Routes>
         <Route path='/' element={<App />} />
         <Route path='/docs' element={<Docs />} />
      </Routes>
   </BrowserRouter>
   )
};

export default Links;
