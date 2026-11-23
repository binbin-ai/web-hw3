// PartB 배열
const movies = [
    {
        title: "너의 이름은", year: 2016, date: "2016-07-01",
        rating: 8.4, audience: 0, poster: "/2DJCufz3Oa703PbLjNX1pM6MCG2.jpg",
        overview: "산골 마을의 생활을 답답해하는 소녀 미츠하는 어느 날 잠에서 깨어나 도쿄의 남학생 타키가 되어 있는 자신을 발견한다.",
        type: "mine", rank: null
    },
    {
        title: "어벤져스: 엔드게임", year: 2019, date: "2019-04-24",
        rating: 8.2, audience: 0, poster: "/z7ilT5rNN9kDo8JZmgyhM6ej2xv.jpg",
        overview: "어벤져스의 패배 이후 지구는 초토화됐고 남은 절반의 사람들은 정신적 고통을 호소하며 하루하루를 근근이 버텨나간다.",
        type: "mine", rank: null
    },
    {
        title: "인터스텔라", year: 2014, date: "2014-11-04",
        rating: 8.4, audience: 0, poster: "/gDN2NWtHbs8ZWEBQM8Dh5OVXdb4.jpg",
        overview: "세계 각국의 정부와 경제가 완전히 붕괴된 미래가 다가온다. 지난 20세기에 범한 잘못이 전 세계적인 식량 부족을 불러왔고, NASA도 해체되었다.",
        type: "mine", rank: null
    },
    {
        title: "매트릭스", year: 1999, date: "1999-03-31",
        rating: 8.2, audience: 0, poster: "/fxBxoXFAYKWde6lKzXxSusn18Av.jpg",
        overview: "인간의 기억마저 AI에 의해 입력되고 삭제되는 세상, 진짜보다 더 진짜 같은 가상 현실 매트릭스. 그 속에서 진정한 현실을 인식할 수 없게 재배되는 인간들.",
        type: "mine", rank: null
    },
    {
        title: "파파로티", year: 2013, date: "2013-03-14",
        rating: 7, audience: 0, poster: "/AJ3Lzeh6EvdJcf3dHxi7b0x0OY.jpg",
        overview: "한때 성악가로 무대에 섰지만 지금은 지방 예술고등학교에서 무심하게 학생들을 가르치는 상진에게 뜻밖의 과제가 주어진다.",
        type: "mine", rank: null
    },
    // 여기서부터 박스오피스
    {
        title: "극장판 치이카와: 인어 섬의 비밀", year: 2026, date: "2026-09-30",
        rating: 7.4, audience: 2248126, poster: "/5TMyytCI5Pfc9c1eNsljiCdiB05.jpg",
        overview: "어느 날, 광장에서 쉬고 있던 치이카와와 가르마 앞에 얼굴에 전단지를 붙인 토끼가 나타난다. 그곳엔 “특별한 섬으로의 초대”라는 글귀가 적혀 있는데...",
        type: "boxoffice", rank: 1
    },
    {
        title: "암살자(들)", year: 2026, date: "2026-09-23",
        rating: 7.2, audience: 3374510, poster: "/c55ijsOdntj6P25vDwHLdgsBpmV.jpg",
        overview: "1974년 8월 15일, 제29회 광복절 경축식. 전 국민이 지켜보는 생중계 현장에서 영부인이 저격당하는 초유의 사태가 발생한다.",
        type: "boxoffice", rank: 2
    },
    {
        title: "실낙원", year: 2026, date: "2026-10-21",
        rating: 8, audience: 104874, poster: "/wkm9BQLok7U2KihcCspCa663Qse.jpg",
        overview: "9년 전 캠핑스쿨 버스 실종 사건으로 아들을 잃은 류소영은 '낙원의 아이들'이라는 AI 프로그램을 통해 어린 시절의 아들과 만나며 하루하루를 버텨낸다.",
        type: "boxoffice", rank: 3
    },
    {
        title: "타짜: 벨제붑의 노래", year: 2026, date: "2026-09-23",
        rating: 7, audience: 1999477, poster: "/ueigb5zra1tj6FTK9yhh2P33P9B.jpg",
        overview: "타고난 끗발로 사람의 마음을 사로잡는 장태영과 천부적인 머리와 노력으로 스스로를 증명하는 박태영.",
        type: "boxoffice", rank: 4
    },
    {
        title: "클레이페이스", year: 2026, date: "2026-10-21",
        rating: 7.6, audience: 77153, poster: "/LSGpoSAlitss0KOvVakkeUToZo.jpg",
        overview: "할리우드의 주연 배우로 유명 영화제 수상을 눈 앞에 두며 꿈을 이루기 직전인 ‘맷 헤이건’.",
        type: "boxoffice", rank: 5
    }
];

