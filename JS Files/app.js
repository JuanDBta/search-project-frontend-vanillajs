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

  const appendSearchResult = async (result) => {
    const listItem = document.createElement('li');
    listItem.classList.add('search-result-item');
    listItem.textContent = result;
    searchResultsList.appendChild(listItem);

  const jsonData = {
     search: {
          query: result,
        },
    };

      try {
        const response = await fetch('http://127.0.0.1:3000/searches', {
          method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonData),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Search created successfully:', data);
        } else {
          console.error(`Failed to create search. HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
       console.error('Error creating search:', error);
      }
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
