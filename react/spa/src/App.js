import './App.css';
import MyButton from "./components/MyButton";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import Game from "./components/Game";
import FilterableProductTable from './components/FilterableProductTable';
import Timer from './components/Clock';
import Counter3 from './components/Counter3';

function App() {
  return (
    <div style={{margin:'10px'}}>
      <h1>Welcome to my app</h1>
      <MyButton label="opps" />
      <Profile />
      <ProductList />
      <Game />
      <FilterableProductTable />
      <Timer />
      <Counter3 />
    </div>
  );
  }

export default App;
