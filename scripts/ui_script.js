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
    filterList()
})

//Completion Selectors
document.getElementById("select-all").addEventListener("click", () => {
    document.querySelector(".completion-selector.selected")?.classList.remove("selected")
    document.getElementById("select-all").classList.add("selected")
    filterList()
})

document.getElementById("select-completed").addEventListener("click", () => {
    document.querySelector(".completion-selector.selected")?.classList.remove("selected")
    document.getElementById("select-completed").classList.add("selected")
    filterList()
})

document.getElementById("select-uncompleted").addEventListener("click", () => {
    document.querySelector(".completion-selector.selected")?.classList.remove("selected")
    document.getElementById("select-uncompleted").classList.add("selected")
    filterList()
})

//Star selectors
document.querySelectorAll(".star-selector").forEach((star) => {
    star.addEventListener("click", () => {
        if (star.classList.contains("selected")) {
            star.classList.remove("selected")
        }
        else {
            star.classList.add("selected")
        }
        filterList()
    })
})