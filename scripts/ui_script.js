document.getElementById("level-min").addEventListener("input", filterList)
document.getElementById("level-max").addEventListener("input", filterList)


//When complete button is clicked, activate fanfare
document.getElementById("quest-complete-button").addEventListener("click", () => {
    var currentChallenge = document.querySelector(".current-challenge")
    if (currentChallenge == null) return
    if (currentChallenge.classList.contains("complete")) {
        currentChallenge.classList.remove("complete")
        document.querySelector("#quest-complete-button").classList.remove("completed")
    }
    else {
        currentChallenge.classList.add("complete")
        document.querySelector("#quest-complete-button").classList.add("completed")
    }
    filterList()
})

//Completion Selectors
document.getElementById("select-completed").addEventListener("click", () => {
    filterList()
})

document.getElementById("select-uncompleted").addEventListener("click", () => {
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

//Random buttons
document.querySelector("#random-any").addEventListener("click", () => {
    var challenge = filteredList[Math.floor(Math.random() * filteredList.length)]
    //Current challenge selection
    document.querySelector(".current-challenge")?.classList.remove("current-challenge")
    challenge.element.classList.add("current-challenge")
    if (challenge.element.classList.contains("complete")) {
        document.querySelector("#challenge-complete").classList.add("completed")
    }
    else {
        document.querySelector("#challenge-complete").classList.remove("completed")
    }

    document.getElementById("challenge-name").textContent = challenge[ChallengeEnum.NAME]
    document.getElementById("challenge-stars").textContent = challenge[ChallengeEnum.STARS]
    document.getElementById("challenge-goal").textContent = challenge[ChallengeEnum.GOAL]
    document.getElementById("challenge-description").textContent = challenge[ChallengeEnum.DESCRTIPION]
})

//Dropdowns
document.querySelectorAll(".styled-dropdown").forEach((ele) => {
    ele.addEventListener("click", (event) => {
        if (!ele.classList.contains("open")) ele.classList.add("open")
        else ele.classList.remove("open")
        if (event.target.classList.contains("styled-option")) {
            var selectedValue = event.target.getAttribute("value")
            ele.setAttribute("value", selectedValue)
            ele.querySelector(".dropdown-text").textContent = event.target.textContent
            ele.dispatchEvent(new CustomEvent("select", {detail: {target: event.target, value: selectedValue}}))
        }
    })
})

document.querySelector(".styled-dropdown").addEventListener("select", (event) => {
    console.log(event.detail.value)
})