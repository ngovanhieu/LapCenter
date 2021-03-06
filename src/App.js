import logo from './logo.svg';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/home/home';
import Contact from './pages/contact/contact';
import introduce from './pages/introduce/introduce';
import Login from './pages/login/login';
import NotFoundPage from './pages/notFound/notFound';
import Register from './pages/register/register';
import ProductDetail from './pages/productDetail/productDetail';
import Buy from './components/buy/buy';
import History from './pages/history/history';
import Cart from './pages/cart/cart';
import ManageOrder from './pages/admin/order/manageOrder';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/LapCenter' exact component={Home}/>
        <Route path='/contact' exact component={Contact}/>
        <Route path='/introduce' exact component={introduce}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/register' exact component={Register}/>
        <Route path='/product/:id' exact component={ProductDetail}/>
        <Route path='/buy/:id'component={Buy}/>
        <Route path='/history/:userId'component={History}/>
        <Route path='/cart/:userId'component={Cart}/>
        <Route path='/admin/order'component={ManageOrder}/>

        
        <Route  component={NotFoundPage}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
