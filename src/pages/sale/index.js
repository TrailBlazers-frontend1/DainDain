import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import { axiosInstance } from '../../urlConfig'
import "./styles.css"

const Sale = () => {

  const [accepted2dTransactions,setAccepted2dTransactions] = useState([])
  const [acceptedLonePyineTransactions,setAcceptedLonePyineTransactions] = useState([])
  const [accepted3dTransactions, setAccepted3dTransactions] = useState([])

 const {user_login} = useSelector(state => state.user)

  useEffect(() => {
    const fetchAcceptedTransactions = async () => {
      // const twod = await axiosInstance.get("/2d-accepted-transition",{headers:{Authorization:`Bearer ${user_login.token}`}})
      // const lonepyine = await axiosInstance.get("/lonepyaing-accepted-transition",{headers:{Authorization:`Bearer ${user_login.token}`}})
      // const threed = await axiosInstance.get("/3d-accepted-transition",{headers:{Authorization:`Bearer ${user_login.token}`}})
      // console.log(res)

      // if(twod.data.status === 200 && lonepyine.data.status === 200 && threed.data.status === 200){
        // setAccepted2dTransactions(twod.data.twod_sale_lists)
        // setAcceptedLonePyineTransactions(lonepyine.data.lonepyaing_sale_lists)
        // setAccepted3dTransactions(threed.data.threed_sale_lists)
      // }

      

      // console.log(twod.data.twod_sale_lists)
      console.log(accepted2dTransactions)
      console.log(acceptedLonePyineTransactions)
      console.log(accepted3dTransactions)

    }

    fetchAcceptedTransactions()
    
  },[])
  // const saleDetailsRows = () => {
  //   const rowArr = []
  //   for(let i = 0;i <= 20;i++) {
  //     rowArr.push(<div className='sale-details-row'>
  //     <p>Thurein Win</p>
  //     <p>08/13/2022</p>
  //     <p>Morning</p>
  //     <p>22</p>
  //     <p>10000ks</p>
  //   </div>)
  //   }
  //   return rowArr
  // }
  return (
    <>
        <Header/>
        <Navbar/>

        <div className='App sale-parent-container'>

          <div className='sale-2pieces-container'>
            <p className='sale-header'>2Pieces Accepted Transactions</p>
            <div className='sale-filters-container'>
              <input className='sale-filter-date-input' type="date"></input>
              <div className='sale-filter-customer-filter'>
                <input list='customers' type="text" placeholder='Customer Name'/>
                <datalist id="customers">
                  <option value="Customer Name1"></option>
                  <option value="Customer Name2"></option>
                  <option value="Customer Name3"></option>
                </datalist>
              </div>

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
                accepted2dTransactions.map((item) => (
                  <div className='sale-details-row'>
                    <p>{item.customer_name}</p>
                    <p>{(item.created_at).split(" ")[0]}</p>
                    <p>Morning</p>
                    <p>{item.number}</p>
                    <p>{item.sale_amount}ks</p>
                  </div>
                ))
                // saleDetailsRows()
              }
              
            </div>
          </div>
          </div>
          <div className='sale-lonepyine-container'>
            <p className='sale-header'>Lone Pyine Accepted Transactions</p>
            <div className='sale-filters-container'>
              <input className='sale-filter-date-input' type="date"></input>
              <div className='sale-filter-customer-filter'>
                <input list='customers' type="text" placeholder='Customer Name'/>
                <datalist id="customers">
                  <option value="Customer Name1"></option>
                  <option value="Customer Name2"></option>
                  <option value="Customer Name3"></option>
                </datalist>
              </div>

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
                acceptedLonePyineTransactions.map((item) => (
                  <div className='sale-details-row'>
                    <p>{item.customer_name}</p>
                    <p>{(item.created_at).split(" ")[0]}</p>
                    <p>Morning</p>
                    <p>{item.number}</p>
                    <p>{item.sale_amount}ks</p>
                  </div>
                ))
              }
              
            </div>
          </div>
          </div>
          <div className='sale-3pieces-container'>
            <p className='sale-header'>3Pieces Accepted Transactions</p>
            <div className='sale-filters-container'>
              <input className='sale-filter-date-input' type="date"></input>
              <div className='sale-filter-customer-filter'>
                <input list='customers' type="text" placeholder='Customer Name'/>
                <datalist id="customers">
                  <option value="Customer Name1"></option>
                  <option value="Customer Name2"></option>
                  <option value="Customer Name3"></option>
                </datalist>
              </div>

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
                accepted3dTransactions.map((item) => (
                  <div className='sale-details-row'>
                    <p>{item.customer_name}</p>
                    <p>{(item.created_at).split(" ")[0]}</p>
                    <p>Morning</p>
                    <p>{item.number}</p>
                    <p>{item.sale_amount}ks</p>
                  </div>
                ))
              }
              
            </div>
          </div>
          </div>
         
          
        </div>

        
    </>
  )
}

export default Sale