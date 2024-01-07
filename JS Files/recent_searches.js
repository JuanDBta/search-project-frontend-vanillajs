// Function to fetch user searches from the server
export const getSearches = async () => {
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
export const displaySearches = (data) => {
  const usersSearchesList = document.getElementById('user-searches');
  usersSearchesList.innerHTML = '';

  data.forEach((search) => {
    const listItem = document.createElement('li');
    listItem.textContent = search.query;
    usersSearchesList.appendChild(listItem);
  });
};
