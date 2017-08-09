import React, { Component } from 'react';

export default class SearchResultsContainer extends Component {
    render() {
        return React.createElement(SearchResults, { results: this.props.results });
    }
}

const SearchResults = ({ results }) => {
    return (
        <ol>
            { results.map(result => {
                return <Result key={result.id} descr={result.name} />;
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