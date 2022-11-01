import { React, useState, useEffect } from 'react'


export default function ListComponent(
  { orderNo,
    date,
    customer,
    trackingNo,
    status,
    consignee,
    deleteCallback,
    detailCallback }) {

  const [detailView, setDetailView] = useState(false);
  if (!detailView) {
    return <tr>
      <td>{orderNo}</td>
      <td>{date}</td>
      <td>{customer}</td>
      <td>{trackingNo}</td>
      <td>{status}</td>
      <td>{consignee}</td>

      <td className="tableDelete" onClick={() => { deleteCallback(orderNo) }}>Delete</td>
      <td className="tableDetails" onClick={() => { setDetailView(!detailView) }}>Details</td>
    </tr>
  }
  return <>
    <form id={orderNo} onSubmit={(e) => {
      e.preventDefault()
      const { orderNo: newOrderNo, date, customer, trackingNo, status, consignee } = e.target;
      const newData = {
        orderNo: newOrderNo.value,
        date: date.value,
        customer: customer.value,
        trackingNo: trackingNo.value,
        status: status.value,
        consignee: consignee.value
      }
      detailCallback(orderNo, newData)
      setDetailView(!detailView)
    }}></form>
    <tr>
      <td><input form={orderNo} name="orderNo" defaultValue={orderNo} /></td>
      <td><input form={orderNo} name="date" defaultValue={date} /></td>
      <td><input form={orderNo} name="customer" defaultValue={customer} /></td>
      <td><input form={orderNo} name="trackingNo" defaultValue={trackingNo} /></td>
      <td><input form={orderNo} name="status" defaultValue={status} /></td>
      <td><input form={orderNo} name="consignee" defaultValue={consignee} /></td>
      <td className="tableDelete" onClick={() => { deleteCallback(orderNo) }}>Delete</td>
      <td><input form={orderNo} type="submit" value="Save details" /></td>

    </tr>
  </>
}