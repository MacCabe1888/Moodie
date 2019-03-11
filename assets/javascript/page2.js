function chooseImage() {

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

    console.log(sadness);
    console.log(neutral);
    console.log(disgust);
    console.log(anger);
    console.log(surprise);
    console.log(fear);
    console.log(happiness);
    console.log(gender);
    console.log(age);

  })

}

$(document).on("click", ":submit", faceAnalyzer);