const assert = require('assert');
const sinon = require('sinon');
const NflApi = require('../server/nflarrestapi').default;


const testData = [
    {
        "Name": "Akili Smith",
        "Position": "QB",
        "arrest_count": "1"
    },
    {
        "Name": "Eric Wright",
        "Position": "CB",
        "arrest_count": "2"
    },
    {
        "Name": "Tony McDaniel",
        "Position": "DT",
        "arrest_count": "1"
    }
];
const testDataSingle = [
    {
        "Name": "Akili Smith",
        "Position": "QB",
        "arrest_count": "1"
    }
]
describe('NFL Arrest API', function() {
    const fetchStub = sinon.stub(NflApi, 'performFetch');
    it('Test player search URL', function() {
        const query = `smith`;
        const validUrl = `http://NflArrest.com/api/v1/player/search/?term=${query}`;
        fetchStub.callsFake(function (url) {
            assert.equal(url, validUrl, `Invalid url passe to fetch: ${url} it should be: ${validUrl}`);
            return Promise.resolve(testData);
        });

        return NflApi.searchPlayer(query).then((data) => {
            assert(fetchStub.calledOnce, `performSearch is never called`);
            fetchStub.restore();  
        });
    });

    it('Test player search full position', function() {
        fetchStub.callsFake(function (url) {
            return Promise.resolve(testData);
        });

        const positions = {
            QB: "Quarterback",
            CB: "Conrerback",
            DT: "Defensive Tackle"
        }
        return NflApi.searchPlayer('').then((data) => {
            data.forEach((p) => {
                assert(p.FullPosition, `Player ${p.Name} does not include a full positiong`);
                assert.equal(p.FullPosition, positions[p.Position], `Incorrect position for player ${p.Name}`);
            });
            fetchStub.restore();
        });
    });

    it('Test player search name formatted', function() {
        fetchStub.callsFake(function (url) {
            return Promise.resolve(testDataSingle);
        });
        const validName = "Smith, Akili";
        return NflApi.searchPlayer('').then((data) => {
            data.forEach((p) => {
                assert.equal(data.Name, validName, `Didn't correctly format name: ${data.Name}`);
            });
            fetchStub.restore();
        });
    });

    it('Test player search sorted', function() {
        fetchStub.callsFake(function (url) {
            return Promise.resolve(testDataSingle);
        });
        return NflApi.searchPlayer('').then((data) => {
            const prev = '';
            data.forEach((p) => {
                if (prev.length) {
                    assert((prev.localeCompare(p.Name) <= 0), `Did not correctly sort the data: ${prev} should be before ${p.Name}`);
                }
            });
        });
    });
})