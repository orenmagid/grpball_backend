# GRPBALL

This is the backend repository for my final project for the Flatiron School's Immersive Software Engineering Bootcamp. The frontend repository is available <a href="https://github.com/orenmagid/grpball_frontend">here</a>. 

GRPBALL is an app for scheduling and organizing pickup basketball, as well as discovering other local players and groups of players.

Users can create their own groups, or search for local groups and request to join. When a group has responded, they will receive a notification. Once a user joins a group, users can engage with that group in a variety of ways: 

<ul> 
  <li>Users can chat with other group members</li>
  <li>Users can schedule games, or "sessions" of games</li>
  <li>Users can RSVP for sessions</li>
  <li>If a user is an administrator of a group, that user can search for other local players and invite them to join the group</li>
</ul> 

<a href="https://medium.com/@autoimpedicis/reflecting-about-my-final-project-917223a9fa17">Here</a>'s a short blog post about the project.



## Demo

You can check it out at https://grpball.herokuapp.com/. Because Heroku's <a href="https://devcenter.heroku.com/articles/free-dyno-hours">free dyno hours</a> <a href="https://devcenter.heroku.com/articles/free-dyno-hours#dyno-sleeping">go to sleep</a> if the app hasn't been used in thirty minutes, the app may be unresponsive for about 30 secs when you first attempt to use it. Unfortunately, this applies to the frontend and the backend. So, it may be about thirty seconds before the webpage loads, and then another delay before the database is responsive.

Feel free to use this dummy username and password combination to look around:

<ul> 
  
  <li>Username: demo</li>
  <li>Password: test</li>

</ul>



## Credits

This project uses code from several open source packages. I've listed the non-obvious ones (i.e. not Rails, React, or their dependencies) below.

On the backend:
<ul> 
  
  <li><a href="https://github.com/codahale/bcrypt-ruby">bcrypt</a></li>
  <li><a href="https://github.com/jwt/ruby-jwt">jwt</a></li>
  <li><a href="https://github.com/laserlemon/figaro">figaro</a></li>
  <li><a href="https://github.com/alexreisner/geocoder">geocoder</a></li>

</ul>

On the frontend:
<ul> 
  
  <li><a href="https://github.com/fullstackreact/google-maps-react">google-maps-react</a></li>
  <li><a href="https://momentjs.com/">moment</a></li>
  <li><a href="https://github.com/cpunion/react-actioncable-provider">react-actioncable-provider</a></li>
  <li><a href="https://github.com/intljusticemission/react-big-calendar">react-big-calendar</a></li>
  <li><a href="https://github.com/Hacker0x01/react-datepicker">react-datepicker</a></li>
  <li><a href="https://github.com/hibiken/react-places-autocomplete">react-places-autocomplete</a></li>
  <li><a href="https://github.com/contra/react-responsive">react-responsive</a></li>
  <li><a href="https://semantic-ui.com/">semantic-ui</a></li>

</ul>

## License

MIT
