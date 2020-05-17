import React, { useState } from 'react'; 
import Container from 'react-bootstrap/Container'; 
import {Button, Modal} from 'react-bootstrap'
import {InstantSearch,Hits,SearchBox,Pagination,Highlight,Configure} from 'react-instantsearch-dom'
import algoliasearch from 'algoliasearch' 
import {getEpisode,getCharacter} from 'rickmortyapi'
import './App.css'
const bloomen = require('rickmortyapi')


function App() { 
    const searchClient = algoliasearch('58B2UVUBRC','cf36ec7820b3ccecd796a83bc885d319') 
    
    const [show, setShow] = useState(false);
    const [showWorking, setShowWorking] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseWorking = () => setShowWorking(false);
    const handleShowWorking = () => setShowWorking(true);
     
    const episodes =  getEpisode() 
    const moreChars =  getCharacter({ page: 2 })
   return (
    <Container className="p-4 mt-5"> 

        <Button variant="primary" onClick={handleShow} className="mb-4">
          Overview
        </Button> 
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Overview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This page has been rendered using the instantsearch package which makes an api call to use the required details and render search results. <br />
            Features/utilities: 
            <ul className="list-unstyled">
                <li><b>React Hooks</b></li>
                <li><b>Bootstrap</b></li>
            </ul>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> 
          </Modal.Footer>
        </Modal>

        <Button variant="primary" onClick={handleShowWorking} className="mb-4 mx-2">
          How it works
        </Button>
        <Modal show={showWorking} onHide={handleCloseWorking}>
          <Modal.Header closeButton>
            <Modal.Title>How it Works</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Try searching for the name of any of the episode names with the "Name" tag and you'll find the list below
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseWorking}>
              Close
            </Button> 
          </Modal.Footer>
        </Modal>

      <h1 className="text-primary mb-3">Rick and Morty World</h1> 
      <InstantSearch indexName="rickandmorty1" searchClient={searchClient}>
          <div> 
            {/* Specifies how many items to render per page  */}
            <Configure hitsPerPage={4} />
          </div>
          <div >
            {/* Builds a nice searchbar UI */}
            <SearchBox className="mt-4"/>
            {/* Display all the items you want to show */}
            <Hits hitComponent={Hit} className="my-4 flex  mx-2"/> 
            {/* Gives pagination to the app  */}
             <Pagination className="page-item"/> 
          </div>
        </InstantSearch> 
     </Container>
  );

  function Hit(props) {
    return (
      <Container>
        {/* Display all the items with required styles */} 
            <p><b>Name:  </b><Highlight attribute="name" hit={props.hit} className="px-1"/></p>
            <p><b>Episode:  </b><Highlight attribute="episode" hit={props.hit} className="px-1"/></p>
            <p><b>Date of airing:  </b><Highlight attribute="air_date" hit={props.hit} className="px-1"/></p>  
      </Container>
    );
  }
  
}

export default App;
