import React, { useContext, useState } from 'react'
import './Sidebar.css'
import plus from '../../assets/plus.png'
import comment from '../../assets/comment.png'
import help from '../../assets/question.png'
import activity from '../../assets/restore.png'
import setting from '../../assets/setting.png'
import menu from '../../assets/menu.png'
import { Cursor } from 'mongoose'
import { Context } from '../../context/Context'

const Sidebar = () => {

    const [extanded, setextanded] = useState(false);
    const { prevPrompt, setRecentPrompt, onSent, newChat } = useContext(Context)

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)

    }
    return (
        <div className="sidebar_comp">
            <div className="top_comp">
                <div className="menu_section">
                    <img onClick={() => setextanded(prev => !prev)} style={{ cursor: 'pointer' }} src={menu} alt="" />
                </div>
                <div onClick={() => { newChat() }} className="plus_section">
                    <img className='plus_icon' src={plus} alt="" />
                    {extanded ? <p>new chat</p> : null}
                </div>
                <p className="recent_label">Recent</p>

                {extanded && (
                    <div className="recent_list">
                        {prevPrompt.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => loadPrompt(item)}
                                className="questions"
                            >
                                <img src={comment} alt="" />
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                )}


            </div>

            <div className="button_comp">
                <div className="help_section section">
                    <img src={help} alt="" />
                    {extanded ? <p>Help</p> : null}
                </div>
                <div className="activity_section section">
                    <img src={activity} alt="" />
                    {extanded ? <p>Activity</p> : null}
                </div>
                <div className="setting_section section">
                    <img src={setting} alt="" />
                    {extanded ? <p>Setting</p> : null}
                </div>
            </div>

        </div>
    )
}

export default Sidebar