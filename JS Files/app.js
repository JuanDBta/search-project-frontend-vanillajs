document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchResultsList = document.getElementById('searchResultsList');
  const uniqueSearches = new Set();
  let searchTimeout;

  const clearSearchResults = () => {
    searchResultsList.innerHTML = '';
  };

  const isValidSearch = (value) => {
    const regex = /^(\S+\s+){1}\S+.{3,}$/;
    return regex.test(value);
  };

  const findLargestSearch = (searchSet) => {
    const searchArray = Array.from(searchSet);
    const largestSearch = searchArray.reduce((largest, current) => (current.length > largest.length ? current : largest), '');
    return largestSearch;
  };

  const filterSubstrings = (searchSet, largestSearch) => {
    const searchArray = Array.from(searchSet);
    const filteredArray = searchArray.filter((search) => search === largestSearch
    || !search.includes(largestSearch));
    const filteredSet = new Set(filteredArray);
    return filteredSet;
  };

  const appendSearchResult = (result) => {
    const listItem = document.createElement('li');
    listItem.classList.add('search-result-item');
    listItem.textContent = result;
    searchResultsList.appendChild(listItem);
  };

  searchInput.addEventListener('input', (event) => {
    const inputValue = event.target.value.trim();
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(() => {
      clearSearchResults();
      if (isValidSearch(inputValue)) {
        uniqueSearches.add(inputValue);
        const largestSearch = findLargestSearch(uniqueSearches);
        const filteredSearches = filterSubstrings(uniqueSearches, largestSearch);

        filteredSearches.forEach(appendSearchResult);
      }
    }, 1500);
  });
});
