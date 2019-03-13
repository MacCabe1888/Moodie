$(document).ready(function() {
  $("#jumbotron2").hide();
  $("#jumbotron3").hide();
  $("#jumbotron4").hide();
  $("#selfie").hide();
  $("#imgDisplay").hide();
  $("#submitImg").hide();
  $("#toQuiz").hide();
  $(".wrapper").hide();
  $("#toResults").hide();
})

$(document).on("click", "#start", function() {
  $("#jumbotron1").hide();
  $("#jumbotron2").show();
  $("#start").hide();
  $("#selfie").show();
})

let genreIDs = [];

function readImage() {

  $("#selfie").hide();
  $("#imgDisplay").show();
  $("#submitImg").show();

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
    dataType: "json",
    error: faceAnalyzer
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

    // List of genre names and corresponding IDs from TMDb:
    //
    // {"genres": [
    //     {
    //       "id": 28,
    //       "name": "Action"
    //     },
    //     {
    //       "id": 12,
    //       "name": "Adventure"
    //     },
    //     {
    //       "id": 16,
    //       "name": "Animation"
    //     },
    //     {
    //       "id": 35,
    //       "name": "Comedy"
    //     },
    //     {
    //       "id": 80,
    //       "name": "Crime"
    //     },
    //     {
    //       "id": 99,
    //       "name": "Documentary"
    //     },
    //     {
    //       "id": 18,
    //       "name": "Drama"
    //     },
    //     {
    //       "id": 10751,
    //       "name": "Family"
    //     },
    //     {
    //       "id": 14,
    //       "name": "Fantasy"
    //     },
    //     {
    //       "id": 36,
    //       "name": "History"
    //     },
    //     {
    //       "id": 27,
    //       "name": "Horror"
    //     },
    //     {
    //       "id": 10402,
    //       "name": "Music"
    //     },
    //     {
    //       "id": 9648,
    //       "name": "Mystery"
    //     },
    //     {
    //       "id": 10749,
    //       "name": "Romance"
    //     },
    //     {
    //       "id": 878,
    //       "name": "Science Fiction"
    //     },
    //     {
    //       "id": 10770,
    //       "name": "TV Movie"
    //     },
    //     {
    //       "id": 53,
    //       "name": "Thriller"
    //     },
    //     {
    //       "id": 10752,
    //       "name": "War"
    //     },
    //     {
    //       "id": 37,
    //       "name": "Western"
    //     }
    //   ]
    // }

    if (sadness > neutral && sadness > happiness) {
      genreIDs = genreIDs.concat([16, 10751, 14, 878, 37]);
    } else if (happiness > neutral && happiness > sadness) {
      genreIDs = genreIDs.concat([12, 16, 35, 10402, 37]);
    } else {
      genreIDs = genreIDs.concat([12, 16, 99, 18, 36]);
    }

    if (disgust > 15) {
      genreIDs = genreIDs.concat([16, 99, 18, 10402, 10770]);
    }

    if (anger > 15) {
      genreIDs = genreIDs.concat([28, 80, 27, 10752, 37]);
    }

    if (surprise > 15) {
      genreIDs = genreIDs.concat([28, 80, 9648, 878, 53]);
    }

    if (fear > 15) {
      genreIDs = genreIDs.concat([80, 27, 878, 53, 10752]);
    }

    if (gender === "Male") {
      genreIDs = genreIDs.concat([28, 80, 14, 10752, 37]);
    }

    if (gender === "Female") {
      genreIDs = genreIDs.concat([18, 10402, 9648, 10749, 10770]);
    }

    if (age > 35) {
      genreIDs = genreIDs.concat([80, 99, 36, 10770, 37]);
    } else {
      genreIDs = genreIDs.concat([28, 16, 35, 10751, 10402]);
    }

    if (age < 18) {
      includeAdult = "false";
    } else {
      includeAdult = "true";
    }

    let minReleaseYear = moment().format("YYYY") - (age + 10);
    console.log(minReleaseYear);
    minReleaseDate = minReleaseYear + "-01-01";
    console.log (minReleaseDate);

    console.log(genreIDs);
    console.log(includeAdult);

    $("#submitImg").hide();
    $("#toQuiz").show();
  
  })

}

$(document).on("click", "#submitImg", faceAnalyzer);

$(document).on("click", "#toQuiz", function() {
  $("#imgDisplay").hide();
  $("#jumbotron2").hide();
  $("#jumbotron3").show();
  $("#toQuiz").hide();
  $(".wrapper").show();
});

