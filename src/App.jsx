import './App.css'
import Nav from './components/nav/nav'
import TopSection from './components/top-section/top-section';
import Transaction from './components/transactions/transaction';
import Footer from './components/footer/fotter';

function App() {

  return (
    <div className="App">
      <Nav/>
      <TopSection/>
      <Transaction/>
      <Footer/>
    </div>
  )
}

export default App;
