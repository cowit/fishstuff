function SaveChallenges() {
    console.log("Saving...")
    var saveData = []
    for (challengeIndex in challengeData) {
        var isPinned = challengeData[challengeIndex].element.parentElement.id != "all-challenges-item-list"
        saveData.push({
            id: challengeData[challengeIndex][ChallengeEnum.UNIQUEID],
            status: challengeData[challengeIndex].element.classList.contains("complete"),
            pinned: isPinned
        })

    }
    localStorage.setItem("saveslot1", JSON.stringify(saveData))
}

function LoadChallenges() {
    var loadedData = localStorage.getItem("saveslot1")
    var parsedData = JSON.parse(loadedData)
    parsedData.forEach((item) => {
        if (item.status === true || item.pinned) {
            var findResult = challengeData.find(
                (element) => element[ChallengeEnum.UNIQUEID] === item.id
            )
            if (findResult) //If the challenge no longer exists, it will not try to complete it
            {
                if (item.status)
                    findResult.element.classList.add("complete")
                if (item.pinned)
                    document.getElementById("pinned-challenges").appendChild(findResult.element)
            }

        }
    })
    filterList()
}


document.addEventListener("challengesLoaded", LoadChallenges)