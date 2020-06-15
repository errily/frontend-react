import React, { Component } from "react";
import InventoryDataService from "../services/inventory.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveInventory = this.retrieveInventory.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveInventory = this.setActiveInventory.bind(this);
    this.removeAllInventory = this.removeAllInventory.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      inventory: [],
      currentInventory: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveInventory();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveInventory() {
    InventoryDataService.getUser(AuthService.getCurrentUser().id)
      .then(response => {
        this.setState({
          inventory: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveInventory();
    this.setState({
      currentInventory: null,
      currentIndex: -1
    });
  }

  setActiveInventory(inventory, index) {
    this.setState({
      currentInventory: inventory,
      currentIndex: index
    });
  }

  removeAllInventory() {
    console.log("tets");
    InventoryDataService.deleteUser(AuthService.getCurrentUser().id)
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    InventoryDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          inventory: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, inventory, currentInventory, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Inventorys List</h4>

          <ul className="list-group">
            {inventory &&
              inventory.map((arc, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveInventory(arc, index)}
                  key={index}
                >
                  {arc.title}
                </li>
              ))}
          </ul>

          <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllInventory}>
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentInventory ? (
            <div>
              <h4>Inventory</h4>
              <div>
                <label>
                  <strong>Merk:</strong>
                </label>{" "}
                {currentInventory.title}
              </div>
              <div>
                <label>
                  <strong>Deskripsi:</strong>
                </label>{" "}
                {currentInventory.description}
              </div>
              <div>
                <label>
                  <strong>Qty:</strong>
                </label>{" "}
                {currentInventory.qty}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentInventory.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/inventory/" + currentInventory.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Inventory...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
