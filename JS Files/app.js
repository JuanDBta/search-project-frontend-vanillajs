document.addEventListener('DOMContentLoaded', function () {
  const searchInput = document.getElementById('searchInput');
  const searchResultsList = document.getElementById('searchResultsList');
  const uniqueSearches = new Set();
  let searchTimeout;


  searchInput.addEventListener('input', function (event) {
      const inputValue = event.target.value.trim();
      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(function () {
      clearSearchResults();
      if (isValidSearch(inputValue)) {
        // Agrega la búsqueda al conjunto único
        uniqueSearches.add(inputValue);
        const largestSearch = findLargestSearch(uniqueSearches);
        const filteredSearches = filterSubstrings(uniqueSearches, largestSearch);

        // Muestra la búsqueda completa en la lista de resultados
        filteredSearches.forEach(appendSearchResult);
    }
  }, 1500);
  });

  function isValidSearch(value) {
    const regex = /^(\S+\s+){1}\S+.{3,}$/;
    return regex.test(value);
}

function findLargestSearch(searchSet) {
  return Array.from(searchSet).reduce((largest, current) => current.length > largest.length ? current : largest, '');
}

function filterSubstrings(searchSet, largestSearch) {
  return new Set(Array.from(searchSet).filter(search => search === largestSearch || !search.includes(largestSearch)));
}

  function appendSearchResult(result) {
      const listItem = document.createElement('li');
      listItem.classList.add('search-result-item');
      listItem.textContent = result;
      searchResultsList.appendChild(listItem);
  }
});

function clearSearchResults() {
  searchResultsList.innerHTML = '';
}
