import React, { Component } from 'react';
import SearchResults from './SearchResults';
import Modal from './Modal';
import API from '../js/searcharrest';
import '../css/main.css';

export default class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            results: [],
            input: '',
            loading: false,
            countVisible: false,
            modal: {
                open: false,
                title: '',
                descr: ''
            }
        }
    }
    handleModalClose = () => {
        this.setState({
            modal: {
                open: false,
                title: '',
                descr: ''
            }
        });
    }
    handleModalOpen = (title, descr) => {
        this.setState({
            modal: {
                open: true,
                title: title,
                descr: descr
            }
        })
    }
    handleOnKeyUp = (e) => {
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
            API.search(value).then((data) => {
                this.setState({
                    results: data,
                    input: value,
                    countVisible: true
                })
            }).catch((err) => {
                console.log(err.toString());
                this.handleModalOpen(`Error`, err.message);
            }).then(() => {
                this.setState({
                    loading: false
                })
            });
        }, 500);
    }
    render() {
        return React.createElement(Main, { onKeyUp: this.handleOnKeyUp, results: this.state.results, loading: this.state.loading, countVisible: this.state.countVisible, modal: this.state.modal, 
            onModalClose: this.handleModalClose });
    }
}

const Main = ({ onKeyUp, results, loading, countVisible, modal, onModalClose }) => {
    return (
        <div className="Main-container">
            <Modal open={modal.open} onClose={onModalClose} title={modal.title} descr={modal.descr} />
            <input className="Main-search" type="text" placeholder="Search by name.." onKeyUp={onKeyUp}/>
            {countVisible ? <div className="Main-count">{results.length} results</div> : null }
            <SearchResults results={results} loading={loading}/>
        </div>
    )
}