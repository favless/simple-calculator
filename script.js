let inputField = document.getElementById("field")
let preview = document.getElementById("preview")

function checkForPreview() {
    if (inputField.value.match(/[+\-*/%]\s*\d/)) {
        preview.innerHTML = "= " + new Function(`"use strict"; return (${inputField.value})`)();
    } else {
        preview.innerHTML = ''
    }
}

inputField.addEventListener("input", function () {
    this.value = this.value
        .replace(/[^0-9+\-*/%().]/g, "") // invalid chars
        .replace(/(\.\.+)/g, ".") // multiple dots
        .replace(/([+\-*/%])\1+/g, "$1"); // multiple operators

    checkForPreview()
});

function appendToField(char) {
    inputField.value += char

    inputField.value = inputField.value
        .replace(/[^0-9+\-*/%().]/g, "") // invalid chars
        .replace(/(\.\.+)/g, ".") // multiple dots
        .replace(/([+\-*/%])\1+/g, "$1"); // multiple operators

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