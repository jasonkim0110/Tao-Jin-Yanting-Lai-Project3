$(document).ready(() => {
  $.get('/api/posts', options, (results) => {
    const container = $('.postsContainer');
    outputPosts(results, container);
  });
});
