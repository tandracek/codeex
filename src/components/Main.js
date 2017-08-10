import React, { Component } from 'react';
import SearchResults from './SearchResults';
import searchArtists from '../js/searchartists';
import '../css/main.css';

export default class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            input: ''
        }
    }
    handleOnKeyUp = (e) => {
        //TOOD consider when they type during an ajax search
        if (this.searchTimeout)
            clearTimeout(this.searchTimeout);

        const value = e.target.value;
        this.setState({
            input: value
        });

        this.searchTimeout = setTimeout(() => {
            this.setState({
                loading: true
            });
            searchArtists(value).then((data) => {
                this.setState({
                    loading: false,
                    results: data,
                    input: value
                })
            }).catch((err) => {
                //TODO create error dialog system
                console.log(err);
                alert(err);
            });
        }, 500);
    }
    render() {
        return React.createElement(Main, { onKeyUp: this.handleOnKeyUp, results: this.state.results });
    }
}

const Main = ({ onKeyUp, results}) => {
    return (
        <div className="Main-container">
            <input className="Main-search" type="text" placeholder="Search.." onKeyUp={onKeyUp}/>
            <SearchResults results={results} />
        </div>
    )
}