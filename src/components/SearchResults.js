import React, { Component } from 'react';
import '../css/searchresults.css';
import '../css/skeleton.css';

export default class SearchResultsContainer extends Component {
    render() {
        return React.createElement(SearchResults, { results: this.props.results });
    }
}

const SearchResults = ({ results }) => {
    let count = 1;
    return (
        <ol className="Results-base container">
            <div className="Results-header row">
                <div className="four columns">Name</div>
                <div className="four columns">Position</div>
                <div className="four columns">Arrest Count</div>
            </div>
            { results.map(result => {
                return <Result key={count++} name={result.Name} pos={result.Position} 
                    arrest={result.arrest_count} fullPos={result.FullPosition} />;
            })}
        </ol>
    )
}

const Result = ({ name, pos, arrest, fullPos }) => {
    return (
        <li className="Results-item row">
            <div className="four columns">{name}</div>
            <div className="four columns pos">{pos}</div>
            <div className="four columns fullPos">{fullPos}</div>
            <div className="four columns">{arrest}</div>
        </li>
    )
}