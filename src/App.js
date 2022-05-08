import './App.css';
import React from 'react';
import Header from './pages/Header';
import Message from './pages/Message';
import Products from './pages/Products';
import useLocalStorageState from './utils/useLocalStorageState';
import Footer from './pages/Footer';
import Navbar from './pages/Navbar';
import Cart from './pages/Cart';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import staticProducts from './data/static-products.json';
import Contacts from './pages/contacts';
import Sets from './pages/Sets';
import Home from './pages/Home';
import Promotions from './pages/Promotions';
import News from './pages/News';
import Hotrolls from './pages/Hotrolls';
import Drinks from './pages/Drinks';
import About from './pages/about';
import SushiGunk from './pages/SushiGunk';
import sushiGunk from './data/sushigunk.json';

/* import 'bootstrap/dist/css/bootstrap.min.css'; */
/* import { Button } from 'react-bootstrap'; */
/* import { NaviBar } from './components/Navibar'; */
/* import { Switch } from '@mui/material'; */
/* import { Route } from 'react-router-dom'; */

function withStaticProducts(cart){
    for (let stat of staticProducts){
        if (!cart.find(item => item.name === stat.name)){
            cart.push({...stat});
        }
    }

    cart.sort((left, right) => {
        if (left.isStatic !== right.isStatic){
            return left.isStatic ? 1 : -1;
        }

        return 0;
    })

    return cart;
}


// import ParticlesBackground from './components/ParticlesBackground';


function App() {
    //     return (
    //         <div className='App'>

    //             <ParticlesBackground/>


    //         </div>
    //     )
    // }


    const history = useHistory();

    const [message, setMessage] = React.useState();
    const [cart, setCart] = useLocalStorageState("myStorage", "cart", []);
    const [sidebar, setSidebar] = React.useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [cartOpen, setCartOpen] = React.useState(false)

    const showMessage = React.useCallback((title, content, img, width) => setMessage({ title, content, img, width }));
    const addToCart = React.useCallback(product => {
        let newCart = [...cart];
        const existing = newCart.find(item => item.name === product.name);
        if (existing) {
            existing.count++;
        } else {
            newCart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                count: 1,
            })
        }
        setCart(withStaticProducts(newCart));
    }, [cart])



    return (
        <div className="App">
            <Router>
                <Navbar setSidebar={setSidebar} showSidebar={showSidebar} sidebar={sidebar} />
            
                <Header showMessage={showMessage} showSidebar={showSidebar} cart={cart} cartOpen={cartOpen} setCartOpen={setCartOpen} />
                <div className='content'>
                    <Switch>
                        <Route path="/contacts">
                            <Contacts/>
                        </Route>
                        <Route path="/sets">
                            <Sets/>
                        </Route>
                        <Route path="/product">
                            <Products addToCart={addToCart} showMessage={showMessage}/>
                        </Route>
                        <Route path="/sushigunk">
                            <SushiGunk/>
                        </Route>
                        <Route path="/promotions">
                            <Promotions/>
                        </Route>
                        <Route path="/news">
                            <News/>
                        </Route>
                        <Route path="/hotrolls">
                            <Hotrolls/>
                        </Route>
                        <Route path="/drinks">
                            <Drinks/>
                        </Route>
                        <Route path="/about">
                            <About/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                        
                    </Switch>
                    
                    <Footer />
                </div>


                {Boolean(message) &&
                    <Message {...message} close={() => setMessage()} />

                }
                {cartOpen && 
                    <Cart cart={cart} setCart={setCart}/>
                }

            </Router>

            
        </div>
    )
}

export default App;
