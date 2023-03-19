# Courses App

## [DEMO LINK](https://dmytro-lebedchenko.github.io/react_courses-app/#/)

# Table of contents
- [Tech stack](#tech-stack)
- [Project task](#project-task)
- [Project structure](#project-structure)
- [How to run my project locally](#how-to-run-my-project-locally)

# Tech stack
  - React.JS
  - React Router
  - Redux
  - Redux Toolkit
  - JavaScript
  - TypeScript
  - HTML
  - CSS/SCSS
  - BEM
  - FETCH, API
  - localStorage

# Project task
The application should contains two pages:
  - page with courses;
  - a page with a view of the course;

Details about the pages:
- The last 10 courses must be displayed in the course feed. The course includes:
     - Photo of the course.
     - Title of the course.
     - Number of lessons, skills and rating.
     - We display 10 courses on the page and add pagination.
     - On card hover, play the muted video.

- The course view page displays the first video from this course, details about the course and a list of lessons:
     - When clicking on a lesson (if it is not blocked), the current video will open for viewing, the user must understand which lesson from the course he is viewing.
     - It is necessary to save the progress of watching the video and the lesson of the course (save locally).
     - If the lesson is blocked, show it to the user.
     - Add 'picture in picture' effect when the video after click can be displayed in the lower right corner of the page.
     - Add a change in video playback speed via the keyboard. Also display information next to the video on how to use it. (For the following project the mentioned shortcuts: <b>[Shift + ↑]</b> : for speed up the video; <b>[Shift + ↓]</b> : for slow down the video)

Additional tasks:
- work through errors from the API;
- adaptive for the mobile version;
- video loading animation;

# Project structure
## Home page
![Home page](./src/readme/preview/video-on-card-hover.gif)
![Home page](./src/readme/preview/responsive-home-page.gif)

## Course page
![Course page](./src/readme/preview/video-lessons-page.gif)
![Course page](./src/readme/preview/responsive-courses-page.gif)

## Not Found page
![Not Found page](./src/readme/preview/not-found-page.gif)

# How to run my project locally:
  - npm i
  - npm start
  - tab will be opened automatically in your browser

If you'll have a problem with blocking CORSin your browser, you can install the [Chrome plugin](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf) https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf
And turn it on, as on the screenshot below.
![CORS issue](./src/readme/preview/cors_issue.jpeg)
