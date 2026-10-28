function calculate() {
    let a = document.getElementById("num1").value;
    let b = document.getElementById("num2").value;
    let op = document.getElementById("operator").value;

    if (a === "" || b === "") {
        document.getElementById("result").innerHTML =
            "Please enter both numbers";
        return;
    }

    a = Number(a);
    b = Number(b);

    let answer;

    switch (op) {
        case "+":
            answer = a + b;
            break;

        case "-":
            answer = a - b;
            break;

        case "*":
            answer = a * b;
            break;

        case "/":
            if (b === 0) {
                document.getElementById("result").innerHTML =
                    "Cannot divide by zero";
                return;
            }
            answer = a / b;
            break;
    }

    document.getElementById("result").innerHTML =
        "Result: " + answer;
}
