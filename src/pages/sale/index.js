import React,{useState,useEffect, useRef, useMemo} from 'react'
import { useSelector } from 'react-redux'
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import { axiosInstance } from '../../urlConfig'
import "./styles.css"
import {Navigate} from "react-router-dom"

// import { Grid, GridColumn as Column,GridToolbar } from "@progress/kendo-react-grid";
// import { ExcelExport, ExcelExportColumn } from '@progress/kendo-react-excel-export';

import * as XLSX from 'xlsx/xlsx.mjs';
import { useTable } from 'react-table'

import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';

import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../components/Loading'


//table layout
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



const Sale = () => {

  const [accepted2dTransactions,setAccepted2dTransactions] = useState([])
  const [acceptedLonePyineTransactions,setAcceptedLonePyineTransactions] = useState([])
  const [accepted3dTransactions, setAccepted3dTransactions] = useState([])

  const [temp2dArr,setTemp2dArr] =  useState([])
  const [tempLonePyineArr,setTempLonePyineArr] =  useState([])
  const [temp3dArr,setTemp3dArr] =  useState([])

  const [is2dGenerateOpen,setIs2dGenerateOpen] = useState(false)
  const [isLonePyineGenerateOpen,setIsLonePyineGenerateOpen] = useState(false)
  const [is3dGenerateOpen,setIs3dGenerateOpen] = useState(false)

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


 //fetch all transactions
 const fetchAcceptedTransactions = async () => {
  try {
    const twod = await axiosInstance.get("/2d-accepted-transition",{headers:{Authorization:`Bearer ${user_login.token}`}})
    const lonepyine = await axiosInstance.get("/lonepyaing-accepted-transition",{headers:{Authorization:`Bearer ${user_login.token}`}})
    const threed = await axiosInstance.get("/3d-accepted-transition",{headers:{Authorization:`Bearer ${user_login.token}`}})
    setIsLoading(true)
  // console.log(res)

  if(twod.data.status === 200 && lonepyine.data.status === 200 && threed.data.status === 200){
    setAccepted2dTransactions(twod?.data?.accepted_twod_lists)
    setAcceptedLonePyineTransactions(lonepyine?.data?.accepted_lonepyaing_lists)
    setAccepted3dTransactions(threed?.data?.accepted_threed_lists)

    // console.log(twod)
    // console.log(acceptedLonePyineTransactions)
    // console.log(accepted3dTransactions)

    setTemp2dArr(twod?.data?.accepted_twod_lists)
    setTempLonePyineArr(lonepyine?.data?.accepted_lonepyaing_lists)
    setTemp3dArr(threed?.data?.accepted_threed_lists)
    setIsLoading(false)
  }
  } catch (error) {
    notify("Something went Wrong. Please log in again.")
    setIsLoading(false)
  }
  

  // console.log(twod.data.twod_sale_lists)
  // console.log(accepted2dTransactions)
  // console.log(acceptedLonePyineTransactions)
  // console.log(accepted3dTransactions)

}

//fetch 2d
const fetch2dAcceptedTransactions = async (date) => {
  const twod = await axiosInstance.post("/2d-accepted-transitionbydate",{
    current_date : date
  },{headers:{Authorization:`Bearer ${user_login.token}`}})
  // console.log(twod)
  

  if(twod.data.status === 200){
    setAccepted2dTransactions(twod?.data?.accepted_twod_lists)
    setTemp2dArr(twod?.data?.accepted_twod_lists)
  }
}


//fetch lonepyine
const fetchLonePyineAcceptedTransactions = async (date) => {
  const lonepyine = await axiosInstance.post("/lonepyaing-accepted-transitionbydate",{
    current_date : date
  },{headers:{Authorization:`Bearer ${user_login.token}`}})
  if(lonepyine.data.status === 200){
    setAcceptedLonePyineTransactions(lonepyine?.data?.accepted_lonepyaing_lists)
    setTempLonePyineArr(lonepyine?.data?.accepted_lonepyaing_lists)
  }
}


//fetch 3d
const fetch3dAcceptedTransactions = async (date) => {
  const threed = await axiosInstance.post("/3d-accepted-transitionbydate",{
    current_date : date
  },{headers:{Authorization:`Bearer ${user_login.token}`}})
  if(threed.data.status === 200){
    setAccepted3dTransactions(threed?.data?.accepted_threed_lists)
    setTemp3dArr(threed?.data?.accepted_threed_lists)
  }
}

//fetch all on component mount
 useEffect(() => {
  if(user_login.isLoggedIn && user_login.role === "agent"){
    fetchAcceptedTransactions()
   }
  
},[])


//2d table data
 const twodData = useMemo(() => {
  const transactionarr = accepted2dTransactions?.map((item) => {
    return {
      Name : item.customer_name,
      Date : item.twod.date,
      Round : item.twod.round,
      Number : item.twod.number,
      Amount : item.sale_amount
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
      Header:  current_language === "english" ? "Date" : "ရက်",
      accessor : "Date"
    },
    {
      Header:  current_language === "english" ? "Round" : "ပွဲ",
      accessor : "Round"
    },
    {
      Header: current_language === "english" ? "Number" : "နံပါတ်",
      accessor : "Number"
    },
    {
      Header: current_language === "english" ? "Amount" : "ထိုး‌ကြေး",
      accessor : "Amount"
    },
  ]
 )

 //lonepyine table data
 const lonePyineData = useMemo(() => {
  const transactionarr = acceptedLonePyineTransactions?.map((item) => {
    return {
      Name : item.customer_name,
      Date : item.lonepyine.date,
      Round : item.lonepyine.round,
      Number : item.lonepyine.number,
      Amount : item.sale_amount
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
      Header: current_language === "english" ? "Date" : "ရက်",
      accessor : "Date"
    },
    {
      Header: current_language === "english" ? "Round" : "ပွဲ",
      accessor : "Round"
    },
    {
      Header: current_language === "english" ? "Number" : "နံပါတ်",
      accessor : "Number"
    },
    {
      Header: current_language === "english" ? "Amount" : "ထိုး‌ကြေး",
      accessor : "Amount"
    },
  ]
 )


//3d table data
 const threedData = useMemo(() => {
  const transactionarr = accepted3dTransactions?.map((item) => {
    return {
      Name : item.customer_name,
      Date : item.threed.date,
      // Round : item.threed.round,
      Number : item.threed.number,
      Amount : item.sale_amount
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
      Header: current_language === "english" ? "Date" : "ရက်",
      accessor : "Date"
    },
    // {
    //   Header: current_language === "english" ? "Round" : "ပွဲ",
    //   accessor : "Round"
    // },
    {
      Header: current_language === "english" ? "Number" : "နံပါတ်",
      accessor : "Number"
    },
    {
      Header: current_language === "english" ? "Amount" : "ထိုး‌ကြေး",
      accessor : "Amount"
    },
  ]
 )

//  const excel_exporter = useRef()

 
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

  // const exportExcel = () =>{
  //   if (excel_exporter.current) {
  //     excel_exporter.current.save();
  //   }
  // }
  //filter 2d
  const filter2dRound = (e) => {
    // console.log(temp2dArr)
      setAccepted2dTransactions(temp2dArr)
      if(e.target.value){
        const filteredArr = temp2dArr.filter((item) => {
          if(item.twod.round === e.target.value) {
            return item
          }
        })
        setAccepted2dTransactions(filteredArr)
      }
    
  }

  const filter2dDate = (e) => {
    // console.log(e.target.value)
    fetch2dAcceptedTransactions(e.target.value)
  }

  //filter lonepyine
  const filterLonePyineRound = (e) => {
    console.log(e.target.value)
    setAcceptedLonePyineTransactions(tempLonePyineArr)
    if(e.target.value){
      const filteredArr = tempLonePyineArr.filter((item) => {
        if(item.lonepyine.round === e.target.value) {
          return item
        }
      })
      // console.log(filteredArr)

      setAcceptedLonePyineTransactions(filteredArr)
      // console.log(acceptedLonePyineTransactions)
    }   
  }

  const filterLonePyineDate = (e) => {
    fetchLonePyineAcceptedTransactions(e.target.value)
  }

  //filter 3d
  const filter3DRound = (e) => {
    // console.log(e.target.value)
    setAccepted3dTransactions(temp3dArr)
    if(e.target.value){
      const filteredArr = temp3dArr.filter((item) => {
        if(item.threed.round === e.target.value) {
          // console.log(item)
          return item
        }
      })

      setAccepted3dTransactions(filteredArr)}
    // }else{
    //   fetch3dAcceptedTransactions()
    // }
  }

  const filter3DDate = (e) => {
    fetch3dAcceptedTransactions(e.target.value)
  }


  //export 2d excel
  const handle2piecesExport = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(twodData)

    XLSX.utils.book_append_sheet(wb,ws, "2PiecesAcceptedTransactions")

    XLSX.writeFile(wb, "2PiecesAcceptedTransactions.xlsx")
  }

  //export lone pyine excel
  const handleLonePyineExport = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(lonePyineData)

    XLSX.utils.book_append_sheet(wb,ws, "lonePyineAcceptedTransactions")

    XLSX.writeFile(wb, "lonePyineAcceptedTransactions.xlsx")

  }

  //export 3d excel
  const handle3piecesExport = () => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(threedData)

    XLSX.utils.book_append_sheet(wb,ws, "3dAcceptedTransactions")

    XLSX.writeFile(wb, "3dAcceptedTransactions.xlsx")
  }


  //export to pdf
  const handle2piecesExportPDF = () => {
    const doc = new jsPDF()
    doc.text("2pieces Accepted Transactions",20,10,)
    autoTable(doc, { html: '#twodAcceptedTransactions' })
    doc.save("2piecesAcceptedTransactions.pdf")
  }
  const handleLonePyineExportPDF = () => {
    const doc = new jsPDF()
    doc.text("Lone Pyine Accepted Transactions",20,10,)
    autoTable(doc, { html: '#lonePyineAcceptedTransactions' })
    doc.save("LonePyineAcceptedTransactions.pdf")
  }
  const handle3DExportPDF = () => {
    const doc = new jsPDF()
    doc.text("3D Accepted Transactions",20,10,)
    autoTable(doc, { html: '#threedAcceptedTransactions' })
    doc.save("3DAcceptedTransactions.pdf")
  }

  if(user_login.isLoggedIn && user_login.role === "agent"){
  //   return(<>
  //     {
  //       isLoading ? <Loading/> :  
  //         <>
  //             <Header/>
  //             <Navbar/>
  
  //             <div className='App sale-parent-container'> 
  //               {/* <ExcelExport data={accepted2dTransactions} fileName="2dAcceptedTransactions.xlsx" ref={excel_exporter}>
  
                
  //               <Grid data={accepted2dTransactions} className='sale-2pieces-container'>
  //                 <GridToolbar className='sale-headers-container'>
  //                   <p className='sale-header'>2Pieces Accepted Sales</p>
  //                   <div className='sale-filters-container'>
  //                     <input className='sale-filter-date-input' type="date"></input>
  //                     <div className='sale-filter-customer-filter'>
  //                       <input list='customers' type="text" placeholder='Customer Name'/>
  //                       <datalist id="customers">
  //                         <option value="Customer Name1"></option>
  //                         <option value="Customer Name2"></option>
  //                         <option value="Customer Name3"></option>
  //                       </datalist>
  //                     </div>
  
  //                   <select className='sale-filter-round-filter'>
  //                     <option>Round</option>
  //                   </select>
  //                   </div>
  //                   <button onClick={exportExcel}>Generate Sales</button>
  //                 </GridToolbar>
  
  //                 <Column field='customer_name' title="Name" ></Column>
  //                 <Column field='created_at' title="Date" ></Column>
  //                 <Column field='round' title="Round" ></Column>
  //                 <Column field='number' title="Number" ></Column>
  //                 <Column field='sale_amount' title="Amount" ></Column>
  
  //                 <ExcelExportColumn field='customer_name' title="Name" ></ExcelExportColumn>
  //                 <ExcelExportColumn field='created_at' title="Date" ></ExcelExportColumn>
  //                 <ExcelExportColumn field='round' title="Round" ></ExcelExportColumn>
  //                 <ExcelExportColumn field='number' title="Number" ></ExcelExportColumn>
  //                 <ExcelExportColumn field='sale_amount' title="Amount" ></ExcelExportColumn>
                  
  
                  
  //               </Grid>
  //               </ExcelExport> */}
  
  //               <div className='sale-2pieces-container'>
  //                 <div className='sale-headers-container'>
  //                 <p className='sale-header'>{current_language === "english" ? "2Pieces Accepted Sales" : "၂လုံးလက်ခံရောင်းချခြင်း"}</p>
  //                 <div className='sale-filters-container'>
  //                   <input className='sale-filter-date-input' type="date" onChange={(e) => filter2dDate(e)}></input>
  //                   {/* <div className='sale-filter-customer-filter'>
  //                     <input list='customers' type="text" placeholder='Customer Name'/>
  //                     <datalist id="customers">
  //                       <option value="Customer Name1"></option>
  //                       <option value="Customer Name2"></option>
  //                       <option value="Customer Name3"></option>
  //                     </datalist>
  //                   </div> */}
  
  //                 <select className='sale-filter-round-filter'onChange={(e) => filter2dRound(e)}>
  //                   <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
  //                   <option value="Morning" >Morning</option>
  //                   <option value="Evening" >Evening</option>
  //                 </select>
  //                 </div>
  //                 <div className='sale-generate-btns-container' onClick={() => setIs2dGenerateOpen(!is2dGenerateOpen)}>
  //                 {current_language === "english" ? "Generate" : "ထုတ်မည်"}
  //                   <div className={is2dGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
  //                     <button onClick={() => handle2piecesExport()}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
  //                     <button onClick={() => handle2piecesExportPDF()}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
  //                   </div>
  //                 </div>
                  
  //                 </div>
                  
  
  //               {/* <table className='sale-details-parent-container'>
  //                 <tr className='sale-details-labels-container'>
  //                   <th>Name</th>
  //                   <th>Date</th>
  //                   <th>Round</th>
  //                   <th>Number</th>
  //                   <th>Amount</th>
  //                 </tr>
  
  //                 <div className='sale-details-rows-container'>
  //                   {
  //                     accepted2dTransactions.map((item) => (
  //                       <tr className='sale-details-row'>
  //                         <td>{item.customer_name}</td>
  //                         <td>{(item.created_at).split(" ")[0]}</td>
  //                         <td>Morning</td>
  //                         <td>{item.number}</td>
  //                         <td>{item.sale_amount}ks</td>
  //                       </tr>
  //                     ))
  //                   }
                    
  //                 </div>
  //               </table> */}
  //                 <div className='sale-table-container'>
  //                 <Table 
  //                   id="twodAcceptedTransactions"
  //                   columns={twodColumns} 
  //                   data = {twodData}
  //                 />
  //                 </div>
  //               </div>
  
  //               <div className='sale-lonepyine-container'>
  //                 <div className='sale-headers-container'>
  //                 <p className='sale-header'>{current_language === "english" ? "Lone Pyine Accepted Sales" : "လုံးပြိုင်လက်ခံရောင်းချခြင်း"}</p>
  //                 <div className='sale-filters-container'>
  //                   <input className='sale-filter-date-input' type="date" onChange={(e) => filterLonePyineDate(e)}></input>
  //                   {/* <div className='sale-filter-customer-filter'>
  //                     <input list='customers' type="text" placeholder='Customer Name'/>
  //                     <datalist id="customers">
  //                       <option value="Customer Name1"></option>
  //                       <option value="Customer Name2"></option>
  //                       <option value="Customer Name3"></option>
  //                     </datalist>
  //                   </div> */}
  
  //                 <select className='sale-filter-round-filter'onChange={(e) => filterLonePyineRound(e)}>
  //                   <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
  //                   <option value="morning" >Morning</option>
  //                   <option value="evening" >Evening</option>
  //                 </select>
  //                 </div>
                  
  //                 <div className='sale-generate-btns-container' onClick={() => setIsLonePyineGenerateOpen(!isLonePyineGenerateOpen)}>
  //                 {current_language === "english" ? "Generate" : "ထုတ်မည်"}
  //                   <div className={isLonePyineGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
  //                     <button onClick={() => handleLonePyineExport()}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
  //                     <button onClick={() => handleLonePyineExportPDF()}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
  //                   </div>
  //                 </div>
                  
  //                 </div>
                  
  
  //               {/* <table className='sale-details-parent-container'>
  //                 <tr className='sale-details-labels-container'>
  //                   <th>Name</th>
  //                   <th>Date</th>
  //                   <th>Round</th>
  //                   <th>Number</th>
  //                   <th>Amount</th>
  //                 </tr>
  
  //                 <div className='sale-details-rows-container'>
  //                   {
  //                     acceptedLonePyineTransactions.map((item) => (
  //                       <tr className='sale-details-row'>
  //                         <td>{item.customer_name}</td>
  //                         <td>{(item.created_at).split(" ")[0]}</td>
  //                         <td>Morning</td>
  //                         <td>{item.number}</td>
  //                         <td>{item.sale_amount}ks</td>
  //                       </tr>
  //                     ))
  //                   }
                    
  //                 </div>
  //               </table> */}
  //               <div className='sale-table-container'>
  //               <Table
  //               id = "lonePyineAcceptedTransactions"
  //               columns={LonePyineColumns} 
  //                   data = {lonePyineData}/>
  //                 </div>
  //               </div>
  //               <div className='sale-lonepyine-container'>
  //                 <div className='sale-headers-container'>
  //                 <p className='sale-header'>{current_language === "english" ? "3Pieces Accepted Sales" : "၃လုံးလက်ခံရောင်းချခြင်း"}</p>
  //                 <div className='sale-filters-container'>
  //                   <input className='sale-filter-date-input' type="date" onChange={(e) => filter3DDate(e)}></input>
  //                   {/* <div className='sale-filter-customer-filter'>
  //                     <input list='customers' type="text" placeholder='Customer Name'/>
  //                     <datalist id="customers">
  //                       <option value="Customer Name1"></option>
  //                       <option value="Customer Name2"></option>
  //                       <option value="Customer Name3"></option>
  //                     </datalist>
  //                   </div> */}
  
  //                 <select className='sale-filter-round-filter'onChange={(e) => filter3DRound(e)}>
  //                   <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
  //                   <option value="morning" >Morning</option>
  //                   <option value="evening" >Evening</option>
  //                 </select>
  //                 </div>
  //                 <div className='sale-generate-btns-container' onClick={() => setIs3dGenerateOpen(!is3dGenerateOpen)}>
  //                 {current_language === "english" ? "Generate" : "ထုတ်မည်"}
  //                   <div className={is3dGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
  //                     <button onClick={() => handle3piecesExport()}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
  //                     <button onClick={() => handle3DExportPDF()}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
  //                   </div>
  //                 </div>
  //                 </div>
                  
  
  //               {/* <table className='sale-details-parent-container'>
  //                 <tr className='sale-details-labels-container'>
  //                   <th>Name</th>
  //                   <th>Date</th>
  //                   <th>Round</th>
  //                   <th>Number</th>
  //                   <th>Amount</th>
  //                 </tr>
  
  //                 <div className='sale-details-rows-container'>
  //                   {
  //                     accepted3dTransactions.map((item) => (
  //                       <tr className='sale-details-row'>
  //                         <td>{item.customer_name}</td>
  //                         <td>{(item.created_at).split(" ")[0]}</td>
  //                         <td>Morning</td>
  //                         <td>{item.number}</td>
  //                         <td>{item.sale_amount}ks</td>
  //                       </tr>
  //                     ))
  //                   }
                    
  //                 </div>
  //               </table> */}
  //                 <div className='sale-table-container'>

                 
  //                 <Table
  //                 id = "threedAcceptedTransactions"
  //                 columns={threedColumns} 
  //                   data = {threedData}/>
  //                    </div>
  //               </div>
              
                
  //             </div>
  
  //             {/* <ToastContainer /> */}
  //         </>   
  //     }
  //  </>)
  return(
    <Loading isLoading={isLoading}>
       <>
              <Header/>
              <Navbar/>
  
              <div className='App sale-parent-container'> 
                {/* <ExcelExport data={accepted2dTransactions} fileName="2dAcceptedTransactions.xlsx" ref={excel_exporter}>
  
                
                <Grid data={accepted2dTransactions} className='sale-2pieces-container'>
                  <GridToolbar className='sale-headers-container'>
                    <p className='sale-header'>2Pieces Accepted Sales</p>
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
                    <button onClick={exportExcel}>Generate Sales</button>
                  </GridToolbar>
  
                  <Column field='customer_name' title="Name" ></Column>
                  <Column field='created_at' title="Date" ></Column>
                  <Column field='round' title="Round" ></Column>
                  <Column field='number' title="Number" ></Column>
                  <Column field='sale_amount' title="Amount" ></Column>
  
                  <ExcelExportColumn field='customer_name' title="Name" ></ExcelExportColumn>
                  <ExcelExportColumn field='created_at' title="Date" ></ExcelExportColumn>
                  <ExcelExportColumn field='round' title="Round" ></ExcelExportColumn>
                  <ExcelExportColumn field='number' title="Number" ></ExcelExportColumn>
                  <ExcelExportColumn field='sale_amount' title="Amount" ></ExcelExportColumn>
                  
  
                  
                </Grid>
                </ExcelExport> */}
  
                <div className='sale-2pieces-container'>
                  <div className='sale-headers-container'>
                  <p className='sale-header'>{current_language === "english" ? "2Pieces Accepted Sales" : "၂လုံးလက်ခံရောင်းချခြင်း"}</p>
                  <div className='sale-filters-container'>
                    <input className='sale-filter-date-input' type="date" onChange={(e) => filter2dDate(e)}></input>
                    {/* <div className='sale-filter-customer-filter'>
                      <input list='customers' type="text" placeholder='Customer Name'/>
                      <datalist id="customers">
                        <option value="Customer Name1"></option>
                        <option value="Customer Name2"></option>
                        <option value="Customer Name3"></option>
                      </datalist>
                    </div> */}
  
                  <select className='sale-filter-round-filter'onChange={(e) => filter2dRound(e)}>
                    <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
                    <option value="Morning" >Morning</option>
                    <option value="Evening" >Evening</option>
                  </select>
                  </div>
                  <div className='sale-generate-btns-container' onClick={() => setIs2dGenerateOpen(!is2dGenerateOpen)}>
                  {current_language === "english" ? "Generate" : "ထုတ်မည်"}
                    <div className={is2dGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
                      <button onClick={() => handle2piecesExport()}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
                      <button onClick={() => handle2piecesExportPDF()}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
                    </div>
                  </div>
                  
                  </div>
                  
  
                {/* <table className='sale-details-parent-container'>
                  <tr className='sale-details-labels-container'>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Round</th>
                    <th>Number</th>
                    <th>Amount</th>
                  </tr>
  
                  <div className='sale-details-rows-container'>
                    {
                      accepted2dTransactions.map((item) => (
                        <tr className='sale-details-row'>
                          <td>{item.customer_name}</td>
                          <td>{(item.created_at).split(" ")[0]}</td>
                          <td>Morning</td>
                          <td>{item.number}</td>
                          <td>{item.sale_amount}ks</td>
                        </tr>
                      ))
                    }
                    
                  </div>
                </table> */}
                  <div className='sale-table-container'>
                  <Table 
                    id="twodAcceptedTransactions"
                    columns={twodColumns} 
                    data = {twodData}
                  />
                  </div>
                </div>
  
                <div className='sale-lonepyine-container'>
                  <div className='sale-headers-container'>
                  <p className='sale-header'>{current_language === "english" ? "Lone Pyine Accepted Sales" : "လုံးပြိုင်လက်ခံရောင်းချခြင်း"}</p>
                  <div className='sale-filters-container'>
                    <input className='sale-filter-date-input' type="date" onChange={(e) => filterLonePyineDate(e)}></input>
                    {/* <div className='sale-filter-customer-filter'>
                      <input list='customers' type="text" placeholder='Customer Name'/>
                      <datalist id="customers">
                        <option value="Customer Name1"></option>
                        <option value="Customer Name2"></option>
                        <option value="Customer Name3"></option>
                      </datalist>
                    </div> */}
  
                  <select className='sale-filter-round-filter'onChange={(e) => filterLonePyineRound(e)}>
                    <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
                    <option value="Morning" >Morning</option>
                    <option value="Evening" >Evening</option>
                  </select>
                  </div>
                  
                  <div className='sale-generate-btns-container' onClick={() => setIsLonePyineGenerateOpen(!isLonePyineGenerateOpen)}>
                  {current_language === "english" ? "Generate" : "ထုတ်မည်"}
                    <div className={isLonePyineGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
                      <button onClick={() => handleLonePyineExport()}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
                      <button onClick={() => handleLonePyineExportPDF()}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
                    </div>
                  </div>
                  
                  </div>
                  
  
                {/* <table className='sale-details-parent-container'>
                  <tr className='sale-details-labels-container'>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Round</th>
                    <th>Number</th>
                    <th>Amount</th>
                  </tr>
  
                  <div className='sale-details-rows-container'>
                    {
                      acceptedLonePyineTransactions.map((item) => (
                        <tr className='sale-details-row'>
                          <td>{item.customer_name}</td>
                          <td>{(item.created_at).split(" ")[0]}</td>
                          <td>Morning</td>
                          <td>{item.number}</td>
                          <td>{item.sale_amount}ks</td>
                        </tr>
                      ))
                    }
                    
                  </div>
                </table> */}
                <div className='sale-table-container'>
                <Table
                id = "lonePyineAcceptedTransactions"
                columns={LonePyineColumns} 
                    data = {lonePyineData}/>
                  </div>
                </div>
                <div className='sale-lonepyine-container'>
                  <div className='sale-headers-container'>
                  <p className='sale-header'>{current_language === "english" ? "3Pieces Accepted Sales" : "၃လုံးလက်ခံရောင်းချခြင်း"}</p>
                  <div className='sale-filters-container'>
                    <input className='sale-filter-date-input' type="date" onChange={(e) => filter3DDate(e)}></input>
                    {/* <div className='sale-filter-customer-filter'>
                      <input list='customers' type="text" placeholder='Customer Name'/>
                      <datalist id="customers">
                        <option value="Customer Name1"></option>
                        <option value="Customer Name2"></option>
                        <option value="Customer Name3"></option>
                      </datalist>
                    </div> */}
  
                  {/* <select className='sale-filter-round-filter'onChange={(e) => filter3DRound(e)}>
                    <option value="">{current_language === "english" ? "Round" : "ပွဲ"}</option>
                    <option value="Morning" >Morning</option>
                    <option value="Evening" >Evening</option>
                  </select> */}
                  </div>
                  <div className='sale-generate-btns-container' onClick={() => setIs3dGenerateOpen(!is3dGenerateOpen)}>
                  {current_language === "english" ? "Generate" : "ထုတ်မည်"}
                    <div className={is3dGenerateOpen ? 'sale-generate-dropdown-container sale-generate-dropdown-open' : 'sale-generate-dropdown-container sale-generate-dropdown-close'}>
                      <button onClick={() => handle3piecesExport()}>{current_language === "english" ? "Generate To Excel" : "Excelဖြင့်ထုတ်မည်"}</button>
                      <button onClick={() => handle3DExportPDF()}>{current_language === "english" ? "Generate To PDF" : "PDFဖြင့်ထုတ်မည်"}</button>
                    </div>
                  </div>
                  </div>
                  
  
                {/* <table className='sale-details-parent-container'>
                  <tr className='sale-details-labels-container'>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Round</th>
                    <th>Number</th>
                    <th>Amount</th>
                  </tr>
  
                  <div className='sale-details-rows-container'>
                    {
                      accepted3dTransactions.map((item) => (
                        <tr className='sale-details-row'>
                          <td>{item.customer_name}</td>
                          <td>{(item.created_at).split(" ")[0]}</td>
                          <td>Morning</td>
                          <td>{item.number}</td>
                          <td>{item.sale_amount}ks</td>
                        </tr>
                      ))
                    }
                    
                  </div>
                </table> */}
                  <div className='sale-table-container'>

                 
                  <Table
                  id = "threedAcceptedTransactions"
                  columns={threedColumns} 
                    data = {threedData}/>
                     </div>
                </div>
              
                
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

export default Sale