import { appendSearchResult } from './post_search.js';

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  let searchTimeout;
  
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
        }
      }, 1500);
    });
    


  
  
  
});

// Fetch initial data and display searches when the page loads
  // getSearches()
  //   .then((data) => {
  //     getData = data;
  //     displaySearches(getData);
  //     displayCountSearches();
  //   })
  //   .catch((error) => {
  //     console.error('Error getting initial data:', error);
  //   });
