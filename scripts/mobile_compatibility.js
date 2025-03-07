var isMobile = false;

window.setInterval(() => {
    if (screen.width < 1085 && isMobile === false) {
        isMobile = true
        SetMobile()
    }
    else if (screen.width > 1085 && isMobile === true) {
        isMobile = false
        SetDesktop()
    }
}, 20)

function SetMobile() {
    document.getElementById("challenge-board").appendChild(document.getElementById("sidebar"))
    document.querySelectorAll(".mobile-compat").forEach(compat => {
        compat.classList.add("mobile")
    })
}

function SetDesktop() {
    document.getElementById("challenge-board").appendChild(document.getElementById("quest-wrap"))
    document.querySelectorAll(".mobile-compat").forEach(compat => {
        compat.classList.remove("mobile")
    })
}