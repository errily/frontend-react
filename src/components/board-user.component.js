import React, { Component  } from "react";
import UserService from "../services/user.service";


export default class BoardUser extends Component{

    
    constructor(props){
        super(props);
       
        this.state = {
            content : ""
        }
    }

    componentDidMount(){
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content : response.data
                });
            },
            error => {
                this.setState({
                    content : (error.response && error.response.data 
                        && error.data.message ) || error.message || error.toString()
                });
            }
        );
    }


    render(){
        return(
            <div className="container">
                <header className="jumbotron">
                    <h3><strong>{this.state.content.message}</strong></h3>
                </header>
              
            </div>
        );
    }
}