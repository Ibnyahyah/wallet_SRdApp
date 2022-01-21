import './App.css'
import Nav from './components/nav/nav'
import TopSection from './components/top-section/top-section';
import Transaction from './components/transactions/transaction';

function App() {

  return (
    <div className="App">
      <Nav/>
      <TopSection/>
      <Transaction/>
    </div>
  )
}

export default App;
