var jobData;
const mainElem = document.querySelector("main");
const filtersCardElem = document.getElementById("filters-card");
const filtersElem = filtersCardElem.querySelector(".filter-tablets");

var filters = [];

document.querySelector("#filters-card .clear-btn").addEventListener("click", function clearAll(){
    removeFilter("all");
})
{
let requestURL = "./data.json";
let request = new XMLHttpRequest();
request.open('GET', "./data.json");
request.responseType = 'json';
request.send();
request.onload = function(){
    jobData = request.response;
    jobData.forEach(obj=>{
        let card =document.createElement("div");
        card.className = "card company";
    
        let logo = `<img class="logo" src="${obj.logo}" alt="${obj.company}-logo">`
    
        let h1 = `<h1><span class="company">${obj.company}</span>`
        if(obj.new){
            h1 += `<span class="tag new">new!</span>`;
        }
        if(obj.featured){
            card.classList.add("featured");
            h1 += `<span class="tag featured">featured</span>`
        }
        h1 += `</h1>`
    
        let h2 = `<h2>${obj.position}</h2>`
    
        let moreInfo = `<div class="more-info"><span>${obj.postedAt}</span><span>${obj.contract}</span><span>${obj.location}</span></div>`

        let filterTablets = [obj.role, obj.level, ...obj.languages, ...obj.tools];

        let filters = `<div class="filter-tablets">`;
        filterTablets.forEach(tab=>{
            filters += `<span onclick="addFilter('${tab}')">${tab}</span>`
        })
        filters += `</div>`
    
        mainElem.appendChild(card);
        card.innerHTML = logo + h1 + h2 + moreInfo + filters;

        obj.filterTablets = filterTablets;
        obj.element = card;
    });
}
}

function addFilter(filterTablet){
    if(filters.includes(filterTablet)) return;
    filtersCardElem.classList.remove("hide");

    let span = document.createElement("span");
    filtersElem.append(span);
    span.innerHTML = `${filterTablet}<span class="remove-btn" onclick="removeFilter('${filterTablet}')"></span>`;

    filters.push(filterTablet);
    filterCards();
}
function removeFilter(filterTablet){
    if(filterTablet === "all"){
        filters = [];
        filtersElem.innerHTML = null;
    } else {
        filters = filters.filter(tab=>tab!==filterTablet);

        let tabs = filtersElem.children;
        for(let i = tabs.length - 1; i >=0 ; i--){
            if(tabs[i].textContent === filterTablet){
                filtersElem.removeChild(tabs[i]);
            } 
        }
    }

    if(filters.length === 0){
        filtersCardElem.classList.add("hide");
    }
    filterCards();
}
function filterCards(){
    jobData.forEach(obj=>{
        let elem = obj.element;
        let filterTablets = obj.filterTablets;

        if(filters.every(tablet=>filterTablets.some(tab=>tablet === tab))){
            elem.classList.remove("hide");
        }else{
            elem.classList.add("hide");
        }
    })
}
/*<div class="card company">
      <img class="logo" src="./images/photosnap.svg" alt="photosnap-logo">
      <h1>
        <span class="company">Photosnap</span>
        <span class="tag new">new!</span>
        <span class="tag featured">featured</span>
      </h1>
      <h2>Senior Frontend Developer</h2>
      <div class="more-info">
        <span>1d ago</span>
        <span>Full Time</span>
        <span>USA only</span>
      </div>
      <div class="filter-tablets">
        <span>Frontend</span>
        <span>Senior</span>
        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
      </div>
    </div> */