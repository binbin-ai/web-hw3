const dialog = document.getElementById("detail");
const liked = JSON.parse(localStorage.getItem("liked") || "[]");

// sortBy : 배열, 키 이름, 참이면 내림차순 ⇒ 새 배열
const sortBy = (list, key, desc) => {
    const sign = desc ? -1 : 1;
    return [...list].sort((a, b) => {
        if (typeof a[key] === "string") {
            return a[key].localeCompare(b[key]) * sign;
        }
        return (a[key] - b[key]) * sign;
    });
};

// search : 배열, 문자열 ⇒ 새 배열
const search = (list, keyword) => {
    let list_dic = [];
    keyword = keyword.trim().toLowerCase()
    for(const m of list){
        if(m.title.toLowerCase().includes(keyword)){
            list_dic.push({...m})
        }
    }
    return list_dic;
};

// getView : X => 조건에 맞는 렌더링을 위한 배열
function getView() {
    const keyword = document.querySelector("#q").value;
    const type = document.querySelector('input[name="type"]:checked').value; // 전체 or 내영화 or 박스오피스
    const sortKey = document.querySelector("#sort").value;

    let result = search(movies, keyword); // movies의 타이틀 중 키워드가 포함된 타이틀만 반환한 것이 result(리스트 내부 객체 리터럴 형태)

    if (type !== "all") { // 타입이 전체가 아니면
        result = result.filter((m) => m.type === type); // 해당 타입의 영화만 result에
    }

    const desc = sortKey !== "title";
    result = sortBy(result, sortKey, desc);

    return result;
}

// posterUrl : TMDB 포스터 이미지별 주소, 포스터 크기 => 포스터 전체주소
const posterUrl = (path, size) => {
    return `https://image.tmdb.org/t/p/${size}/${path}`;
};

// openDetail : 클릭한 카드의 제목 => 모달로 해당 영화의 상세페이지 표시(반환값 없음)
function openDetail(title){
    const finded = movies.find(m => m.title === title);
    if (!finded) {
        return;
    }
    
    document.getElementById("detailBody").innerHTML = `
      <img src="${posterUrl(finded.poster, "w500")}" alt="${finded.title} 포스터">
      <h2>${finded.title}</h2>
      <p>개봉일 ${finded.date}, 평점 ${finded.rating}</p>
      <p>${finded.overview}</p>
    `;

    dialog.showModal();
}

// refresh가 있어야 조건이 변할때 마다 렌더링하여 화면이 해당 조건을 만족하는 화면으로 전환댐
// refresh : X => getView()가 반환한 조건이 담긴 배열을 renderCards가 파라미터로 받아 렌더링 함 
function refresh() { renderCards(getView()); }

// renderCards : 영화 배열 ⇒ 보드에 카드 생성(반환값 없음)
const renderCards = (list) => {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        card.setAttribute("data-type", m.type);
        card.setAttribute("data-title", m.title);
        if (m.rating >= 8) {
            card.classList.add("hot");
        }
        let posterimg;
        if (m.poster === null) {
            card.classList.add("no-poster");
            posterimg = `<div class="poster-fallback">${m.title[0]}</div>`;
        }else{
            posterimg = `<img class="poster" src="${posterUrl(m.poster, "w342")}" alt="${m.title} 포스터">`;
        }

        card.innerHTML = ` 
      ${posterimg}
      ${m.type === "boxoffice" ? `<span class="rank">${m.rank}</span>` : ""}
      <span class="badge">${m.rating}</span> 
      <div class="info"> 
        <h3>${m.title}</h3> 
        <p class="year">${m.year}</p>
        <button class="like" type="button">♥</button>
      </div>`;
        board.appendChild(card);
        if(liked.includes(m.title)){
            card.querySelector(".like").className = "like liked";
        }else{
            card.querySelector(".like").className = "like";
        }
    }

    document.querySelector("#count").textContent = "총 " + list.length + "편";
    document.getElementById("likeCount").textContent = liked.length;

    if (list.length === 0) {
        board.classList.add("is-empty");
    }else{
        board.classList.remove("is-empty");
    }
    
};

// 찜한 제목 배열을 브라우저에 저장하고 불러오기(교재에 없는 문법: localStorage, JSON)
function saveLiked() {
    localStorage.setItem("liked", JSON.stringify(liked));
}

document.querySelector(".board").addEventListener("click", (e)=>{
    const card = e.target.closest(".card");
    if(!card){
        return;
    }

    const title = card.getAttribute("data-title")

    // 찜 버튼 클릭
    if(e.target.closest(".like")){
        const i = liked.indexOf(title);
        if (i === -1) {
            liked.push(title); // liked라는 로컬 스토리지에 해당 영화 제목 추가 => 즉 찜을 한거임
        }else{
            liked.splice(i, 1); // liked라는 로컬 스토리지에서 해당 영화 제거 => 즉 찜을 해제한거임
        }
        saveLiked();
        refresh();
        return;
    }
    openDetail(title)
})
document.querySelector("#q").addEventListener("input", refresh); // id = #q 요소에 input 이벤트가 발생하면 refresh 함수 실행
document.querySelector("#sort").addEventListener("change", refresh); // id = #sort 요소에 change 이벤트가 발생하면 refresh 함수 실행
document.querySelector("#typeFilter").addEventListener("change", refresh); // 이하동문
document.getElementById("closeDetail").addEventListener("click", () => {
    dialog.close();
});

refresh();