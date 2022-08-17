import React from 'react'
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import "./styles.css"

const Sale = () => {

  const saleDetailsRows = () => {
    const rowArr = []
    for(let i = 0;i <= 20;i++) {
      rowArr.push(<div className='sale-details-row'>
      <p>Thurein Win</p>
      <p>08/13/2022</p>
      <p>Morning</p>
      <p>22</p>
      <p>10000ks</p>
    </div>)
    }
    return rowArr
  }
  return (
    <>
        <Header/>
        <Navbar/>

        <div className='App sale-parent-container'>
          <div className='sale-filters-container'>
            <input className='sale-filter-date-input' type="date"></input>
            <select className='sale-filter-customer-filter'>
              <option>Customer</option>
              <option>Thurein Win</option>
            </select>

            <select className='sale-filter-round-filter'>
              <option>Round</option>
            </select>
          </div>

          <div className='sale-details-parent-container'>
            <div className='sale-details-labels-container'>
              <p>Name</p>
              <p>Date</p>
              <p>Round</p>
              <p>Number</p>
              <p>Amount</p>
            </div>

            <div className='sale-details-rows-container'>
              {
                saleDetailsRows()
              }
              
            </div>
          </div>
          
        </div>
    </>
  )
}

export default Sale