# rubiks-cube-timer
A rubik's cube timer made with Vue.js and a lot of love.

First of all: please click this link [the app](https://jgdonas-rubiks-cube-timer.herokuapp.com/) so later you'll be able to check it out. The app has been deployed to Heroku, which takes a long time to start the app, so maybe when you finish reading this, it'll be available to you te test it.

This is a project used as a challenge for myself, as all I wanted was to learn how to use [**Vue.js**](https://vuejs.org/),
including [**Vuex**](https://vuex.vuejs.org/), so I can also demonstrate I will able to use it in future projects.

## About the timer

The project is composed by 4 components, a store (vuex instance) and a JavaScript class:

### Components

1. **Progress.vue**: visible at the top when there is a record to beat, this bar progress as your time is reaching out!
2. **Records.vue**: Quite simple table where you can see your previous records, and remove them just double-clicking on them! Sorted by solving time.
3. **Scrambler.vue**: To make your personal record fair, you have to scramble your cube first!! You will see a new and random sequence everytime you click on the bottom of the app!
4. **Timer.vue**: Click around the timer of press your space bar to start the timer. Do it again to stop it. Easy. As soon as you stop the timer, your new result will be store.

### Store

A Vuex instance responsible of store the state of the app, from which components gather/send info when neccesary.

As browser [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is used to store records persistently, this store instance is responsible of pull and push the necessary data.

### Classes

1. **TimeRecord.js**: class responsible of records themselves: basically storing the corresponding field and making available a set of utilities to manipulate times, as both string formatted and numerical data.

##Some annotations

Deployment to Heroku platform made me install Express as a dependency so I could serve the app as the static bunch of files it is. That's also the reason why my .gitignore file does not include the **/dist** folder: to make Heroku possible to access it as long as that folder is the real app, served as I said, as static files packaged by [webpack](https://webpack.js.org/)

## Acknowledgments

This project has been made using among many others:
* vue ui 
* webpack
* bootstrap
* a lot of google and stackoverflow

## Possible improvements:

* A decent design, specially for small devices (to be honest, not my favourite part).
* Countdown before timer starts (I really don't know how real timers work, though)
* Cloud storage so times would never be lost.
* Include tests, CI, etc.
