const ChallengeEnum = Object.freeze({
    NAME: 2,
    STARS: 1,
    GOAL: 3,
    DESCRTIPION: 4,
    LEVEL: 0,
    TAGS: 5
})

//List of tags
var tagList = []

var challengeData

fetch("./challenges.json")
    .then(data => data.json()
        .then(json => {
            challengeData = json
            listChallenges()
        }))



function listChallenges() {
    var challengeList = document.getElementById("challenge-list")
    for (index in challengeData) {
        var challenge = challengeData[index]
        //Create Element
        var listEle = document.createElement("div")
        listEle.classList.add("challenge-element")
        listEle.id = `challenge-${index}`

        //Add innter html
        listEle.innerHTML = /*html*/`
            Lv. ${challenge[ChallengeEnum.LEVEL]} ${challenge[ChallengeEnum.NAME]}
            `

        //Append Element
        challengeList.appendChild(listEle)

        //Click event
        addClickData(listEle, challenge)

        var tags = challenge[ChallengeEnum.TAGS].split(",")
        for (tag in tags) {
            tags[tag] = tags[tag].trim()
            if (!tagList.includes(tags[tag])) {
                tagList.push(tags[tag])
            }
        }
        challenge[ChallengeEnum.TAGS] = tags
    }

    var tagBox = document.getElementById("tag-selection")

    for (index in tagList) {
        var tag = tagList[index]
        var tagElement = document.createElement("p")
        tagElement.id = tag
        tagElement.classList.add("tag-selector")
        tagElement.innerText = tag.charAt(0).toUpperCase() + tag.slice(1)
        tagBox.appendChild(tagElement)
        addTagClickData(tagElement, tag)
    }

    //Filter list to remove errored challenges
    filterList()
}

function addClickData(element, challenge) {
    element.addEventListener("click", (event) => {
        document.getElementById("challenge-name").textContent = challenge[ChallengeEnum.NAME]
        document.getElementById("challenge-stars").textContent = challenge[ChallengeEnum.STARS]
        document.getElementById("challenge-goal").textContent = challenge[ChallengeEnum.GOAL]
        document.getElementById("challenge-description").textContent = challenge[ChallengeEnum.DESCRTIPION]
    })
}

function addTagClickData(element, tag) {
    element.addEventListener("click", () => {
        if(!element.classList.contains("active")){
            element.classList.add("active")
        }
        else {
            element.classList.remove("active")
        }
        filterList()
    })
}

function filterList() {
    var minLevel = document.getElementById("level-min").value || 0
    var maxLevel = document.getElementById("level-max").value || 1000

    var activeTags = []
    document.querySelectorAll(".tag-selector.active").forEach((ele) => {
        activeTags.push(ele.id)
    })

    //Create challenge list
    challenge : for (index in challengeData) {
        var challenge = challengeData[index]
        //Challenge level filter
        var challengeLevel = parseInt(challenge[ChallengeEnum.LEVEL])
        if (challengeLevel < minLevel || challengeLevel > maxLevel || isNaN(challengeLevel)) {
            document.getElementById(`challenge-${index}`).hidden = true
            continue
        }

        //Challenge Tag Filter
        for(tagIndex in activeTags) {
            var tag = activeTags[tagIndex]
            if(!challenge[ChallengeEnum.TAGS].includes(tag))
                document.getElementById(`challenge-${index}`).hidden = true
                continue challenge
        }

        document.getElementById(`challenge-${index}`).hidden = false

    }

}