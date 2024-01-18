const url = "http://192.168.178.30:8080/session"
const addButton = document.getElementById('add-button');

const player = prompt("Please enter your name:", "");
const playerEl = document.getElementById('player');
playerEl.innerHTML = `Hello ${player}!`

initialize();

function initialize() {
    fetch(url)
        .then(response => {
            return response.json();
        }).then(data => {
            console.log('received data', data);
            for (const session of data) {
                createSessionEntry(session.name, session)
            }
        });
}

addButton.addEventListener("click", async () => {
    console.log('Add button clicked');
    const name = prompt("Please enter the room name:", "");

    const postData = {
        id: null,
        name,
        players: [],
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
    });
    const session = await response.json();
    console.log('Created session', session);
    createSessionEntry(name, session);
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

    const deleteButton = createDeleteButton();
    div.appendChild(deleteButton);

    const container = document.getElementById('sessions-container')
    console.log('SESSION', session);
    container.sessionId = session.id;
    container.appendChild(div);
}

function createPlayButton(player, session) {
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
        const putData = {
            id: session.id,
            name: session.name,
            players: [...new Set([...session.players, player])],
        };
        console.log('Put data', putData);
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(putData),
        });

        if (response.ok) {
            console.log('Updated session', putData);
            console.log('play button clicked for session', button.parentElement.parentElement.sessionId);
            window.location.href = `/index.html?sessionId=${button.parentElement.parentElement.sessionId}&playerId=${player}`;
        }

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
        const sessionId = button.parentElement.parentElement.sessionId
        console.log('delete button clicked for session', sessionId);
        const response = await fetch(`${url}/${sessionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            button.parentElement.remove();
        }
    });

    return button;
}