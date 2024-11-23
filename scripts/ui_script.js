document.getElementById("level-min").addEventListener("input", filterList)
document.getElementById("level-max").addEventListener("input", filterList)


//When complete button is clicked, activate fanfare
document.getElementById("challenge-complete").addEventListener("click", () => {
    var currentChallenge = document.querySelector(".current-challenge")
    if (currentChallenge.classList.contains("complete")) {
        currentChallenge.classList.remove("complete")
        document.querySelector("#challenge-complete").classList.remove("completed")
    }
    else {
        currentChallenge.classList.add("complete")
        document.querySelector("#challenge-complete").classList.add("completed")
    }

})