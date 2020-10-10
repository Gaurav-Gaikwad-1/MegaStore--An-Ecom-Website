import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import {Container} from 'react-bootstrap';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter,Route} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='py-3'>           
          <Container>
            <Route path='/' component={HomeScreen} exact />
            <Route path='/product/:id' component={ProductScreen} />
          </Container>
        </main>
        <Footer /> 
      </BrowserRouter>
    </>
  );
}

export default App;


//1. py-3 is for padding top & bottom side 
//2. we routing ProductScreen component to path '/product/:id' where :id is just a placeholder which means after/product/ it can be anything like 'product/1','product/clothes'