document.addEventListener("DOMContentLoaded", function() {
    const searchForm = document.getElementById("search-form");
    const searchResults = document.getElementById("search-results");
  
    searchForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      searchResults.innerHTML = "";

      const searchTerm = document.getElementById("search-input").value;

      const users = []; 
      if (users.length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "Nenhum usuário encontrado com esse nome.";
        searchResults.appendChild(noResultsMessage);
      } else {
        users.forEach(function(user) {
          const userElement = document.createElement("div");
          userElement.textContent = `Nome: ${user.name}, Email: ${user.email}`;
          searchResults.appendChild(userElement);
        });
      }
    });
  });
  