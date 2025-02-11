# Chat Challenge App

This is a simple chat application built with **Next.js**, **Tailwind CSS**, **Firebase Authentication**, **Firestore**, and **Redux**. It was originally a technical challenge given to me during a job interview some time ago. Due to circumstances beyond my control, I was never able to complete and submit it at that time. Now, I've decided to implement it on my own as a personal practice project.

## Overview

The app features:

- **User Authentication:** Sign up and Sign in with email and password using Firebase Authentication.
- **Forgot Password?:** You can ask for an email to reset your password.
- **Realtime Chat:** After signing in, users can chat in real time. Messages are stored in Firebase Firestore and are updated instantly across clients.
- **State Management:** Redux is used to manage the authentication state as well as the list of messages.
- **Responsive Design:** The UI is built with Next.js and styled using Tailwind CSS, full responsive

## How It Works

1. **Authentication:**  
   Users log in using Firebase Authentication. The user's email is stored and used to tag the messages they send.

2. **Realtime Messaging:**  
   Once logged in, the app subscribes to the Firestore messages collection. New messages are automatically rendered in real time using Firebase's `onSnapshot` listener.

3. **Sending Messages:**  
   Users can send messages either by clicking the send button or pressing the Enter key. Each message is saved in Firestore along with the sender’s email and a timestamp.

4. **Auto-Scrolling:**  
   A reference is set at the end of the message list, and every time the messages update, the view automatically scrolls to show the latest message.
