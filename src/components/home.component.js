import React, { Component  } from "react";
import UserService from "../services/user.service";
import InventoryDataService from "../services/inventory.service";
import Datatable from "react-bs-datatable"; 

export default class Home extends Component{

    
    constructor(props){
        super(props);
       
        this.state = {
            content : "",
            error: null,
            isLoaded: false,
            items: []
        };

        this.header = [
            { title: "ID", prop: "id", sortable: true, filterable: true },
            {
              title: "User Name",
              prop:"username",
              sortable: true,
              filterable: true
            },
            { title: "Merk", prop: "title", sortable: true, filterable: true },
            { title: "Deskripsi", prop: "description", sortable: true, filterable: true },
            { title: "QTY", prop: "qty", sortable: true, filterable: true },
            { title: "Published Date", prop: "createdAt", sortable: true, filterable: true }
        ];
    

       
    }

    componentDidMount(){
        UserService.getPublicContent().then(
            response => {
                this.setState({
                    content : response.data
                });
            },
            error => {
                this.setState({
                    content : (error.response && error.response.data ) 
                    || error.message || error.toString()
                });
            }
        );

        InventoryDataService.getPublished().then(
            response => {
                this.setState({
                    isLoaded: true,
                    items: response.data
                });
            },
            error => {
                this.setState({
                    isLoaded: true,
                    error: error
                });
            }
        );
    }


    render(){
        const { content, error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div>
            <div class="spinner-grow text-primary" role="status"></div>
            <div class="spinner-grow text-info" role="status"></div>
            <div class="spinner-grow text-primary" role="status"></div>
            <div class="spinner-grow text-info" role="status"></div>
            <div class="spinner-grow text-primary" role="status"></div>
            <div class="spinner-grow text-info" role="status"></div>
            </div>;
          } else {
            console.log(items);

        return(
            <div className="container">
                <header className="jumbotron">
                    <h3><strong>{content.message}</strong></h3>
                </header>

                <Datatable
                    tableHeaders={this.header}
                    tableBody={items}
                    keyName="userTable"
                   // tableClass="striped hover responsive"
                    rowsPerPage={20}
                    rowsPerPageOption={[20, 25, 30, 40]}
                    initialSort={{ prop: "username", isAscending: true }} />
              
              
            </div>
        );

        }
    }
}