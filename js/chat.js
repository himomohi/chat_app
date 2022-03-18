
//록인 시스템 대신 임시방편
let username = prompt("닉네임을 설정하세요");
let roomNum = prompt("방번호를 입력하세요");

document.querySelector("#username").innerHTML = username;
//SSE 연결하기
const eventSource = new EventSource('http://localhost:8080/chat/roomNum/' + roomNum);


eventSource.onmessage = (e) => {

    const data = JSON.parse(e.data);
    if (data.sender == username) { //로그인 한 유저가 보낸 메시지
        //파란박스 (오른쪽)
        initMyMessage(data);
    } else {
        //회색박스 (왼쪽)
        initYourMessage(data);
    }



}
function getSendMsgBox(data) {
    let md = data.createdAt.substring(5, 10);
    let tm = data.createdAt.substring(11, 16);
    converTime = tm + "|" + md;
    return '<div class="sent_msg"> <p>' + data.msg + '</p> <span class="time_date">' + converTime + "/<b>" + data.sender + ' </b></span> </div> ';
}

function getReceiveMsgBox(data) {
    let md = data.createdAt.substring(5, 10);
    let tm = data.createdAt.substring(11, 16);
    converTime = tm + "|" + md;
    return '<div class="received_withd_msg"> <p>' + data.msg + '</p> <span class="time_date">' + converTime + "/<b>" + data.sender + ' </b></span> </div> ';
}



//파란 메세지 박스 초기화
//addMessage() 함수 호출시 DB에 insert 되고 , 그 데이터가 자동으로 흘러들어온다. (SSE 방식)
function initMyMessage(data) {
    //alert("클릭됨")

    let chatBox = document.querySelector("#chat-box");



    // alert(msgInput.value);


    let sendBox = document.createElement("div");
    sendBox.className = "outgoing_msg"; //채팅 css Class 추가
    sendBox.innerHTML = getSendMsgBox(data);
    chatBox.append(sendBox);

    document.documentElement.scrollTop = document.body.scrollHeight;



}





//메세지 박스 초기화
//회색박스
//최초 초기화 될때 1번방 3건이 있으면 3건을 다가져온다
function initYourMessage(data) {
    //alert("클릭됨")

    let chatBox = document.querySelector("#chat-box");

    //input id를 찾아서 msgInput에 대입
    let msgInput = document.querySelector("#chat-outgoing-msg");

    // alert(msgInput.value);


    let receivedBox = document.createElement("div");
    receivedBox.className = "received_msg"; //채팅 css Class 추가
    receivedBox.innerHTML = getReceiveMsgBox(data);
    console.log(data.createAt);
    chatBox.append(receivedBox);
    document.documentElement.scrollTop = document.body.scrollHeight;




}
//메세지 박스
//AJAX 채팅 메시지 전송
async function addMessage() {
    //alert("클릭됨")


    //input id를 찾아서 msgInput에 대입
    let msgInput = document.querySelector("#chat-outgoing-msg");



    let chat = {
        sender: username,
        roomNum: roomNum,
        msg: msgInput.value
    };

    fetch("http://localhost:8080/chat",
        {
            method: "post",
            body: JSON.stringify(chat), //chat 을 JSON 으로 변경
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }

        });
    msgInput.value = "";

}




//보내기 버튼 클릭시 이벤트 발생

document.querySelector("#chat-send").addEventListener("click", () => {
    addMessage();

})



document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {

    //키보드 엔터 누를시 키코드13(엔터) 와 동일하다면 이벤트발생
    if (e.keyCode === 13) {
        addMessage();
    }

})