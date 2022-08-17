import React,{useState} from 'react'
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import "./styles.css"

const Transaction = () => {
  const [headerCategory,setHeaderCategory] = useState("2d")
  const [transactionCategory,setTransactionCategory] = useState("sale voucher")
  return (
    <>
        <Header/>
        <Navbar/>
        
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
            <p>2D sale voucher</p> : null
          }
          {
            headerCategory === "2d" && transactionCategory ==="sale day book" ? 
            <p>2D sale day book</p> : null
          }
          {
            headerCategory === "3d" && transactionCategory ==="sale voucher" ? 
            <p>3D sale voucher</p> : null
          }
          {
            headerCategory === "3d" && transactionCategory ==="sale day book" ? 
            <p>3D sale day book</p> : null
          }
        </div>
    </>
  )
}

export default Transaction