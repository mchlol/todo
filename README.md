# To do list - WIP

Time to tackle the ol' to do list app. 

## Technologies & tools

- Figma
- HTML
- JavaScript (vanilla)
- Bootstrap
- Sass
- Webpack
- Git
- ESLint
- Prettier

## Project set up

### Scaffolding

Linked Bootstrap via the CDN.  
Followed the [webpack project set up tutorial](https://webpack.js.org/guides/getting-started/) again  
Added sass and mini css extract plugin so sass is compiled to css into a file, instead of being injected into the head with style-loader.  
Added a watch condition to my webpack config so I can run the build command once and it stays open, watching for changes.  

### User interface 

**Start by doing research.**
Go to Dribbble and Behance and look for To do list app projects to get inspiration and ideas.  

- Tag tasks eg. work, family, community etc.
- calendar view
- lists
- stats
- set reminders
- recurring tasks eg. 'every wednesday'
- landing page
- braindump "quick note"
- habit tracking
- reschedule prior tasks - tasks from yesterday/earlier should appear in today's task view as 'overdue'
- warning if too many tasks added for today - say 6 - when there's more than 6 tasks prompt user if they want to choose another category lest they be overwhelmed
- dark mode
- mobile uses will probably prefer main activity kept to bottom of screen
- task sorting and searching
- login for persisting data e.g firebase



## Resources
[Bootsrap 4 modal is not working in sticky-top navbar](https://stackoverflow.com/questions/53315398/bootsrap-4-modal-is-not-working-in-sticky-top-navbar)  
