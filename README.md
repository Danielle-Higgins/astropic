# AstroPic: <a href="https://danielle-higgins.github.io/astropic/" target="_blank">Visit Here</a>

<p>
  <img width="400" src="https://github.com/Danielle-Higgins/astropic/blob/main/img/astropic-preview1.png">
  <img width="400" src="https://github.com/Danielle-Higgins/astropic/blob/main/img/astropic-preview2.png">
</p>

Are you a fan of Astronomy? AstroPic allows you to select a date and depending on which date you choose, it will show you the picture from that day. You'll know the title and will receive a brief explanation on what the image is!

## Tech Used

<p>
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E">
</p>

This project uses the Astronomy Picture of the Day API from the NASA Open APIs website. The API requires an API Key which is hidden from the client. Since I have the API Key hidden inside the config.js file, this project will not work on GitHub. I have provided a preview of the project using GitHub pages but it will not work since there's no access to the API Key. Feel free to test this project on your local machine by cloning this repo! Just plug in your own generated API Key from the NASA Open APIs website and plug it into the url within the JavaScript file.

When the user chooses a date from the input and clicks on the get picture button, it will search for the picture. It will first validate the date by checking if the date is within a specific range. If it's not within the range specified, it wont proceed. Otherwise, the program will make a call to the API. There are two media types that will be checked. One type is an image, the other is a video. If the media type is an image, a function will be called to display the picture of the day along with other information such as the title, copyright, date, and explanation. If the media type is a video, a different function will be called to display the video along with it's associated information. If the user wants to see an increased size of the image, the image is clickable.

Here is a link to the API I used: <a target="_blank" href="https://api.nasa.gov/">NASA Open APIs</a>

## Optimizations

If/when I improve this project, I would like to make the code a little easier to read by using Object Oriented Programming instead of Procedural Programming.

## Lessons Learned

I learned how to hide my API key from the client using a separate JavaScript file. I also learned how to make git ignore the file by using a .gitignore file. Separation of concerns.
