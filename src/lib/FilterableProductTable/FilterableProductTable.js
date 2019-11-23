import React, {Component} from "react";
import "./FilterableProductTable.css"


class ProductRow extends Component {
    render() {
        const product = this.props.product,
            name = product.stocked ? product.name : <span style={{color:'red'}}>{product.name}</span>;

        return(
            <tr>
                <td>{product.id}</td>
                <td>{name}</td>
                <td>{product.price}</td>
            </tr>
        );
    }
}

class ProductCategoryRow extends Component {
    render() {
        const category = this.props.category;
        return(
            <tr>
                <th colspan="3">{category}</th>
            </tr>
        );
    }
}

class ProductTable extends Component {
    render() {
        const filterText= this.props.filterText,
              isStockedOnly = this.props.isStockedOnly,
              rows = [];

        let lastCategory = null, 
            categories = 0,
            productItems = 0;
        
        this.props.products.forEach(product => {
            if ((filterText && product.name.indexOf(filterText) === -1) || (isStockedOnly && !product.stocked)) {
                return;
            }

            if (lastCategory !== product.category) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />)
                lastCategory = product.category;
                categories++;
            }
            
            rows.push(<ProductRow product={product} key={product.id} />);
            productItems = rows.length - categories; 
        });
        

        return(
            <div>
            <h3>Products: {productItems}</h3>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
            </div>
        );
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange(e) {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        return (
            <fieldset>
                <legend>Filter products</legend>
                <div className="form-group">
                    <label>Search</label>
                    <input type="search" value={this.props.filterText} onChange={this.handleFilterTextChange} className="form-control" placeholder="product name..."/>
                </div>
                <input type="checkbox" checked={this.props.isStockedOnly} onChange={this.handleInStockChange} name="isStockedOnly" />
                <label>Show only stocked products</label>
            </fieldset>
        );
    }
}

class FilterableProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: '',
            isStockedOnly: false
        };
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange(filterText) {
        this.setState({filterText: filterText});
    }

    handleInStockChange(isStockedOnly) {
        this.setState({isStockedOnly: isStockedOnly});
    }

    render() {
        return(
            <div>
                <SearchBar 
                    filterText={this.state.filterText} 
                    isStockedOnly={this.state.isStockedOnly} 
                    onFilterTextChange={this.handleFilterTextChange}
                    onInStockChange={this.handleInStockChange} />
                
                <ProductTable 
                    products={this.props.products} 
                    filterText={this.state.filterText} 
                    isStockedOnly={this.state.isStockedOnly} />
            </div>
        );
    }
}

export default FilterableProductTable;