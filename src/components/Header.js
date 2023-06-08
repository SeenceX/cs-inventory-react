import React from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import "../css/header.css"

function Header({isAuth, onExit, User}) {

    const location = useLocation();
    const hideUrls = location.pathname === '/login' || location.pathname === '/registration'
    if (hideUrls) {
        return null;
    }

    return (
        <header>
            <nav>
                <div className="nav-container">
                    <div className="nav-items">
                        <Link to="/" className="brand">CS<i>Inventory</i></Link>
                        <ul className="nav-ul">
                            <li className="nav-li"><NavLink to="/" className="nav-link"
                                                            activeclassname="active">Главная</NavLink></li>
                            <li className="nav-li"><NavLink to="/inventory" className="nav-link"
                                                            activeclassname="active">Инвентарь</NavLink></li>
                            <li className="nav-li"><NavLink to="/library" className="nav-link"
                                                            activeclassname="active">Библиотека</NavLink></li>
                        </ul>
                    </div>
                    <div className="nav-controllers">
                        <select name="" id="" className="currency">
                            <optgroup label='Валюта'>
                                <option value="rub">₽ РУБ.</option>
                                <option value="usd">$ UDS</option>
                            </optgroup>
                        </select>
                        {isAuth ?
                            <div>
                                <span>{User.Login}</span>
                                <button onClick={() => {onExit(); window.location.reload()}} type={"submit"}>Выйти</button>
                            </div>:<Link to="/login" className="login nav-link">Войти</Link>}
                        <span>{}</span>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
