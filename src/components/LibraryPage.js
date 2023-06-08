import React, {Component} from 'react';

class LibraryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    async componentDidMount() {
        const data = await this.props.allItems();
        this.setState({ items: data });
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.items.map((item, index) => (
                        <li key={index}>
                            <img src={item.itemImg} alt={item.itemName} />
                            <span>{item.itemName}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default LibraryPage;
