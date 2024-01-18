document.getElementById('searchInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      searchBooks();
  }
});

function searchBooks() {
  const searchInput = document.getElementById('searchInput').value;
  const resultsContainer = document.getElementById('resultsContainer');

  // Clear previous results
  resultsContainer.innerHTML = '';

  // Make API request
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchInput}`)
      .then(response => response.json())
      .then(data => {
          data.items.forEach(item => {
              const title = item.volumeInfo.title;
              const author = item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author';
              const thumbnail = item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : 'no-image.jpg';

              const bookElement = createBookElement(title, author, thumbnail);

              // Create a button to add the book to favorites
              const favoriteButton = document.createElement('button');
              favoriteButton.textContent = 'Add to Favorites';
              favoriteButton.onclick = function() {
                  addToFavorites(title, author, thumbnail);
              };

              // Append the book and button to the results container
              resultsContainer.appendChild(bookElement);
              resultsContainer.appendChild(favoriteButton);
          });
      })
      .catch(error => console.error('Error fetching books:', error));
}

function resetSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('resultsContainer').innerHTML = '';
}

function getRandomBook() {
  // Generate a random index for the API request
  const randomIndex = Math.floor(Math.random() * 100) + 1; // Adjust the range based on the total number of books available

  // Make API request
  fetch(`https://www.googleapis.com/books/v1/volumes?q=javascript&startIndex=${randomIndex}&maxResults=1`)
      .then(response => response.json())
      .then(data => {
          const randomBook = data.items[0];
          const title = randomBook.volumeInfo.title;
          const author = randomBook.volumeInfo.authors ? randomBook.volumeInfo.authors.join(', ') : 'Unknown Author';
          const thumbnail = randomBook.volumeInfo.imageLinks ? randomBook.volumeInfo.imageLinks.thumbnail : 'no-image.jpg';

          // Display the random book on the page
          const randomBookElement = createBookElement(title, author, thumbnail);

          // Create a button to add the book to favorites
          const favoriteButton = document.createElement('button');
          favoriteButton.textContent = 'Add to Favorites';
          favoriteButton.onclick = function() {
              addToFavorites(title, author, thumbnail);
          };

          // Append the book and button to the results container
          document.getElementById('resultsContainer').appendChild(randomBookElement);
          document.getElementById('resultsContainer').appendChild(favoriteButton);
      })
      .catch(error => console.error('Error fetching random book:', error));
}

function createBookElement(title, author, thumbnail) {
  const bookElement = document.createElement('div');
  bookElement.classList.add('book');

  bookElement.innerHTML = `
      <img src="${thumbnail}" alt="${title}">
      <h3>${title}</h3>
      <p>Author: ${author}</p>
  `;

  return bookElement;
}

function addToFavorites(title, author, thumbnail) {
  // Create a favorite book element
  const favoriteBookElement = createBookElement(title, author, thumbnail);

  // Append the favorite book to the favorites container
  const favoritesContainer = document.getElementById('favoritesContainer');
  favoritesContainer.appendChild(favoriteBookElement);
}
