import './App.css';
import MyButton from "./components/MyButton";
import Profile from "./components/Profile";
import ProductList from "./components/ProductList";
import Game from "./components/Game";
import FilterableProductTable from './components/FilterableProductTable';

function App() {
  return (
    <div style={{margin:'10px'}}>
      <h1>Welcome to my app</h1>
      <MyButton label="opps" />
      <Profile />
      <ProductList />
      <Game />
      <FilterableProductTable />
    </div>
  );
  }

export default App;
