/*import './App.css';*/
import React from "react";
import Header from "./components/Header";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import InventoryPage from "./components/InventoryPage";
import "./css/style.css"
import axios from "axios";

class App extends React.Component {

    baseUrl = 'http://localhost:5000/api/'
    constructor(props) {
        super(props);

        this.state = {
            User:{
                userId: 0,
                userLogin: "SeenceX",
                userInventoryId: 0,
            },
            Inventory: [
                {
                    itemId: 0,
                    itemImg: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU4naLOJzgUuYqyzIaIxa6jMOLXxGkHvcMjibmU99Sg3Qaw-hA_ZWrzLISLMlhpgJJUhGE/64fx64f",
                    itemName: "Snakebite case",
                    itemCount: 10,
                    itemInitPrice: 10,
                    itemCurrentPrice: 20,
                },
                {
                    itemId: 1,
                    itemImg: "https://community.akamai.steamstatic.com/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFU4naLOJzgUuYqyzIaIxa6jMOLXxGkHvcMjibmU99Sg3Qaw-hA_ZWrzLISLMlhpgJJUhGE/64fx64f",
                    itemName: "Bravo case",
                    itemCount: 1,
                    itemInitPrice: 10,
                    itemCurrentPrice: 1,
                },
            ]
        }

        this.isLoginned = this.isLoginned.bind(this);
        this.getItemProfit = this.getItemProfit.bind(this);
        this.LoadInventory = this.LoadInventory.bind(this)
        //this.LoadInventory()
    }
    render() {
        return (
            <Router>
                <Header isLoginned={this.isLoginned} User={this.state.User}/>
                <Routes>
                    <Route path="*" element={<NotFound/>}/>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route path="/inventory" element={<InventoryPage getItemProfit={this.getItemProfit} Inventory={this.state.Inventory}/>}/>
                </Routes>
            </Router>
        )
    }

    LoadInventory(inventoryId){
        axios.get(this.baseUrl+'/inventory',inventoryId).then(res => {
            var userInventory = [];
            res.data.forEach(item => {
                userInventory.push({
                    itemId: item.id,
                    itemImg: item.img,
                    itemName: item.name,
                    itemCount: item.count,
                    itemInitPrice: item.initPrice,
                    itemCurrentPrice: item.currPrice,
                })
            });
            this.setState({
                Inventory: []
            }, () => this.setState({
                Inventory: userInventory
            }))
        })

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
}

export default App;
