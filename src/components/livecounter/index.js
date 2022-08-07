import React from 'react'
import "./styles.css"

const LiveCounter = ({category}) => {
  return (
    <div className='livecounter-container'>
        <div className='App livecounter-content-container'>
            <div className='livecounter-category-container'>
                <p className='livecounter-category-number'>
                    {category === "2d" && "2d"}
                    {category === "3d" && "3d"}
                </p>
                <p className='livecounter-category-text'>Myanmar</p>
            </div>

            <div className='livecounter-counter-container'>
                <p className='livecounter-multiply-times-container'><span>Multiplied 2022080101</span> times</p>
                <div className='livecounter-time-container'>
                    <div className='livecounter-hour-container'>
                        <div className='livecounter-hour-1stdigit'>1</div>
                        <div className='livecounter-hour-2nddigit'>2</div>
                        <div className='livecounter-hour-3rddigit'>3</div>
                    </div>

                    <p className="time-divider">:</p>
                    <div className='livecounter-minute-container'>
                        <div className='livecounter-minute-1stdigit'>0</div>
                        <div className='livecounter-minute-2nddigit'>0</div>
                        
                    </div>
                    <p className="time-divider">:</p>
                    <div className='livecounter-second-container'>
                        <div className='livecounter-second-1stdigit'>0</div>
                        <div className='livecounter-second-2nddigit'>0</div>
                        
                    </div>
                </div>
            </div>

            <div className='livecounter-lotteryopnum-container'>
                <p className='livecounter-lotteryopnum-header-container'><span>Multiplied 2022080101</span> times</p>
                <div className='livecounter-lotteryopnum-num-container'>
                    {category === "2d" && (
                        <>
                        <p className='livecounter-lotteryopnum-1st'>9</p>
                        <p className='livecounter-lotteryopnum-2nd'>4</p>
                        </>
                    )}
                    {category === "3d" && (
                        <>
                        <p className='livecounter-lotteryopnum-1st'>9</p>
                        <p className='livecounter-lotteryopnum-2nd'>4</p>
                        <p className='livecounter-lotteryopnum-3nd'>4</p>
                        </>
                    )}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default LiveCounter