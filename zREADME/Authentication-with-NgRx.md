
# Authentication with NgRx

> https://www.youtube.com/watch?v=46IRQgNtCGw

I'm excited to give a talk about a frequently asked question when using ngrx which is authenication . Authenication is a critical piece when managing access to your application from handing initial login to checking each page during navigation . Ngrx provides an architecture to handle this process with structure and predictablility . So let's us look at soe of the goals we want to cover when building using authenication with ngrx 

## Goals 

1. Handle authenication lifecycle from logging in checking pages and logging out 

2. Manage state for authenicated user when a man is the state for the authenicated user which includes capture any information about user that's returned from the backend 

3. Provide shared user information across components , since store is a global state container we can use it to share with components and services across our app 

## Benefits of using ngrx for authenication 

1. Great example of shared state

> One of the questions we see most that also comes up is what goes in the store and this authenication is a great example of shared state. Authenication is shared throughout the app it can be changed from different areas of that like if you're logging out and you can also hydrate this state when you're using it on mobile or server-side rendering 

2. Independent of anthenication schema 

3. Reduce API calls 

4. Can be package and shared 

## Actions 

1. Descriptive

> The first thing when building an authenication engine within ngrx are Actions . Actions are ,meant to be decriptive ,action described unique events in your application and provide context to where those actions came from .  

2. Spicific 

> Actions are specific because we're capturing certain events and we don't want then to be too generic 

3. Cause state changes 

> These state changes are handled by reducers to transition from one state to the next 

4. trigger side effects 

> Side effects are where we connect with external resource and also provide actions back to the store 


## Action Categories

1. Auth

> It's good to break these actions into a few categories . The first being the Auth category which is where we capture actions for handling the authenicated user including logging and logging out 

2. Authenication API

> We also group authenication API into category and this are requests and reponses that come back from the backend 

3. Login Page 

> We also capture actions about the specific UI events that happen on the login page when the user interact were clicking buttons or other interactions that may occur 

Actions determine flow for UI events writing these actions upfront allow you to map out entire user flows before even writing reducers or effects  


![](../images/ngrx-actions.png)

## States

> Two state we're going to cover here are the login page and authenication sate 

1. Login page State

```ts
// Login page is described as an interface  
interface LoginPageState {
    // which can be used to form( 构建) or disable the display spinners while the request is being processed  
    pending: boolean; 
    // error property is to display that relevant information back to the user in case of a failure 
    error: string | null;
}

```

2. Authenication state

```ts


```