const ChallengeEnum = Object.freeze({
    NAME: 2,
    STARS: 1,
    GOAL: 3,
    DESCRTIPION: 4,
    LEVEL: 0,
    TAGS: 5,
    LOCATION: 6,
    UNIQUEID: 7,
    IMAGEURL: 8,
    IMAGEALTTEXT: 9
})

//List of tags
var tagList = []

var challengeData

var filteredList = []


fetch("./challenges.json")
    .then(data => data.json()
        .then(json => {
            challengeData = json
            listChallenges()
            loadingChallenges = false
        }))

function listChallenges() {
    var challengeList = document.getElementById("all-challenges-item-list")
    for (index in challengeData) {
        var challenge = challengeData[index]
        //Create Element
        var questItemTemplate = document.querySelector("#quest-item-template")
        var questItem = questItemTemplate.content.querySelector(".quest-item").cloneNode(true)
        questItem.id = `challenge-${index}`
        document.querySelector("#all-challenges-item-list").appendChild(questItem)
        questItem.querySelector(".list-level").textContent = `Lv. ${challenge[ChallengeEnum.LEVEL]}`
        questItem.querySelector(".list-text").textContent = challenge[ChallengeEnum.NAME]

        //Add Challenge ele to challenge object
        challenge.element = questItem

        //Append Element
        challengeList.appendChild(questItem)

        //Click event
        addClickData(questItem, challenge)
        var tags = challenge[ChallengeEnum.TAGS]?.split(",")
        for (tag in tags) {
            tags[tag] = tags[tag].trim()
            if (!tagList.includes(tags[tag])) {
                tagList.push(tags[tag])
            }
        }
        challenge[ChallengeEnum.TAGS] = tags
    }

    var tagBox = document.getElementById("tag-selection")

    //Create Tag Elements
    for (index in tagList) {
        var tag = tagList[index]
        var tagTemplate = document.querySelector("#filter-checkbox-template")
        var tagElement = tagTemplate.content.querySelector(".filter-checkbox").cloneNode(true)
        tagElement.querySelector(".filter-checkbox-input").id = tag
        tagElement.querySelector(".filter-checkbox-input").classList.add("tag-checkbox")
        tagElement.querySelector(".filter-checkbox-text").innerText = tag.charAt(0).toUpperCase() + tag.slice(1)
        tagBox.appendChild(tagElement)
        addTagClickData(tagElement)
    }

    //Filter list to remove errored challenges
    filterList()
}

function addTagClickData(tagEle) {
    tagEle.addEventListener("click", () => {
        filterList()
    })
}

function addClickData(element, challenge) {
    element.addEventListener("click", (event) => {
        setChallenge(challenge)
    })
    element.querySelector(".list-icon.first").addEventListener("click", () => {
        if (element.parentElement.id === "all-challenges-item-list")
            document.querySelector("#pinned-challenges").appendChild(element)
        else {
            document.querySelector("#all-challenges-item-list").appendChild(element)
        }
        SaveChallenges()
        filterList()
    })
}

function setChallenge(challenge) {
    document.getElementById("quest-title").textContent = challenge[ChallengeEnum.NAME]
    document.getElementById("quest-difficulty").textContent = `Difficulty ${challenge[ChallengeEnum.STARS]}`
    document.getElementById("quest-objective-text").textContent = challenge[ChallengeEnum.GOAL]
    document.getElementById("quest-description-text").textContent = challenge[ChallengeEnum.DESCRTIPION]
    document.getElementById("quest-level").textContent = `Level Req: ${challenge[ChallengeEnum.LEVEL]}`
    document.getElementById("quest-image").src = `../image_assets/quest_images/${challenge[ChallengeEnum.IMAGEURL]}.png`
    //Current challenge selection
    document.querySelector(".current-challenge")?.classList.remove("current-challenge")
    challenge.element.classList.add("current-challenge")
    if (challenge.element.classList.contains("complete")) {
        document.querySelector("#quest-complete-button").classList.add("completed")
    }
    else {
        document.querySelector("#quest-complete-button").classList.remove("completed")
    }
}


function filterList(mask = []) {
    var completedAmount = 0
    var uncompletedAmount = 0

    var minLevel = document.getElementById("level-min").value || 0
    var maxLevel = document.getElementById("level-max").value || 1000

    var activeTags = []
    document.querySelectorAll(".tag-checkbox").forEach((ele) => {
        if (ele.checked)
            activeTags.push(ele.id)
    })
    filteredList = []

    var searched = false
    if (document.querySelector(".searched") != null) searched = true

    //Create challenge list
    challenge: for (index in challengeData) {
        var challenge = challengeData[index]
        var challengeElement = document.getElementById(`challenge-${index}`)

        //Track challenge completions
        if (challengeElement.classList.contains("complete")) {
            completedAmount += 1
        }
        else {
            uncompletedAmount += 1
        }

        //Challenge Search filter
        if (searched && !challengeElement.classList.contains("searched")) {
            challengeElement.hidden = true
            continue challenge
        }

        //Challenge level filter
        var challengeLevel = parseInt(challenge[ChallengeEnum.LEVEL])
        if (challengeLevel < minLevel || challengeLevel > maxLevel || isNaN(challengeLevel)) {
            challengeElement.hidden = true
            continue challenge
        }

        //Challenge Tag Filter
        for (tagIndex in activeTags) {
            var tag = activeTags[tagIndex]
            if (!challenge[ChallengeEnum.TAGS].includes(tag))
                challengeElement.hidden = true
            continue challenge
        }

        //Completed Filter
        if (!document.querySelector("#select-completed").checked && challengeElement.classList.contains("complete")) {
            challengeElement.hidden = true
            continue challenge
        }

        if (!document.querySelector("#select-uncompleted").checked && !challengeElement.classList.contains("complete")) {
            challengeElement.hidden = true
            continue challenge
        }

        //Star Filter
        if (!document.getElementById("star-1").classList.contains("selected") && challenge[ChallengeEnum.STARS].length === 1) {
            challengeElement.hidden = true
            continue challenge
        }
        if (!document.getElementById("star-2").classList.contains("selected") && challenge[ChallengeEnum.STARS].length === 2) {
            challengeElement.hidden = true
            continue challenge
        }
        if (!document.getElementById("star-3").classList.contains("selected") && challenge[ChallengeEnum.STARS].length === 3) {
            challengeElement.hidden = true
            continue challenge
        }
        if (!document.getElementById("star-4").classList.contains("selected") && challenge[ChallengeEnum.STARS].length === 4) {
            challengeElement.hidden = true
            continue challenge
        }
        if (!document.getElementById("star-5").classList.contains("selected") && challenge[ChallengeEnum.STARS].length === 5) {
            challengeElement.hidden = true
            continue challenge
        }
        if (!document.getElementById("star-6").classList.contains("selected") && challenge[ChallengeEnum.STARS].length === 6) {
            challengeElement.hidden = true
            continue challenge
        }

        //Use Mask list to only show matching results, used for searching
        if (mask.length > 0) {
            mask.find(challenge)
        }

        challengeElement.hidden = false

        filteredList.push(challenge)
    }

    filteredList.sort((a, b) => a[0] - b[0])
    var challengeList = document.querySelector("#all-challenges-item-list")
    filteredList.forEach((ele) => {
        if (ele.element.parentElement.id != "pinned-challenges")
            challengeList.appendChild(ele.element)
    })

    //TODO isn't on when loaded
    document.querySelector("#completion-number").textContent = `${completedAmount}/${challengeData.length}`
}