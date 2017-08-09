import React, { Component } from 'react';

export default class SearchResultsContainer extends Component {
    render() {
        return React.createElement(SearchResults, { results: this.props.results });
    }
}

const SearchResults = ({ results }) => {
    let count = 1;
    return (
        <ol>
            { results.map(result => {
                return <Result key={count++} descr={result.Name} />;
            })}
        </ol>
    )
}

const Result = ({ descr }) => {
    return (
        <li>
            <div>{descr}</div>
        </li>
    )
}