
function getMsg() {
    return '<div class="sent_msg"> <p> 안녕</p> <span class="time_date"> 11:18 | Today</span> </div> ';
}




//보내기 버튼 클릭시 이벤트 발생

document.querySelector("#chat-send").addEventListener("click", () => {
    //alert("클릭됨")

    let chatBox = document.querySelector("#chat-box");
    let chatOutgoingBox = document.createElement("div");
    chatOutgoingBox.className = "outgoing_msg"; //채팅 css Class 추가
    chatOutgoingBox.innerHTML = getMsg();
    chatBox.append(chatOutgoingBox);

})



document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {

    //키보드 엔터 누를시 키코드13(엔터) 와 동일하다면 이벤트발생
    if (e.keyCode === 13) {
        alert("엔터요청됨")
    }

})