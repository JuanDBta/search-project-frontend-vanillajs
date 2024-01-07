// Function to fetch average word per seearch by user from the server
export const average = async () => {
  try {
    const response = await fetch('https://search-project-api.onrender.com/average_words_per_search');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user searches:', error);
    throw error;
  }
};

// Function to display average word per search by user in the user interface
export const displayAverage = async () => {
  try {
    const averagePerSearch = await average();
    const averageCard = document.getElementById('average');
    averageCard.textContent = `Your average is ${averagePerSearch.average_words_per_search} words per search`;
  } catch (error) {
    console.error('Error displaying user searches count:', error);
  }
};
