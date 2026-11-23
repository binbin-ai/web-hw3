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

// 조건에 맞는 렌더링을 위한 배열을 반환하는 함수
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

// 영화별 이미지 URL 생성 함수
const posterUrl = (path, size) => {
    return `https://image.tmdb.org/t/p/${size}/${path}`;
};

// 상세열때
// dialog.showModal();
// dialog.close();

function refresh() { renderCards(getView()); }

// renderCards : 영화 배열 ⇒ 보드에 카드 생성(반환값 없음)
const renderCards = (list) => {
    const board = document.querySelector(".board");
    board.innerHTML = "";
    for (const m of list) {
        const card = document.createElement("article");
        card.className = "card";
        card.dataset.id = m.id;
        card.setAttribute("data-type", m.type);
        card.setAttribute("data-title", m.title);
        card.onclick = function () { alert(m.overview); };
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
    // document.querySelector("#count").textContent = list.length + "편";
    // updateLikeCount();
    // if (list.length === 0) {
    //     board.classList.add("is-empty");
    // }else{
    //     board.classList.remove("is-empty");
    // }
    // document.getElementById("likeCount").textContent = liked.length;
};

// 찜한 제목 배열을 브라우저에 저장하고 불러오기(교재에 없는 문법: localStorage, JSON)
function saveLiked() {
    localStorage.setItem("liked", JSON.stringify(liked));
}

// 찜 기능
// function (e)를 쓰면 this가 보드이고, e.target은 하트 버튼인데 반해
// 화살표 함수인 (e) => {}로 쓰면 this가 window이고, e.target은 하트 버튼
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
            liked.push(title);
        }else{
            liked.splice(i, 1);
        }
        saveLiked();
        refresh();
    }
})

// 다크 모드 기능
// document.getElementById("themeToggle").addEventListener("click", () => {
//     document.body.classList.toggle("dark");
// });

// function updateLikeCount() {
//     document.getElementById("likeCount").textContent = document.querySelectorAll(".liked").length;
// }

document.querySelector("#q").addEventListener("input", refresh); // id = #q 요소에 input 이벤트가 발생하면 refresh 함수 실행
document.querySelector("#sort").addEventListener("change", refresh); // id = #sort 요소에 change 이벤트가 발생하면 refresh 함수 실행
document.querySelector("#typeFilter").addEventListener("change", refresh); // 이하동문
refresh();