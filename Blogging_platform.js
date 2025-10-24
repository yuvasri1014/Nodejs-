const titleInput = document.getElementById('title');
const contentInput = document.getElementById('content');
const saveBtn = document.getElementById('saveBtn');
const postList = document.getElementById('postList');

let posts = JSON.parse(localStorage.getItem('posts')) || [];

function renderPosts() {
  postList.innerHTML = '';
  if (posts.length === 0) {
    postList.innerHTML = '<p>No posts yet. Write your first one!</p>';
    return;
  }
  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>Published on: ${post.date}</small><br>
      <button onclick="deletePost(${index})">Delete</button>
    `;
    postList.appendChild(postDiv);
  });
}

saveBtn.addEventListener('click', () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  
  if (!title || !content) {
    alert('Please enter both a title and content.');
    return;
  }

  const newPost = {
    title,
    content,
    date: new Date().toLocaleString()
  };

  posts.unshift(newPost);
  localStorage.setItem('posts', JSON.stringify(posts));
  renderPosts();


  titleInput.value = '';
  contentInput.value = '';
});


function deletePost(index) {
  if (confirm('Are you sure you want to delete this post?')) {
    posts.splice(index, 1);
    localStorage.setItem('posts', JSON.stringify(posts));
    renderPosts();
  }
}

renderPosts();
