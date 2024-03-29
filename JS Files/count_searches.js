// Function to fetch count searches by user from the server
export const countSearches = async () => {
  try {
    const response = await fetch('https://search-project-api.onrender.com/count_searches');

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
export const displayCountSearches = async () => {
  try {
    const getCountsData = await countSearches();
    const countsCard = document.getElementById('counts');
    countsCard.textContent = `You have done ${getCountsData.searches_count} searches!`;
  } catch (error) {
    console.error('Error displaying user searches count:', error);
  }
};
