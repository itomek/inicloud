// In-memory storage for demo (replace with localStorage in your environment)
let checkboxState = {};

// DOM elements
const numBoxesInput = document.getElementById('numBoxes');
const checkboxContainer = document.getElementById('checkboxContainer');
const resetBtn = document.getElementById('resetBtn');

// Initialize the app
document.addEventListener('DOMContentLoaded', function () {
    loadCheckboxes();

    // Event listeners
    numBoxesInput.addEventListener('input', loadCheckboxes);
    resetBtn.addEventListener('click', resetAll);
});

function loadCheckboxes() {
    const numBoxes = parseInt(numBoxesInput.value) || 5;

    // Clear existing checkboxes
    checkboxContainer.innerHTML = '';

    // Create new checkboxes
    for (let i = 1; i <= numBoxes; i++) {
        const checkboxItem = document.createElement('div');
        checkboxItem.className = 'checkbox-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkbox-${i}`;
        checkbox.checked = checkboxState[`checkbox-${i}`] || false;

        const label = document.createElement('label');
        label.htmlFor = `checkbox-${i}`;
        label.textContent = `Checkbox ${i}`;

        // Add event listener for checkbox changes
        checkbox.addEventListener('change', function () {
            saveCheckboxState(this.id, this.checked);
        });

        checkboxItem.appendChild(checkbox);
        checkboxItem.appendChild(label);
        checkboxContainer.appendChild(checkboxItem);
    }
}

function saveCheckboxState(checkboxId, isChecked) {
    checkboxState[checkboxId] = isChecked;

    // For your environment, replace the above line with:
    // localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
}

function loadCheckboxState() {
    // For your environment, replace the return statement with:
    // const saved = localStorage.getItem('checkboxState');
    // return saved ? JSON.parse(saved) : {};

    return checkboxState;
}

function resetAll() {
    // Clear in-memory state
    checkboxState = {};

    // For your environment, also add:
    // localStorage.removeItem('checkboxState');

    // Uncheck all visible checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Show confirmation
    const originalText = resetBtn.textContent;
    resetBtn.textContent = 'Reset Complete!';
    resetBtn.style.backgroundColor = '#28a745';

    setTimeout(() => {
        resetBtn.textContent = originalText;
        resetBtn.style.backgroundColor = '#dc3545';
    }, 1000);
}

// Initialize state on load
checkboxState = loadCheckboxState();