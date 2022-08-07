import React from 'react'
import "./styles.css"

const ThreeStars = () => {

  const threestarsNumberRow = () => {
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
    <div className='threestars-parent-container'>
      <div className='threestars-select-container'>
        <div className='threestars-select-competiton-container'>
          <p className='threestars-select-competiton-label'>
            Competition:
          </p>
          <button className='threestars-select-competiton-btn'>Normal</button>
        </div>

        <div className='threestars-select-group-container'>
          <p className='threestars-select-group-label'>Group Selection</p>
          <button className='threestars-select-group-btn'>A style</button>
          <button className='threestars-select-group-btn'>Chat Hole</button>
        </div>
      </div>

      <div className='twopieces-header-container'>
          <div className='twopieces-header-washrate'>
            <p className='twopieces-header'>Three stars</p>
            <p className='twopieces-washrate'>wash rate   1.9</p>
          </div>
          <p className='twopieces-description'>Description</p>
      </div>

      <div className='threestars-numbers-parent-container'>
        <div className='threestars-numbers-container'>
          <div className='threestars-1stone-container'>
            <p className='threestars-1stone-label'>First Number:</p>
            <div className='threestars-1stone-numbers-container'>
              {threestarsNumberRow()}
            </div>
          </div>

          <div className='threestars-lstone-btns-container'>
            <div className='threestars-lstone-btn-container'>
              <p>big</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
            <div className='threestars-lstone-btn-container'>
              <p>small</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
            <div className='threestars-lstone-btn-container'>
              <p>ma</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
            <div className='threestars-lstone-btn-container'>
              <p>set</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
          </div>
        </div>
        <div className='threestars-numbers-container'>
          <div className='threestars-1stone-container'>
            <p className='threestars-1stone-label'>Second Number:</p>
            <div className='threestars-1stone-numbers-container'>
              {threestarsNumberRow()}
            </div>
          </div>

          <div className='threestars-lstone-btns-container'>
            <div className='threestars-lstone-btn-container'>
              <p>big</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
            <div className='threestars-lstone-btn-container'>
              <p>small</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
            <div className='threestars-lstone-btn-container'>
              <p>ma</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
            <div className='threestars-lstone-btn-container'>
              <p>set</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
          </div>
        </div>
        <div className='threestars-numbers-container'>
          <div className='threestars-1stone-container'>
            <p className='threestars-1stone-label'>Third Number:</p>
            <div className='threestars-1stone-numbers-container'>
              {threestarsNumberRow()}
            </div>
          </div>

          <div className='threestars-lstone-btns-container'>
            <div className='threestars-lstone-btn-container'>
              <p>big</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
            <div className='threestars-lstone-btn-container'>
              <p>small</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
            <div className='threestars-lstone-btn-container'>
              <p>ma</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
            <div className='threestars-lstone-btn-container'>
              <p>set</p>
              <input type="checkbox" name="onenumber btn"></input>
            </div>
          </div>
        </div>
      </div>

      <div className='threed-line'></div>

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

export default ThreeStars