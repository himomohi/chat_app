
const eventSource = new EventSource("http://localhost:8080/sender/ssar/receiver/cos");


eventSource.onmessage = (e) => {
    console.log(1, e);
    const data = JSON.parse(e.data);
    console.log(2, e);
    initMessage(data);


}


function getSendMsgBox(msg, time) {
    return '<div class="sent_msg"> <p>' + msg + '</p> <span class="time_date">' + time + ' </span> </div> ';
}



//메세지 박스 초기화
function initMessage(data) {
    //alert("클릭됨")

    let chatBox = document.querySelector("#chat-box");

    //input id를 찾아서 msgInput에 대입
    let msgInput = document.querySelector("#chat-outgoing-msg");

    // alert(msgInput.value);


    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg"; //채팅 css Class 추가
    chatOutgoingBox.innerHTML = getSendMsgBox(data.msg, data.createdAt);
    console.log(data.createAt);
    chatBox.append(chatOutgoingBox);
    msgInput.value = "";


}
//메세지 박스
async function addMessage() {
    //alert("클릭됨")

    let chatBox = document.querySelector("#chat-box");

    //input id를 찾아서 msgInput에 대입
    let msgInput = document.querySelector("#chat-outgoing-msg");

    // alert(msgInput.value);

    //시간추가
    let date = new Date();
    let now = date.getHours() + ":" + date.getMinutes() + "|" + date.getMonth() + "/" + date.getDate();

    let chat = {
        sender: "ssar",
        receiver: "cos",
        msg: msgInput.value
    };

    let response = await fetch("http://localhost:8080/chat",
        {
            method: "post",
            body: JSON.stringify(chat), //chat 을 JSON 으로 변경
            headers: {
                "Content-Type": "application/json;charset=utf-8"
            }

        });

    let parseResponse = await response.json(); //전달받은 값을 json 으로 변경

    console.log(parseResponse);




    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg"; //채팅 css Class 추가

    //chatOutgoingBox 에  msginput 의 값 과 , now() 를 넘겨줌
    chatOutgoingBox.innerHTML = getSendMsgBox(msgInput.value, now);
    chatBox.append(chatOutgoingBox);
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