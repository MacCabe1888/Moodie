# Moodie
An app that generates a movie recommendation based on user data.

### Visit

You can visit the deployed site at the following URL: https://maccabe1888.github.io/Moodie/

### Overview

Don't let this app's deceptively simple user interface fool you: there are many calculations being performed behind the scenes, as you will see if you consult the "app.js" file.

This app is designed with user-friendliness in mind. It requires only two inputs

1. an uploaded image (preferably a photo of the user, in order to ensure that results will be tailored to said user)
2. the user's response to a short survey designed to assess personal taste

to yield five movie recommendations. This is accomplished via three integrated APIs:

1. Face++
2. TMDb (The Movie Database)
3. OMDb (Open Movie Database)

### User Walkthrough

1. Click "Start" to begin.
2. Click "Choose File."
3. Browse your device for a photo and click "Open" after making your selection (or, if using a mobile device, you can take a photo on the spot).
4. Click "Submit."
5. Once the option appears (i.e., once the photo has been processed by Face++), click "Continue".
6. Answer each "Mood Quiz" question by moving the corresponding slider to the desired position between the far left (representing a "1" on the scale) and the far right (representing a "10" on the scale).
7. Click "Submit Answers." TMDb will use your answers to search for an appropriate selection of movies.
8. Click "Show me the movies!"
9. You will see five buttons, each containing the name of a recommended movie. Click on any of the buttons to learn more about the given movie. (The movie info comes from OMDb.)
10. If you are satisfied with your results, you can use a streaming service to enjoy the movie(s) you've chosen. Otherwise, you can always refresh the page to start over and get (usually) different results.

### Ideas for Further Development

* add camera functionality (as quicker alternative to image upload)
* allow multiple images and change algorithm to process aggregate data
* refine search algorithm (possibly via an API with more specific genres and other criteria to choose from)
* improve aesthetic
* take time of day into account (e.g., via Moment.js)
* use Guidebox or similar API to inform user of streaming services where the movie results can be viewed
* partner with streaming services (Netflix, Hulu, etc.) to generate revenue by advertising their services (e.g., in the context described above)
* facilitate user ability to backtrack or restart without having to refresh the page
