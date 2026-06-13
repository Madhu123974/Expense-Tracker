let balance =
    parseFloat(localStorage.getItem("balance")) || 0;

let income =
    parseFloat(localStorage.getItem("income")) || 0;

let expense =
    parseFloat(localStorage.getItem("expense")) || 0;

let transactions =
    JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI() {

    document.getElementById("balance").innerText =
        "₹" + balance.toFixed(2);

    document.getElementById("income").innerText =
        "₹" + income.toFixed(2);

    document.getElementById("expense").innerText =
        "₹" + expense.toFixed(2);

    const list =
        document.getElementById("transactionList");

    list.innerHTML = "";

    transactions.forEach((t, index) => {

        const li = document.createElement("li");

        li.className = t.type;

        li.innerHTML = `
<div>
<strong>${t.description}</strong>
<br>
₹${t.amount}
</div>

<button
class="delete-btn"
onclick="deleteTransaction(${index})">
Delete
</button>
`;

        list.appendChild(li);

    });

    saveData();

}

document
    .getElementById("setBalanceBtn")
    .addEventListener("click", () => {

        let amount =
            prompt("Enter Initial Balance");

        if (amount && !isNaN(amount)) {

            balance = parseFloat(amount);

            saveData();

            updateUI();

        }

    });

function addTransaction() {

    let description =
        document.getElementById("description").value;

    let amount =
        parseFloat(
            document.getElementById("amount").value
        );

    let type =
        document.getElementById("type").value;

    if (description === "" || isNaN(amount)) {

        alert("Fill all fields");

        return;

    }

    if (type === "income") {

        income += amount;

        balance += amount;

    } else {

        expense += amount;

        balance -= amount;

    }

    transactions.unshift({

        description,
        amount,
        type,
        date: new Date().toLocaleString()

    });

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    updateUI();

}

function deleteTransaction(index) {

    let transaction =
        transactions[index];

    if (transaction.type === "income") {

        income -= transaction.amount;
        balance -= transaction.amount;

    } else {

        expense -= transaction.amount;
        balance += transaction.amount;

    }

    transactions.splice(index, 1);

    updateUI();

}

function saveData() {

    localStorage.setItem(
        "balance",
        balance
    );

    localStorage.setItem(
        "income",
        income
    );

    localStorage.setItem(
        "expense",
        expense
    );

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

}

updateUI();