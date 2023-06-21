const endpoint = "http://localhost:8080/api";

const postContainer = document.querySelector("#post__container");
const btnNext = document.querySelector(".btn__next");
const btnPrev = document.querySelector(".btn__prev");

let limit = 3;
let page = 1;

let posts = [];

const getPosts = async () => {
  const response = await fetch(`${endpoint}/posts?page=${page}&limit=${limit}`);

  const data = await response.json();
  posts = data;
};

const createPost = (elem) => {
  const node = document.createElement("div");
  node.classList.add("post");
  node.innerHTML = `
                    <div class="post__top">
                       ${
                         elem.authorId &&
                         `<div class="post__avatar">
                          <img src="${elem.authorId.avatar}" alt="" class="image-cover">
                        </div>`
                       }
                        <div class="post__nickname">${elem.authorId?.name}</div>
                    </div>
                    <div class="post__imageWrapper">
                        <img src="${elem.image}" alt="" class="image-cover">
                    </div>
                    <div class="post__bottom">
                        <div class="post__likes">${elem.likes}</div>
                        <div class="post__content">${elem.content}</div>
                    </div>
                `;
  return node;
};

const drawPost = () => {
  const postsNodes = posts.map(createPost);
  postContainer.append(...postsNodes);
};

getPosts().then(() => {
  drawPost();
});

btnNext.addEventListener("click", async () => {
  postContainer.innerHTML = "";
  page++;
  await getPosts();
  drawPost();
});
btnPrev.addEventListener("click", async () => {
  postContainer.innerHTML = "";
  page--;
  await getPosts();
  drawPost();
});