$(document).on("click", "#submitQuiz", function() {

  event.preventDefault();

  var q1Answer = parseInt($("#question-1").val());
  var q2Answer = parseInt($("#question-2").val());
  var q3Answer = parseInt($("#question-3").val());
  var q4Answer = parseInt($("#question-4").val());
  var q5Answer = parseInt($("#question-5").val());
  
  results = q1Answer + q2Answer + q3Answer + q4Answer + q5Answer;
  console.log(results);
  
  //set ranges for results/assign genres
  if (q1Answer >= 1 && q1Answer < 4){
    genreIDs = genreIDs.concat([14]);
  } else if (q1Answer >= 4 && q1Answer < 7 ){
    genreIDs = genreIDs.concat([9648]);
  } else {
    genreIDs = genreIDs.concat([27]);
    };
  
  if (q2Answer >= 1 && q2Answer < 4){
    genreIDs = genreIDs.concat([99]);
  } else if (q2Answer >= 4 && q2Answer < 7 ){
    genreIDs = genreIDs.concat([12]);
  } else {
    genreIDs = genreIDs.concat([28]);
  };
  
  if (q3Answer >= 1 && q3Answer < 4){
    genreIDs = genreIDs.concat([35]);
  } else if (q3Answer >= 4 && q3Answer < 7 ){
    genreIDs = genreIDs.concat([80]);
  } else {
    genreIDs = genreIDs.concat([10751]);
  };
  
  if (q4Answer >= 1 && q4Answer < 4){
    genreIDs = genreIDs.concat([14]);
  } else if (q4Answer >= 4 && q4Answer < 7 ){
    genreIDs = genreIDs.concat([878]);
  } else {
    genreIDs = genreIDs.concat([36, 10752]);
  };
  
  if (q5Answer >= 1 && q5Answer < 4){
    genreIDs = genreIDs.concat([37]);
  } else if (q5Answer >= 4 && q5Answer < 7 ){
    genreIDs = genreIDs.concat([10402]);
  } else {
    genreIDs = genreIDs.concat([99]);
  };
  
  console.log(genreIDs);

  let genreIDsRefined = [];

  function generate() {

    genreIDsRefined[0] = genreIDs[Math.floor(Math.random() * genreIDs.length)];
    genreIDsRefined[1] = genreIDs[Math.floor(Math.random() * genreIDs.length)];
    genreIDsRefined[2] = genreIDs[Math.floor(Math.random() * genreIDs.length)];
    console.log(genreIDsRefined);

    let api_key = "d7a6c6bfe392ba34f9bfabef5bcba684";

    let queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=" + api_key + "&with_genres=" + genreIDsRefined.join(",") + "&release_date.gte=" + minReleaseDate + "&include_adult=" + includeAdult;
    console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json",
      success: function (response) {
        let json = JSON.stringify(response);
        let resultObject = JSON.parse(json);
        result = [];
        if (resultObject.results.length < 5) {
          generate();
        } else {
          for (i = 0; i < 5; i++) {
            console.log(resultObject.results[i].title);
            result.push(resultObject.results[i].title);
          }
        }
      },
      error: generate
    })

  }

  generate();

  $("#submitQuiz").hide();
  $(".wrapper").hide();
  $("#toResults").show();

})

$(document).on("click", "#toResults", function() {
  $("#jumbotron3").hide();
  $("#jumbotron4").show();
  $("#toResults").hide();
  let movies = result;
  console.log(movies);
  function displayMovieInfo() {
    //create a variable for our search Results
    //let buttonClicked = $(this);
    let movie = $(this).attr("data-name");
    console.log(movie); 
    //using trilogy api key for access to poster (Manny suggested, Roger approved)
    let queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&i=&plot=short&apikey=trilogy";
    //HOW DO I GET THE DATA(list of movies) THAT THE AJAX WILL GET???
    //creating an AJAX call for a specific movie's POSTER, TITLE, RATING, and PLOT
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
      $("#movies-view").empty();
      console.log(response.data);

    //creating a div to hold ALL movie data
    var movieDiv = $("<div class='movie'>");
    
    //POSTER
    //retrieving the URL for the poster image
    var imgURL = response.Poster;
    //creating an element to hold the poster image
    var image = $("<img src='http://www.imdb.com/title/' + IMDbID + '/?ref_=chttp_tt_1'>").attr("src", imgURL);

    image.attr("style", "width: 100%");

    //append the poster image
    movieDiv.append(image);
   // 'url': 'http://www.imdb.com/title/' + MOVIE_ID + '/?ref_=chttp_tt_1'
   //<button data-index="0"><img src="assets/images/blue-apatite-400.jpg" alt="gem 1"/></button>
    //IMDb ID
    //storing the Id data
    //var IMDbID = response.imdbID;
    //RATING
    //storing the rating data
    var rating = response.Rated;
    //create element to display the rating
    var pOne = $("<p>").text("Rating: " + rating);
    //display the rating in the movieDiv
    movieDiv.append(pOne);
    //YEAR
    // storing the release year
    var released = response.Released;
    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Released: " + released);
    // Displaying the release year
    movieDiv.append(pTwo);
    //PLOT
    //storing the plot data
    var plot = response.Plot;
    //create element to display the rating
    var pThree = $("<p>").text("Plot: " + plot);
    //display the plot in the movieDiv
    movieDiv.append(pThree);
    
               
    //Putting the entire movie into the movies-view div in the html
    $("#movies-view").prepend(movieDiv);
    })
  }    

  // Function for displaying movie data
  function renderButtons() {
    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < movies.length; i++) {
    
      // Then dynamicaly generating buttons for each movie in the array
      var button = $("<button>");
      // Adding a class of movie-btn to our button
      button.addClass("movie-btn");
      // Adding a data-attribute
      button.attr("data-name", movies[i]);
      // Providing the initial button text
      button.text(movies[i]);

      button.css({
        "font-size": "30px",
        "background": "sienna"
      });

      //a.css({
      //  "background-image":
      //})
    //--------------------------------------------- 
    //add the Movie Poster image to the movie-btn
    //on hover of the movie poster button, show Title, Year, Rating, and Short Plot
    //on click of movie poster button, link to movie URL
    //---------------------------------------------
    
      // Adding the button to the buttons-view div
      $("#buttons-view").append(button);
    }
  }
  

  // This function handles events where a movie button is clicked
  //$("#add-movie").on("click", function(event) {
  //  event.preventDefault();
    // Calling renderButtons which handles the processing of our movie array
    //renderButtons();
  //});

  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".movie-btn", displayMovieInfo);

  // Calling the renderButtons function to display the initial buttons from our array
  renderButtons();

})