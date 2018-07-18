# JWT-PubNub-Functions
This repository has a sample PubNub function that generates JSON Web Token for authorization to use Google Drive's Rest API.

# QuickStart
1. Sign Up for PubNub and create a new Project.
<a href="https://dashboard.pubnub.com/signup?devrel_gh=JWT-PubNub-Functions">
    <img alt="PubNub Signup" src="https://i.imgur.com/og5DDjf.png" width=260 height=97/>
</a>
2. Copy and Paste the code from file completeAuth.js into a new PubNub function called **completeAuth**.
3. Create a service account that grants us the necessary permissions to access certain data stored on Google Cloud. 
To do this head over to your Google Cloud Console. Find your project or create a new one if you do not have one already. 
Then, inside your project, head to IAM and Admin then Service Accounts. Here click Create New Service Account and choose the role Service Account Admin. 
Select Furnish a new Private Key and once you create your service account, the console will download the JSON file with your private key onto your computer. 
Now we have successfully created the service account. Make sure to keep the JSON file with the service account credentials safe on your computer, as we will need these credentials later.
4. Enter the private key and service account email address where it says to insert them in the PubNub Functions code.
5. Create a new Sample Document, with the text, "This is a sample document!".
6. Find the document by using its file ID. In order to obtain the file ID of your document, navigate to your share button and it will be inside the URL. 
7. In the getDriveFileURL insert this ID, where it says to.
8. Ensure that your PubNub functions module is running so that the server side code you have written is deployed and active.
9. Press the Get button to make a sample request to your PubNub function. It should log the body of the document, "This is a sample document!".
