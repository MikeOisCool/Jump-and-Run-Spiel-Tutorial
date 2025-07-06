const inofElement = document.getElementById("info");

export function hideInfo() {
    inofElement.style.display = "none";
}

export function writeInfo(text) {
    inofElement.style.display = "block";
    inofElement.innerHTML = text;
}