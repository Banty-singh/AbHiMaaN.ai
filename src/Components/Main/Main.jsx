import React, { useContext } from 'react'
import model from '../../assets/model.png'
import comment from '../../assets/comment.png'
import compass from '../../assets/compass.png'
import lightbulb from '../../assets/lightbulb.png'
import embeded from '../../assets/embeded.png'
import picture from '../../assets/picture.png'
import mic from '../../assets/mic.png'
import next from '../../assets/next.png'
import load from '../../assets/loading.png'

import './Main.css'
import { Context } from '../../Context/Context'
const Main = () => {
    const { input, setInput, showResult, onSent, recentPrompt, loading, resultData } = useContext(Context);
    return (
        <div className="main_compo">
            <div className="gemni">
                <p>AbHiMaaN.<sup>ai</sup></p>
                <img src={model} alt="" />
            </div>
            {!showResult
                ? <>
                    <div className="header">
                        <p><h3>Hello,BOSS.</h3></p>
                        <p> "BOSS" .How can i help you Today?? </p>
                    </div>
                    <div className="cards_compo">
                        <div className="cards">
                            <p>
                                Suggest some beautyfull place to visit.
                            </p>
                            <img className='compasss' src={compass} alt="" />
                        </div>
                        <div className="cards">
                            <p>
                                List the hotel's in Vanarashi.
                            </p>
                            <img src={lightbulb} alt="" />
                        </div>
                        <div className="cards">
                            <p>
                                You wanna try some Rajsthani or Bihari food items😋.
                            </p>
                            <img src={comment} alt="" />
                        </div>
                        <div className="cards">
                            <p>
                                Shopping from flipkrat and Amazon ETC🛍️...
                            </p>
                            <img src={embeded} alt="" />
                        </div>
                    </div>
                </>
                : <div className="result">
                    <div className="result_title">
                        <img src={model} alt="" />
                        <p>{recentPrompt}</p>
                    </div>
                    <div className="result_data">
                        <img src={lightbulb} alt="" />
                        {loading
                        ? <div className='loading'>
                            <img src={load} alt="" />
                        </div>
                        : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>}
                       

                    </div>
                </div>
            }

            <div className="search_bar">
                <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='what you are thinking...' name="" id="" />
                <img className="picturee" src={picture} alt="" />
                <img src={mic} alt="" />
                <img onClick={() => onSent()} src={next} alt="" />
            </div>
        </div>
    )
}

export default Main