function SaveChallenges() {
    console.log("Saving...")
    var saveData = []
    for (challengeIndex in challengeData) {
        saveData.push({ id: challengeData[challengeIndex][ChallengeEnum.UNIQUEID], status: challengeData[challengeIndex].element.classList.contains("complete") })
    }
    localStorage.setItem("saveslot1", JSON.stringify(saveData))
}

function LoadChallenges() {
    var loadedData = localStorage.getItem("saveslot1")
    var parsedData = JSON.parse(loadedData)
    parsedData.forEach((item) => {
        if (item.status === true) {
            var findResult = challengeData.find(
                (element) => element[ChallengeEnum.UNIQUEID] === item.id
            )
            if (findResult) //If the challenge no longer exists, it will not try to complete it
                findResult.element.classList.add("complete")
        }
    })
}

