import React,{useState,useEffect, useMemo, cloneElement} from 'react'
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import "./styles.css"

import * as XLSX from 'xlsx/xlsx.mjs';
import { useTable } from 'react-table'
import {Navigate} from "react-router-dom"

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { axiosInstance } from '../../urlConfig';
import { useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading';

function Table({columns, data, id}){

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns,data: data? data : []})

  return (
    <table id = {id} {...getTableProps()} className='sale-details-parent-container'>
      <thead>
        {
          headerGroups?.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className = "sale-details-labels-container">
                {
                  headerGroup.headers?.map( column => (
                    <th {...column.getHeaderProps()}>
                      {
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()} className="sale-details-rows-container">
        { // loop over the rows
          rows?.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} className='sale-details-row'>
                { // loop over the rows cells 
                  row.cells?.map(cell => (
                    <td {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))
                }
              </tr> 
            )
          })
        }
        {/* <tr>
          <td></td>
        </tr> */}
      </tbody>
    </table>
  );
}
function SaleBookTable({columns, data, id}){

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns,data: data? data : []})

  return (
    <table id = {id} {...getTableProps()} className='sale-details-parent-container'>
      <thead>
        {
          headerGroups?.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} className = "sale-details-labels-container">
                {
                  headerGroup.headers?.map( column => (
                    <th {...column.getHeaderProps()}>
                      {
                        column.render('Header')
                      }
                    </th>
                  ))
                }
              </tr>
          ))
        }
      </thead>
      <tbody {...getTableBodyProps()} className="sale-details-rows-container">
        { // loop over the rows
          rows?.map(row => {
            prepareRow(row)
            // console.log(row)
            return (
              <tr {...row.getRowProps()} className='sale-details-row row-underline'>
                { // loop over the rows cells 
                  row.cells?.map(cell => {
                   if(Array.isArray(cell.value)){
                    return(
                      <td>
                        {
                          cell.value.map((item,index) => (
                            <>
                            <tr style={{display:"flex",justifyContent:"center"}}><td>{item}</td></tr><br></br>
                            </>
                          ))
                        }
                      </td>
                    )
                   }else{
                    return(
                      <td>{cell.value}</td>
                    )
                   }
                   
                  })

                }
              </tr> 
            )
          })
        }
        {/* <tr>
          <td></td>
        </tr> */}
      </tbody>
    </table>
  );
}

const handleExcelExport = (data,title) => {
  const wb = XLSX.utils.book_new()
  const ws = XLSX.utils.json_to_sheet(data)

  // console.log(ws)

  XLSX.utils.book_append_sheet(wb,ws, title)

  XLSX.writeFile(wb, `${title}.xlsx`)
}

const handlePdfExport = (title,id) => {
  const doc = new jsPDF()
  doc.text(title,20,10,)
  autoTable(doc, { html: id })
  doc.save(`${title}.pdf`)
}



