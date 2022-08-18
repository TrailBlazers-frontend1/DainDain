import React,{useState} from 'react'
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import "./styles.css"

const Sale = () => {

  const [headerCategory,setHeaderCategory] = useState("2d")
  const [transactionCategory,setTransactionCategory] = useState("sale voucher")

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

        <div className='App transaction-parent-container'>
          <div className='transaction-header-container'>
            <p onClick={() => setHeaderCategory("2d")} className={headerCategory === "2d" ? 'transaction-header-item transaction-header-active' : "transaction-header-item"}>2D</p>
            <p onClick={() => setHeaderCategory("3d")} className={headerCategory === "3d" ? 'transaction-header-item transaction-header-active' : "transaction-header-item"}>3D</p>
          </div>

          <div className='transaction-category-container'>
            <button onClick={() => setTransactionCategory("sale voucher")} className={transactionCategory === "sale voucher" ? 'transaction-category-btn transaction-category-btn-active' : "transaction-category-btn"}>Sale Voucher</button>
            <button onClick={() => setTransactionCategory("sale day book")} className={transactionCategory === "sale day book" ? 'transaction-category-btn transaction-category-btn-active' : "transaction-category-btn"}>Sale Day Book</button>
          </div>

          {
            headerCategory === "2d" && transactionCategory ==="sale voucher" ? 
            <div className='towd-voucher-parent-container'>
              <div className='twod-day-voucher-rows-container'></div>
            </div> : null
          }
          {
            headerCategory === "2d" && transactionCategory ==="sale day book" ? 
              <div className='twod-sale-day-book-parent-container'>
                <div className='twod-sale-day-book-label-container'>
                  <p>No</p>
                  <p>Date</p>
                  <p>Time</p>
                  <p>Name</p>
                  <p>Game Type</p>
                  <p>Number</p>
                  <p>Compensation</p>
                  <p>Amount</p>
                  <p>Total</p>
                </div>

                <div className='twod-day-sale-book-rows-container'>
                  <div className='twod-day-sale-book-row-container'>

                    <div className='twod-day-sale-book-row'>
                      <p>1</p>
                      <p>08/18/2022</p>
                      <p>9:51</p>
                      <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
                        <p>Customer Name</p>
                        <p>0912345678</p>
                      </div>

                      <p>2Pieces</p>

                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>34</p>
                        <p>48</p>
                        <p>67</p>
                      </div>
                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>85</p>
                        <p>80</p>
                        <p>83</p>
                      </div>
                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>10000ks</p>
                        <p>100000ks</p>
                        <p>20000ks</p>
                        <p className='twod-day-sale-book-seperate-row'>
                          130000ks
                        </p>
                      </div>
                      <p>130000ks</p> 
                    </div>
                    <div className='twod-day-sale-book-row-line'></div>
                  </div>
                  <div className='twod-day-sale-book-row-container'>

                    <div className='twod-day-sale-book-row'>
                      <p>1</p>
                      <p>01/11/2022</p>
                      <p>9:51</p>
                      <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
                        <p>Customer Name name</p>
                        <p>0912345678</p>
                      </div>

                      <p>2Pieces</p>

                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>34</p>
                        <p>48</p>
                        <p>67</p>
                      </div>
                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>85</p>
                        <p>80</p>
                        <p>83</p>
                      </div>
                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>10000ks</p>
                        <p>100000ks</p>
                        <p>20000ks</p>
                        <p className='twod-day-sale-book-seperate-row'>
                          130000ks
                        </p>
                      </div>
                      <p>130000ks</p> 
                    </div>
                    <div className='twod-day-sale-book-row-line'></div>
                  </div>
                  
                </div>
              </div>
           
            : null
          }
          {
            headerCategory === "3d" && transactionCategory ==="sale voucher" ? 
            <div className='towd-voucher-parent-container'>
              <div className='twod-day-voucher-rows-container'></div>
            </div> : null
          }
          {
            headerCategory === "3d" && transactionCategory ==="sale day book" ? 
            <div className='twod-sale-day-book-parent-container'>
                <div className='twod-sale-day-book-label-container'>
                  <p>No</p>
                  <p>Date</p>
                  <p>Time</p>
                  <p>Name</p>
                  <p>Game Type</p>
                  <p>Number</p>
                  <p>Compensation</p>
                  <p>Amount</p>
                  <p>Total</p>
                </div>

                <div className='twod-day-sale-book-rows-container'>
                  <div className='twod-day-sale-book-row-container'>

                    <div className='twod-day-sale-book-row'>
                      <p>1</p>
                      <p>08/18/2022</p>
                      <p>9:51</p>
                      <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
                        <p>Customer Name</p>
                        <p>0912345678</p>
                      </div>

                      <p>3Pieces</p>

                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>34</p>
                        <p>48</p>
                        <p>67</p>
                      </div>
                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>85</p>
                        <p>80</p>
                        <p>83</p>
                      </div>
                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>10000ks</p>
                        <p>100000ks</p>
                        <p>20000ks</p>
                        <p className='twod-day-sale-book-seperate-row'>
                          130000ks
                        </p>
                      </div>
                      <p>130000ks</p> 
                    </div>
                    <div className='twod-day-sale-book-row-line'></div>
                  </div>
                  <div className='twod-day-sale-book-row-container'>

                    <div className='twod-day-sale-book-row'>
                      <p>1</p>
                      <p>01/11/2022</p>
                      <p>9:51</p>
                      <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
                        <p>Customer Name name</p>
                        <p>0912345678</p>
                      </div>

                      <p>3Pieces</p>

                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>134</p>
                        <p>548</p>
                        <p>767</p>
                      </div>
                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>85</p>
                        <p>80</p>
                        <p>83</p>
                      </div>
                      <div className='twod-day-sale-book-row-detail-column'>
                        <p>10000ks</p>
                        <p>100000ks</p>
                        <p>20000ks</p>
                        <p className='twod-day-sale-book-seperate-row'>
                          130000ks
                        </p>
                      </div>
                      <p>130000ks</p> 
                    </div>
                    <div className='twod-day-sale-book-row-line'></div>
                  </div>
                  
                </div>
              </div> : null
          }
        </div>
    </>
  )
}

export default Sale