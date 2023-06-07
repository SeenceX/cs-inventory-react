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

class App extends React.Component {

    baseUrl = 'https://localhost:7070/api/'
    constructor(props) {
        super(props);

        this.state = {
            User:{
                userId: 0,
                userLogin: "SeenceX",
                userInventoryId: 0,
            },
            Inventory: [],
        }
        this.isLoginned = this.isLoginned.bind(this);
        this.getItemProfit = this.getItemProfit.bind(this);
        this.LoadInventory = this.LoadInventory.bind(this)
        //this.LoadInventory(1);
    }
    componentDidMount() {
        //this.getAllUsers();
    }

    render() {
        return (
            <Router>
                <Header isLoginned={this.isLoginned} User={this.state.User}/>
                <Routes>
                    <Route path="*" element={<NotFound/>}/>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/inventory" element={<InventoryPage getItemProfit={this.getItemProfit} LoadInventory={this.LoadInventory} Inventory={this.state.Inventory}/>}/>
                </Routes>
            </Router>
        )
    }

    async LoadInventory(userId){
        try {
            console.log(1);
            const res = await axios.get(this.baseUrl + 'Inventory/' + userId);
            const userInventory = res.data.map(item => ({
                itemId: item.itemid,
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
            this.setState({ Inventory: userInventory });
        } catch (error) {
            console.log(error);
            // обработка ошибки
        }

    }

    isLoginned(){
        return this.state.User ? true : false
    }

    getItemProfit(key) {
        //const profit = this.state.Inventory.itemCount * (this.state.Inventory.itemCurrentPrice - this.state.Inventory.itemInitPrice);
        let profit = this.state.Inventory[key].itemCount * (this.state.Inventory[key].itemCurrentPrice - this.state.Inventory[key].itemInitPrice);
        if (profit >= 0) {
            return `+${profit}`
        }
        return `${profit}`
    }

    getAllUsers(){
        axios.get(this.baseUrl+"Users/").then(res =>{
            var users = [];
            res.data.forEach(item=>{
                users.push({
                    Id: item.id,
                    Login: item.login,
                    Password: item.password
                })
            });
            console.log(users);
        })
    }
}

export default App;
