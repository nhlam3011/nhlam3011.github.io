function toggleMethodContainer() {
    var method = document.getElementById("method").value;
    var chiaDoiContainer = document.getElementById("chiaDoiContainer");
    var gaussContainer = document.getElementById("gaussContainer");

    if (method === "chia-doi") {
        chiaDoiContainer.style.display = "block";
        gaussContainer.style.display = "none";
    } else if (method === "gauss") {
        chiaDoiContainer.style.display = "none";
        gaussContainer.style.display = "block";
    }
}

function addHeSoInput() {
    var bac = parseInt(document.getElementById("bac").value);
    var heSoContainer = document.getElementById("heSoContainer");
    heSoContainer.innerHTML = "";

    for (var i = 0; i <= bac; i++) {
        var label = document.createElement("label");
        label.innerHTML = "Hệ số x" + i + ": ";
        var input = document.createElement("input");
        input.type = "number";
        input.id = "x" + i;
        heSoContainer.appendChild(label);
        heSoContainer.appendChild(input);
    }
}

function addMatrixInputs() {
    var size = parseInt(document.getElementById("size").value);
    var matrixContainer = document.getElementById("matrixContainer");
    matrixContainer.innerHTML = "";

    for (var i = 0; i < size; i++) {
        var row = document.createElement("div");

        for (var j = 0; j < size + 1; j++) {
            var input = document.createElement("input");
            input.type = "number";
            input.placeholder = "A[" + (i + 1) + "][" + (j + 1) + "]";
            input.id = "matrix" + i + "-" + j;
            row.appendChild(input);
        }

        matrixContainer.appendChild(row);
    }
}

function solveChiaDoi() {
    var bac = parseInt(document.getElementById("bac").value);
    var heSo = [];

    for (var i = 0; i <= bac; i++) {
        heSo[i] = parseFloat(document.getElementById("x" + i).value);
    }

    var a = parseFloat(document.getElementById("a").value);
    var b = parseFloat(document.getElementById("b").value);
    var epsilon = parseFloat(document.getElementById("epsilon").value);

    var fA = calculateFunctionValue(a, heSo);
    var fB = calculateFunctionValue(b, heSo);

    if (fA * fB >= 0) {
        displaySolution("Không có nghiệm");
        return;
    }

    var x;

    while (Math.abs(b - a) > epsilon) {
        x = (a + b) / 2;
        var fX = calculateFunctionValue(x, heSo);

        if (fX === 0) {
            break;
        } else if (fX * fA < 0) {
            b = x;
        } else {
            a = x;
            fA = fX;
        }
    }

    displaySolution(x.toFixed(5));
}

function calculateFunctionValue(x, coefficients) {
    var result = 0;

    for (var i = 0; i < coefficients.length; i++) {
        result += coefficients[i] * Math.pow(x, i);
    }

    return result;
}

function solveGauss() {
    var size = parseInt(document.getElementById("size").value);
    var matrix = [];

    for (var i = 0; i < size; i++) {
        matrix[i] = [];
        for (var j = 0; j <= size; j++) {
            var inputId = "matrix" + i + "-" + j;
            matrix[i][j] = parseFloat(document.getElementById(inputId).value);
        }
    }

    for (var i = 0; i < size; i++) {
        var maxRow = i;
        for (var j = i + 1; j < size; j++) {
            if (Math.abs(matrix[j][i]) > Math.abs(matrix[maxRow][i])) {
                maxRow = j;
            }
        }

        for (var k = i; k <= size; k++) {
            var temp = matrix[maxRow][k];
            matrix[maxRow][k] = matrix[i][k];
            matrix[i][k] = temp;
        }

        for (var j = i + 1; j < size; j++) {
            var factor = matrix[j][i] / matrix[i][i];
            for (var k = i; k <= size; k++) {
                matrix[j][k] -= factor * matrix[i][k];
            }
        }
    }

    var solution = [];
    for (var i = size - 1; i >= 0; i--) {
        solution[i] = matrix[i][size];
        for (var j = i + 1; j < size; j++) {
            solution[i] -= matrix[i][j] * solution[j];
        }
        solution[i] /= matrix[i][i];
    }

    displaySolution(solution);
}

function displaySolution(solution) {
    var solutionContainer = document.getElementById("solution");

    if (typeof solution === "string") {
        solutionContainer.innerHTML = "<p>" + "Nghiệm x= " + solution + "</p>";
    } else {
        var table = document.createElement("table");
        var tableHeader = document.createElement("tr");
        var variableHeader = document.createElement("th");
        variableHeader.textContent = "Biến";
        var valueHeader = document.createElement("th");
        valueHeader.textContent = "Giá trị";
        tableHeader.appendChild(variableHeader);
        tableHeader.appendChild(valueHeader);
        table.appendChild(tableHeader);

        for (var i = 0; i < solution.length; i++) {
            var row = document.createElement("tr");
            var variableCell = document.createElement("td");
            variableCell.textContent = "x" + i;
            var valueCell = document.createElement("td");
            valueCell.textContent = solution[i].toFixed(5);
            row.appendChild(variableCell);
            row.appendChild(valueCell);
            table.appendChild(row);
        }

        solutionContainer.innerHTML = "";
        solutionContainer.appendChild(table);
    }
}

function clearSolution() {
    var solutionContainer = document.getElementById("solution");
    solutionContainer.innerHTML = "";
}
