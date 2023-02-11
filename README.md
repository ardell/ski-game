# Ski Game

This is a ski game that I built with help of my niece. All credit for artwork
goes to Molly!

It is built with [Phaser](https://phaser.io/), using the Ruby Starter Kit.

[Check out the demo here](https://ardell.github.io/ski-game/)

## Dependencies

- Git (on OS X install via homebrew)
- Ruby 3.2.1 (we recommend using RVM)

## Installation

1. Clone this repository, e.g. `git clone https://github.com/ardell/ski-game.git`
1. `cd ski-game`
1. `bundle` This installs ruby dependencies, such as your web server

## Building your game

You'll build your game in the `public` directory. We've started you out with Phaser's [Hello World Example](http://phaser.io/getting-started-js6.php) so all you should have to do is start building. `public/index.html` is the page that will be served at `/`, `images`, javascripts (`js`), and stylesheets (`css`) each have their own directory within `public`. Mostly you'll be working in `public/js/app.js`.

## Running your game

Within your game directory, run `foreman start`, then go to `http://localhost:5000` in your browser.

## Deploying

To deploy your game to [GitHub Pages](https://pages.github.com/)...

1. Create a GitHub repository for your game.
1. Add your GitHub repository as a remote called "origin", e.g. `git remote add origin git@github.com:username/repository.git` where "username" is your GitHub username and "repository" is the name of the GitHub repository you created for your game. 
1. Commit all changes that you want to be deployed.
1. Run `rake deploy`.
1. View your game at: `https://[username].github.io/[repository]` where "username" is your GitHub username and "repository" is the name of the GitHub repository you created for your game.

