// =========================
// ELEMENTS
// =========================

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

const connectionStatus =
    document.getElementById("connectionStatus");


// =========================
// WEBSOCKET
// =========================

const SERVER_URL =
    "wss://chatsphere-server.ayushranjan1492008.workers.dev";

let socket = null;
let currentRoom = null;


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

    const code =
        generatedCode.textContent;

    try {

        await navigator.clipboard.writeText(code);

        copyCode.textContent = "Copied!";

        setTimeout(() => {
            copyCode.textContent = "Copy";
        }, 1500);

    } catch (error) {

        console.error(
            "Failed to copy room code:",
            error
        );

    }

});


// =========================
// ENTER ROOM
// =========================

enterRoom.addEventListener("click", () => {

    const code =
        generatedCode.textContent.trim();

    if (code === "") {

        alert("Please create a room first.");

        return;

    }

    openChat(code);

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

    openChat(code);

});


// =========================
// OPEN CHAT
// =========================

function openChat(roomCodeValue) {

    connectionScreen.style.display = "none";

    chatScreen.style.display = "flex";

    messageInput.focus();

    connectToServer(roomCodeValue);

}


// =========================
// BACK
// =========================

backButton.addEventListener("click", () => {

    chatScreen.style.display = "none";

    connectionScreen.style.display = "block";

    if (socket) {
        socket.close();
        socket = null;
    }

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


    // Make sure WebSocket is connected

    if (
        !socket ||
        socket.readyState !== WebSocket.OPEN
    ) {

        alert("Not connected to room.");

        return;

    }


    // Send message to Cloudflare Worker

    socket.send(JSON.stringify({

        type: "message",
        text: text

    }));


    // Show message on our own screen

    const message =
        document.createElement("div");

    message.className =
        "message sent";

    message.textContent =
        text;

    messages.appendChild(message);


    // Clear input

    messageInput.value = "";


    // Scroll down

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


// =========================
// CONNECT TO WEBSOCKET
// =========================

function connectToServer(roomCodeValue) {

    currentRoom =
        roomCodeValue;

    socket = new WebSocket(
        `${SERVER_URL}/room/${roomCodeValue}`
    );


    // =========================
    // CONNECTED
    // =========================

    socket.onopen = () => {

        console.log(
            "✅ Connected to ChatSphere server"
        );

        if (connectionStatus) {

            connectionStatus.textContent =
                "🟢 Connected";

        }

    };


    // =========================
    // MESSAGE FROM SERVER
    // =========================

    socket.onmessage = (event) => {

        const data =
            JSON.parse(event.data);

        console.log(
            "📩 Server:",
            data
        );


        // =========================
        // SERVER CONNECTION
        // =========================

        if (data.type === "connected") {

            console.log(
                "Room connected:",
                currentRoom
            );

        }


        // =========================
        // RECEIVED MESSAGE
        // =========================

        if (data.type === "message") {

            const message =
                document.createElement("div");

            message.className =
                "message received";

            message.textContent =
                data.text;

            messages.appendChild(message);

            messages.scrollTop =
                messages.scrollHeight;

        }


        // =========================
        // PEER LEFT
        // =========================

        if (data.type === "peer-left") {

            console.log(
                "The other user left the room"
            );

        }

    };


    // =========================
    // ERROR
    // =========================

    socket.onerror = (error) => {

        console.error(
            "❌ WebSocket error:",
            error
        );

    };


    // =========================
    // CLOSED
    // =========================

    socket.onclose = () => {

        console.log(
            "🔴 Server connection closed"
        );

        if (connectionStatus) {

            connectionStatus.textContent =
                "🔴 Disconnected";

        }

    };

}