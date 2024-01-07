export const appendSearchResult = async (result) => {
  try {
    const jsonData = {
      search: {
        query: result,
      },
    };

    const response = await fetch('https://search-project-api.onrender.com/searches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create search. HTTP error! Status: ${response.status}`);
    }

    const postData = await response.json();
    console.log('Search created successfully:', postData);
  } catch (error) {
    console.error('Error creating search:', error);
  }
};

export default appendSearchResult;
