document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchResultsList = document.getElementById('searchResultsList');
  
  searchInput.addEventListener('input', function (event) {
      const inputValue = event.target.value;

      if (inputValue.trim() !== '') {
          appendSearchResult(inputValue);
      }
  });

  function appendSearchResult(result) {
      const listItem = document.createElement('li');
      listItem.textContent = result;
      searchResultsList.appendChild(listItem);
  }
});
