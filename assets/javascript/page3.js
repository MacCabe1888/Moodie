 var genres = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]



let resuts = 0
window.onload = function(){

    console.log("loaded");
    
    $("#quiz-form").on("submit", function(event){
        event.preventDefault();

        var q1Answer = $("#question-1").val();
        var q2Answer = $("#question-2").val();
        var q3Answer = $("#question-3").val();
        var q4Answer = $("#question-4").val();
        var q5Answer = $("#question-5").val();
        console.log(q1Answer + q2Answer + q3Answer + q4Answer + q5Answer);


        results = parseInt(q1Answer)+parseInt(q2Answer)+parseInt(q3Answer)+parseInt(q4Answer)+parseInt(q5Answer);
        console.log(results);

        var compileIDs = (function  (){
        genreIDs = [];
        //set ranges for results/assign genres
            if (q1Answer >= 1 && q1Answer < 4){
                genreIDs.concat([14]);
            } else if (q1Answer >= 4 && q1Answer < 7 ){
                genreIDs.concat([9648]);
            } else {
                genreIDs.concat([27]);
            };

            if (q2Answer >= 1 && q2Answer < 4){
                genreIDs.concat([99]);
            } else if (q2Answer >= 4 && q2Answer < 7 ){
                genreIDs.concat([12]);
            } else {
                genreIDs.concat([28]);
            };

            if (q3Answer >= 1 && q3Answer < 4){
                genreIDs.concat([35]);
            } else if (q3Answer >= 4 && q3Answer < 7 ){
                genreIDs.concat([80]);
            } else {
                genreIDs.concat([10751]);
            };

            if (q4Answer >= 1 && q4Answer < 4){
                genreIDs.concat([14]);
            } else if (q4Answer >= 4 && q4Answer < 7 ){
                genreIDs.concat([878]);
            } else {
                genreIDs.concat([36, 10752]);
            };

            if (q5Answer >= 1 && q5Answer < 4){
                genreIDs.concat([37]);
            } else if (q5Answer >= 4 && q5Answer < 7 ){
                genreIDs.concat([10402]);
            } else {
                genreIDs.concat([99]);
            };

            console.log(genreIDs);
    })();



        //collect genres


        // if (results >= 40 && results <= 50){
        //    genreIDs = genreIDs.concat([""])


        // } else if (results >= 30 && results < 40){
        //     genreIDs = genreIDs.concat([""])


        // } else if (results >= 20 && results < 30){
        //     genreIDs = genreIDs.concat([""])


        // } else {
        //     genreIDs = genreIDs.concat([""])


        // };

// genreIDs = genreIDs.concat([""])
// var queryURL = "http://www.omdbapi.com/"
// //apikey=f789ec68";

//     $.ajax({
//         url: queryURL,
//         method: "GET",

//     }).then(function(response) {

//         console.log(response);
//     });

//  let json = JSON.stringify(response);
//  let resultObject = JSON.parse(json);
//  console.log(resultObject);






    });

}

















    