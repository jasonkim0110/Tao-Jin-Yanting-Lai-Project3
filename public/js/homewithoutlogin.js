$(document).ready(() => {
  // const options = { followingOnly: false };
  $.get('/api/posts', (results) => {
    const container = $('.postsAllContainer');
    outputAllPosts(results, container);
  });
});

function outputAllPosts(results, container) {
  container.html('');

  if (!Array.isArray(results)) {
    results = [results];
  }

  results.forEach((result) => {
    var html = createAllPostHtml(result);
    container.append(html);
  });

  if (results.length == 0) {
    container.append("<span class='noResults'>Nothing to show.</span>");
  }
}

function createAllPostHtml(postData, largeFont = false) {
  if (postData == null) return alert('post object is null');

  var postedBy = postData.postedBy;

  var displayName = postedBy.firstName + ' ' + postedBy.lastName;
  var timestamp = timeDifference(new Date(), new Date(postData.createdAt));

  var largeFontClass = largeFont ? 'largeFont' : '';

  var replyFlag = '';

  var buttons = '';
  var pinnedPostText = '';

  return `<div class='post ${largeFontClass}' data-id='${postData._id}'>

                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='pinnedPostText'>${pinnedPostText}</div>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                            ${buttons}
                        </div>
                        ${replyFlag}
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                    </div>
                </div>
            </div>`;
}
