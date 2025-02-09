document.addEventListener('DOMContentLoaded', function() {
  // Update this URL to your actual Cloud Run endpoint or another API endpoint
  // e.g. "https://<your-cloud-run-service-url>/api/social-hub/posts"
  const apiURL = "https://your-backend-url.com/api/social-hub/posts";

  fetch(apiURL)
    .then(response => {
      // Check for a non-200 range response
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const postsContainer = document.getElementById('social-hub-posts');
      // Clear any placeholder or old content
      postsContainer.innerHTML = '';

      // If the data isn't an array or is empty, handle gracefully
      if (!Array.isArray(data) || data.length === 0) {
        postsContainer.innerHTML = `<p>No posts available at this time.</p>`;
        return;
      }

      // Create a card for each post
      data.forEach(post => {
        const postCard = document.createElement('div');
        postCard.className = 'col-md-4';
        postCard.innerHTML = `
          <div class="social-hub__post-card">
            <h4>${post.title ?? 'Untitled Post'}</h4>
            <p>Snippet: "${post.snippet ?? 'No snippet provided'}"</p>
          </div>
        `;
        postsContainer.appendChild(postCard);
      });
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
      // Optional: display a user-facing error message on the page
      const postsContainer = document.getElementById('social-hub-posts');
      postsContainer.innerHTML = `<p>Error loading posts. Please try again later.</p>`;
    });
});
