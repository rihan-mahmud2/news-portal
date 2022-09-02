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
    data.forEach(singleData => {
    console.log(singleData);
    
    })
};

displayList();
