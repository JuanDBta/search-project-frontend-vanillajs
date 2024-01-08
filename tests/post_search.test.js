import { appendSearchResult } from './post_search';

// Mock the fetch function
jest.mock('node-fetch');

describe('appendSearchResult', () => {
  it('should make a successful API call and log the result', async () => {
    // Mock the fetch response
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ message: 'Search created successfully' }),
    });

    // Spy on console.log to check if it's called
    const consoleLogSpy = jest.spyOn(console, 'log');

    // Call the function
    await appendSearchResult('example query');

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith('https://search-project-api.onrender.com/searches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: {
          query: 'example query',
        },
      }),
    });

    expect(consoleLogSpy).toHaveBeenCalledWith('Search created successfully:', { message: 'Search created successfully' });
  });

  it('should handle API errors and log the error', async () => {
    // Mock the fetch response for an error
    global.fetch.mockResolvedValue({
      ok: false,
      status: 500,
      text: jest.fn().mockResolvedValue('Internal Server Error'),
    });

    // Spy on console.error to check if it's called
    const consoleErrorSpy = jest.spyOn(console, 'error');

    // Call the function
    await appendSearchResult('example query');

    // Assertions
    expect(global.fetch).toHaveBeenCalledWith('https://search-project-api.onrender.com/searches', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search: {
          query: 'example query',
        },
      }),
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error creating search:', new Error('Failed to create search. HTTP error! Status: 500'));
  });

  // You can add more test cases as needed
});
