/*import './App.css';*/
import React from "react";
import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import InventoryPage from "./components/InventoryPage";
import "./css/style.css"
import axios from "axios";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import LibraryPage from "./components/LibraryPage";

class App extends React.Component {

    baseUrl = 'https://localhost:7070/api/'

    constructor(props) {
        super(props);

        this.state = {
            User: JSON.parse(localStorage.getItem("user")) || {},
            Inventory: [],
            isAuth: false
        }
        this.isLoginned = this.isLoginned.bind(this);
        this.getItemProfit = this.getItemProfit.bind(this);
        this.LoadInventory = this.LoadInventory.bind(this)
        this.Login = this.Login.bind(this);
        this.Registration = this.Registration.bind(this);
        this.Exit = this.Exit.bind(this);
        this.findItem = this.findItem.bind(this);
        this.getAllItems = this.getAllItems.bind(this);
        this.addUserInventoryItem = this.addUserInventoryItem.bind(this);
        this.deleteUserInventoryItem = this.deleteUserInventoryItem.bind(this);
        this.updateUserInventoryItem = this.updateUserInventoryItem.bind(this);


    }

    componentDidMount() {
        this.isLoginned()
    }

    componentDidUpdate(prevProps, prevState) {
        const prevUser = prevState.User;
        const currentUser = this.state.User;

        if (!prevUser && currentUser) {
            // если User был сброшен в null и теперь имеет значение, устанавливаем его из localStorage
            localStorage.setItem("user", JSON.stringify(currentUser));
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Header isAuth={this.state.isAuth} User={this.state.User} onExit={this.Exit}/>
                    <Routes>
                        <Route exact path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LoginPage isAuth={this.state.isAuth} onLogin={this.Login}
                                                                 isLoginned={this.isLoginned}/>}/>
                        <Route path="/registration" element={<RegistrationPage onRegistration={this.Registration}/>}/>
                        <Route path="/inventory"
                               element={<InventoryPage
                                   isAuth={this.state.isAuth}
                                   getItemProfit={this.getItemProfit}
                                   LoadInventory={this.LoadInventory}
                                   Inventory={this.state.Inventory}
                                   UserId={this.state.User.Id}
                                   findItem={this.findItem}
                                   addItem={this.addUserInventoryItem}
                                   deleteItem={this.deleteUserInventoryItem}
                                   updateItem={this.updateUserInventoryItem}
                               />}
                        />
                        <Route path="/library" element={<LibraryPage allItems={this.getAllItems}/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>

                </Router>
            </div>
        );
    }

    updateUserInventoryItem(userId, itemId, price) {
        var updateItemRequest = {
            userId: userId,
            itemId: itemId
        }
        axios.post(this.baseUrl + "Inventory/change", updateItemRequest, {params: {itemPrice: price}}).then(response => {
            // обработка успешного ответа
        })
            .catch(error => {
                // обработка ошибки
            });
    }

    deleteUserInventoryItem(userId, itemId) {
        var deleteItemRequest = {
            userId: userId,
            itemId: itemId
        }
        console.log("del:", deleteItemRequest)
        console.log(this.baseUrl + "Inventory/delete")
        axios.post(this.baseUrl + "Inventory/delete", deleteItemRequest).then(res => {
            if (res.data) {
                alert("Предмет удален!")
            } else {
                alert("Не удалось удалить предмет.")
            }
        })
    }

    addUserInventoryItem(userId, itemId) {
        var addItemRequest = {
            userId: userId,
            itemId: itemId
        }
        axios.post(this.baseUrl + "Inventory/add", addItemRequest).then(res => {
            if (res.data) {
                alert("Предмет добавлен!")
            } else {
                alert("Не удалось добавить предмет.")
            }
        })
        console.log(this.state)
    }

    async findItem(itemName) {
        console.log(this.state)
        try {
            const res = await axios.get(this.baseUrl + "Inventory/" + itemName);
            const items = res.data.map(item => ({
                itemId: item.itemId,
                itemImg: item.itemImg,
                itemName: item.itemName,
            }));
            return items;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                // Обрабатываем ошибку 404
                console.log("Item not found", error);
                return [];
            } else {
                console.error(error);
                throw error;
            }
        }
    }


    async getAllItems() {
        const url = this.baseUrl + "Inventory/AllItems"
        const result = await axios.get(url);
        const items = result.data.map(item => ({
            itemId: item.itemId,
            itemImg: item.itemImg,
            itemName: item.itemName,
        }))
        console.log(items, 1);
        return items;
    }


    async LoadInventory(userId) {
        if (this.state.isAuth === false)
            return null
        try {
            const res = await axios.get(this.baseUrl + 'Inventory/' + userId);
            const userInventory = res.data.map(item => ({
                itemId: item.itemId,
                itemImg: item.itemImg,
                itemName: item.itemName,
                itemCount: item.itemCount,
                itemInitPrice: item.initialPrice,
                itemCurrentPrice: item.currentPrice,
                itemQuality: item.itemQuality,
                itemRare: item.itemRare,
                itemType: item.itemType,
                itemCollection: item.itemCollection
            }));
            this.setState({Inventory: userInventory});
        } catch (error) {
            console.log(error);
            // обработка ошибки
        }
    }

    isLoginned() {
        if (!this.state.User.Id) {
            this.setState({isAuth: false})
        } else {
            this.setState({isAuth: true})
        }
    }

    getItemProfit(key) {
        //const profit = this.state.Inventory.itemCount * (this.state.Inventory.itemCurrentPrice - this.state.Inventory.itemInitPrice);
        let profit = this.state.Inventory[key].itemCount * (this.state.Inventory[key].itemCurrentPrice - this.state.Inventory[key].itemInitPrice);
        if (profit >= 0) {
            return `+${profit}`
        }
        return `${profit}`
    }

    getAllUsers() {
        axios.get(this.baseUrl + "Users/").then(res => {
            var users = [];
            res.data.forEach(item => {
                users.push({
                    Id: item.id,
                    Login: item.login,
                    Password: item.password
                })
            });
            console.log(users);
        })
    }

    //используя стрелочную функцию для определения метода Login, которая автоматически привязывает this к текущему экземпляру компонента.
    Login(user_) {
        var loginRequest = {
            login: user_.login,
            password: user_.password
        }
        axios.post(this.baseUrl + "Users/login", loginRequest).then(res => {
            if (res.data) {
                var user = {
                    Id: res.data.id,
                    Login: res.data.login,
                };
                localStorage.setItem("user", JSON.stringify(user));

                this.setState({
                    User: user
                }, () => {
                    this.isLoginned();
                    console.log(this.state.isAuth);
                });
            } else {
                alert("Неверный логин или пароль!")
            }

        })

        console.log(this.state.isAuth)
    }

    Registration(user_) {
        var registrationRequest = {
            login: user_.login,
            password: user_.password
        }

        axios.post(this.baseUrl + "Users/registration", registrationRequest).then(res => {
            if (!res.data) {
                alert("Регистрация успешна!")
            } else {
                alert("Ну удалось зарегистрироваться.")
            }
        });
    }

    Exit() {
        localStorage.removeItem("user")
        this.setState({User: {}}, () => this.setState({
            User: {}
        }))
    }
}

export default App;
