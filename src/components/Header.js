import React from "react";
import {Link, NavLink} from "react-router-dom";
import "../css/header.css"

class Header extends React.Component{
    render() {
        return(
            <header>
                <nav>
                    <div className="nav-container">
                        <div className="nav-items">
                            <Link to="/" className="brand">CS<i>Inventory</i></Link>
                            <ul className="nav-ul">
                                <li className="nav-li"><NavLink to="/" className="nav-link" activeclassname="active">Главная</NavLink></li>
                                <li className="nav-li"><NavLink to="/inventory" className="nav-link" activeclassname="active">Инвентарь</NavLink></li>
                                <li className="nav-li"><NavLink to="/library" className="nav-link" activeclassname="active">Библиотека</NavLink></li>
                            </ul>
                        </div>
                        <div className="nav-controllers">
                            <select name="" id="" className="currency">
                                <optgroup label='Валюта'>
                                    <option value="rub">₽ РУБ.</option>
                                    <option value="usd">$ UDS</option>
                                </optgroup>
                            </select>
                            <Link to="#" className="login nav-link">Войти</Link>
                            {this.props.isLoginned && <span>{this.props.User.userLogin}</span>}
                            <span>{}</span>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
