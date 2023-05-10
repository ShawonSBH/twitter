
# Twitter-clone



<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [User Requests](#user-requests)
    1. [Create a user](#1-create-a-user)
    1. [Get Users List](#2-get-users-list)
    1. [Log In](#3-log-in)
    1. [Specific User Details](#4-specific-user-details)
    1. [Update User](#5-update-user)
    1. [Follow User](#6-follow-user)
    1. [Unfollow User](#7-unfollow-user)
* [Tweet Requests](#tweet-requests)
    1. [Create A Tweet](#1-create-a-tweet)
    1. [Get All Tweets](#2-get-all-tweets)
    1. [ReTweet](#3-retweet)
    1. [Update Tweet](#4-update-tweet)
    1. [Delete A Tweet](#5-delete-a-tweet)
    1. [React To A Tweet](#6-react-to-a-tweet)
    1. [Comment in a Tweet](#7-comment-in-a-tweet)
    1. [Update Comment](#8-update-comment)
    1. [Delete A Comment](#9-delete-a-comment)

--------



## User Requests



### 1. Create a user



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/users
```



***Body:***

```js        
{
    "name": "Nihal Shahria Eid",
    "username": "nihalshahria",
    "email": "nihalshahria@gmail.com",
    "password": "nihalshahria",
    "dob": "2000-02-20"
}
```



### 2. Get Users List



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/users
```



### 3. Log In



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/users/login
```



***Body:***

```js        
{
    "email": "nihalshahria@gmail.com",
    "password": "nihalshahria"
}
```



### 4. Specific User Details



***Endpoint:***

```bash
Method: GET
Type: FORMDATA
URL: http://localhost:3000/api/users/645b34e2942547e5cbc076da
```



### 5. Update User



***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: http://localhost:3000/api/users/6459d93fb542bb10eb14b42c
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| name | Farhan Mahtab Mahi |  |
| username | ironblood |  |
| profilePicture |  |  |



### 6. Follow User



***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:3000/api/users/645b34e2942547e5cbc076da
```



### 7. Unfollow User



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/users/645b34e2942547e5cbc076da
```



## Tweet Requests



### 1. Create A Tweet



***Endpoint:***

```bash
Method: POST
Type: FORMDATA
URL: http://localhost:3000/api/tweets
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| image |  |  |
| content | What anime is this? |  |
| typeOfTweet | Original |  |



### 2. Get All Tweets



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/tweets
```



### 3. ReTweet



***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:3000/api/tweets/64589b98b7e59d50cebbf59f
```



### 4. Update Tweet



***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: http://localhost:3000/api/tweets/645b3aca942547e5cbc076fd
```



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| content | Which anime is this? |  |
| imageURL | /uploads/779010dbc4cf1475b936ffa05.jpg |  |
| image |  |  |



### 5. Delete A Tweet



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/tweets/645b3aca942547e5cbc076fd
```



### 6. React To A Tweet



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/react
```



***Body:***

```js        
{
    "tweetID": "645b3e10942547e5cbc07717"
}
```



### 7. Comment in a Tweet



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: http://localhost:3000/api/comment
```



***Body:***

```js        
{
    "content": "Test Comment",
    "typeOfTweet": "Comment",
    "originalTweetLink": "645b3e10942547e5cbc07717"
}
```



### 8. Update Comment



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: http://localhost:3000/api/comment
```



***Body:***

```js        
{
    "content": "Test Commen",
    "commentID": "645b5eaa942547e5cbc07754"
}
```



### 9. Delete A Comment



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/comment/645b5eaa942547e5cbc07754
```



---
[Back to top](#twitter-clone)

>Generated at 2023-05-10 15:17:39 by [docgen](https://github.com/thedevsaddam/docgen)
