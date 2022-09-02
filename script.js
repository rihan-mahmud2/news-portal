const displayList = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  displayListItem(data.data.news_category);
};

const displayListItem = (data) => {
  console.log(data);
  data.forEach((singleData) => {
    const listContainer = document.getElementById("list-container");
    const li = document.createElement("li");
    li.classList.add("nav-item");
    li.innerHTML = `
      <a class="nav-link active" aria-current="page" href="#">${singleData.category_name}</a>
      
      `;
    listContainer.appendChild(li);
  });
};

document.getElementById('list-container').addEventListener('click', () => {




})


displayList();
