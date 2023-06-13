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