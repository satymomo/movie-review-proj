document.addEventListener('DOMContentLoaded', function() {
    loadReviews();
    document.getElementById('review-form').addEventListener('submit', submitReview);
  });
  
  function loadReviews() {
    const storedReviews = localStorage.getItem('reviews');
    const reviews = storedReviews ? JSON.parse(storedReviews) : [];
  
    const reviewsContainer = document.getElementById('reviews');
    reviews.forEach(review => {
      addReviewToPage(review, reviewsContainer);
    });
  }
  
  function submitReview(event) {
    event.preventDefault();
    const movieName = document.getElementById('movie-name').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    const comment = document.getElementById('comment').value;
  
    const review = {
      movieName,
      rating,
      comment,
      timestamp: new Date().toISOString()
    };
  
    const reviewsContainer = document.getElementById('reviews');
    const storedReviews = localStorage.getItem('reviews');
    const reviews = storedReviews ? JSON.parse(storedReviews) : [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
  
    addReviewToPage(review, reviewsContainer);
  
    document.getElementById('review-form').reset();
  }
  
  function addReviewToPage(review, container) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'review';
    reviewDiv.innerHTML = `<h3>${review.movieName}</h3>
                           <p>Rating: ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</p>
                           <p>${review.comment}</p>`;
    container.prepend(reviewDiv);
  }
  