# COP-4331C-MERN
A simple expense tracker application for tracking expenses and a monthly budget. 


To run the application:
In the front-end folder, the following environment variable should be set for HTTPS: "$Env:HTTPS = 'true'"
Then the front-end can be run with 'npm start'

To have a local domain work, change the hosts file located at: "C:\Windows\System32\drivers\etc\hosts". Add the line: "127.0.0.1  expenseExpert" to the end and save (with admin priviledges).
On your browser, to allow usage of a self-signed certificate, navigate to the backend at https://expenseExpert:433/ and click 'advanced' and then 'proceed...'. Do the same for the front end at https://expenseExpert:3000.

Run npm start in both the front and back end folders. 

An API key for sendgrid is required which should be located in the server / backend folder.
