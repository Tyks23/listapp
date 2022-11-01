import axios from 'axios';
import { React, useState, useEffect, useCallback } from 'react'
import './App.css';
import ListComponent from './components/ListComponent';


async function getItemsFromWeb() {
  return axios.get('https://my.api.mockaroo.com/shipments.json?key=5e0b62d0')
    .then(function ({ data, status }) {
      // handle success
      return { status, data };
    })
    .catch(function ({ response: { data, status } }) {
      // handle error
      return { status, data }
    })
}

async function getItemsFromText() {
  return fetch('/Shipments.txt')
    .then((r) => r.json());

}

function App() {

  const [listItems, setListItems] = useState([]);

  const removeElement = (orderNo) => {
    const newListItems = listItems.filter((order) => order.orderNo !== orderNo);
    setListItems(newListItems);
  };

  const changeElement = (orderNo, newData) => {
    const newListItems = listItems.map((e) => {
      if (e.orderNo !== orderNo) return e;
      return newData;
    }, [])
    setListItems(newListItems);
  }

  const getData = useCallback(async () => {
    const response = await getItemsFromWeb()
    //troubleshooting limiter
    // const t = response.status === 200 ? Object.values(response.data) : await getItemsFromText()
    // setListItems(t.map((e, i) => i < 3 ? e : null, []).filter((e) => e !== null))
    setListItems(response.status === 200 ? Object.values(response.data) : await getItemsFromText())
  }, [])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>OrderNo</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Cosignee</th>
            <th>Status</th>
            <th>TrackingNo</th>
            <th>Delete</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          {listItems.map(({ orderNo, date, customer, consignee, status, trackingNo }) => <ListComponent key={orderNo}
            orderNo={orderNo}
            date={date}
            customer={customer}
            consignee={consignee}
            status={status}
            trackingNo={trackingNo}
            deleteCallback={removeElement}
            detailCallback={changeElement} />, [])}
        </tbody>
      </table>

    </div>
  );
}

export default App;
