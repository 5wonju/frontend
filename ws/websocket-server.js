const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

server.on("connection", function (socket, request) {
    // URL에서 토큰 추출 (예: ws://localhost:8080?token=abc123)
    const params = new URLSearchParams(request.url.substring(request.url.indexOf("?")));
    console.log(params);
    const token = params.get("Authorization");
    console.log("토큰:", token);
    // 간단한 토큰 검증 로직

    // if (token !== "expected_token") {
    //     console.log("토큰 검증 실패.");
    //     socket.close();
    //     return;
    // }

    console.log("클라이언트 연결됨, 토큰 검증 성공.");

    socket.on("message", function (message) {
        console.log("수신 메시지:", message, token);
        const data = JSON.parse(message);

        if (data.type === "move") {
            console.log(`캐릭터 이동: x=${data.x}, y=${data.y}`);
            // 이동 데이터를 모든 클라이언트에게 브로드캐스트
            server.clients.forEach((client) => {
                if (
                    // client !== socket &&
                    client.readyState === WebSocket.OPEN
                ) {
                    client.send(message);
                }
            });
        }
    });

    socket.on("close", function () {
        console.log("클라이언트 연결 종료.");
    });
});

console.log("웹소켓 서버 실행 중 (포트: 8080)");
