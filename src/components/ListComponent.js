import "./ListComponent.css";

export default function ListComponent(
    orderNo, 
    deliverydate, 
    customer, 
    trackingNo, 
    status, 
    consignee) {



  return <div className="listItem">
        <p>{orderNo}</p>
        <p>{deliverydate}</p>
        <p>{customer}</p>
        <p>{trackingNo}</p>
        <p>{status}</p>
        <p>{consignee}</p>
  </div>
}

