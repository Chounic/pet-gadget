import React from 'react';
import Navbar from './components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { faPlus, faMinus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import ProductsList from './components/ProductsList';
import Background from './images/bgImage1.jpg';




library.add(faPlus, faMinus, faTrashAlt);


function App() {



  return (
    <div style={{ /*backgroundImage: "url(" + Background + ")"border: "red solid"*/ backgroundColor: "#e8e8e8"}}>

        <Navbar /> 
        <ProductsList />


    </div>
  );
}

export default App;
