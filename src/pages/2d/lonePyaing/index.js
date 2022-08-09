import React,{useState} from 'react'
import "./styles.css"

const LonePyaing = () => {
    let whichLone
    const [firstNumbers,setFirstNumbers] = useState({
        numbers:[],
        washrate:"",
        amount:"1000"
    })
    const [lastNumbers,setLastNumbers] = useState({
        numbers:[],
        washrate:"",
        amount:"1000"
    })

    const changeFirstNumbers = (e) => {
        const numberString = e.target.value.toString()

        // console.log(firstNumbers.numbers.length > 0)
        
        let found = false

        let filteredArray = firstNumbers.numbers.filter((number) => {
            if(number === numberString){
                found = true
            }
            else{
                return number
            }
        })

        setFirstNumbers({...firstNumbers,numbers: filteredArray})
        firstNumbers.numbers = filteredArray
        if(found === false){
            let newarr = firstNumbers.numbers
            newarr?.push(numberString)
            setFirstNumbers({...firstNumbers,numbers : newarr})
        }
        console.log(firstNumbers)
        // setFirstNumbers(firstNumbers)
    }

    const changeSecondNumbers = (e) => {
        const numberString = e.target.value.toString()
        
        let found = false

        let filteredArray = lastNumbers.numbers.filter((number) => {
            if(number === numberString){
                found = true
            }
            else{
                return number
            }
        })

        setLastNumbers({...lastNumbers,numbers: filteredArray})
        lastNumbers.numbers = filteredArray
        if(found === false){
            let newarr = lastNumbers.numbers
            newarr?.push(numberString)
            setLastNumbers({...lastNumbers,numbers : newarr})
        }
        console.log(lastNumbers)
    }

    const bigBtnFirst = () => {
        let btnValues = ["5","6","7","8","9"]

        // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
        setFirstNumbers({...firstNumbers,numbers: btnValues})  

    }
    const smallBtnFirst = () => {
        let btnValues = ["0","1","2","3","4"]

        // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
        setFirstNumbers({...firstNumbers,numbers: btnValues})  

    }
    const maBtnFirst = () => {
        let btnValues = ["1","3","5","7","9"]

        // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
        setFirstNumbers({...firstNumbers,numbers: btnValues})  

    }
    const setBtnFirst = () => {
        let btnValues = ["0","2","4","6","8"]

        // btnValues = btnValues.filter(val => !firstNumbers.numbers.includes(val))
        setFirstNumbers({...firstNumbers,numbers: btnValues})  

    }

    const bigBtnLast = () => {
        let btnValues = ["5","6","7","8","9"]

        // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
        setLastNumbers({...lastNumbers,numbers: btnValues})  

    }
    const smallBtnLast = () => {
        let btnValues = ["0","1","2","3","4"]

        // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
        setLastNumbers({...lastNumbers,numbers: btnValues})  

    }
    const maBtnLast = () => {
        let btnValues = ["1","3","5","7","9"]

        // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
        setLastNumbers({...lastNumbers,numbers: btnValues})  

    }
    const setBtnLast = () => {
        let btnValues = ["0","2","4","6","8"]

        // btnValues = btnValues.filter(val => !lastNumbers.numbers.includes(val))
        setLastNumbers({...lastNumbers,numbers: btnValues})  

    }

    //one number row start
    const firstNumberRow = () => {
        const rowarray = []
        for(let i = 0;i <= 9; i++){
            rowarray.push(
                <div className='onenumber-1stone-number-btn-container'>
                    <p>{i}</p>
                    <input value={i} onClick={(e) => { changeFirstNumbers(e)}} type="checkbox" name="onenumber number"
                    className={
                        firstNumbers.numbers &&
                        firstNumbers.numbers.includes(i.toString())  ? "checked" : null
                      }
                    ></input>
                </div>
            )
        }
        return rowarray
    }
    const lastNumberRow = () => {
        const rowarray = []
        for(let i = 0;i <= 9; i++){
            rowarray.push(
                <div className='onenumber-1stone-number-btn-container'>
                    <p>{i}</p>
                    <input value={i} onClick={(e) =>  changeSecondNumbers(e)} type="checkbox" name="onenumber number"
                    className={
                        lastNumbers.numbers &&
                        lastNumbers.numbers.includes(i.toString())  ? "checked" : null
                      }
                    ></input>
                </div>
            )
        }
        return rowarray
    }

    const submitLonePyaing = () => {
        console.log(firstNumbers,lastNumbers)
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
                        {firstNumberRow()}
                    </div>
                </div>
                <div className='onenumber-1stone-btns-container'>
                    <div className='onenumber-1stone-btn-container'>
                        <p>big</p>
                        <input className={
                            firstNumbers.numbers.join() == ["5","6","7","8","9"].join() ?
                            "lonepyaing-btn-checked" : null
                        } onClick={() => bigBtnFirst()}  type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>small</p>
                        <input className={
                            firstNumbers.numbers.join() == ["0","1","2","3","4"].join() ?
                            "lonepyaing-btn-checked" : null }
                             onClick = {() => smallBtnFirst()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>ma</p>
                        <input className={
                            firstNumbers.numbers.join() == ["1","3","5","7","9"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => maBtnFirst()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>set</p>
                        <input className={
                            firstNumbers.numbers.join() == ["0","2","4","6","8"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => setBtnFirst()} type="checkbox" name="onenumber btn"></input>
                    </div>
                </div>
            </div>
            <div className='onenumber-numbers-container'>
                <div className='onenumber-1stone-container'>
                    <p className='onenumber-1stone-label'>Second Number:</p>
                    <div className='onenumber-1stone-numbers-container'>
                        {lastNumberRow()}
                    </div>
                </div>
                <div className='onenumber-1stone-btns-container'>
                    <div className='onenumber-1stone-btn-container'>
                        <p>big</p>
                        <input className={
                            lastNumbers.numbers.join() == ["5","6","7","8","9"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => bigBtnLast()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>small</p>
                        <input className={
                            lastNumbers.numbers.join() == ["0","1","2","3","4"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => smallBtnLast()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>ma</p>
                        <input className={
                            lastNumbers.numbers.join() == ["1","3","5","7","9"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => maBtnLast()} type="checkbox" name="onenumber btn"></input>
                    </div>
                    <div className='onenumber-1stone-btn-container'>
                        <p>set</p>
                        <input className={
                            lastNumbers.numbers.join() == ["0","3","4","6","8"].join() ?
                            "lonepyaing-btn-checked" : null } onClick = {() => setBtnLast()} type="checkbox" name="onenumber btn"></input>
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

                {/* <div className='twod-details-row'>
                        <p className='onenumber-details-number'>first({
                            firstNumbers.numbers.map((number) => (
                                // `${number},`
                                console.log(number)
                            ))
                        })</p>
                        <p>85</p>
                            <div className='twod-details-amount-container'>
                                <button>-</button>
                                <input type="number"></input>
                                <button>+</button>
                            </div>
                                <button className='twod-details-delete-btn'>Delete</button>
                        </div>: null */}

                <div className='twod-details-table-container'>
                    {
                        firstNumbers.numbers && firstNumbers.numbers.length > 0 ? 
                         <div className='twod-details-row'>
                        <p className='onenumber-details-number'>first({
                            firstNumbers.numbers.map((number) => (
                                `${number},`
                            ))
                        })</p>
                        <p>85</p>
                            <div className='twod-details-amount-container'>
                                <button onClick={() => {
                                    if(firstNumbers.amount > 100){
                                        setFirstNumbers({...firstNumbers, amount: (parseInt(firstNumbers.amount) - 100).toString()})
                                    }
                                }}>-</button>
                                <input type="number" onChange={e => setFirstNumbers({...firstNumbers,amount:e.target.value})} value={firstNumbers.amount}></input>
                                <button onClick={() => setFirstNumbers({...firstNumbers, amount: (parseInt(firstNumbers.amount) + 100).toString()})}>+</button>
                            </div>
                                <button className='twod-details-delete-btn' onClick={() => setFirstNumbers({...firstNumbers,numbers:[]})}>Delete</button>
                        </div>: null 
                    }
                    {
                        lastNumbers.numbers && lastNumbers.numbers.length > 0 ? 
                         <div className='twod-details-row'>
                        <p className='onenumber-details-number'>second({
                            lastNumbers.numbers.map((number) => (
                                `${number},`
                            ))
                        })</p>
                        <p>85</p>
                            <div className='twod-details-amount-container'>
                                <button onClick={() => {
                                    if(lastNumbers.amount > 100){
                                        setLastNumbers({...lastNumbers, amount: (parseInt(lastNumbers.amount) - 100).toString()})
                                    }
                                }}>-</button>
                                <input type="number" onChange={e => setLastNumbers({...lastNumbers,amount:e.target.value})} value={lastNumbers.amount}></input>
                                <button onClick={() => setLastNumbers({...lastNumbers, amount: (parseInt(lastNumbers.amount) + 100).toString()})}>+</button>
                            </div>
                                <button className='twod-details-delete-btn' onClick={() => setLastNumbers({...lastNumbers,numbers:[]})}>Delete</button>
                        </div>: null 
                    }
                    
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

                <button className='twod-betnow-btn' onClick={() => submitLonePyaing()}>Bet Now</button>
            </div>
        </div>
    </div>
  )
}

export default LonePyaing