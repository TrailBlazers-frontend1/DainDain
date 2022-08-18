import React,{useState} from 'react'
import {Link} from "react-router-dom"
import Header from '../../components/header'
import Navbar from '../../components/navbar'
import homepageimg from "../../imgs/homepage-img.jpg"
import hotgameimg from "../../imgs/hotgame-img.png"
import lotteryimage from "../../imgs/2d.png"
import { Icon } from '@iconify/react';
import "./styles.css"


const Home = () => {
    const [twoOrThree,setTwoOrThree] = useState("two")
    return(
        <>
            <Header/>
            <Navbar/>
            
            
            <div className='homepage-img-container'>
                <img src={homepageimg} alt="homepage image"></img>
            </div>

            <section className='hot-game-section'>
                <div className='hot-game-title-container'>
                    <p className='hot-game-title'>
                        Hot Game
                    </p>
                    <p className='hot-game-subtitle'>
                        All Available at
                    </p>
                </div>
                <div className='App hot-game-content-container'>
                    <div className='hot-game-btn-container'>
                        <button onClick={() => setTwoOrThree("two")} className={twoOrThree === "two" ? 'hot-game-2d-btn hot-game-active' : 'hot-game-2d-btn'}>
                            2D
                        </button>
                        <button onClick={() => setTwoOrThree("three")} className={twoOrThree === "three" ? 'hot-game-3d-btn hot-game-active' : 'hot-game-3d-btn'}>
                            3D
                        </button>
                    </div>

                    <div className='hot-game-outer'>
                        <div className='hot-game-inner'>
                            <div className='hot-game-img-container'>
                                <img src={hotgameimg} alt="hot game image"/>
                            </div>
                            <div className='hot-game-text-container'>
                                <div className='hot-game-text-header-container'>
                                    <p data-before={twoOrThree === "two" ? "2D" : "3D"} className='hot-game-text-title'>
                                        {twoOrThree === "two" && "2D"}
                                        {twoOrThree === "three" && "3D"}
                                    </p>
                                    <div className='hot-game-text-compensation-container'>
                                        <p className='hot-game-text-compensation-text'>Maximum Compensation</p>
                                        <p className='hot-game-text-compensation-number'>95</p>
                                    </div>
                                </div>

                                <p className='hot-game-text'>Professional lottery platform, fast lottery opening, high payout, rich gameplay! TTBET is dedicated to providing rich games to global lottery users and creating a high-quality entertainment environment for players.</p>
                                <Link to={twoOrThree === "two" ? "/2d" : "/3d"} className='hot-game-btn'>Enter <Icon icon="ep:arrow-right-bold" /></Link>
                            </div>


                        </div>
                    </div>

        
                </div>

            </section>

            <section className='App live-section'>
                <div className='live-content-container'>
                    <div className='live-btn-container'>
                        <button className='live-2d-btn'>2D</button>
                        <button className='live-3d-btn'>3D</button>
                    </div>

                    <div className='live-view'>
                        44
                    </div>

                    <input className='live-date' type="date" id="live-date" name="live-date"></input>

                    <div className='live-numbers-container'>
                        <div className='won-number-container'>
                            <p className='won-number-time'>
                                Morning
                            </p>

                            <div className='won-number-content-container'>
                                <div className='won-number'>
                                    33
                                </div>

                                <div className='live-setvalue-container'>
                                    <div className='live-set-container'>
                                        <p className='live-set-label'>Set:</p>
                                        <p className='live-set-number'>1553.18</p>
                                    </div>
                                    <div className='live-value-container'>
                                        <p className='live-value-label'>Value:</p>
                                        <p className='live-value-number'>1553.18</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='won-number-container'>
                            <p className='won-number-time'>
                                Evening
                            </p>

                            <div className='won-number-content-container'>
                                <div className='won-number'>
                                    48
                                </div>

                                <div className='live-setvalue-container'>
                                    <div className='live-set-container'>
                                        <p className='live-set-label'>Set:</p>
                                        <p className='live-set-number'>1553.18</p>
                                    </div>
                                    <div className='live-value-container'>
                                        <p className='live-value-label'>Value:</p>
                                        <p className='live-value-number'>1553.18</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className='App line-hori'></div>
            
            {/* <section className='App check-voucher-section'>
                <div className='check-voucher-container'>
                    <p className='check-voucher-title'>Check Voucher</p>
                    <label className='check-voucher-input-container' htmlFor='voucher-input'>
                        <p>Voucher No.</p>
                        <input type="text" name="voucher-input" id="voucher-input" className='voucher-input'></input>
                        <Icon icon="bi:qr-code-scan" className='qr-icon' />
                    </label>

                    <button className='check-voucher-btn'>Check Voucher</button>
                </div>

                <Icon icon="bx:up-arrow" className='check-voucher-arrow' />

                <div className='voucher-details-container'>
                    <p className='voucher-details-title'>Voucher</p>
                    <div className='voucher-details-content-container'>
                        <div className='voucher-details-content'>
                            <div className='voucher-code-container'>
                                <p className='voucher-code-label'>Voucher No.:</p>
                                <p className='voucher-code'>486343846325912846</p>
                            </div>

                            <div className='voucher-num-amount-container'>
                                <div className='voucher-num-container'>
                                    <p className='voucher-num-label'>Number:</p>
                                    <p className='voucher-num'>44</p>
                                </div>
                                <div className='voucher-amount-container'>
                                    <p className='voucher-amount-label'>Amount:</p>
                                    <p className='voucher-amount'>10000ks</p>
                                </div>
                            </div>
                        </div>

                        <button className='voucher-detailes-btn'>Check Details</button>
                    </div>
                </div>
            </section> */}


            <section className='App lai-container'>
                <div className='lottery-container'>
                    
                    <p className='lottery-header'>L
                        <p className='lottery-header1'>Lottery</p>
                        <p className='lottery-header2'>ottery</p>
                    </p>

                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                            <img src={lotteryimage} alt="lottery image"></img>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>2 or 3</p>
                            <p className='lottery-text-subtitle'>Popular Lottery</p>
                        </div>
                    </div>
                    
                </div>
                <div className='lottery-container'>
                    
                    <p className='lottery-header p'>P
                        <p className='lottery-header1'>Advantage</p>
                        <p className='lottery-header2 '>roduct Advantage</p>
                    </p>

                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                            <Icon icon="fluent:device-meeting-room-remote-48-regular"  className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>Can be played on any type of device</p>
                            <p className='lottery-text-subtitle'>PC, Wap, IOS, Android App</p>
                        </div>
                    </div>
                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="twemoji:pool-8-ball" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>Open Live Lottery</p>
                            <p className='lottery-text-subtitle'>The winnings are added to the game account with the fastest system</p>
                        </div>
                    </div>
                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="ant-design:line-chart-outlined" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>High compensation</p>
                            <p className='lottery-text-subtitle'>95x only available here</p>
                        </div>
                    </div>
                    
                </div>
                <div className='lottery-container'>
                    
                    <p className='lottery-header'>I
                        <p className='lottery-header1'>Information Center</p>
                        <p className='lottery-header2'>nformation Center</p>
                    </p>

                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="ep:chat-line-round" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>A common problem</p>
                            <p className='lottery-text-subtitle'>How to play, how to buy lottery, etc</p>
                        </div>
                    </div>

                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="majesticons:money-minus-line" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>How to make a deposit?</p>
                            <p className='lottery-text-subtitle'>Regarding deposit, deposit duration, deposit system, etc</p>
                        </div>
                    </div>
                    
                    <div className='lottery-content-container'>
                        <div className='lottery-image-container'>
                        <Icon icon="majesticons:money-plus-line" className='lai-icon'/>
                        </div>

                        <div className='lottery-text-container'>
                            <p className='lottery-text-title'>How to withdraw money</p>
                            <p className='lottery-text-subtitle'>About withdrawing money, withdrawal duration, money receiving system, etc
</p>
                        </div>
                    </div>

                    
                </div>
            </section>
            
        </>
    )
}

export default Home