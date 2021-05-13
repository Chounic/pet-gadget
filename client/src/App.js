import React from 'react';
import Navbar from './components/Navbar';
import { library } from '@fortawesome/fontawesome-svg-core'; 
import { faPlus, faMinus, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import ProductsList from './components/ProductsList';

library.add(faPlus, faMinus, faTrashAlt);


function App() {



  return (
    <div style={{ border: "red solid", width: "80%"}}>

        <Navbar />
        <ProductsList />


    </div>
  );
}

export default App;
