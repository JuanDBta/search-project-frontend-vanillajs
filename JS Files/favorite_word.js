// Function to fetch favorite word by user from the server
export const favoriteWord = async () => {
  try {
    const response = await fetch('https://search-project-api.onrender.com/favorite_word');

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching user searches:', error);
    throw error;
  }
};

// Function to display favorite word by user in the user interface
export const displayWord = async () => {
  try {
    const word = await favoriteWord();
    const wordCard = document.getElementById('word');
    wordCard.textContent = `${word.most_frequent_word} is your go-to word`;
  } catch (error) {
    console.error('Error displaying user searches count:', error);
  }
};
