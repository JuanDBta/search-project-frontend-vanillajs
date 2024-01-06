document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchResultsList = document.getElementById('searchResultsList');

  searchInput.addEventListener('input', function (event) {
      const inputValue = event.target.value.trim();
      
      if (isValidSearch(inputValue)) {
        appendSearchResult(inputValue);
    }
  });

  function isValidSearch(value) {
    const regex = /^(\S+\s+){1}\S+.{3,}$/;
    return regex.test(value);
}

  function appendSearchResult(result) {
      const listItem = document.createElement('li');
      listItem.classList.add('search-result-item');
      listItem.textContent = result;
      searchResultsList.appendChild(listItem);
  }
});
