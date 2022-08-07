import React from 'react'
import "./styles.css"

const LonePyaing = () => {


    //one number row start
    const oneNumberRow = () => {
        const rowarray = []
        for(let i = 0;i <= 9; i++){
            rowarray.push(
                <div className='onenumber-1stone-number-btn-container'>
                    <p>{i}</p>
                    <input type="checkbox" name="onenumber number"></input>
                </div>
            )
        }
        return rowarray
    }
  return (
    <div className='onenumber-parent-container'>
        <div className='select-directly-container'>
            <p className='select-directly-label'>Select Directly:</p>
            <button className='select-directly-btn'>Normal</button>
        </div>

        <div className='onenumber-header-container'>
            <div className='onenumber-header-washrate'>
                <p className='onenumber-header'>Lone Pyaing</p>
                <p className='onenumber-washrate'>wash rate   1.9</p>
            </div>
            <p className='onenumber-description'>Description</p>
        </div>

        <div className='onenumber-numbers-parent-container'>
            <div className='onenumber-numbers-container'>
                <div className='onenumber-1stone-container'>
                    <p className='onenumber-1stone-label'>first Number:</p>
                    <div className='onenumber-1stone-numbers-container'>
                        {oneNumberRow()}
                    </div>
                </div>
                <div className='onenumber-1stone-btns-container'>
                    <div className='onenumber-1stone-btn-container'>
                        <p>big</p>
                        <input type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>small</p>
                        <input type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>ma</p>
                        <input type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>set</p>
                        <input type="checkbox" name="onenumber btn"></input>
                    </div>
                </div>
            </div>
            <div className='onenumber-numbers-container'>
                <div className='onenumber-1stone-container'>
                    <p className='onenumber-1stone-label'>Second Number:</p>
                    <div className='onenumber-1stone-numbers-container'>
                        {oneNumberRow()}
                    </div>
                </div>
                <div className='onenumber-1stone-btns-container'>
                    <div className='onenumber-1stone-btn-container'>
                        <p>big</p>
                        <input type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>small</p>
                        <input type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>ma</p>
                        <input type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>set</p>
                        <input type="checkbox" name="onenumber btn"></input>
                    </div>
                </div>
            </div>
        </div>

        <div className='onenumber-line'></div>

        <div className='twod-details-parent-container'>
            <div className='twod-details-container'>
                <div className='twod-details-header-container'>
                    <p>Number</p>
                    <p>Wash Rate</p>
                    <p>Amount</p>
                </div>

                <div className='twod-details-table-container'>
                    <div className='twod-details-row'>
                            <p className='onenumber-details-number'>first(0,1,2,3,4,5,6,)</p>
                            <p>85</p>
                        <div className='twod-details-amount-container'>
                            <button>-</button>
                            <input type="number"></input>
                            <button>+</button>
                        </div>
                            <button className='twod-details-delete-btn'>Delete</button>
                    </div>
                </div>
            </div>

            <div className='twod-overall-details-container'>
                <div className='twod-overall-detail-container'>
                    <p>Program Information</p>
                    <p>0</p>
                </div>
                <div className='twod-overall-detail-container'>
                    <p>Punch Fee</p>
                    <p>0</p>
                </div>
                <div className='twod-overall-detail-container'>
                    <p>Lottery Closing Time</p>
                    <p>98:00:00</p>
                </div>

                <button className='twod-betnow-btn'>Bet Now</button>
            </div>
        </div>
    </div>
  )
}

export default LonePyaing