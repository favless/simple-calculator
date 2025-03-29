let inputField = document.getElementById("field")
let preview = document.getElementById("preview")

function checkForPreview() {
    if (inputField.value.match(/[+\-*/%]\s*\d/)) {
        preview.innerHTML = "= " + new Function(`"use strict"; return (${inputField.value})`)();
    } else {
        preview.innerHTML = ''
    }
}

function controlInput() {
    inputField.value = inputField.value
    .replace(/[^0-9+\-*/%().]/g, "") // invalid chars
    .replace(/(\.\.+)/g, ".") // multiple dots
    .replace(/([+\-*/%])\1+|(\)\()|(\d+)(\()/g, "$1$3"); // adjacent operators and/or groups
}

inputField.addEventListener("input", function () {
    controlInput()
    checkForPreview()
});

function appendToField(char) {
    if (char == 'group') {
        if (/[()]/.test(inputField.value.slice(-1))) {
            deleteField(false)
        } else {
            let lastOpeningIndex = inputField.value.lastIndexOf("(")
            let lastClosingIndex = inputField.value.lastIndexOf(")")

            if (lastOpeningIndex > lastClosingIndex) {
                inputField.value += ")"
            } else {
                inputField.value += "("
            }
        }
    } else {
        inputField.value += char
    }

    controlInput()
    checkForPreview()
}

function calculateField() {
    inputField.value = new Function(`"use strict"; return (${inputField.value})`)();
    checkForPreview()
}

function deleteField(all) {
    if (all == true) {
        inputField.value = ''
        checkForPreview()
    } else {
        inputField.value = inputField.value.slice(0, -1);
        checkForPreview()
    }
}