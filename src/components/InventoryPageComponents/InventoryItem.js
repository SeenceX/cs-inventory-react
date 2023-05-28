import React from "react";

class InventoryPage extends React.Component {


    render() {
        return (
            <tr className="item">
                <td id="item-img">
                    <img src={this.props.userItem.itemImg} alt=""/>
                </td>
                <td id="item-name">{this.props.userItem.itemName}</td>
                <td id="item-count">{this.props.userItem.itemCount}</td>
                <td id="init-price">{this.props.userItem.itemInitPrice}</td>
                <td id="current-price">{this.props.userItem.itemCurrentPrice}</td>
                {this.props.getItemProfit >= 0 ? <td id="profit">{this.props.getItemProfit}</td> :
                    <td id="loss">{this.props.getItemProfit}</td>}
            </tr>
        )
    }
}

export default InventoryPage