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

  // Function to fetch user searches from the server
  const getSearches = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/show_searches');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user searches:', error);
      throw error;
    }
  };

  // Function to display searches in the user interface
  const displaySearches = (getData) => {
    const usersSearchesList = document.getElementById('user-searches');
    usersSearchesList.innerHTML = '';

    getData.forEach((search) => {
      const listItem = document.createElement('li');
      listItem.textContent = search.query;
      usersSearchesList.appendChild(listItem);
    });
  };

  // Function to fetch count searches by user from the server
  const countSearches = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/count_searches');

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching user searches:', error);
      throw error;
    }
  };

  // Function to display counts of searches by user in the user interface
  const displayCountSearches = async () => {
    try {
      const getCountsData = await countSearches();
      const countsCard = document.getElementById('counts');
      console.log(getCountsData);
      countsCard.textContent = `You have done ${getCountsData.searches_count} searches!`;
    } catch (error) {
      console.error('Error displaying user searches count:', error);
    }
  };

  // Function to append a new search result to the server
  const appendSearchResult = (result) => {
    const jsonData = {
      search: {
        query: result,
      },
    };

    fetch('http://127.0.0.1:3000/searches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to create search. HTTP error! Status: ${response.status}`);
        }
      })
      .then((postData) => {
        console.log('Search created successfully:', postData);
        displaySearches(getData);
        displayCountSearches();
      })
      .catch((error) => {
        console.error('Error creating search:', error);
      });
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

  // Fetch initial data and display searches when the page loads
  getSearches()
    .then((getData) => {
      displaySearches(getData);
      displayCountSearches();
    })
    .catch((error) => {
      console.error('Error getting initial data:', error);
    });
});
