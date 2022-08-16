# Capstone_Project
<p>
## Command

### Starting the app

```
cd capstone-ui
npm start
```
```
cd capstone-express-api
npm start
```
<strong>User Stories<br/> <br/>
'As a client', I want to see a list of trainers and what type odf training they provide; I also want to be able to see the price , date and time of the appointment, and review section of the trainer before booking<br/>
'As a trainer', I want to be able to post my training type, price , and time for the clients to see.<br/>
'All Users', Should be able to chat with either trainers or clients ,and join a video call when it's time for the appointment.<br/>
User Roles-<br/>

<p>'Client'-A user who is in seacrh of a fitness trainer</p>
<p>'Trainer'-A user who provides fitness services to their client </p>

<p>All Commits
<p>Login: The Login component receives username, password and classification from the user and checks the /'Users/' collection in MongoDb for a match. If found the user gains access to the website otherwise, the an error message is displayed based on the type of error <br/>

<p>Home: The home component imports a useContext classification which is set in the Login Page based on the user/'s classification and it selects what Sidebar to display. The Sidebars display link to more pages.

<p>Sidebar: The Trainer's sidebar displays Post Training, ViewBookings and Connect components for chats

<p>SidebarC: The Trainer's sidebar displays Find Training, ViewBookings,FindGym and Connect components for chats

<p>End Points</p> <br>
POST-	Create a new user account	<br/>
        Send Login Information to mongoDb
        Store all the trainings posted by each trainer
        Store all reviews
        Adding the information of all bookings to the database <br/>
GET- Getting all the users
     Retriving all the reviews to the trainees
     Retriving all reviews to each trainer based on their names
     Retriving all booking based on trainer or trainee name to display on their bookings page.
 <br/><br/>
     
<strong>Week 4-</strong><br/>
Implement the signup and login pages and connect to the database, ensure the verification of emails and usernames when logging in. There should be a checkbox to ensure the user can choose their classification: Trainer or Trainee. This implementation allows the user login based on their use of the website.<br/>
<strong>SignUp</strong>: The user enters their information in the registration form, I added tests that ensure the users cannot use the same username and email for each classification: Trainer or Trainee i.e a user can use the same email and username for trainer account and trainee account but the user can’t use the same email for a Trainer or Trainee account more than once. The data received is stored in the database and the user is directed to the login page.<br/>
<strong>Login</strong>: The user is required to put their username,  password, and classification. Once the user submits, if the authentication process is successful, the user is directed to the home page, if not an error message like Unauthorized is displayed to tell the user that to sign up instead. The user classification and name is saved in this component. <br/>
Create a home page and specify the sidebar that will be displayed based on the user’s classification.
Once the user is logged in, there is a home page displayed and the sidebar will be displayed based on their classification. If the user is a Trainer the necessary content(Post Training, View Bookings, Connect) on the sidebar is shown, same goes for the Trainee (Find Trainings, My Bookings, FindGym, Connect)<br/><br/>
<strong>Week 5- and 6.</strong><br/>
Deal with the posting of training, bookings and viewing bookings of trainers. <br/>
<strong>Post Training</strong>: A form is displayed for the Trainer to enter in their email, trainingType, class description, date and time for the class. The information will be stored in the database and will be retrieved for the trainer and trainee bookings pages.<br/>
<strong>Your Bookings</strong>: A calendar view will be displayed and beside it , for each date selected, the list of bookings will be displayed and their time. <br/>
A button will be displayed for the Trainer to view more information. Bloc tabs for Training details and reviews will be displayed.<br/>
<strong>Details</strong>: Will display the Description and price set for that training and the name and emails of people who have booked the training.<br/>
<strong>Reviews</strong>: Will display a list of reviews and ratings filtered by the Trainer’s name so the trainer can get feedback.<br/>
<br/>
**Deal with finding training, bookings and find gym features for trainees**.<br/>
<strong>Find Trainings</strong>: A calendar will be displayed starting from the present month. If the user clicks on any date, a list of all names of trainers with training that day will be displayed. <br/>
There will be a button to see all training sessions by that trainer. Disable the button of past days and add a green text color to the dates that have training. Add a description below to tell them that dates with color green have content.<br/>
**All training**: This page will show all training based on the Trainer name that is clicked. There will be a button for more information, it will have details and review tabs.<br/>
**Details**: Will display the type,description and price set for that training , the Trainer’s information and a book button. On clicking the button, the trainee and trainer who was booked information will be saved in the database. <br/>
**Reviews**: Trainees will be able to view past reviews based on the Trainer’s name and the user can decide to write a review and add rating. When submitted , the review, trainer name, trainee name, rating , and time of comment will be saved in the database.<br/>
**My Bookings**: A calendar will be displayed starting from the present month. If the user clicks on any date, a list of bookings for that day (retrieved from the database).There will be a button to see all training sessions by that trainer.<br/>
**Find Gym**: With the use of Rapid API and the google nearby places API, make an api call with the user’s longitude and latitude gotting from the navigator feature in react.<br/>
**Find Gym**: This component does the api call, stores it in a state and passes to the List component for displaying.The map component is also called in this component and the both components are placed side by side in 2 columns format. <br/>
**List**: A menu bar is shown for the user to choose how many miles distance they want to check for the gyms. Some description is shown and a Place Details component is called and receives the places array which has the list of all gyms close by based on the distance selected. A grid format is set for the place details component. Default distance is 15 miles.<br/>
**Place Details**: Receives each place in the array of all nearby places and displays the gyms image, name, status, address, and overall rating. This is displayed on a card and since called inside the List component will be displayed in a grid.<br/>
**Map**: With the use of the imported google map react dependency, the map will be displayed based on the user’s longitude and latitude. The default center of the map is set to the user’s location, once the user clicks on anywhere in the map the longitude and latitude changes which causes the api call to rerender and find different nearby locations. <br/>
There will be a button to see all training sessions by that trainer. <br/><br/>


**Week 7-**
**Find Gym**: Improved user experience  by adding a section for users to enter in Zip Code in case the user does not want their location to be disclosed. Using the place Details google api added more information about each gym displayed like the website and their google page which has all the reviews and other information about the gym. Added markers on the map for the current location from the geolocation or zip code entered and markers for each gym shown on the list. <br/>
**Find Training**: Disabled the previous and current day on the map so the users cannot book a training that has already passed. Displayed the list of Trainers available for each day beside the calendar instead of the list of training to minimize the list. Each Trainer that is clicked is then taken to an Info page which shows the reviews and all training for each trainer. The all training list shows all the training available for each trainer that day. The user can click on the details button to view a popup which shows more details and allows the user to book if they want. 
**Bookings**: Set a conflict status on the backend for the bookings so the users cannot book the same training more than once.
For the findTraining, and all bookings page, I added a lime light to the bottom of each day that had content so the users don’t have to click every day before finding which day has a training and which doesn’t. 
<br/><br/>

**Week 8- ** <br/><br/>
<p>Changed filtering parameters to id instead of name due to the possibility of more than one user with the same name. <br/>
Included real time update with mongodb change streams and socket io to enable a real time change when a trainer inserts deletes or updates the trainings.<br/>.
The real time updates will be made when the trainee is looking for training or if the trainee has booked already. 
 

