const challengesLoaded = new Event("challengesLoaded")


//Wait until all JSON data for challenges is loaded, then clear interval
var loadingChallenges = true
var intervalID = null
intervalID = window.setInterval(() => {
    if (loadingChallenges === false) {
        clearInterval(intervalID)
        document.dispatchEvent(challengesLoaded)
    }
})
