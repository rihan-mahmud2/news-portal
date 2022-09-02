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
      <a onclick="displayNews('${singleData.category_id}')" class="nav-link active" aria-current="page"  href="#">${singleData.category_name}</a>
      
      `;
    listContainer.appendChild(li);
  });
};

const displayNews = (news) => {
  const eachNewsUrl = `https://openapi.programming-hero.com/api/news/category/${news}`;
  fetch(eachNewsUrl)
    .then((res) => res.json())
    .then((eachNews) => {
      displayNewsCard(eachNews);
    });
};

const displayNewsCard = (eachNews) => {
  const { data } = eachNews;
  data.forEach((singleData) => {
    console.log(singleData);
    const cardContainer = document.getElementById("card-container");
    const div = document.createElement("div");
    div.innerHTML = `
      
      <div class="card mb-3" style="max-width: 1040px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${singleData.thumbnail_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
</div>
      
      
      `;
    cardContainer.appendChild(div);
  });
};

displayList();
