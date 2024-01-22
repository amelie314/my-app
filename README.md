# [BeatBridges Project](https://beat-bridges.vercel.app/)

BeatBridges is an integrative platform designed to streamline the search for performance spaces, foster member reviews, and facilitate engaging interactions. With the ability to browse public pages, members can interact through comments, enhancing community links and friendships.

![](public/website.png)

## Technique Overview

- **React**
  - **React Hooks**
  - **React Context**

- **TypeScript**

- **Next.js**
- **Vercel**

- **Firebase**
  - **Firestore Database**: A NoSQL database for storing and syncing data in real-time.
  - **Authentication**: Secure user authentication system that supports various sign-in methods.
  - **Storage**: Object storage solution for storing user-generated content.
    
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs directly in the markup.

## Architecture
![](public/architecture_final.png)

## Highlights

- **User-Focused Features**: Emphasizes user interaction with a community-based platform similar to popular social media experiences.
- **Personalized User Context**: Leverages React Context to manage and personalize user experience efficiently.
- **Real-Time Interaction**: Implements Firebase real-time database features to sync user interactions instantly.
- **Authentication and User Info**: Integrates Firebase Authentication and user information storage for a secure and personalized user experience.

## Feature Description

### User Profile Customization
Members can create a personalized profile, which becomes a central part of their experience on BeatBridges. 

- **Profile Information**: Set up a comprehensive user profile including a bio, profile picture, and other personal details.
- **Favorites**: Users can save their favorite venues and events, organizing them by the date added, offering an experience akin to social media platforms like Instagram.

### User Authentication and Context Management
Through the use of React's Firebase hooks and context system, BeatBridges provides a secure and customized user experience.

- **Authentication**: Secure user authentication process using Firebase, providing peace of mind and a tailored user experience.
- **User Context**: Synchronizes user state across the application using React Context, ensuring a consistent and efficient user experience.

### Interactions and Community Engagement
BeatBridges puts a strong emphasis on community engagement, allowing users to connect and share their experiences.

- **Comments and Interaction**: Users can comment on venues and engage with other community members, promoting active discussion and interaction.
- **Favorites Sorting**: Users can view their favorites sorted by the date added, providing a familiar and intuitive way to organize content, reminiscent of the 'favorites' feature on platforms like Instagram.
