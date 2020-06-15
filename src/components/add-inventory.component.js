import React, { Component } from "react";
import InventoryDataService from "../services/inventory.service";
import AuthService from "../services/auth.service";


export default class AddInventory extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeQty=this.onChangeQty.bind(this);
    this.saveInventory= this.saveInventory.bind(this);
    this.newInventory = this.newInventory.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      qty:"",
      published: false,
      userId : AuthService.getCurrentUser().id,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeQty(e) {
    this.setState({
      qty: e.target.value
    });
  }

  saveInventory() {
    var data = {
      title: this.state.title,
      description: this.state.description,
      qty: this.state.qty,
      userId : this.state.userId
    };

    InventoryDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          qty: response.data.qty,
          published: response.data.published,
          userId: response.data.userId,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newInventory() {
    this.setState({
      id: null,
      title: "",
      description: "",
      qty:"",
      published: false,
      userId : AuthService.getCurrentUser().id,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newInventory}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Merk</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Deskripsi</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="qty">Qty</label>
              <input
                type="text"
                className="form-control"
                id="qty"
                required
                value={this.state.qty}
                onChange={this.onChangeQty}
                name="qty"
              />
            </div>

            <button onClick={this.saveInventory} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }

}
