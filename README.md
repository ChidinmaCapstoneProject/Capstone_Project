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
     
     
Week 4-
Implement the signup and login pages and connect to the database, ensure the verification of emails and usernames when logging in. There should be a checkbox to ensure the user can choose their classification: Trainer or Trainee. This implementation allows the user login based on their use of the website.
<strong>SignUp</strong>S: The user enters their information in the registration form, I added tests that ensure the users cannot use the same username and email for each classification: Trainer or Trainee i.e a user can use the same email and username for trainer account and trainee account but the user can’t use the same email for a Trainer or Trainee account more than once. The data received is stored in the database and the user is directed to the login page.
Login: The user is required to put their username,  password, and classification. Once the user submits, if the authentication process is successful, the user is directed to the home page, if not an error message like Unauthorized is displayed to tell the user that to sign up instead. The user classification and name is saved in this component. 
Create a home page and specify the sidebar that will be displayed based on the user’s classification.
Once the user is logged in, there is a home page displayed and the sidebar will be displayed based on their classification. If the user is a Trainer the necessary content(Post Training, View Bookings, Connect) on the sidebar is shown, same goes for the Trainee (Find Trainings, My Bookings, FindGym, Connect)
Week 5- and 6.
Deal with the posting of training, bookings and viewing bookings of trainers. 
Post Training: A form is displayed for the Trainer to enter in their email, trainingType, class description, date and time for the class. The information will be stored in the database and will be retrieved for the trainer and trainee bookings pages.
Your Bookings: A calendar view will be displayed and beside it , for each date selected, the list of bookings will be displayed and their time. 
A button will be displayed for the Trainer to view more information. Bloc tabs for Training details and reviews will be displayed.
Details: Will display the Description and price set for that training and the name and emails of people who have booked the training.
Reviews: Will display a list of reviews and ratings filtered by the Trainer’s name so the trainer can get feedback.

Deal with finding training, bookings and find gym features for trainees.
Find Trainings: A calendar will be displayed starting from the present month. If the user clicks on any date, a list of all names of trainers with training that day will be displayed. 

