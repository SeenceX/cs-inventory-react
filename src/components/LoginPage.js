import React, {Component} from 'react';
import '../css/authorization.css'
import {Navigate} from 'react-router-dom';

class LoginPage extends Component {

    User = {}

    constructor(props) {
        super(props)

        this.state = {
            login: "",
            password: "",
        }
    }

    render() {
        if (this.props.isAuth) {
            return <Navigate to="/inventory" />;
        }
        return (
            <div className="container">
                <form ref={el => this.LoginForm = el} className={"loginForm"}>
                    <h1>Вход</h1>
                    <div className="login">
                        <label htmlFor="login">Логин</label>
                        <input onChange={data => this.setState({login: data.target.value})} name={"login"} id={"login"}
                               type="text" placeholder={"exampleLogin123"}/>
                    </div>
                    <div className="password">
                        <label htmlFor="password">Пароль</label>
                        <input onChange={data => this.setState({password: data.target.value})} name={"password"}
                               id={"password"} type="password" placeholder={"********"}/>
                    </div>

                    <button type="button" onClick={() => {
                        this.User = {
                            login: this.state.login,
                            password: this.state.password
                        }
                        console.log(this.User)
                        this.props.onLogin(this.User)
                        this.User = {}
                        console.log(this.User)
                        this.LoginForm.reset();
                    }}
                            id={"button"}>Войти
                    </button>
                </form>
            </div>
        );
    }
}

export default LoginPage;
