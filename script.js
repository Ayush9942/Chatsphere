const connectionScreen =
    document.getElementById("connectionScreen");

const chatScreen =
    document.getElementById("chatScreen");

const createRoom =
    document.getElementById("createRoom");

const joinRoom =
    document.getElementById("joinRoom");

const enterRoom =
    document.getElementById("enterRoom");

const backButton =
    document.getElementById("backButton");

const roomCode =
    document.getElementById("roomCode");

const roomContainer =
    document.getElementById("roomContainer");

const generatedCode =
    document.getElementById("generatedCode");

const copyCode =
    document.getElementById("copyCode");

const messageInput =
    document.getElementById("messageInput");

const sendMessage =
    document.getElementById("sendMessage");

const messages =
    document.getElementById("messages");


// =========================
// CREATE ROOM
// =========================

createRoom.addEventListener("click", () => {

    const code = Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    generatedCode.textContent = code;

    roomContainer.style.display = "block";
});


// =========================
// COPY CODE
// =========================

copyCode.addEventListener("click", async () => {

    const code = generatedCode.textContent;

    await navigator.clipboard.writeText(code);

    copyCode.textContent = "Copied!";

    setTimeout(() => {

        copyCode.textContent = "Copy";

    }, 1500);

});


// =========================
// ENTER CREATED ROOM
// =========================

enterRoom.addEventListener("click", () => {

    openChat();

});


// =========================
// JOIN ROOM
// =========================

joinRoom.addEventListener("click", () => {

    const code =
        roomCode.value.trim().toUpperCase();

    if (code === "") {

        alert("Please enter a room code.");

        return;
    }

    openChat();

});


// =========================
// OPEN CHAT
// =========================

function openChat() {

    connectionScreen.style.display = "none";

    chatScreen.style.display = "flex";

    messageInput.focus();

}


// =========================
// BACK
// =========================

backButton.addEventListener("click", () => {

    chatScreen.style.display = "none";

    connectionScreen.style.display = "block";

});


// =========================
// SEND MESSAGE
// =========================

function send() {

    const text =
        messageInput.value.trim();

    if (text === "") {
        return;
    }


    const message =
        document.createElement("div");

    message.className = "message sent";

    message.textContent = text;

    messages.appendChild(message);


    messageInput.value = "";

    messages.scrollTop =
        messages.scrollHeight;

    messageInput.focus();

}


// =========================
// SEND BUTTON
// =========================

sendMessage.addEventListener(
    "click",
    send
);


// =========================
// ENTER KEY
// =========================

messageInput.addEventListener(
    "keydown",
    (event) => {

        if (event.key === "Enter") {

            send();

        }

    }
);