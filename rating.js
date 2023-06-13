// Function to save data to Local Storage
function saveDataToLocalStorage(fullName, task, rating) {
    // Check if Local Storage is supported
    if (typeof(Storage) !== "undefined") {
        // Get existing data from Local Storage or create an empty array
        let data = JSON.parse(localStorage.getItem("ratings")) || [];

        // Create a new rating object
        const newRating = {
            fullName: fullName,
            task: task,
            rating: rating
        };

        // Add the new rating object to the data array
        data.push(newRating);

        // Save the updated data array to Local Storage
        localStorage.setItem("ratings", JSON.stringify(data));
    } else {
        console.log("Local Storage is not supported");
    }
}

// Function to load data from Local Storage
function loadRatingsFromLocalStorage() {
    // Check if Local Storage is supported
    if (typeof(Storage) !== "undefined") {
        // Get the saved data from Local Storage
        const data = JSON.parse(localStorage.getItem("ratings"));

        // Check if there is any saved data
        if (data) {
            // Loop through the data and add rows to the rating table
            data.forEach(function(rating) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${rating.fullName}</td>
                    <td>${rating.task}</td>
                    <td>${rating.rating}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                `;

                // Add class to the rating column based on the selected rating
                const ratingColumn = newRow.querySelector('td:nth-child(3)');
                ratingColumn.classList.add(`rating-${rating.rating}`);

                ratingTableBody.appendChild(newRow);
            });
        }
    } else {
        console.log("Local Storage is not supported");
    }
}

// Call the loadRatingsFromLocalStorage function when the page loads
window.addEventListener('load', loadRatingsFromLocalStorage);

// Event listener for the rating form submission
ratingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('full_name').value;
    const task = document.getElementById('task').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${fullName}</td>
        <td>${task}</td>
        <td>${rating}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    // Add class to the rating column based on the selected rating
    const ratingColumn = newRow.querySelector('td:nth-child(3)');
    ratingColumn.classList.add(`rating-${rating}`);

    ratingTableBody.appendChild(newRow);
    ratingForm.reset();

    // Save the data to Local Storage
    saveDataToLocalStorage(fullName, task, rating);
});

const ratingForm = document.getElementById('ratingForm');
const ratingTableBody = document.getElementById('ratingTableBody');

ratingForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('full_name').value;
    const task = document.getElementById('task').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${fullName}</td>
        <td>${task}</td>
        <td>${rating}</td>
        <td>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    // Add class to the rating column based on the selected rating
    const ratingColumn = newRow.querySelector('td:nth-child(3)');
    ratingColumn.classList.add(`rating-${rating}`);

    ratingTableBody.appendChild(newRow);
    ratingForm.reset();
});

ratingTableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('edit-btn')) {
        const row = e.target.parentNode.parentNode;
        const cells = row.querySelectorAll('td');

        const fullName = cells[0].innerText;
        const task = cells[1].innerText;
        const rating = cells[2].innerText;

        document.getElementById('full_name').value = fullName;
        document.getElementById('task').value = task;

        const ratingRadios = document.querySelectorAll('input[name="rating"]');
        ratingRadios.forEach(radio => {
            radio.checked = false;
            if (radio.value === rating) {
                radio.checked = true;
            }
        });

        ratingForm.removeEventListener('submit', submitHandler);
        ratingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            cells[0].innerText = document.getElementById('full_name').value;
            cells[1].innerText = document.getElementById('task').value;
            cells[2].innerText = document.querySelector('input[name="rating"]:checked').value;

            ratingForm.reset();
            ratingForm.removeEventListener('submit', submitHandler);
            ratingForm.addEventListener('submit', submitHandler);
        });
    } else if (e.target.classList.contains('delete-btn')) {
        const row = e.target.parentNode.parentNode;
        row.remove();
    }
});
