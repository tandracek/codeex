import search from './searcharrest';

it('Search pulls from cache', () => {
    const mockFetch = jest.fn();
    mockFetch.mockReturnValueOnce(Promise.resolve(['test']));
    search.performFetch = mockFetch;
    const mockCache = jest.fn();
    mockCache.mockReturnValueOnce(Promise.resolve(['cache']));
    search.pullFromCache = mockCache;
    search.search("smith").then((data) => {
        return search.search("smith");
    }).then((data) => {
        expect(mockFetch.mock.calls.length).toBe(1);
        expect(mockCache.mock.calls.length).toBe(1);
    });
});