const Transaction = () => {

    const [headerCategory,setHeaderCategory] = useState("2d")
    const [transactionCategory,setTransactionCategory] = useState("sale day book")

    const [is2dGenerateOpen,setIs2dGenerateOpen] = useState(false)
    const [isLonePyineGenerateOpen,setIsLonePyineGenerateOpen] = useState(false)
    const [is3dGenerateOpen,setIs3dGenerateOpen] = useState(false)

    const [is2dSaleBookGenerateOpen,setIs2dSaleBookGenerateOpen] = useState(false)
    const [isLonePyineSaleBookGenerateOpen,setIsLonePyineSaleBookGenerateOpen] = useState(false)
    const [is3dSaleBookGenerateOpen,setIs3dSaleBookGenerateOpen] = useState(false)

    const [twodWinners,setTwodWinners] = useState([])
    const [lonePyineWinners,setLonePyineWinners] = useState([])
    const [threedWinners,setThreedWinners] = useState([])


    const [temptwodWinners,setTempTwodWinners] = useState([])
    const [templonePyineWinners,setTempLonePyineWinners] = useState([])
    const [tempthreedWinners,setTempThreedWinners] = useState([])

    const [twodSaleBookList,setTwodSaleBookList] = useState([])
    const [lonePyineSaleBookList,setLonePyineSaleBookList] = useState([])
    const [threedSaleBookList,setThreedSaleBookList] = useState([])

    const [isLoading,setIsLoading] = useState(true)

    const {user_login} = useSelector(state => state.user)
    const {current_language} = useSelector(state => state.language)

    const notify = (message) => toast(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      });

    const fetchWinners = async () => {
      try {
        const twodWinners = await axiosInstance.get("/2d-win",{headers:{Authorization:`Bearer ${user_login.token}`}})
      const threedWinners = await axiosInstance.get("/3d-win",{headers:{Authorization:`Bearer ${user_login.token}`}})
      const lonePyineWinners = await axiosInstance.get("/lp-win",{headers:{Authorization:`Bearer ${user_login.token}`}})
      setIsLoading(true)
        if(twodWinners.data.status === 200 && threedWinners.data.status === 200 && lonePyineWinners.data.status === 200){
          // console.log(twodWinners)
          // console.log(lonePyineWinners)
          // console.log(threedWinners)
          setTwodWinners(twodWinners?.data?.data)
          setThreedWinners(threedWinners?.data?.data)
          setLonePyineWinners(lonePyineWinners?.data?.data)

          setTempTwodWinners(twodWinners?.data?.data)
          setTempThreedWinners(threedWinners?.data?.data)
          setTempLonePyineWinners(lonePyineWinners?.data?.data)
          setIsLoading(false)
        }
      
      } catch (error) {
        setIsLoading(false)
        notify(error.message)
      }
      

    }

    const fetchSaleDayBook = async () => {
      try {
        const twodSaleDayBook = await axiosInstance.get("/twod-salesday-book",{headers:{Authorization:`Bearer ${user_login.token}`}})
        const threedSaleDayBook = await axiosInstance.get("/threed-salesday-book",{headers:{Authorization:`Bearer ${user_login.token}`}})
        const lonePyineSaleDayBook = await axiosInstance.get("/lonepyaing-salesday-book",{headers:{Authorization:`Bearer ${user_login.token}`}})
        setIsLoading(true)
        // console.log(twodSaleDayBook.data.data)
        // console.log(lonePyineSaleDayBook)
        // console.log(threedSaleDayBook)
        if(twodSaleDayBook.data.status === 200 && threedSaleDayBook.data.status === 200 && lonePyineSaleDayBook.data.status === 200){
          const twodSaleData = twodSaleDayBook?.data.data
          const lonePyineData = lonePyineSaleDayBook?.data.data
          const threedData = threedSaleDayBook?.data.data
          // console.log(Object.entries(twodSaleData))
          setTwodSaleBookList(Object.entries(twodSaleData))
          setLonePyineSaleBookList(Object.entries(lonePyineData))
          setThreedSaleBookList(Object.entries(threedData))
          // console.log(twodSaleBookList)
          // console.log(lonePyineSaleBookList)
          // console.log(threedSaleBookList)
          setIsLoading(false)
        }
       
      } catch (error) {
        setIsLoading(false)
        notify(error.message)
      }
     
    }

    const filter2dRound = (e) => {
      // console.log(temptwodWinners)
        setTwodWinners(temptwodWinners)
        if(e.target.value){
          const filteredArr = temptwodWinners.filter((item) => {
            if(item.twod.round === e.target.value) {
              return item
            }
          })
          setTwodWinners(filteredArr)
        }
      
    }

    const filterLonePyineRound = (e) => {
      // console.log(e.target.value)
      setLonePyineWinners(templonePyineWinners)
      if(e.target.value){
        const filteredArr = templonePyineWinners.filter((item) => {
          if(item.lonepyine.round === e.target.value) {
            return item
          }
        })
        // console.log(filteredArr)
  
        setLonePyineWinners(filteredArr)
        // console.log(acceptedLonePyineTransactions)
      }
    }

    const filter3DRound = (e) => {
      // console.log(e.target.value)
      setThreedWinners(tempthreedWinners)
      if(e.target.value){
        const filteredArr = tempthreedWinners.filter((item) => {
          if(item.threed.round === e.target.value) {
            // console.log(item)
            return item
          }
        })
  
        setThreedWinners(filteredArr)}
      // }else{
      //   fetch3dAcceptedTransactions()
      // }
    }

    // const fetch2dSaleDayBook = async (date) => {
    //   const res = await axiosInstance.post("/2d")
    // }
    const fetch2dWinnersDate = async (date) => {
      const res = await axiosInstance.post("/2d-win-bydate",{
        current_date : date
      },{headers:{Authorization:`Bearer ${user_login.token}`}})
      setTwodWinners(res?.data?.data)
      setTempTwodWinners(res?.data?.data)
    }

    const filter2dWinnersDate = (e) => {
      // console.log(e.target.value)
      fetch2dWinnersDate(e.target.value)
    }

    const fetchLonePyineWinnersDate = async (date) => {
      const res = await axiosInstance.post("/lp-win-bydate",{
        current_date : date
      },{headers:{Authorization:`Bearer ${user_login.token}`}})
      setLonePyineWinners(res?.data?.data)
      setTempLonePyineWinners(res?.data?.data)
    }
    const filterLonePyineWinnersDate = (e) => {
      // console.log(e.target.value)
      fetchLonePyineWinnersDate(e.target.value)
    }

    const fetch3dWinnersDate = async (date) => {
      const res = await axiosInstance.post("/3d-win-bydate",{
        current_date : date
      },{headers:{Authorization:`Bearer ${user_login.token}`}})
      setThreedWinners(res?.data?.data)
      setTempThreedWinners(res?.data?.data)
    }
    const filter3dWinnersDate = (e) => {
      // console.log(e.target.value)
      fetch3dWinnersDate(e.target.value)

    }

    useEffect(() => {
      if(user_login.isLoggedIn && user_login.role === "agent"){ 
        fetchSaleDayBook()
        fetchWinners()
      }
      
    },[])


    const twodData = useMemo(() => {
      const transactionarr = twodWinners?.map((item) => {
        return {
          Name: item.customer_name,
          Number: item.twod.number,
          Amount: item.sale_amount,
          Compensation: item.twod.compensation,
          GameType: "2pieces",
          Date: item.twod.date,
          Round: item.twod.round,
        }
      })
      return transactionarr
    }
     )
     const twodColumns = useMemo(() => 
      [
        {
          Header: current_language === "english" ? "Name" : "နာမည်",
          accessor : "Name"
        },
        {
          Header: current_language === "english" ? "Number" : "နံပါတ်",
          accessor : "Number"
        },
        {
          Header: current_language === "english" ? "Amount" : "ထိုး‌ကြေး",
          accessor : "Amount"
        },
        {
          Header: current_language === "english" ? "Compensation" : "ဆ",
          accessor : "Compensation"
        },
        {
          Header: current_language === "english" ? "Game Type" : "အမျိုးအစား",
          accessor : "GameType"
        },
        {
          Header: current_language === "english" ? "Date" : "ရက်",
          accessor : "Date"
        },
        {
          Header:current_language === "english" ? "Round" : "ပွဲ",
          accessor : "Round"
        },
      ]
     )
    const twodSaleBookData = useMemo(() => {
      const transactionarr = twodSaleBookList?.map((item,index) => {
        const phone = item[0]
        const data = item[1]
        const numbers = data.map((item) => {
          return item.twod.number
        })
        const compensations = data.map((item) => {
          return item.twod.compensation
        })
        const amounts = data.map((item) => {
          return item.sale_amount
        })

        const date = data.map((item) => {
          return item.twod.date
        })
        const round = data.map((item) => {
          return item.twod.round
        })

        const customer = data.map((item) => {
          return item.customer_name
        })


        const sum = amounts.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        
        return {
          No:index + 1,
          Date: date[0],
          Round: round[0],
          Name: customer[0],
          GameType: "2pieces",
          Number: numbers,
          Compensation: compensations,
          Amount: amounts,
          Total : sum
    }
      })
      return transactionarr
    }
     )
     const twodSaleBookColumns = useMemo(() => 
      [
        {
          Header: current_language === "english" ? "No" : "နံပါတ်",
          accessor : "No"
        },
        {
          Header: current_language === "english" ? "Date" : "ရက်",
          accessor : "Date"
        },
        {
          Header: current_language === "english" ? "Round" : "ပွဲ",
          accessor : "Round"
        },
        {
          Header: current_language === "english" ? "Name" : "နာမည်",
          accessor : "Name"
        },
        {
          Header: current_language === "english" ? "Game Type" : "အမျိုးအစား",
          accessor : "GameType"
        },
        {
          Header: current_language === "english" ? "Number" : "နံပါတ်",
          accessor : "Number"
        },
        {
          Header: current_language === "english" ? "Compensation" : "ဆ",
          accessor : "Compensation"
        },
        {
          Header: current_language === "english" ? "Amount" : "ထိုး‌ကြေး",
          accessor : "Amount"
        },
        {
          Header: current_language === "english" ? "Total" : "စုစု‌ပေါင်း",
          accessor : "Total"
        },
        
      ]
     )
    
     //lonepyine table data
     const lonePyineData = useMemo(() => {
      const transactionarr = lonePyineWinners?.map((item) => {
        return {
          Name: item.customer_name,
          Number: item.lonepyine.number,
          Amount: item.sale_amount,
          Compensation: item.lonepyine.compensation,
          GameType: "Lone Pyine",
          Date: item.lonepyine.date,
          Round: item.lonepyine.round,
    }
      })
      return transactionarr
    }
     )
     const LonePyineColumns = useMemo(() => 
     [
      {
        Header: current_language === "english" ? "Name" : "နာမည်",
        accessor : "Name"
      },
      {
        Header: current_language === "english" ? "Number" : "နံပါတ်",
        accessor : "Number"
      },
      {
        Header: current_language === "english" ? "Amount" : "ထိုး‌ကြေး",
        accessor : "Amount"
      },
      {
        Header: current_language === "english" ? "Compensation" : "ဆ",
        accessor : "Compensation"
      },
      {
        Header: current_language === "english" ? "Game Type" : "အမျိုးအစား",
        accessor : "GameType"
      },
      {
        Header: current_language === "english" ? "Date" : "ရက်",
        accessor : "Date"
      },
      {
        Header:current_language === "english" ? "Round" : "ပွဲ",
        accessor : "Round"
      },
    ]
     )
     const lonePyineSaleBookData = useMemo(() => {
      const transactionarr = lonePyineSaleBookList?.map((item,index) => {
        const phone = item[0]
        const data = item[1]
        const numbers = data.map((item) => {
          return item.lonepyine.number
        })
        const compensations = data.map((item) => {
          return item.lonepyine.compensation
        })
        const amounts = data.map((item) => {
          return item.sale_amount
        })

        const date = data.map((item) => {
          return item.lonepyine.date
        })
        const round = data.map((item) => {
          return item.lonepyine.round
        })

        const customer = data.map((item) => {
          return item.customer_name
        })

        const sum = amounts.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        return {
          No:index + 1,
          Date: date[0],
          Round: round[0],
          Name: customer[0],
          GameType: "Lone Pyine",
          Number: numbers,
          Compensation: compensations,
          Amount: amounts,
          Total : sum
    }
      })
      return transactionarr
    }
     )
     const LonePyineSaleBookColumns = useMemo(() => 
     [
      {
        Header: current_language === "english" ? "No" : "နံပါတ်",
        accessor : "No"
      },
      {
        Header: current_language === "english" ? "Date" : "ရက်",
        accessor : "Date"
      },
      {
        Header: current_language === "english" ? "Round" : "ပွဲ",
        accessor : "Round"
      },
      {
        Header: current_language === "english" ? "Name" : "နာမည်",
        accessor : "Name"
      },
      {
        Header: current_language === "english" ? "Game Type" : "အမျိုးအစား",
        accessor : "GameType"
      },
      {
        Header: current_language === "english" ? "Number" : "နံပါတ်",
        accessor : "Number"
      },
      {
        Header: current_language === "english" ? "Compensation" : "ဆ",
        accessor : "Compensation"
      },
      {
        Header: current_language === "english" ? "Amount" : "ထိုး‌ကြေး",
        accessor : "Amount"
      },
      {
        Header: current_language === "english" ? "Total" : "စုစု‌ပေါင်း",
        accessor : "Total"
      },
      
    ]
     )
    
    
    //3d table data
     const threedData = useMemo(() => {
      const transactionarr = threedWinners?.map((item) => {
        return {
          Name: item.customer_name,
          Number: item.threed.number,
          Amount: item.sale_amount,
          Compensation: item.threed.compensation,
          GameType: "3D",
          Date: item.threed.date,
          Round: item.threed.round,
    }
      })
      return transactionarr
    }
     )
     const threedColumns = useMemo(() => 
     [
      {
        Header: current_language === "english" ? "Name" : "နာမည်",
        accessor : "Name"
      },
      {
        Header: current_language === "english" ? "Number" : "နံပါတ်",
        accessor : "Number"
      },
      {
        Header: current_language === "english" ? "Amount" : "ထိုး‌ကြေး",
        accessor : "Amount"
      },
      {
        Header: current_language === "english" ? "Compensation" : "ဆ",
        accessor : "Compensation"
      },
      {
        Header: current_language === "english" ? "Game Type" : "အမျိုးအစား",
        accessor : "GameType"
      },
      {
        Header: current_language === "english" ? "Date" : "ရက်",
        accessor : "Date"
      },
      {
        Header:current_language === "english" ? "Round" : "ပွဲ",
        accessor : "Round"
      },
    ]
     )
     const threedSaleBookData = useMemo(() => {
      const transactionarr = threedSaleBookList?.map((item,index) => {
        const phone = item[0]
        const data = item[1]
        const numbers = data.map((item) => {
          return item.threed.number
        })
        const compensations = data.map((item) => {
          return item.threed.compensation
        })
        const amounts = data.map((item) => {
          return item.sale_amount
        })

        const date = data.map((item) => {
          return item.threed.date
        })
        const round = data.map((item) => {
          return item.threed.round
        })

        const customer = data.map((item) => {
          return item.customer_name
        })
        const sum = amounts.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
        return {
          No:index + 1,
          Date: date[0],
          Round: round[0],
          Name: customer[0],
          GameType: "3D",
          Number: numbers,
          Compensation: compensations,
          Amount: amounts,
          Total : sum
    }
      })
      return transactionarr
    }
     )
     const threedSaleBookColumns = useMemo(() => 
     [
      {
        Header: current_language === "english" ? "No" : "နံပါတ်",
        accessor : "No"
      },
      {
        Header: current_language === "english" ? "Date" : "ရက်",
        accessor : "Date"
      },
      {
        Header: current_language === "english" ? "Round" : "ပွဲ",
        accessor : "Round"
      },
      {
        Header: current_language === "english" ? "Name" : "နာမည်",
        accessor : "Name"
      },
      {
        Header: current_language === "english" ? "Game Type" : "အမျိုးအစား",
        accessor : "GameType"
      },
      {
        Header: current_language === "english" ? "Number" : "နံပါတ်",
        accessor : "Number"
      },
      {
        Header: current_language === "english" ? "Compensation" : "ဆ",
        accessor : "Compensation"
      },
      {
        Header: current_language === "english" ? "Amount" : "ထိုး‌ကြေး",
        accessor : "Amount"
      },
      {
        Header: current_language === "english" ? "Total" : "စုစု‌ပေါင်း",
        accessor : "Total"
      },
      
    ]
     )

     if(user_login.isLoggedIn && user_login.role === "agent"){

      // return (<>
      // {
      //   isLoading ? <Loading/> : 
      //   <>
      //   <Header/>
      //   <Navbar/>
    
      //   {/* 2D winners */}
      //   <div className='App winners-parent-container'>
      //       <div className='winners-header-container'>
      //         <p>{current_language === "english" ? "2Pieces Winners" : "၂လုံးအောင်စရင်း"}</p>
      //         <div className='winners-filters-container'>
      //           {/* <div className='winners-name-container'>
      //              <input list='customers' type="text" placeholder='Customer Name'/>
      //              <datalist id="customers">
      //               <option value="Customer Name1"></option>
      //               <option value="Customer Name2"></option>
      //               <option value="Customer Name3"></option>
      //              </datalist>
      //           </div> */}
    
      //           <input className='winners-date-filter' type="date" onChange={(e) => filter2dWinnersDate(e)}></input>
    
      //           <select className='winners-round-filter' onChange={(e) => filter2dRound(e)}>
      //             <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
      //             <option value="Morning">Morning</option>
      //             <option value="Evening">Evening</option>
      //           </select>
      //         </div>
      //         <div className='sale-generate-btns-container' onClick={() => setIs2dGenerateOpen(!is2dGenerateOpen)}>
      //           {current_language === "english" ? "Generate" : "ထုတ်မည်"}
      //             <div className={is2dGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
      //               <button onClick={() => handleExcelExport(twodData,"2dWinners")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
      //               <button onClick={() => handlePdfExport("2dWinners","#twodWinners")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
      //             </div>
      //           </div>
      //       </div>
    
      //       {/* <table className='winners-details-parent-container'>
      //           <tr className='winners-details-labels-container'>
      //               <th>Name</th>
      //               <th>Number</th>
      //               <th>Amount</th>
      //               <th>Comthensation</th>
      //               <th>Game Type</th>
      //               <th>Date</th>
      //               <th>Round</th>
      //           </tr>
    
      //           <tbody className='winners-details-container'>
      //               <tr className='winners-details-rows'>
      //                   <td>Customer Name1</td>
      //                   <td>32</td>
      //                   <td>10000ks</td>
      //                   <td>85</td>
      //                   <td>2Pieces</td>
      //                   <td>08/22/2022</td>
      //                   <td>Morning</td>
      //               </tr>
      //               <tr className='winners-details-rows'>
      //                   <td>Customer Name1</td>
      //                   <td>32</td>
      //                   <td>10000ks</td>
      //                   <td>85</td>
      //                   <td>2Pieces</td>
      //                   <td>08/22/2022</td>
      //                   <td>Morning</td>
      //               </tr>
      //               <tr className='winners-details-rows'>
      //                   <td>Customer Name1</td>
      //                   <td>32</td>
      //                   <td>10000ks</td>
      //                   <td>85</td>
      //                   <td>2Pieces</td>
      //                   <td>08/22/2022</td>
      //                   <td>Morning</td>
      //               </tr>
      //           </tbody>
      //       </table> */}
      //       <div className='winners-table-container'>
      //        <Table 
      //             id="twodWinners"
      //             columns={twodColumns} 
      //             data = {twodData}
      //           />
      //       </div>
      //   </div>
    
      //   {/* Lone Pyine Winners */}
      //   <div className='App winners-parent-container'>
      //       <div className='winners-header-container'>
      //         <p>{current_language === "english" ? "Lone Pyine Winners" : "လုံးပြိုင်အောင်စရင်း"}</p>
      //         <div className='winners-filters-container'>
      //           {/* <div className='winners-name-container'>
      //              <input list='customers' type="text" placeholder='Customer Name'/>
      //              <datalist id="customers">
      //               <option value="Customer Name1"></option>
      //               <option value="Customer Name2"></option>
      //               <option value="Customer Name3"></option>
      //              </datalist>
      //           </div> */}
    
      //           <input className='winners-date-filter' type="date" onChange={(e) => filterLonePyineWinnersDate(e)}></input>
    
      //           <select className='winners-round-filter' onChange={(e) => filterLonePyineRound(e)}>
      //             <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
      //             <option value="Morning">Morning</option>
      //             <option value="Evening">Evening</option>
      //           </select>
      //           </div>
      //           <div className='sale-generate-btns-container' onClick={() => setIsLonePyineGenerateOpen(!isLonePyineGenerateOpen)}>
      //           {current_language === "english" ? "Generate" : "ထုတ်မည်"}
      //             <div className={isLonePyineGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
      //               <button onClick={() => handleExcelExport(lonePyineData,"LonePyineWinners")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
      //               <button onClick={() => handlePdfExport("LonePyineWinners","#lonePyineWinners")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
      //             </div>
      //           </div>
      //       </div>
    
      //       {/* <div className='winners-details-parent-container'>
      //           <div className='winners-details-labels-container'>
      //               <p>Name</p>
      //               <p>Number</p>
      //               <p>Amount</p>
      //               <p>Compensation</p>
      //               <p>Game Type</p>
      //               <p>Date</p>
      //               <p>Round</p>
      //           </div>
    
      //           <div className='winners-details-container'>
      //               <div className='winners-details-rows'>
      //                   <p>Customer Name1</p>
      //                   <p>32</p>
      //                   <p>10000ks</p>
      //                   <p>85</p>
      //                   <p>2Pieces</p>
      //                   <p>08/22/2022</p>
      //                   <p>Morning</p>
      //               </div>
      //               <div className='winners-details-rows'>
      //                   <p>Customer Name1</p>
      //                   <p>32</p>
      //                   <p>10000ks</p>
      //                   <p>85</p>
      //                   <p>2Pieces</p>
      //                   <p>08/22/2022</p>
      //                   <p>Morning</p>
      //               </div>
      //               <div className='winners-details-rows'>
      //                   <p>Customer Name1</p>
      //                   <p>32</p>
      //                   <p>10000ks</p>
      //                   <p>85</p>
      //                   <p>2Pieces</p>
      //                   <p>08/22/2022</p>
      //                   <p>Morning</p>
      //               </div>
      //           </div>
      //       </div> */}
      //       <div className='winners-table-container'>

           
      //        <Table 
      //             id="lonePyineWinners"
      //             columns={LonePyineColumns} 
      //             data = {lonePyineData}
      //           />
      //       </div>
      //   </div>
    
      //   {/* 3d Winners */}
      //   <div className='App winners-parent-container'>
      //       <div className='winners-header-container'>
      //         <p>{current_language === "english" ? "3D Winners" : "၃လုံးအောင်စရင်း"}</p>
      //         <div className='winners-filters-container'>
      //           {/* <div className='winners-name-container'>
      //              <input list='customers' type="text" placeholder='Customer Name'/>
      //              <datalist id="customers">
      //               <option value="Customer Name1"></option>
      //               <option value="Customer Name2"></option>
      //               <option value="Customer Name3"></option>
      //              </datalist>
      //           </div> */}
    
      //           <input className='winners-date-filter' type="date" onChange={(e) => filter3dWinnersDate(e)}></input>
    
      //           <select className='winners-round-filter' onChange={(e) => filter3DRound(e)}>
      //             <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
      //             <option value="Morning">Morning</option>
      //             <option value="Evening">Evening</option>
      //           </select>
      //           </div>
      //           <div className='sale-generate-btns-container' onClick={() => setIs3dGenerateOpen(!is3dGenerateOpen)}>
      //           {current_language === "english" ? "Generate" : "ထုတ်မည်"}
      //             <div className={is3dGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
      //               <button onClick={() =>  handleExcelExport(threedData,"3dWinners")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
      //               <button onClick={() => handlePdfExport("3dWinners","#threedWinners")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
      //             </div>
      //           </div>
      //       </div>
    
      //       {/* <div className='winners-details-parent-container'>
      //           <div className='winners-details-labels-container'>
      //               <p>Name</p>
      //               <p>Number</p>
      //               <p>Amount</p>
      //               <p>Compensation</p>
      //               <p>Game Type</p>
      //               <p>Date</p>
      //               <p>Round</p>
      //           </div>
    
      //           <div className='winners-details-container'>
      //               <div className='winners-details-rows'>
      //                   <p>Customer Name1</p>
      //                   <p>32</p>
      //                   <p>10000ks</p>
      //                   <p>85</p>
      //                   <p>2Pieces</p>
      //                   <p>08/22/2022</p>
      //                   <p>Morning</p>
      //               </div>
      //               <div className='winners-details-rows'>
      //                   <p>Customer Name1</p>
      //                   <p>32</p>
      //                   <p>10000ks</p>
      //                   <p>85</p>
      //                   <p>2Pieces</p>
      //                   <p>08/22/2022</p>
      //                   <p>Morning</p>
      //               </div>
      //               <div className='winners-details-rows'>
      //                   <p>Customer Name1</p>
      //                   <p>32</p>
      //                   <p>10000ks</p>
      //                   <p>85</p>
      //                   <p>2Pieces</p>
      //                   <p>08/22/2022</p>
      //                   <p>Morning</p>
      //               </div>
      //           </div>
      //       </div> */}
      //       <div className='winners-table-container'>
      //        <Table 
      //             id="threedWinners"
      //             columns={threedColumns} 
      //             data = {threedData}
      //           />
      //       </div>
      //   </div>
    
      //   <div className='App transaction-parent-container'>
      //         <div className='transaction-header-container'>
      //           <p onClick={() => setHeaderCategory("2d")} className={headerCategory === "2d" ? 'transaction-header-item transaction-header-active' : "transaction-header-item"}>{current_language === "english" ? "2D" : "၂လုံး"}</p>
      //           <p onClick={() => setHeaderCategory("3d")} className={headerCategory === "3d" ? 'transaction-header-item transaction-header-active' : "transaction-header-item"}>{current_language === "english" ? "3D" : "၃လုံး"}</p>
      //         </div>
    
      //         <div className='transaction-category-container'>
      //           {/* <button onClick={() => setTransactionCategory("sale voucher")} className={transactionCategory === "sale voucher" ? 'transaction-category-btn transaction-category-btn-active' : "transaction-category-btn"}>Sale Voucher</button> */}
      //           <button onClick={() => setTransactionCategory("sale day book")} className={transactionCategory === "sale day book" ? 'transaction-category-btn transaction-category-btn-active' : "transaction-category-btn"}>{current_language === 'english' ? 'Sale Day Book' : "နေ့စဉ်အရောင်းစာအုပ်"}</button>
      //         </div>
    
      //         {/* {
      //           headerCategory === "2d" && transactionCategory ==="sale voucher" ? 
      //           <div className='towd-voucher-parent-container'>
      //             <div className='twod-day-voucher-rows-container'></div>
      //           </div> : null
      //         } */}
      //         {
      //           headerCategory === "2d" && transactionCategory ==="sale day book" ? 
      //           <>
      //             <div className='twod-sale-day-book-parent-container'>
      //               <div className='twod-sale-day-book-header-container'>
      //                 <p>{current_language === "english" ? "2Pieces" : "၂လုံး"}</p>
      //                 <div className='sale-generate-btns-container' onClick={() => setIs2dSaleBookGenerateOpen(!is2dSaleBookGenerateOpen)}>
      //                 {current_language === "english" ? "Generate" : "ထုတ်မည်"}
      //                   <div className={is2dSaleBookGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
      //                     {/* <button onClick={() =>  handleExcelExport(twodSaleBookData,"2dSaleBook")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button> */}
      //                     <button onClick={() => handlePdfExport("2dSaleBook","#twodSaleBook")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
      //                   </div>
      //                 </div>
      //               </div>
    
      //               {/* <table className='twod-sale-day-book-details-parent-container'>
    
      //               </table> */}
      //               {/* <div className='twod-sale-day-book-label-container'>
      //                 <p>No</p>
      //                 <p>Date</p>
      //                 <p>Time</p>
      //                 <p>Name</p>
      //                 <p>Game Type</p>
      //                 <p>Number</p>
      //                 <p>Compensation</p>
      //                 <p>Amount</p>
      //                 <p>Total</p>
      //               </div>
    
      //               <div className='twod-day-sale-book-rows-container'>
      //                 <div className='twod-day-sale-book-row-container'>
    
      //                   <div className='twod-day-sale-book-row'>
      //                     <p>1</p>
      //                     <p>08/18/2022</p>
      //                     <p>9:51</p>
      //                     <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
      //                       <p>Customer Name</p>
      //                       <p>0912345678</p>
      //                     </div>
    
      //                     <p>2Pieces</p>
    
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>34</p>
      //                       <p>48</p>
      //                       <p>67</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>85</p>
      //                       <p>80</p>
      //                       <p>83</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>10000ks</p>
      //                       <p>100000ks</p>
      //                       <p>20000ks</p>
      //                       <p className='twod-day-sale-book-seperate-row'>
      //                         130000ks
      //                       </p>
      //                     </div>
      //                     <p>130000ks</p> 
      //                   </div>
      //                   <div className='twod-day-sale-book-row-line'></div>
      //                 </div>
      //                 <div className='twod-day-sale-book-row-container'>
    
      //                   <div className='twod-day-sale-book-row'>
      //                     <p>88</p>
      //                     <p>01/11/2022</p>
      //                     <p>9:51</p>
      //                     <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
      //                       <p>Customer Name name</p>
      //                       <p>0912345678</p>
      //                     </div>
    
      //                     <p>2Pieces</p>
    
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>34</p>
      //                       <p>48</p>
      //                       <p>67</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>85</p>
      //                       <p>80</p>
      //                       <p>83</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>10000ks</p>
      //                       <p>100000ks</p>
      //                       <p>20000ks</p>
      //                       <p className='twod-day-sale-book-seperate-row'>
      //                         130000ks
      //                       </p>
      //                     </div>
      //                     <p>130000ks</p> 
      //                   </div>
      //                   <div className='twod-day-sale-book-row-line'></div>
      //                 </div>
                      
      //               </div> */}
      //               <div className='salebook-table-container'>
      //               <SaleBookTable 
      //                 id="twodSaleBook"
      //                 columns={twodSaleBookColumns} 
      //                 data = {twodSaleBookData}
      //               />
      //               </div>
      //             </div>
    
    
      //             <div className='twod-sale-day-book-parent-container'>
      //             <div className='twod-sale-day-book-header-container'>
      //                 <p>{current_language === "english" ? "Lone Pyine" : "လုံးပြိုင်"}</p>
      //                 <div className='sale-generate-btns-container' onClick={() => setIsLonePyineSaleBookGenerateOpen(!isLonePyineSaleBookGenerateOpen)}>
      //                 {current_language === "english" ? "Generate" : "ထုတ်မည်"}
      //                   <div className={isLonePyineSaleBookGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
      //                     {/* <button onClick={() =>  handleExcelExport(lonePyineSaleBookData,"LonePyineSaleBook")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button> */}
      //                     <button onClick={() => handlePdfExport("LonePyineSaleBook","#lonePyineSaleBook")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
      //                   </div>
      //                 </div>
      //               </div>
      //               {/* <div className='twod-sale-day-book-label-container'>
      //                 <p>No</p>
      //                 <p>Date</p>
      //                 <p>Time</p>
      //                 <p>Name</p>
      //                 <p>Game Type</p>
      //                 <p>Number</p>
      //                 <p>Compensation</p>
      //                 <p>Amount</p>
      //                 <p>Total</p>
      //               </div>
    
      //               <div className='twod-day-sale-book-rows-container'>
      //                 <div className='twod-day-sale-book-row-container'>
    
      //                   <div className='twod-day-sale-book-row'>
      //                     <p>1</p>
      //                     <p>08/18/2022</p>
      //                     <p>9:51</p>
      //                     <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
      //                       <p>Customer Name</p>
      //                       <p>0912345678</p>
      //                     </div>
    
      //                     <p>2Pieces</p>
    
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>34</p>
      //                       <p>48</p>
      //                       <p>67</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>85</p>
      //                       <p>80</p>
      //                       <p>83</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>10000ks</p>
      //                       <p>100000ks</p>
      //                       <p>20000ks</p>
      //                       <p className='twod-day-sale-book-seperate-row'>
      //                         130000ks
      //                       </p>
      //                     </div>
      //                     <p>130000ks</p> 
      //                   </div>
      //                   <div className='twod-day-sale-book-row-line'></div>
      //                 </div>
      //                 <div className='twod-day-sale-book-row-container'>
    
      //                   <div className='twod-day-sale-book-row'>
      //                     <p>88</p>
      //                     <p>01/11/2022</p>
      //                     <p>9:51</p>
      //                     <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
      //                       <p>Customer Name name</p>
      //                       <p>0912345678</p>
      //                     </div>
    
      //                     <p>2Pieces</p>
    
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>34</p>
      //                       <p>48</p>
      //                       <p>67</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>85</p>
      //                       <p>80</p>
      //                       <p>83</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>10000ks</p>
      //                       <p>100000ks</p>
      //                       <p>20000ks</p>
      //                       <p className='twod-day-sale-book-seperate-row'>
      //                         130000ks
      //                       </p>
      //                     </div>
      //                     <p>130000ks</p> 
      //                   </div>
      //                   <div className='twod-day-sale-book-row-line'></div>
      //                 </div>
                      
      //               </div> */}
      //               <div className='winners-table-container'>
      //                 <SaleBookTable 
      //                   id="lonePyineSaleBook"
      //                   columns={LonePyineSaleBookColumns} 
      //                   data = {lonePyineSaleBookData}
      //                 />
      //               </div>
      //             </div>
      //           </>
               
      //           : null
      //         }
      //         {/* {
      //           headerCategory === "3d" && transactionCategory ==="sale voucher" ? 
      //           <div className='towd-voucher-parent-container'>
      //             <div className='twod-day-voucher-rows-container'></div>
      //           </div> : null
      //         } */}
      //         {
      //           headerCategory === "3d" && transactionCategory ==="sale day book" ? 
      //           <div className='twod-sale-day-book-parent-container'>
      //             <div className='twod-sale-day-book-header-container'>
      //                 <p>{current_language === "english" ? "3Pieces" : "၃လုံး"}</p>
      //                 <div className='sale-generate-btns-container' onClick={() => setIs3dSaleBookGenerateOpen(!is3dSaleBookGenerateOpen)}>
      //                 {current_language === "english" ? "Generate" : "ထုတ်မည်"}
      //                   <div className={is3dSaleBookGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
      //                     {/* <button onClick={() =>  handleExcelExport(threedSaleBookData,"3dSaleBook")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button> */}
      //                     <button onClick={() => handlePdfExport("3dSaleBook","#threedSaleBook")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
      //                   </div>
      //                 </div>
      //               </div>
      //               {/* <div className='twod-sale-day-book-label-container'>
      //                 <p>No</p>
      //                 <p>Date</p>
      //                 <p>Time</p>
      //                 <p>Name</p>
      //                 <p>Game Type</p>
      //                 <p>Number</p>
      //                 <p>Compensation</p>
      //                 <p>Amount</p>
      //                 <p>Total</p>
      //               </div>
    
      //               <div className='twod-day-sale-book-rows-container'>
      //                 <div className='twod-day-sale-book-row-container'>
    
      //                   <div className='twod-day-sale-book-row'>
      //                     <p>1</p>
      //                     <p>08/18/2022</p>
      //                     <p>9:51</p>
      //                     <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
      //                       <p>Customer Name</p>
      //                       <p>0912345678</p>
      //                     </div>
    
      //                     <p>3Pieces</p>
    
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>34</p>
      //                       <p>48</p>
      //                       <p>67</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>85</p>
      //                       <p>80</p>
      //                       <p>83</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>10000ks</p>
      //                       <p>100000ks</p>
      //                       <p>20000ks</p>
      //                       <p className='twod-day-sale-book-seperate-row'>
      //                         130000ks
      //                       </p>
      //                     </div>
      //                     <p>130000ks</p> 
      //                   </div>
      //                   <div className='twod-day-sale-book-row-line'></div>
      //                 </div>
      //                 <div className='twod-day-sale-book-row-container'>
    
      //                   <div className='twod-day-sale-book-row'>
      //                     <p>1</p>
      //                     <p>01/11/2022</p>
      //                     <p>9:51</p>
      //                     <div className='twod-day-sale-book-row-detail-column twod-day-sale-book-row-name-column'>
      //                       <p>Customer Name name</p>
      //                       <p>0912345678</p>
      //                     </div>
    
      //                     <p>3Pieces</p>
    
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>134</p>
      //                       <p>548</p>
      //                       <p>767</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>85</p>
      //                       <p>80</p>
      //                       <p>83</p>
      //                     </div>
      //                     <div className='twod-day-sale-book-row-detail-column'>
      //                       <p>10000ks</p>
      //                       <p>100000ks</p>
      //                       <p>20000ks</p>
      //                       <p className='twod-day-sale-book-seperate-row'>
      //                         130000ks
      //                       </p>
      //                     </div>
      //                     <p>130000ks</p> 
      //                   </div>
      //                   <div className='twod-day-sale-book-row-line'></div>
      //                 </div>
                      
      //               </div> */}
      //               <div className='winners-table-container'>
      //               <SaleBookTable 
      //                 id="threedSaleBook"
      //                 columns={threedSaleBookColumns} 
      //                 data = {threedSaleBookData}
      //               />
      //               </div>
    
      //             </div> : null
      //         }
      //   </div>
      //   {/* <ToastContainer /> */}
      //   </>
      // }
        
      // </>)
      return(
        <Loading isLoading={isLoading}>
           <>
        <Header/>
        <Navbar/>
    
        {/* 2D winners */}
        <div className='App winners-parent-container'>
            <div className='winners-header-container'>
              <p>{current_language === "english" ? "2Pieces Winners" : "၂လုံးအောင်စရင်း"}</p>
              <div className='winners-filters-container'>
                {/* <div className='winners-name-container'>
                   <input list='customers' type="text" placeholder='Customer Name'/>
                   <datalist id="customers">
                    <option value="Customer Name1"></option>
                    <option value="Customer Name2"></option>
                    <option value="Customer Name3"></option>
                   </datalist>
                </div> */}
    
                <input className='winners-date-filter' type="date" onChange={(e) => filter2dWinnersDate(e)}></input>
    
                <select className='winners-round-filter' onChange={(e) => filter2dRound(e)}>
                  <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                </select>
              </div>
              <div className='sale-generate-btns-container' onClick={() => setIs2dGenerateOpen(!is2dGenerateOpen)}>
                {current_language === "english" ? "Generate" : "ထုတ်မည်"}
                  <div className={is2dGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
                    <button onClick={() => handleExcelExport(twodData,"2dWinners")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
                    <button onClick={() => handlePdfExport("2dWinners","#twodWinners")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
                  </div>
                </div>
            </div>
    
            {/* <table className='winners-details-parent-container'>
                <tr className='winners-details-labels-container'>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Amount</th>
                    <th>Comthensation</th>
                    <th>Game Type</th>
                    <th>Date</th>
                    <th>Round</th>
                </tr>
    
                <tbody className='winners-details-container'>
                    <tr className='winners-details-rows'>
                        <td>Customer Name1</td>
                        <td>32</td>
                        <td>10000ks</td>
                        <td>85</td>
                        <td>2Pieces</td>
                        <td>08/22/2022</td>
                        <td>Morning</td>
                    </tr>
                    <tr className='winners-details-rows'>
                        <td>Customer Name1</td>
                        <td>32</td>
                        <td>10000ks</td>
                        <td>85</td>
                        <td>2Pieces</td>
                        <td>08/22/2022</td>
                        <td>Morning</td>
                    </tr>
                    <tr className='winners-details-rows'>
                        <td>Customer Name1</td>
                        <td>32</td>
                        <td>10000ks</td>
                        <td>85</td>
                        <td>2Pieces</td>
                        <td>08/22/2022</td>
                        <td>Morning</td>
                    </tr>
                </tbody>
            </table> */}
            <div className='winners-table-container'>
             <Table 
                  id="twodWinners"
                  columns={twodColumns} 
                  data = {twodData}
                />
            </div>
        </div>
    
        {/* Lone Pyine Winners */}
        <div className='App winners-parent-container'>
            <div className='winners-header-container'>
              <p>{current_language === "english" ? "Lone Pyine Winners" : "လုံးပြိုင်အောင်စရင်း"}</p>
              <div className='winners-filters-container'>
                {/* <div className='winners-name-container'>
                   <input list='customers' type="text" placeholder='Customer Name'/>
                   <datalist id="customers">
                    <option value="Customer Name1"></option>
                    <option value="Customer Name2"></option>
                    <option value="Customer Name3"></option>
                   </datalist>
                </div> */}
    
                <input className='winners-date-filter' type="date" onChange={(e) => filterLonePyineWinnersDate(e)}></input>
    
                <select className='winners-round-filter' onChange={(e) => filterLonePyineRound(e)}>
                  <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                </select>
                </div>
                <div className='sale-generate-btns-container' onClick={() => setIsLonePyineGenerateOpen(!isLonePyineGenerateOpen)}>
                {current_language === "english" ? "Generate" : "ထုတ်မည်"}
                  <div className={isLonePyineGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
                    <button onClick={() => handleExcelExport(lonePyineData,"LonePyineWinners")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
                    <button onClick={() => handlePdfExport("LonePyineWinners","#lonePyineWinners")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
                  </div>
                </div>
            </div>
    
            {/* <div className='winners-details-parent-container'>
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
            </div> */}
            <div className='winners-table-container'>

           
             <Table 
                  id="lonePyineWinners"
                  columns={LonePyineColumns} 
                  data = {lonePyineData}
                />
            </div>
        </div>
    
        {/* 3d Winners */}
        <div className='App winners-parent-container'>
            <div className='winners-header-container'>
              <p>{current_language === "english" ? "3D Winners" : "၃လုံးအောင်စရင်း"}</p>
              <div className='winners-filters-container'>
                {/* <div className='winners-name-container'>
                   <input list='customers' type="text" placeholder='Customer Name'/>
                   <datalist id="customers">
                    <option value="Customer Name1"></option>
                    <option value="Customer Name2"></option>
                    <option value="Customer Name3"></option>
                   </datalist>
                </div> */}
    
                <input className='winners-date-filter' type="date" onChange={(e) => filter3dWinnersDate(e)}></input>
    
                <select className='winners-round-filter' onChange={(e) => filter3DRound(e)}>
                  <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
                  <option value="Morning">Morning</option>
                  <option value="Evening">Evening</option>
                </select>
                </div>
                <div className='sale-generate-btns-container' onClick={() => setIs3dGenerateOpen(!is3dGenerateOpen)}>
                {current_language === "english" ? "Generate" : "ထုတ်မည်"}
                  <div className={is3dGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
                    <button onClick={() =>  handleExcelExport(threedData,"3dWinners")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
                    <button onClick={() => handlePdfExport("3dWinners","#threedWinners")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
                  </div>
                </div>
            </div>
    
            {/* <div className='winners-details-parent-container'>
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
            </div> */}
            <div className='winners-table-container'>
             <Table 
                  id="threedWinners"
                  columns={threedColumns} 
                  data = {threedData}
                />
            </div>
        </div>
    
        <div className='App transaction-parent-container'>
              <div className='transaction-header-container'>
                <p onClick={() => setHeaderCategory("2d")} className={headerCategory === "2d" ? 'transaction-header-item transaction-header-active' : "transaction-header-item"}>{current_language === "english" ? "2D" : "၂လုံး"}</p>
                <p onClick={() => setHeaderCategory("3d")} className={headerCategory === "3d" ? 'transaction-header-item transaction-header-active' : "transaction-header-item"}>{current_language === "english" ? "3D" : "၃လုံး"}</p>
              </div>
    
              <div className='transaction-category-container'>
                {/* <button onClick={() => setTransactionCategory("sale voucher")} className={transactionCategory === "sale voucher" ? 'transaction-category-btn transaction-category-btn-active' : "transaction-category-btn"}>Sale Voucher</button> */}
                <button onClick={() => setTransactionCategory("sale day book")} className={transactionCategory === "sale day book" ? 'transaction-category-btn transaction-category-btn-active' : "transaction-category-btn"}>{current_language === 'english' ? 'Sale Day Book' : "နေ့စဉ်အရောင်းစာအုပ်"}</button>
              </div>
    
              {/* {
                headerCategory === "2d" && transactionCategory ==="sale voucher" ? 
                <div className='towd-voucher-parent-container'>
                  <div className='twod-day-voucher-rows-container'></div>
                </div> : null
              } */}
              {
                headerCategory === "2d" && transactionCategory ==="sale day book" ? 
                <>
                  <div className='twod-sale-day-book-parent-container'>
                    <div className='twod-sale-day-book-header-container'>
                      <p>{current_language === "english" ? "2Pieces" : "၂လုံး"}</p>
                      <div className='sale-generate-btns-container' onClick={() => setIs2dSaleBookGenerateOpen(!is2dSaleBookGenerateOpen)}>
                      {current_language === "english" ? "Generate" : "ထုတ်မည်"}
                        <div className={is2dSaleBookGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
                          {/* <button onClick={() =>  handleExcelExport(twodSaleBookData,"2dSaleBook")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button> */}
                          <button onClick={() => handlePdfExport("2dSaleBook","#twodSaleBook")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
                        </div>
                      </div>
                    </div>
    
                    {/* <table className='twod-sale-day-book-details-parent-container'>
    
                    </table> */}
                    {/* <div className='twod-sale-day-book-label-container'>
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
                      
                    </div> */}
                    <div className='salebook-table-container'>
                    <SaleBookTable 
                      id="twodSaleBook"
                      columns={twodSaleBookColumns} 
                      data = {twodSaleBookData}
                    />
                    </div>
                  </div>
    
    
                  <div className='twod-sale-day-book-parent-container'>
                  <div className='twod-sale-day-book-header-container'>
                      <p>{current_language === "english" ? "Lone Pyine" : "လုံးပြိုင်"}</p>
                      <div className='sale-generate-btns-container' onClick={() => setIsLonePyineSaleBookGenerateOpen(!isLonePyineSaleBookGenerateOpen)}>
                      {current_language === "english" ? "Generate" : "ထုတ်မည်"}
                        <div className={isLonePyineSaleBookGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
                          {/* <button onClick={() =>  handleExcelExport(lonePyineSaleBookData,"LonePyineSaleBook")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button> */}
                          <button onClick={() => handlePdfExport("LonePyineSaleBook","#lonePyineSaleBook")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
                        </div>
                      </div>
                    </div>
                    {/* <div className='twod-sale-day-book-label-container'>
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
                      
                    </div> */}
                    <div className='winners-table-container'>
                      <SaleBookTable 
                        id="lonePyineSaleBook"
                        columns={LonePyineSaleBookColumns} 
                        data = {lonePyineSaleBookData}
                      />
                    </div>
                  </div>
                </>
               
                : null
              }
              {/* {
                headerCategory === "3d" && transactionCategory ==="sale voucher" ? 
                <div className='towd-voucher-parent-container'>
                  <div className='twod-day-voucher-rows-container'></div>
                </div> : null
              } */}
              {
                headerCategory === "3d" && transactionCategory ==="sale day book" ? 
                <div className='twod-sale-day-book-parent-container'>
                  <div className='twod-sale-day-book-header-container'>
                      <p>{current_language === "english" ? "3Pieces" : "၃လုံး"}</p>
                      <div className='sale-generate-btns-container' onClick={() => setIs3dSaleBookGenerateOpen(!is3dSaleBookGenerateOpen)}>
                      {current_language === "english" ? "Generate" : "ထုတ်မည်"}
                        <div className={is3dSaleBookGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
                          {/* <button onClick={() =>  handleExcelExport(threedSaleBookData,"3dSaleBook")}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button> */}
                          <button onClick={() => handlePdfExport("3dSaleBook","#threedSaleBook")}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
                        </div>
                      </div>
                    </div>
                    {/* <div className='twod-sale-day-book-label-container'>
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
                      
                    </div> */}
                    <div className='winners-table-container'>
                    <SaleBookTable 
                      id="threedSaleBook"
                      columns={threedSaleBookColumns} 
                      data = {threedSaleBookData}
                    />
                    </div>
    
                  </div> : null
              }
        </div>
        {/* <ToastContainer /> */}
        </>
        </Loading>
      )
     }else{
      return(
      <Navigate to ="/" replace={true}></Navigate>
      )
     }
  
}

export default Transaction