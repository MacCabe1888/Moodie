$(document).ready(function() {
  $("#next").hide();
})

function readImage() {

  let filesSelected = document.getElementById("selfie").files;
  if (filesSelected.length > 0) {
    let fileToLoad = filesSelected[0];

    let fileReader = new FileReader();

    fileReader.onload = function(fileLoadedEvent) {
      srcData = fileLoadedEvent.target.result; // <--- data: base64

      let newImage = document.createElement('img');
      newImage.src = srcData;

      document.getElementById("imgDisplay").innerHTML = newImage.outerHTML;
    }
    fileReader.readAsDataURL(fileToLoad);
  }
}

function faceAnalyzer() {

  console.log(srcData);

  $.ajax({
    url: "https://api-us.faceplusplus.com/facepp/v3/detect",
    method: "POST",
    data: {api_key: "NHKN-qay1Eo7UQRHyXDEZgxBP_UBcrid", api_secret: "uIfQ_75jkhROW2h3i1JkdSLbjmCrlQKf", image_base64: srcData, return_attributes: "emotion,gender,age"},
    dataType: "json"
  }).then(function(response) {

    let json = JSON.stringify(response);
    let resultObject = JSON.parse(json);
    console.log(resultObject);

    let sadness = resultObject.faces[0].attributes.emotion.sadness;
    let neutral = resultObject.faces[0].attributes.emotion.neutral;
    let disgust = resultObject.faces[0].attributes.emotion.disgust;
    let anger = resultObject.faces[0].attributes.emotion.anger;
    let surprise = resultObject.faces[0].attributes.emotion.surprise;
    let fear = resultObject.faces[0].attributes.emotion.fear;
    let happiness = resultObject.faces[0].attributes.emotion.happiness;
    let gender = resultObject.faces[0].attributes.gender.value;
    let age = resultObject.faces[0].attributes.age.value;

    console.log("Sadness: " + sadness);
    console.log("Neutral: " + neutral);
    console.log("Disgust: " + disgust);
    console.log("Anger: " + anger);
    console.log("Surprise: " + surprise);
    console.log("Fear: " + fear);
    console.log("Happiness: " + happiness);
    console.log("Gender: " + gender);
    console.log("Age: " + age);

    $("#next").show();

    let genre = [];

    if (sadness > neutral && sadness > happiness) {
      genre = genre.concat(["inspirational", "christmas", "coming-of-age", "epic", "adventure", "james-bond", "road", "spaghetti western", "life-story"]);
    } else if (happiness > neutral && happiness > sadness) {
      genre = genre.concat(["buddy", "superhero", "dance", "animated", "western"]);
    } else {
      genre = genre.concat(["documentary", "disney", "animated", "nostalgic", "action", "fish-out-of-water", "sci-fi", "fantasy"]);
    }

    if (disgust > 15) {
      genre = genre.concat(["political", "satire", "film-noir", "gangster", "detective", "thriller", "traditional"]);
    }

    if (anger > 15) {
      genre = genre.concat(["action", "revenge", "courtroom", "outlaw", "drama", "horror", "war"]);
    }

    if (surprise > 15) {
      genre = genre.concat(["thriller", "psychological", "james-bond", "action", "heist", "mystery"]);
    }

    if (fear > 15) {
      genre = genre.concat(["horror", "cult", "thriller", "sci-fi", "war"]);
    }

    if (gender === "Male") {
      genre = genre.concat(["action", "adventure", "biker", "buddy", "crime", "james-bond", "sports", "crime", "war", "western"]);
    }

    if (gender === "Female") {
      genre = genre.concat(["chick-flick", "romantic-comedy", "screwball", "musical", "dance", "drama", "soap-opera"]);
    }

    if (age > 35) {
      genre = genre.concat(["classic", "documentary", "british-humor", "film-noir", "war", "western", "shakespeare"]);
    } else {
      genre = genre.concat(["disney", "horror", "comedy", "sci-fi", "fantasy", "adventure"]);
    }

    let rating = [];

    if (age > 17) {
      rating = ["pg", "pg-13", "r", "nc-17"];
    } else {
      rating = ["g", "pg", "pg-13"];
    }

    console.log(genre);
    console.log(rating);

  })

}

$(document).on("click", ":submit", faceAnalyzer);