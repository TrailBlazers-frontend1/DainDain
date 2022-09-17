import React,{useState, useEffect} from 'react'
import "./styles.css"
import { useSelector } from 'react-redux'
import { isMorningOrEvening, threeDCountDown } from '../../redux/countdown'
import { axiosInstance } from '../../urlConfig'

const LiveCounter = ({category}) => {
    // const now = moment()
    // const round1 = now.isBetween("06:00:00" , "12:00:00","hour","minute")
    // const round2 = now.isBetween("12:30:00" , "16:00:00","hour","minute")
    // console.log(round1,round2)

    const {remaining_time} = useSelector(state => state.countdown)

     const [morningResult,setMorningResult] = useState()
    const [eveningResult,setEveningResult] = useState()

    const date = new Date().toLocaleDateString()
    const day = new Date().getDay()
    

    


    const fetchLive = async () => {
        try {
            const res = await  axiosInstance.get("https://api.thaistock2d.com/live")
            // console.log(res.data.result[1], res.data.result[3])
            setMorningResult(res.data.result[1])
            setEveningResult(res.data.result[3])
            // setLive(res.data.live.twod)

            // console.log(morningResult.stock_date)
        } catch (error) {
            
        }
        
    }

    useEffect(() => {
        fetchLive()
        // console.log("hi")
    },[])
    
  return (
    <div className='livecounter-container'>
        <div className='App livecounter-content-container'>
            <div className='livecounter-category-container'>
                <p className='livecounter-category-number'>
                    {category === "2d" && "2D"}
                    {category === "3d" && "3D"}
                </p>
                <p className='livecounter-category-text'>Myanmar</p>
            </div>

            {
                category === "2d" && 
                <div className='livecounter-counter-container'>
                <p className='livecounter-multiply-times-container'><span>{morningResult?.stock_date}{isMorningOrEvening().isMorningRound && 'Morning'}{isMorningOrEvening().isEveningRound && 'Evening'}</span> Round</p>
                <div className='livecounter-time-container'>
                    <div className='livecounter-hour-container'>
                        {/* <div className='livecounter-hour-1stdigit'>0</div> */}
                        {/* <div className='livecounter-hour-2nddigit'>0</div> */}
                        <div className='livecounter-hour-3rddigit'>{remaining_time.hours ? remaining_time.hours : "0"}</div>
                    </div>

                    <p className="time-divider">:</p>
                    <div className='livecounter-minute-container'>
                        <div className='livecounter-minute-1stdigit'>{remaining_time.minutes ? remaining_time.minutes : "0"}</div>
                        {/* <div className='livecounter-minute-2nddigit'>0</div> */}
                        
                    </div>
                    <p className="time-divider">:</p>
                    <div className='livecounter-second-container'>
                        <div className='livecounter-second-1stdigit'>{remaining_time.seconds ? remaining_time.seconds : "0"}</div>
                        {/* <div className='livecounter-second-2nddigit'>0</div> */}
                        
                    </div>
                </div>
            </div>
            }

            {
                category === "3d" && 
                <div className='livecounter-counter-container'>
                <p className='livecounter-multiply-times-container'><span>{date}</span></p>
                <div className='livecounter-time-container'>
                    <div className='livecounter-hour-container'>
                        {/* <div className='livecounter-hour-1stdigit'>0</div> */}
                        {/* <div className='livecounter-hour-2nddigit'>0</div> */}
                        <div className='livecounter-hour-3rddigit'>{threeDCountDown().diffInDays}</div>
                        <p className='days-label'>days</p>
                    </div>

                    <p className="time-divider">:</p>
                    <div className='livecounter-minute-container'>
                        <div className='livecounter-minute-1stdigit'>{threeDCountDown().diffinHours}</div>
                        <p className='hours-label'>hours</p>
                        {/* <div className='livecounter-minute-2nddigit'>0</div> */}
                        
                    </div>
                    {/* <p className="time-divider">:</p>
                    <div className='livecounter-second-container'>
                        <div className='livecounter-second-1stdigit'>{remaining_time.seconds ? remaining_time.seconds : "0"}</div>
                        
                        
                    </div> */}
                </div>
            </div>

            }

            {
                category === "2d" && (
                        <>
            <div className='livecounter-lotteryopnum-container'>
                <p className='livecounter-lotteryopnum-header-container'><span>{morningResult?.stock_date} Morning</span> Number</p>
                {/* <p className='livecounter-lotteryopnum-header-container'><span>{morningResult?.stock_date} Morning</span> Number</p> */}
                <div className='livecounter-lotteryopnum-num-container'>
                    {category === "2d" && (
                        <>
                        <p className='livecounter-lotteryopnum-1st'>{morningResult?.twod.split("")[0]}</p>
                        <p className='livecounter-lotteryopnum-2nd'>{morningResult?.twod.split("")[1]}</p>
                        </>
                    )}
                    {/* {category === "3d" && (
                        <>
                        <p className='livecounter-lotteryopnum-1st'>9</p>
                        <p className='livecounter-lotteryopnum-2nd'>4</p>
                        <p className='livecounter-lotteryopnum-3nd'>4</p>
                        </>
                    )} */}
                </div>
            </div>
            <div className='livecounter-lotteryopnum-container'>
                <p className='livecounter-lotteryopnum-header-container'><span>{morningResult?.stock_date} Evening</span> Number</p>
                {/* <p className='livecounter-lotteryopnum-header-container'><span>{morningResult?.stock_date} Morning</span> Number</p> */}
                <div className='livecounter-lotteryopnum-num-container'>
                    {category === "2d" && (
                        <>
                        <p className='livecounter-lotteryopnum-1st'>{eveningResult?.twod.split("")[0]}</p>
                        <p className='livecounter-lotteryopnum-2nd'>{eveningResult?.twod.split("")[1]}</p>
                        </>
                    )}
                    {/* {category === "3d" && (
                        <>
                        <p className='livecounter-lotteryopnum-1st'>9</p>
                        <p className='livecounter-lotteryopnum-2nd'>4</p>
                        <p className='livecounter-lotteryopnum-3nd'>4</p>
                        </>
                    )} */}
                </div>
            </div>
            </>
                )
            }
            

            {
                category === "3d" && (
                    <div className='livecounter-lotteryopnum-container'>
                {/* <p className='livecounter-lotteryopnum-header-container'><span>{morningResult?.stock_date}</span> Number</p> */}
                {/* <p className='livecounter-lotteryopnum-header-container'><span>{morningResult?.stock_date} Morning</span> Number</p> */}
                {/* <div className='livecounter-lotteryopnum-num-container'>
                    {category === "3d" && (
                        <>
                        <p className='livecounter-lotteryopnum-1st'>9</p>
                        <p className='livecounter-lotteryopnum-2nd'>4</p>
                        <p className='livecounter-lotteryopnum-3nd'>4</p>
                        </>
                    )}
                </div> */}
            </div>
                )
            }
            
        </div>
    </div>
  )
}

export default LiveCounter