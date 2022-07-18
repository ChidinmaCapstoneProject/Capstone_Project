# Capstone_Project

User Stories-
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
