const displayList = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/news/categories"
    );
    const data = await res.json();
    displayListItem(data.data.news_category);
  } catch (err) {
    console.log(err);
  }
};

const displyEachModalPlaery = (modalData) => {
  console.log(modalData);

  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
     
    <div class="text-center">
     <h5>Title: ${modalData.title}</h5>
     <img src="${modalData.thumbnail_url}">
     <small class="d-block">Author: ${modalData.author.name}</small>
     <span>Pblished: ${modalData.author.published_date}</span>
    
    </div>
  
  
  `;
};

const displayModal = (id) => {
  const eachNewsUrl = `https://openapi.programming-hero.com/api/news/${id}`;
  console.log(eachNewsUrl);
  fetch(eachNewsUrl)
    .then((res) => res.json())
    .then((eachNews) => {
      displyEachModalPlaery(eachNews.data[0]);
    })
    .catch((err) => err);
};

const displayListItem = (data) => {
  // console.log(data);
  data.forEach((singleData, index) => {
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
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");
  const eachNewsUrl = `https://openapi.programming-hero.com/api/news/category/${news}`;

  fetch(eachNewsUrl)
    .then((res) => res.json())
    .then((eachNews) => {
      displayNewsCard(eachNews);
    })
    .catch((err) => {
      console.log(err);
    });
};

const displayNewsCard = (eachNews) => {
  const { data } = eachNews;

  // Bubble sort Implementation using Javascript

  // Creating the bblSort function
  

  function bblSort(arr) {
    for (let i = 0; i < arr.length; i++) {
      // Last i elements are already in place
      for (let j = 0; j < arr.length - i - 1; j++) {
        // Checking if the item at present iteration
        // is greater than the next iteration
        if (arr[j].total_view > arr[j + 1].total_view) {
          // If the condition is true then swap them
          let temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }

    passSortedArr(arr);
  }
  
  bblSort(data);

  const noData = document.getElementById("no-data");
  if (data.length === 0) {
    noData.innerHTML = `
          <h1 class="text-center fs-4">
               No news is found rgarding to the topic
          </h1>
    
    `;
  } else {
    noData.innerHTML = `
    <h1 class="text-center fs-4">
           ${data.length} news is found rgarding to the topic
          </h1>
    
    `;
  }
  function passSortedArr(data) {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
    data.forEach((singleData, index) => {
      // console.log(singleData);
      const div = document.createElement("div");

      div.innerHTML = `
      
      <div class="card mb-3" style="max-width: 1040px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${
        singleData.thumbnail_url
      }" class="w-100 h-auto rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${singleData.title}</h5>
        <p class="card-text">${singleData.details.slice(0, 200)}...</p>
        <div class="d-flex flex-row  justify-content-evenly align-items-center">
       <div clss="flex-row">
        <img src="${
          singleData.author.img
        }" alt="..." class="img-fluid rounded-circle" style="width:100px">
        <div class="d-flex flex-column">
        <span>${singleData.author["name"]}</span>
        <quote>${singleData.author.published_date}</quote>
        </div>
       </div>
        <p>Viewrs: ${
          singleData.total_view ? singleData.total_view : "No data Found"
        }</p>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="(displayModal('${
          singleData["_id"]
        }'))">
           Click
        </button>
        
        </div>
      </div>
    </div>
  </div>
</div>
      
      
      `;
      cardContainer.appendChild(div);
    });
  }

  spinner.classList.add("d-none");
};

displayList();
