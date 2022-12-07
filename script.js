let ticketData;
let data = JSON.parse(localStorage.getItem('ticketDataLocal'));
if (Array.isArray(data) && data.length > 0) {
    ticketData = data;
}
else {
    ticketData = [];
}

var x = document.getElementById("myDialog");

const TicketPanel = document.querySelector('.container-flex-row');

const TicketInput = document.getElementById('text');

const addBtn = document.getElementById('adder-btn');

const delBtn = document.querySelector(".delete-btn");

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function showDialog() {
    x.show();
}

function closeDialog() {
    x.close();
}

function addTicket() {
    const data = {
        id: `#` + makeid(6),
        text: TicketInput.value
        };
    ticketData.push(data);
    emptyTicketInputFields();
    closeDialog();
    displayTicketsOnPanel();
}

function displayTicketsOnPanel() {
    for (var i = 0; i < ticketData.length; i++) {
        const card = document.createElement('div');
        card.setAttribute("class", "card");
        card.setAttribute("onclick", `setDeleteTicket(${i})`);
        TicketPanel.appendChild(card);

        const cardTop = document.createElement('div');
        cardTop.setAttribute("class", "card-top");
        card.appendChild(cardTop);

        const cardDesc = document.createElement('div');
        cardDesc.setAttribute("class", "card-desc-new");
        card.appendChild(cardDesc);

        const cheading = document.createElement('h5');
        const ctext = document.createElement('p');

        cheading.innerText = ticketData[i].id;
        ctext.innerText = ticketData[i].text;
        
        cardDesc.appendChild(cheading);
        cardDesc.appendChild(ctext);

    }
    createTicketFile();
}
addBtn.addEventListener("click", () => {
    showDialog();
})

TicketInput.onkeyup = function(event) {
    event.preventDefault();
    console.log("Enter");
    if (event.keyCode === 13) {

        addTicket();
    }
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function setdeleteTicket(delIndex) {
    for (var i = 0; i < ticketData.length; i++) {
        if (i == delIndex) {
            for (var j = i; j < ticketData.length; j++)
                ticketData[j] = ticketData[j + 1];
        }
    }
    ticketData.pop();
    displayTicketsOnPanel();
}

function createTicketFile() {
    const ticketDataJSON = JSON.stringify(ticketData);
    localStorage.setItem("ticketDataLocal", ticketDataJSON);
}
function emptyTicketInputFields() {
    TicketInput.value = "";
}

displayTicketsOnPanel()