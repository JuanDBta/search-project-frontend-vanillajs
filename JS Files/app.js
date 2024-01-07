import { appendSearchResult } from './post_search.js';
import { getSearches, displaySearches } from './recent_searches.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  let searchTimeout;
  let getData;

  // Function to check if a search query is valid
  const isValidSearch = (value) => {
      const regex = /^(\S+\s+){1}\S+.{3,}$/;
      return regex.test(value);
    };
  
    // Function to clear search results
    const clearSearchResults = () => {
      // Implementation for clearing search results if needed
    };
  
      // Event listener for input changes in the search input
    searchInput.addEventListener('input', (event) => {
      const inputValue = event.target.value.trim();
      clearTimeout(searchTimeout);
  
      searchTimeout = setTimeout(() => {
        clearSearchResults();
        if (isValidSearch(inputValue)) {
          appendSearchResult(inputValue);
          getSearches()
          .then((data) => {
          getData = data;
          displaySearches(getData);
          })
        }
      }, 1500);
    });
    getSearches()
    .then((data) => {
      getData = data;
      displaySearches(getData);
    })
});
