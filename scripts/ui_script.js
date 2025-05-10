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
    SaveChallenges()
    filterList()
})

//- Open quest list on mobile
document.getElementById("quest-list-button").addEventListener("click", () => {
    var sidebar = document.getElementById("sidebar")
    if (sidebar.style.display === "none") {
        sidebar.style.display = "flex"
    }
    else {
        sidebar.style.display = "none"
    }
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

//MSQ selection
document.querySelector("#MSQ-selection").addEventListener("select", (event) => {
    var minLevelEle = document.querySelector("#level-min")
    var maxLevelEle = document.querySelector("#level-max")
    switch (event.detail.value) {
        case "arealmreborn":
            console.log("test")
            minLevelEle.value = 0
            maxLevelEle.value = 50
            break;
        case "heavensward":
            minLevelEle.value = 51
            maxLevelEle.value = 60
            break;
        case "stormblood":
            minLevelEle.value = 61
            maxLevelEle.value = 70
            break;
        case "shadowbringers":
            minLevelEle.value = 71
            maxLevelEle.value = 80
            break;
        case "endwalker":
            minLevelEle.value = 81
            maxLevelEle.value = 90
            break;
        case "dawntrail":
            minLevelEle.value = 91
            maxLevelEle.value = 100
            break;
    }
    filterList()
})

//Random buttons
document.querySelector("#random-any").addEventListener("click", () => {
    var challenge = filteredList[Math.floor(Math.random() * filteredList.length)]

    //Current challenge selection
    setChallenge(challenge)
})

document.querySelector("#random-normal").addEventListener("click", () => {
    document.querySelector("#star-1").classList.add("selected")
    document.querySelector("#star-2").classList.add("selected")
    document.querySelector("#star-3").classList.remove("selected")
    document.querySelector("#star-4").classList.remove("selected")
    document.querySelector("#star-5").classList.remove("selected")
    document.querySelector("#star-6").classList.remove("selected")

    filterList()

    var challenge = filteredList[Math.floor(Math.random() * filteredList.length)]

    //Current challenge selection
    setChallenge(challenge)
})

document.querySelector("#random-savage").addEventListener("click", () => {
    document.querySelector("#star-1").classList.remove("selected")
    document.querySelector("#star-2").classList.remove("selected")
    document.querySelector("#star-3").classList.add("selected")
    document.querySelector("#star-4").classList.add("selected")
    document.querySelector("#star-5").classList.remove("selected")
    document.querySelector("#star-6").classList.remove("selected")
    
    filterList()

    var challenge = filteredList[Math.floor(Math.random() * filteredList.length)]

    //Current challenge selection
    setChallenge(challenge)
})

document.querySelector("#random-ultimate").addEventListener("click", () => {
    document.querySelector("#star-1").classList.remove("selected")
    document.querySelector("#star-2").classList.remove("selected")
    document.querySelector("#star-3").classList.remove("selected")
    document.querySelector("#star-4").classList.remove("selected")
    document.querySelector("#star-5").classList.add("selected")
    document.querySelector("#star-6").classList.add("selected")
    
    filterList()

    var challenge = filteredList[Math.floor(Math.random() * filteredList.length)]

    //Current challenge selection
    setChallenge(challenge)
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
            ele.dispatchEvent(new CustomEvent("select", { detail: { target: event.target, value: selectedValue } }))
        }
    })
})

//Filter Menu opening
document.querySelector("#filters-button").addEventListener("click", (button) => {
    var filterMenu = document.querySelector("#floating-filter-wrapper")
    filterMenu.hidden = !filterMenu.hidden
})

//Search Menu
const fuseOptions = {
    threshold: 0.5,
    keys: [
        "2"
    ]
}

var fuse

document.addEventListener("challengesLoaded", () => {

    fuse = new Fuse(challengeData, fuseOptions)
    var searchBar = document.querySelector("#main-header-search")
    searchBar.addEventListener("input", () => {
        document.querySelectorAll(".searched").forEach((ele) => {
            ele.classList.remove("searched")
        })
        fuse.search(searchBar.value).forEach((result) => {
            result.item.element.classList.add("searched")
        })
        
        filterList()
    })

})
