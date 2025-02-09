document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/social-hub/posts')
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.getElementById('social-hub-posts');
      postsContainer.innerHTML = '';
      data.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'col-md-4';
        postCard.innerHTML = `
          <div class="social-hub__post-card">
            <h4>${post.title}</h4>
            <p>Snippet: "${post.snippet}"</p>
          </div>
        `;
        postsContainer.appendChild(postCard);
      });
    })
    .catch(error => console.error('Error fetching posts:', error));
});
