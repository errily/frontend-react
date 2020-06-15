import React, { Component } from "react";
import InventoryDataService from "../services/inventory.service";

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQty = this.onChangeQty.bind(this);
    this.getInventory = this.getInventory.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateInventory = this.updateInventory.bind(this);
    this.deleteInventory = this.deleteInventory.bind(this);

    this.state = {
      currentInventory: {
        id: null,
        title: "",
        description: "",
        qty:"",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getInventory(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentInventory: {
          ...prevState.currentInventory,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentInventory: {
        ...prevState.currentInventory,
        description: description
      }
    }));
  }

  onChangeQty(e) {
    const qty = e.target.value;
    
    this.setState(prevState => ({
      currentInventory: {
        ...prevState.currentInventory,
        qty: qty
      }
    }));
  }

  getInventory(id) {
    console.log(id);
    InventoryDataService.get(id)
      .then(response => {
        this.setState({
          currentInventory: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentInventory.id,
      title: this.state.currentInventory.title,
      description: this.state.currentInventory.description,
      qty: this.state.currentInventory.qty,
      published: status
    };

    InventoryDataService.update(this.state.currentInventory.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentInventory: {
            ...prevState.currentInventory,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateInventory() {
    InventoryDataService.update(
      this.state.currentInventory.id,
      this.state.currentInventory
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Inventory was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteInventory() {    
    InventoryDataService.delete(this.state.currentInventory.id).then(response => {
        console.log(response);
        this.props.history.push('/inventory')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentInventory } = this.state;

    return (
      <div>
        {currentInventory ? (
          <div className="edit-form">
            <h4>Inventory</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Merk</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentInventory.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Deskripsi</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentInventory.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="qty">Qty</label>
                <input
                  type="text"
                  className="form-control"
                  id="qty"
                  value={currentInventory.qty}
                  onChange={this.onChangeQty}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentInventory.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentInventory.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteInventory}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateAInventory}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Inventory...</p>
          </div>
        )}
      </div>
    );
  }
}
