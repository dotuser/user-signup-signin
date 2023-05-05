# user-signup-signin

User Authentication using Node.js, Express.js, MongoDB, BootStrap, and Ejs.

To use this code, follow the given steps carefully:

1.  Create a new folder or go to existing project folder and open the Terminal.

2.  In your Terminal run the following command:

          git clone https://github.com/dotuser/user-signup-signin.git


3.  Now navigate into the project folder:

          cd user-signup-signin


4.  Now install node modules:

          npm install


5.  Create a new file by the name of ".env" without the quotes and the file must start with the "."

6.  Open the .env file in your Visual Studio Code or any preferred IDE and the paste the following code in the .env file:

          PORT=3000
          URI=Your-MongoDB-URI

7.  Your MongoDB URI will look like the following code:

          mongodb+srv://ahmed-hassan:<password>@projects.hygwobt.mongodb.net/?retryWrites=true&w=majority

8.  Your username will be written instead of "ahmed-hassan" and change "<password>" with your own password.

9.  In the URI, write your database name after ".net/" and before "?retry" without any space.

10. mongodb+srv://ahmed-hassan:<password>@projects.hygwobt.mongodb.net/ WRITE YOUR DB NAME HERE ?retryWrites=true&w=majority

11. Example of my URI:

           mongodb+srv://ahmed-hassan:abc123xyz@projects.hygwobt.mongodb.net/userDB?retryWrites=true&w=majority

12. Go to the terminal and run the following command to start the project:

            npm start

13. Go to your browser and to see the website, open:

            localhost:3000
