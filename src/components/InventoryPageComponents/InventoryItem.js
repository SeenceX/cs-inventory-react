import React from "react";

class InventoryPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            initPrice: this.props.userItem.itemInitPrice
        };

        this.handleInitPriceChange = this.handleInitPriceChange.bind(this);
    }

    handleInitPriceChange(event) {
        this.setState({initPrice: event.target.value});
        this.props.updateItem(this.props.userId, this.props.userItem.itemId, this.state.initPrice)
    }


    render() {
        return (
            <tr className="item">
                <td id="item-img">
                    <img src={this.props.userItem.itemImg} alt=""/>
                </td>
                <td id="item-name">{this.props.userItem.itemName}</td>
                <td id="item-count">{this.props.userItem.itemCount}</td>
                <td id="init-price">
                    <input
                        type={"text"}
                        value={this.props.userItem.itemInitPrice}
                        onClick={this.handleInitPriceChange}
                    />
                </td>
                <td id="current-price">{this.props.userItem.itemCurrentPrice}</td>
                {this.props.getItemProfit(this.props.id) >= 0 ?
                    <td id="profit">{this.props.getItemProfit(this.props.id)}</td> :
                    <td id="loss">{this.props.getItemProfit(this.props.id)}</td>}
                <td>
                    <button type={"button"}
                            onClick={() => this.props.deleteItem(this.props.userId, this.props.userItem.itemId)}>Удалить
                    </button>
                </td>
            </tr>
        )
    }
}

export default InventoryPage
