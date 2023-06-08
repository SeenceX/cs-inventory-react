import React from "react";
import InventoryItem from "./InventoryItem";

class InventoryPage extends React.Component {
    render() {
        return (
            <table className="inventory">
                <thead>
                <tr className="table-head">
                    <th id="image"></th>
                    <th id="name">Название</th>
                    <th id="count">Количество</th>
                    <th id="init-price">Цена покупки</th>
                    <th id="current-price">Текущая цена</th>
                    <th id="i-profit">Прибыль</th>
                </tr>
                </thead>
                <tbody>
                {this.props.Inventory.map((item, index) => <InventoryItem key={index} id={index} userId={this.props.userId} deleteItem={this.props.deleteItem} getItemProfit={this.props.getItemProfit} userItem={item}/>)}
                </tbody>
            </table>
        )
    }
}

export default InventoryPage
