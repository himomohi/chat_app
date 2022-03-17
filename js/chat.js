//보내기 버튼 클릭시 이벤트 발생

document.querySelector("#chat-send").addEventListener("click", () => {
    alert("클릭됨")

})

document.querySelector("#chat-outgoing-msg").addEventListener("keydown", (e) => {
    console.log(e);

})