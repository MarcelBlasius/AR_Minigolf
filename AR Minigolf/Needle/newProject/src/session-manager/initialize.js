import { DB_BASE_URL } from '../constants';

const url = `${DB_BASE_URL}/session`;
const addButton = document.getElementById('add-button');

const player = prompt("Please enter your name:", "");
const playerEl = document.getElementById('player');
playerEl.innerHTML = `Hello ${player}!`

initialize();

function initialize() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let responseData = JSON.parse(xhr.responseText);
            console.log('received sessions', responseData);
            for (const session of responseData) {
                createSessionEntry(session.name, session)
            }
        }
    };
    xhr.send();
}

addButton.addEventListener("click", async () => {
    console.log('Add button clicked');
    const name = prompt("Please enter the room name:", "");

    const postData = {
        id: null,
        name,
        players: [],
    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            const session = JSON.parse(xhr.responseText);
            console.log('Created session', session);
            createSessionEntry(name, session);
        }
    };
    const postDataJSON = JSON.stringify(postData);
    xhr.send(postDataJSON);
});

function createSessionEntry(name, session) {
    const div = document.createElement('div');
    div.className = 'session-entry'

    const nameEl = document.createElement('span');
    nameEl.classList = 'name';
    nameEl.innerHTML = name;

    div.appendChild(nameEl);

    const playButton = createPlayButton(player, session);
    div.appendChild(playButton);

    const spectatorButton = createSpectatorButton(session);
    div.appendChild(spectatorButton);

    const deleteButton = createDeleteButton();
    div.appendChild(deleteButton);

    const container = document.getElementById('sessions-container')
    console.log('SESSION', session);
    container.sessionId = session.id;
    container.appendChild(div);
}

function createPlayButton(player, sessionInfo) {
    const button = document.createElement('button');
    button.className = 'icon-button play-button';

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("fill", "#000000");
    svg.setAttribute("width", "800px");
    svg.setAttribute("height", "800px");
    svg.setAttribute("viewBox", "0 0 1024 1024");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("class", "icon");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z");
    path.setAttribute("fill", "");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M719.4 499.1l-296.1-215A15.9 15.9 0 0 0 398 297v430c0 13.1 14.8 20.5 25.3 12.9l296.1-215a15.9 15.9 0 0 0 0-25.8zm-257.6 134V390.9L628.5 512 461.8 633.1z");
    path2.setAttribute("fill", "");

    svg.appendChild(path);
    svg.appendChild(path2);

    button.appendChild(svg);

    button.addEventListener("click", async () => {

        const session = await getSession(sessionInfo.id);
        // player is existing
        if (session.players.includes(player)) {
            const index = session.players.indexOf(player);
            const ball = getBallColor(index + 1);
            window.location.href = `/minigolf.html?sessionId=${session.id}&playerId=${player}&ball=${ball}`;
            return;
        }

        // new player
        const players = [...new Set([...session.players, player])];
        const putData = {
            id: session.id,
            name: session.name,
            players,
        };

        await postBallPosition(session.id, player);

        const ball = getBallColor(putData.players.length);

        console.log('Put data', putData);
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const putData = JSON.parse(xhr.responseText);
                console.log('Updated session', putData);
                console.log(`play button clicked for session ${session.id}`);
                window.location.href = `/minigolf.html?sessionId=${session.id}&playerId=${player}&ball=${ball}`;
            }
        };

        const putDataJSON = JSON.stringify(putData);
        xhr.send(putDataJSON);

    });

    return button;
}

async function getSession(id) {
    try {
        const response = await fetch(url);
        const responseData = await response.json();
        console.log('received sessions', responseData);
        for (const session of responseData) {
            if (session.id === id) {
                return session;
            }
        }
    } catch (error) {
        console.error('Error fetching sessions:', error);
    }
}

async function postBallPosition(sessionId, player) {
    const url = `${DB_BASE_URL}/positions`;
    const ballPosition = {
        id: null,
        sessionId: sessionId,
        player,
        x: 0,
        y: 0,
        z: 0
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ballPosition)
        });

        if (response.ok) {
            console.log('Ball position posted successfully');
        } else {
            console.error('Failed to post ball position');
        }
    } catch (error) {
        console.error('Error posting ball position:', error);
    }
}

