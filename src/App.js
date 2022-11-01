import axios from 'axios';
import { React ,useState, useRef } from 'react'
import './App.css';
import ListComponent from './components/ListComponent';


function getItemsFromWeb(){
  axios.get('https://my.api.mockaroo.com/shipments.json?key=5e0b62d0')
  .then(function (response) {
    // handle success
    return response.data;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
}

async function getItemsFromText(){
  await fetch('/Shipments.txt')
    .then((r) => r.text())
    .then(text  => {   
      return JSON.parse(text);
    })  
}


function App() {

  const [listItems, setListItems] = useState([]);
  const [show, setShow] = useState(true);
  
  return (
    <div className="App">
      <button onClick={async () => {
        console.log(listItems);
        setListItems(getItemsFromText)
        console.log(listItems)}}>test</button>

<button onClick={async () => {console.log(listItems); setShow(!show)}}>test2</button>

      {show ? <p>nothing here</p> : listItems.map(({ orderNo, date, customer, consignee, status, trackingNo }) => 
      <ListComponent key={orderNo} 
      orderNo={orderNo} 
      date={date}
      customer={customer}
      consignee={consignee}
      status={status}
      trackingNo={trackingNo}/>, [])}
    </div>
  );
}

export default App;
