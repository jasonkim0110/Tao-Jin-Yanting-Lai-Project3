$(document).ready(() => {
  fetchPosts();
});

const fetchPosts = () => {
  $.get('/api/posts', { followingOnly: true }, (results) => {
    outputPosts(results, $('.postsContainer'));
  });
};