function getBallColor(playerCount) {
    const colors = ['red', 'blue', 'green', 'purple'];

    if (playerCount > 4) {
        return 'spectator';
    }

    return colors[playerCount - 1];
}

function createSpectatorButton(session) {
    const button = document.createElement('button');
    button.className = 'icon-button spectator-button';

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "800px");
    svg.setAttribute("height", "800px");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("fill-rule", "evenodd");
    path1.setAttribute("clip-rule", "evenodd");
    path1.setAttribute("d", "M11.9944 15.5C13.9274 15.5 15.4944 13.933 15.4944 12C15.4944 10.067 13.9274 8.5 11.9944 8.5C10.0614 8.5 8.49439 10.067 8.49439 12C8.49439 13.933 10.0614 15.5 11.9944 15.5ZM11.9944 13.4944C11.1691 13.4944 10.5 12.8253 10.5 12C10.5 11.1747 11.1691 10.5056 11.9944 10.5056C12.8197 10.5056 13.4888 11.1747 13.4888 12C13.4888 12.8253 12.8197 13.4944 11.9944 13.4944Z");
    path1.setAttribute("fill", "#0F0F0F");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("fill-rule", "evenodd");
    path2.setAttribute("clip-rule", "evenodd");
    path2.setAttribute("d", "M12 5C7.18879 5 3.9167 7.60905 2.1893 9.47978C0.857392 10.9222 0.857393 13.0778 2.1893 14.5202C3.9167 16.391 7.18879 19 12 19C16.8112 19 20.0833 16.391 21.8107 14.5202C23.1426 13.0778 23.1426 10.9222 21.8107 9.47978C20.0833 7.60905 16.8112 5 12 5ZM3.65868 10.8366C5.18832 9.18002 7.9669 7 12 7C16.0331 7 18.8117 9.18002 20.3413 10.8366C20.9657 11.5128 20.9657 12.4872 20.3413 13.1634C18.8117 14.82 16.0331 17 12 17C7.9669 17 5.18832 14.82 3.65868 13.1634C3.03426 12.4872 3.03426 11.5128 3.65868 10.8366Z");
    path2.setAttribute("fill", "#0F0F0F");

    svg.appendChild(path1);
    svg.appendChild(path2);

    button.appendChild(svg);

    button.addEventListener("click", async () => {
        console.log('spectatorbutton button clicked for session', session);
        window.location.href = `/minigolf.html?sessionId=${session.id}&playerId=${player}&ball=spectator`;
    });

    return button;
}

function createDeleteButton() {
    const button = document.createElement('button');
    button.className = 'icon-button delete-button';

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    svg.setAttribute("width", "800px");
    svg.setAttribute("height", "800px");
    svg.setAttribute("viewBox", "0 0 1024 1024");
    svg.setAttribute("fill", "#000000");
    svg.setAttribute("class", "icon");
    svg.setAttribute("version", "1.1");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M512 897.6c-108 0-209.6-42.4-285.6-118.4-76-76-118.4-177.6-118.4-285.6 0-108 42.4-209.6 118.4-285.6 76-76 177.6-118.4 285.6-118.4 108 0 209.6 42.4 285.6 118.4 157.6 157.6 157.6 413.6 0 571.2-76 76-177.6 118.4-285.6 118.4z m0-760c-95.2 0-184.8 36.8-252 104-67.2 67.2-104 156.8-104 252s36.8 184.8 104 252c67.2 67.2 156.8 104 252 104 95.2 0 184.8-36.8 252-104 139.2-139.2 139.2-364.8 0-504-67.2-67.2-156.8-104-252-104z");
    path.setAttribute("fill", "");

    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M707.872 329.392L348.096 689.16l-31.68-31.68 359.776-359.768z");
    path1.setAttribute("fill", "");

    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M328 340.8l32-31.2 348 348-32 32z");
    path2.setAttribute("fill", "");

    svg.appendChild(path);
    svg.appendChild(path1);
    svg.appendChild(path2);

    button.appendChild(svg);

    button.addEventListener("click", async () => {
        const sessionId = button.parentElement.parentElement.sessionId;
        console.log('delete button clicked for session', sessionId);

        fetch(`${url}/${sessionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    button.parentElement.remove();
                }
            })
            .catch(error => {
                console.error('Error deleting session:', error);
            });
    });

    return button;
}