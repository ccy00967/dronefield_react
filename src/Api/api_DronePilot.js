//lsy
import { server } from "../page/url";


//Matching

//sgis 단계별 주소조회 api 토큰 받아오기
export const fetchToken = async () => {
    try {
        const response = await fetch(
            "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json?consumer_key=fb0450ed86ba405ba3ec&consumer_secret=a7ec04e5c1f8401594d5"
        );
        if (response.status === 200) {
            const data = await response.json();
            return data.result.accessToken; // 받아온 토큰 값
        } else {
            throw new Error("Failed to fetch token");
        }
    } catch (error) {
        console.error("Error fetching token:", error);
        return null;
    }
};



//토스api를 사용하는데 필요한 유저정보 가져오기
export const fetchUserInfo = async () => {
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const uuid = User_Credential?.uuid
    const accessToken = User_Credential?.access_token;
    const res = await fetch(server + `/user/userinfo/${uuid}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${accessToken}`
        },
        credentials: 'include',
    })
    const data = await res.json();

    return data;
};


  //드론방제사 거래 수락
 export const putfarmrequest = async (checkedList) => {
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = User_Credential?.access_token;
    console.log(checkedList)
    const res = await fetch(server + `/exterminator/accept/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ orderidlist: checkedList }),
    })
      .then((res) => res.json())
      .then((data) => data)

    console.log(res)

  }



//sgis 단계별 주소조회 api를 이용한 cd값으로 지역정보 불러오기
export const fetchAddressData = async (code, setData, token) => {
    try {
        const _code = code ? `&cd=${code}` : "";
        const apiUrl = `https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json?accessToken=${token}${_code}`;
        const response = await fetch(apiUrl);
        if (response.status === 200) {
            const data = await response.json();
            const result = data.result.map((item) => addressDepthServerModel(item));
            setData(result);
        } else {
            setData([]);
        }
    } catch (error) {
        setData([]);
    }
};



const addressDepthServerModel = (json) => {
    return {
        code: json.cd,
        name: json.addr_name,
    };
};





//Workstatus

//시작 버튼 API
export const workStart_API = async (orderid) => {
    if (window.confirm("시작하시겠습니까?")) {
        alert("시작.");
        const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
        const accessToken = User_Credential?.access_token;
        const res = await fetch(server + `/exterminator/exterminatestate/${orderid}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ exterminateState: 2 }),
        })
        window.location.reload();
    } else { alert("취소"); }

};


//완료 버튼 API
export const workFin_API = async (orderid) => {
    if (window.confirm("작업이 끝났습니까?")) {
        alert("작업완료");
        const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
        const accessToken = User_Credential?.access_token;
        const res = await fetch(server + `/exterminator/exterminatestate/${orderid}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ exterminateState: 3 }),
        })
        window.location.reload();

    } else { alert("취소"); }

};

//행정구역 cd에 따라 거래 리스트 받기
export const getfarmrequest = async (cdInfo) => {
    let length = 0;
    const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = User_Credential?.access_token;

    const cdInfoURL = cdInfo == "" ? "" : cdInfo + "/"

    const res = await fetch(server + "/exterminator/getrequests/" + cdInfoURL, {


        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            'authorization': `Bearer ${accessToken}`,
        },
    })
    // .then((res) => res.json())
    // .then((data) => {
    //   length = data.length;
    //   //console.log(length);
    //   setDataList(data)
    //   console.log(data)
    //   //return data
    // });
    const data = await res.json();
    return data;
}





//취소 버튼 API  => 작업 중에서 작업 준비중으로
export const cancel1_API = async (orderid) => {
    if (window.confirm("취소하시겠습니까?")) {
        alert("취소");
        const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
        const accessToken = User_Credential?.access_token;
        const res = await fetch(server + `/exterminator/exterminatestate/${orderid}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ exterminateState: 1 }),
        })
        window.location.reload();

    } else { alert("취소"); }

};

//취소버튼 APT2 => 완료에서 작업 중으로
export const cancel2_API = async (orderid) => {
    if (window.confirm("취소하시겠습니까?")) {
        alert("취소");
        const User_Credential = JSON.parse(localStorage.getItem('User_Credential'));
        const accessToken = User_Credential?.access_token;
        const res = await fetch(server + `/exterminator/exterminatestate/${orderid}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ exterminateState: 2 }),
        })
        window.location.reload();

    } else { alert("취소"); }

};


//Workstatus 여기까지




//Adjustment
//정산페이지 정산리스트 받기
export const getWorkStatus = async () => {
    let length = 0;
    const userInfo = JSON.parse(localStorage.getItem('User_Credential'));
    const accessToken = userInfo.access_token;

    const res = await fetch(server + "/exterminator/workinglist/3/", {

        method: 'GET',
        headers: {
            'Content-Type': "application/json",
            Authorization: `Bearer ${accessToken}`,
        },
    })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     length = data.length;
    //     //console.log(length);
    //     console.log(data)
    // });
    const data = await res.json();
    return data
}



