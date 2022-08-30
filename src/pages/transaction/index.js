import React,{useState,useEffect} from 'react'
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import "./styles.css"

const Transaction = () => {

    const [headerCategory,setHeaderCategory] = useState("2d")
    const [transactionCategory,setTransactionCategory] = useState("sale day book")

    useEffect(() => {},[])
  return (
    <>
    <Header/>
    <Navbar/>

    <div className='App winners-parent-container'>
        <div className='winners-header-container'>
          <p>2Pieces winners</p>
          <div className='winners-filters-container'>
            <div className='winners-name-container'>
               <input list='customers' type="text" placeholder='Customer Name'/>
               <datalist id="customers">
                <option value="Customer Name1"></option>
                <option value="Customer Name2"></option>
                <option value="Customer Name3"></option>
               </datalist>
            </div>

            <input className='winners-date-filter' type="date"></input>

            <select className='winners-round-filter'>
              <option>Round</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
          </div>
          <button className='winners-generate-btn'>Generate Winners</button>
        </div>

        <div className='winners-details-parent-container'>
            <div className='winners-details-labels-container'>
                <p>Name</p>
                <p>Number</p>
                <p>Amount</p>
                <p>Compensation</p>
                <p>Game Type</p>
                <p>Date</p>
                <p>Round</p>
            </div>

            <div className='winners-details-container'>
                <div className='winners-details-rows'>
                    <p>Customer Name1</p>
                    <p>32</p>
                    <p>10000ks</p>
                    <p>85</p>
                    <p>2Pieces</p>
                    <p>08/22/2022</p>
                    <p>Morning</p>
                </div>
                <div className='winners-details-rows'>
                    <p>Customer Name1</p>
                    <p>32</p>
                    <p>10000ks</p>
                    <p>85</p>
                    <p>2Pieces</p>
                    <p>08/22/2022</p>
                    <p>Morning</p>
                </div>
                <div className='winners-details-rows'>
                    <p>Customer Name1</p>
                    <p>32</p>
                    <p>10000ks</p>
                    <p>85</p>
                    <p>2Pieces</p>
                    <p>08/22/2022</p>
                    <p>Morning</p>
                </div>
            </div>
        </div>
    </div>
    <div className='App winners-parent-container'>
        <div className='winners-header-container'>
          <p>Lone Pyine winners</p>
          <div className='winners-filters-container'>
            <div className='winners-name-container'>
               <input list='customers' type="text" placeholder='Customer Name'/>
               <datalist id="customers">
                <option value="Customer Name1"></option>
                <option value="Customer Name2"></option>
                <option value="Customer Name3"></option>
               </datalist>
            </div>

            <input className='winners-date-filter' type="date"></input>

            <select className='winners-round-filter'>
              <option>Round</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
            </div>
            <button className='winners-generate-btn'>Generate Winners</button>
        </div>

        <div className='winners-details-parent-container'>
            <div className='winners-details-labels-container'>
                <p>Name</p>
                <p>Number</p>
                <p>Amount</p>
                <p>Compensation</p>
                <p>Game Type</p>
                <p>Date</p>
                <p>Round</p>
            </div>

            <div className='winners-details-container'>
                <div className='winners-details-rows'>
                    <p>Customer Name1</p>
                    <p>32</p>
                    <p>10000ks</p>
                    <p>85</p>
                    <p>2Pieces</p>
                    <p>08/22/2022</p>
                    <p>Morning</p>
                </div>
                <div className='winners-details-rows'>
                    <p>Customer Name1</p>
                    <p>32</p>
                    <p>10000ks</p>
                    <p>85</p>
                    <p>2Pieces</p>
                    <p>08/22/2022</p>
                    <p>Morning</p>
                </div>
                <div className='winners-details-rows'>
                    <p>Customer Name1</p>
                    <p>32</p>
                    <p>10000ks</p>
                    <p>85</p>
                    <p>2Pieces</p>
                    <p>08/22/2022</p>
                    <p>Morning</p>
                </div>
            </div>
        </div>
    </div>
    <div className='App winners-parent-container'>
        <div className='winners-header-container'>
          <p>3Pieces winners</p>
          <div className='winners-filters-container'>
            <div className='winners-name-container'>
               <input list='customers' type="text" placeholder='Customer Name'/>
               <datalist id="customers">
                <option value="Customer Name1"></option>
                <option value="Customer Name2"></option>
                <option value="Customer Name3"></option>
               </datalist>
            </div>

            <input className='winners-date-filter' type="date"></input>

            <select className='winners-round-filter'>
              <option>Round</option>
              <option value="morning">Morning</option>
              <option value="evening">Evening</option>
            </select>
            </div>
            <button className='winners-generate-btn'>Generate Winners</button>
        </div>

        <div className='winners-details-parent-container'>
            <div className='winners-details-labels-container'>
                <p>Name</p>
                <p>Number</p>
                <p>Amount</p>
                <p>Compensation</p>
                <p>Game Type</p>
                <p>Date</p>
                <p>Round</p>
            </div>

            <div className='winners-details-container'>
                <div className='winners-details-rows'>
                    <p>Customer Name1</p>
                    <p>32</p>
                    <p>10000ks</p>
                    <p>85</p>
                    <p>2Pieces</p>
                    <p>08/22/2022</p>
                    <p>Morning</p>
                </div>
                <div className='winners-details-rows'>
                    <p>Customer Name1</p>
                    <p>32</p>
                    <p>10000ks</p>
                    <p>85</p>
                    <p>2Pieces</p>
                    <p>08/22/2022</p>
                    <p>Morning</p>
                </div>
                <div className='winners-details-rows'>
                    <p>Customer Name1</p>
                    <p>32</p>
                    <p>10000ks</p>
                    <p>85</p>
                    <p>2Pieces</p>
                    <p>08/22/2022</p>
                    <p>Morning</p>
                </div>
            </div>
        </div>
    </div>

    <div className='App transaction-parent-container'>
          <div className='transaction-header-container'>
            <p onClick={() => setHeaderCategory("2d")} className={headerCategory === "2d" ? 'transaction-header-item transaction-header-active' : "transaction-header-item"}>2D</p>
            <p onClick={() => setHeaderCategory("3d")} className={headerCategory === "3d" ? 'transaction-header-item transaction-header-active' : "transaction-header-item"}>3D</p>
          </div>

          <div className='transaction-category-container'>
            {/* <button onClick={() => setTransactionCategory("sale voucher")} className={transactionCategory === "sale voucher" ? 'transaction-category-btn transaction-category-btn-active' : "transaction-category-btn"}>Sale Voucher</button> */}
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
            <>
              <div className='twod-sale-day-book-parent-container'>
                <p>2Pieces</p>
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
                      <p>88</p>
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
              <div className='twod-sale-day-book-parent-container'>
                <p>Lone Pyine</p>
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
                      <p>88</p>
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
            </>
           
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

export default Transaction