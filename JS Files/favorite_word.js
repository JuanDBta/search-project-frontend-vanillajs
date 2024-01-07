// Function to fetch favorite word by user from the server
export const favoriteWord = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/favorite_word');
  
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
      wordCard.textContent = `Your favorite word is ${word.most_frequent_word}`;
    } catch (error) {
      console.error('Error displaying user searches count:', error);
    }
  };
  