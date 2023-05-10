
# Twitter-clone



<!--- If we have only one group/collection, then no need for the "ungrouped" heading -->



## Endpoints

* [User Requests](#user-requests)
    1. [Create a user](#1-create-a-user)
        * [Create a user](#i-example-request-create-a-user)
    1. [Get Users List](#2-get-users-list)
        * [Get Users List](#i-example-request-get-users-list)
    1. [Log In](#3-log-in)
        * [Log In](#i-example-request-log-in)
    1. [Specific User Details](#4-specific-user-details)
        * [Specific User Details](#i-example-request-specific-user-details)
    1. [Update User](#5-update-user)
        * [Update User](#i-example-request-update-user)
    1. [Follow User](#6-follow-user)
        * [Follow User](#i-example-request-follow-user)
    1. [Unfollow User](#7-unfollow-user)
        * [Unfollow User](#i-example-request-unfollow-user)
* [Tweet Requests](#tweet-requests)
    1. [Create A Tweet](#1-create-a-tweet)
        * [Create A Tweet](#i-example-request-create-a-tweet)
    1. [Get All Tweets](#2-get-all-tweets)
        * [Get All Tweets](#i-example-request-get-all-tweets)
    1. [ReTweet](#3-retweet)
        * [ReTweet](#i-example-request-retweet)
    1. [Update Tweet](#4-update-tweet)
        * [Update Tweet](#i-example-request-update-tweet)
    1. [Delete A Tweet](#5-delete-a-tweet)
        * [Delete A Tweet](#i-example-request-delete-a-tweet)
    1. [React To A Tweet](#6-react-to-a-tweet)
        * [React To A Tweet](#i-example-request-react-to-a-tweet)
        * [React Removed From A Tweet](#ii-example-request-react-removed-from-a-tweet)
    1. [Comment in a Tweet](#7-comment-in-a-tweet)
        * [Comment in a Tweet](#i-example-request-comment-in-a-tweet)
    1. [Update Comment](#8-update-comment)
        * [Update Comment](#i-example-request-update-comment)
    1. [Delete A Comment](#9-delete-a-comment)
        * [Delete A Comment](#i-example-request-delete-a-comment)

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



***More example Requests/Responses:***


#### I. Example Request: Create a user



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



#### I. Example Response: Create a user
```js
{
    "success": true,
    "data": {
        "name": "Nihal Shahria Eid",
        "username": "nihalshahria",
        "email": "nihalshahria@gmail.com",
        "password": "$2b$12$/k6d.C0uQnuna56xhCSyreyvSrnO6XxbG78kxIm8NZv2W9N.ocMcu",
        "dob": "2000-02-20T00:00:00.000Z",
        "followers": [],
        "following": [],
        "profilePicture": "/users.png",
        "messageNotifications": [],
        "_id": "645b34e2942547e5cbc076da",
        "createdAt": "2023-05-10T06:08:34.956Z",
        "updatedAt": "2023-05-10T06:08:34.956Z",
        "__v": 0
    }
}
```


***Status Code:*** 201

<br>



### 2. Get Users List



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/users
```



***More example Requests/Responses:***


#### I. Example Request: Get Users List



***Body: None***



#### I. Example Response: Get Users List
```js
{
    "success": true,
    "users": [
        {
            "_id": "642e7a82298841009d108385",
            "name": "Mohammed Mazhar Ali Shawon",
            "username": "shawon204",
            "email": "shawon2046@gmail.com",
            "password": "$2b$12$xK5JWEpLnrDMdCN3BI75aePbl.sRaMkaejVLnZmQWqe3qK5/cikpO",
            "dob": "2000-12-10T18:00:00.000Z",
            "followers": [
                "6459d93fb542bb10eb14b42c"
            ],
            "following": [
                "642e7b40298841009d1083a6",
                "642e7baf298841009d1083ba"
            ],
            "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg",
            "createdAt": "2023-04-06T07:53:38.325Z",
            "updatedAt": "2023-05-09T10:16:09.208Z",
            "__v": 0,
            "messageNotifications": []
        },
        {
            "messageNotifications": [],
            "_id": "642e7b40298841009d1083a6",
            "name": "Sourav Ahmed",
            "username": "sourav5654",
            "email": "sourav5654@gmail.com",
            "password": "$2b$12$XoqTryEJCVGGT.WxTE/kFu7nU8mZ4jV0GuZjE5PxAunmevsynZpLG",
            "dob": "1999-08-14T18:00:00.000Z",
            "followers": [
                "642e7a82298841009d108385",
                "6459d93fb542bb10eb14b42c"
            ],
            "following": [],
            "profilePicture": "/uploads/73bdb40d097cfce1e8e695201.jpg",
            "createdAt": "2023-04-06T07:56:48.841Z",
            "updatedAt": "2023-05-09T09:53:09.694Z",
            "__v": 0
        },
        {
            "_id": "642e7baf298841009d1083ba",
            "name": "Maruf",
            "username": "heromaruf",
            "email": "heromaruf@gmail.com",
            "password": "$2b$12$Zdbga0CYSvJq56NHRjrJTeNxngvuzV.syAhyzcVMmVWaVTQpomxMS",
            "dob": "1998-10-18T18:00:00.000Z",
            "followers": [
                "642e7a82298841009d108385"
            ],
            "following": [],
            "profilePicture": "/uploads/73bdb40d097cfce1e8e695202.jpg",
            "createdAt": "2023-04-06T07:58:39.891Z",
            "updatedAt": "2023-05-08T11:25:43.314Z",
            "__v": 0,
            "messageNotifications": []
        },
        {
            "_id": "6458e887b7e59d50cebbf6dc",
            "name": "Sabit",
            "username": "sabit12",
            "email": "sabit12@gmail.com",
            "password": "$2b$12$0ulQKh.NJskkA5fpyKxoB.g8.ndEJxweXsEf13D7W1TzpE6X1c/oO",
            "dob": "1997-02-14T18:00:00.000Z",
            "followers": [],
            "following": [],
            "profilePicture": "/users.png",
            "messageNotifications": [],
            "createdAt": "2023-05-08T12:18:15.556Z",
            "updatedAt": "2023-05-08T12:18:15.556Z",
            "__v": 0
        },
        {
            "_id": "6459d93fb542bb10eb14b42c",
            "name": "Farhan Mahtab Mahi",
            "username": "ironblood",
            "email": "ironblood@gmail.com",
            "password": "$2b$12$kv12/X8eE3GRcPf70rS7SevlKaoMBiGkuOYhp2puobYUG.EvunuFS",
            "dob": "2000-08-16T18:00:00.000Z",
            "followers": [],
            "following": [
                "642e7b40298841009d1083a6",
                "642e7a82298841009d108385"
            ],
            "profilePicture": "/uploads/c51d9b6c0c6cb1f585c66cd00.jpeg",
            "messageNotifications": [],
            "createdAt": "2023-05-09T05:25:19.394Z",
            "updatedAt": "2023-05-09T11:44:23.810Z",
            "__v": 0
        },
        {
            "_id": "645b34e2942547e5cbc076da",
            "name": "Nihal Shahria Eid",
            "username": "nihalshahria",
            "email": "nihalshahria@gmail.com",
            "password": "$2b$12$/k6d.C0uQnuna56xhCSyreyvSrnO6XxbG78kxIm8NZv2W9N.ocMcu",
            "dob": "2000-02-20T00:00:00.000Z",
            "followers": [],
            "following": [],
            "profilePicture": "/users.png",
            "messageNotifications": [],
            "createdAt": "2023-05-10T06:08:34.956Z",
            "updatedAt": "2023-05-10T06:08:34.956Z",
            "__v": 0
        }
    ]
}
```


***Status Code:*** 200

<br>



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



***More example Requests/Responses:***


#### I. Example Request: Log In



***Body:***

```js        
{
    "email": "nihalshahria@gmail.com",
    "password": "nihalshahria"
}
```



#### I. Example Response: Log In
```js
{
    "success": true,
    "message": "Logged In",
    "user": {
        "_id": "645b34e2942547e5cbc076da",
        "name": "Nihal Shahria Eid",
        "username": "nihalshahria",
        "email": "nihalshahria@gmail.com",
        "password": "$2b$12$/k6d.C0uQnuna56xhCSyreyvSrnO6XxbG78kxIm8NZv2W9N.ocMcu",
        "dob": "2000-02-20T00:00:00.000Z",
        "followers": [],
        "following": [],
        "profilePicture": "/users.png",
        "messageNotifications": [],
        "createdAt": "2023-05-10T06:08:34.956Z",
        "updatedAt": "2023-05-10T06:08:34.956Z",
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



### 4. Specific User Details



***Endpoint:***

```bash
Method: GET
Type: FORMDATA
URL: http://localhost:3000/api/users/645b34e2942547e5cbc076da
```



***More example Requests/Responses:***


#### I. Example Request: Specific User Details



#### I. Example Response: Specific User Details
```js
{
    "success": true,
    "data": {
        "_id": "645b34e2942547e5cbc076da",
        "name": "Nihal Shahria Eid",
        "username": "nihalshahria",
        "email": "nihalshahria@gmail.com",
        "password": "$2b$12$/k6d.C0uQnuna56xhCSyreyvSrnO6XxbG78kxIm8NZv2W9N.ocMcu",
        "dob": "2000-02-20T00:00:00.000Z",
        "followers": [],
        "following": [],
        "profilePicture": "/users.png",
        "messageNotifications": [],
        "createdAt": "2023-05-10T06:08:34.956Z",
        "updatedAt": "2023-05-10T06:08:34.956Z",
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



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



***More example Requests/Responses:***


#### I. Example Request: Update User



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| name | Farhan Mahtab Mahi |  |
| username | ironblood |  |
| profilePicture |  |  |



#### I. Example Response: Update User
```js
{
    "success": true,
    "data": {
        "_id": "6459d93fb542bb10eb14b42c",
        "name": "Farhan Mahtab Mahi",
        "username": "ironblood",
        "email": "ironblood@gmail.com",
        "password": "$2b$12$kv12/X8eE3GRcPf70rS7SevlKaoMBiGkuOYhp2puobYUG.EvunuFS",
        "dob": "2000-08-16T18:00:00.000Z",
        "followers": [],
        "following": [
            "642e7b40298841009d1083a6",
            "642e7a82298841009d108385"
        ],
        "profilePicture": "/uploads/779010dbc4cf1475b936ffa04.jpeg",
        "messageNotifications": [],
        "createdAt": "2023-05-09T05:25:19.394Z",
        "updatedAt": "2023-05-10T06:25:14.147Z",
        "__v": 0
    }
}
```


***Status Code:*** 200

<br>



### 6. Follow User



***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:3000/api/users/645b34e2942547e5cbc076da
```



***More example Requests/Responses:***


#### I. Example Request: Follow User



***Body: None***



#### I. Example Response: Follow User
```js
{
    "success": true,
    "message": "You started following 645b34e2942547e5cbc076da"
}
```


***Status Code:*** 200

<br>



### 7. Unfollow User



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/users/645b34e2942547e5cbc076da
```



***More example Requests/Responses:***


#### I. Example Request: Unfollow User



***Body: None***



#### I. Example Response: Unfollow User
```js
{
    "success": true,
    "message": "You unfollowed 645b34e2942547e5cbc076da"
}
```


***Status Code:*** 200

<br>



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



***More example Requests/Responses:***


#### I. Example Request: Create A Tweet



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| image |  |  |
| content | What anime is this? |  |
| typeOfTweet | Original |  |



#### I. Example Response: Create A Tweet
```js
{
    "success": true,
    "tweet": {
        "content": "What anime is this?",
        "image": "/uploads/779010dbc4cf1475b936ffa06.jpg",
        "comments": [],
        "likes": [],
        "retweets": [],
        "typeOfTweet": "Original",
        "createdBy": {
            "_id": "6459d93fb542bb10eb14b42c",
            "name": "Farhan Mahtab Mahi",
            "username": "ironblood",
            "email": "ironblood@gmail.com",
            "profilePicture": "/uploads/779010dbc4cf1475b936ffa04.jpeg"
        },
        "_id": "645b3e10942547e5cbc07717",
        "createdAt": "2023-05-10T06:47:44.271Z",
        "updatedAt": "2023-05-10T06:47:44.271Z",
        "__v": 0
    }
}
```


***Status Code:*** 201

<br>



### 2. Get All Tweets



***Endpoint:***

```bash
Method: GET
Type: 
URL: http://localhost:3000/api/tweets
```



***More example Requests/Responses:***


#### I. Example Request: Get All Tweets



***Body: None***



#### I. Example Response: Get All Tweets
```js
{
    "success": true,
    "tweets": [
        {
            "_id": "645b3aca942547e5cbc076fd",
            "content": "What anime is this?",
            "image": "/uploads/779010dbc4cf1475b936ffa05.jpg",
            "comments": [],
            "likes": [],
            "retweets": [],
            "typeOfTweet": "Original",
            "createdBy": {
                "_id": "6459d93fb542bb10eb14b42c",
                "name": "Farhan Mahtab Mahi",
                "username": "ironblood",
                "email": "ironblood@gmail.com",
                "profilePicture": "/uploads/779010dbc4cf1475b936ffa04.jpeg"
            },
            "createdAt": "2023-05-10T06:33:46.709Z",
            "updatedAt": "2023-05-10T06:33:46.709Z",
            "__v": 0
        },
        {
            "_id": "645a2a28e0ed9947adbc1428",
            "comments": [],
            "likes": [],
            "retweets": [],
            "typeOfTweet": "Retweet",
            "originalTweetLink": {
                "_id": "64364ba3a0562763a8361d6d",
                "content": "Hello",
                "image": "/uploads/dcba569d057ab54ac1d043400.jpeg",
                "comments": [
                    {
                        "_id": "643668d6a0562763a8361ed5",
                        "content": "2nd Comment",
                        "comments": [],
                        "likes": [],
                        "retweets": [],
                        "typeOfTweet": "Comment",
                        "originalTweetLink": "64364ba3a0562763a8361d6d",
                        "createdBy": {
                            "_id": "642e7a82298841009d108385",
                            "name": "Mohammed Mazhar Ali Shawon",
                            "username": "shawon204",
                            "email": "shawon2046@gmail.com",
                            "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
                        },
                        "createdAt": "2023-04-12T08:16:22.428Z",
                        "updatedAt": "2023-04-12T08:16:22.428Z",
                        "__v": 0
                    },
                    {
                        "_id": "6436673ba0562763a8361e99",
                        "content": "Hi",
                        "comments": [],
                        "likes": [],
                        "retweets": [],
                        "typeOfTweet": "Comment",
                        "originalTweetLink": "64364ba3a0562763a8361d6d",
                        "createdBy": {
                            "_id": "642e7a82298841009d108385",
                            "name": "Mohammed Mazhar Ali Shawon",
                            "username": "shawon204",
                            "email": "shawon2046@gmail.com",
                            "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
                        },
                        "createdAt": "2023-04-12T08:09:31.784Z",
                        "updatedAt": "2023-04-12T08:09:31.784Z",
                        "__v": 0
                    }
                ],
                "likes": [
                    "6459d93fb542bb10eb14b42c"
                ],
                "retweets": [
                    "642e7a82298841009d108385",
                    "6459d93fb542bb10eb14b42c"
                ],
                "createdBy": {
                    "_id": "642e7a82298841009d108385",
                    "name": "Mohammed Mazhar Ali Shawon",
                    "username": "shawon204",
                    "email": "shawon2046@gmail.com",
                    "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
                }
            },
            "createdBy": {
                "_id": "6459d93fb542bb10eb14b42c",
                "name": "Farhan Mahtab Mahi",
                "username": "ironblood",
                "email": "ironblood@gmail.com",
                "profilePicture": "/uploads/779010dbc4cf1475b936ffa04.jpeg"
            },
            "createdAt": "2023-05-09T11:10:32.824Z",
            "updatedAt": "2023-05-09T11:10:32.824Z",
            "__v": 0
        },
        {
            "_id": "64589b98b7e59d50cebbf59f",
            "content": "Nice scenario",
            "image": "/uploads/1e8b3a8a0232d7c6aae743000.io-sunset-wallpaper-4k-3202978.jpg",
            "comments": [],
            "likes": [],
            "retweets": [],
            "typeOfTweet": "Original",
            "createdBy": {
                "_id": "642e7a82298841009d108385",
                "name": "Mohammed Mazhar Ali Shawon",
                "username": "shawon204",
                "email": "shawon2046@gmail.com",
                "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
            },
            "createdAt": "2023-05-08T06:50:00.415Z",
            "updatedAt": "2023-05-08T09:15:58.857Z",
            "__v": 0
        },
        {
            "_id": "6450a9e96d1963f343f643dc",
            "content": "Hello",
            "image": null,
            "comments": [
                {
                    "_id": "6450a9f56d1963f343f643e1",
                    "content": "I am back",
                    "comments": [
                        {
                            "_id": "645a2a62e0ed9947adbc144f",
                            "content": "Welcome Back",
                            "comments": [],
                            "likes": [],
                            "retweets": [],
                            "typeOfTweet": "Comment",
                            "originalTweetLink": "6450a9f56d1963f343f643e1",
                            "createdBy": {
                                "_id": "6459d93fb542bb10eb14b42c",
                                "name": "Farhan Mahtab Mahi",
                                "username": "ironblood",
                                "email": "ironblood@gmail.com",
                                "profilePicture": "/uploads/779010dbc4cf1475b936ffa04.jpeg"
                            },
                            "createdAt": "2023-05-09T11:11:30.119Z",
                            "updatedAt": "2023-05-09T11:11:30.119Z",
                            "__v": 0
                        }
                    ],
                    "likes": [
                        "6459d93fb542bb10eb14b42c"
                    ],
                    "retweets": [],
                    "typeOfTweet": "Comment",
                    "originalTweetLink": "6450a9e96d1963f343f643dc",
                    "createdBy": {
                        "_id": "642e7a82298841009d108385",
                        "name": "Mohammed Mazhar Ali Shawon",
                        "username": "shawon204",
                        "email": "shawon2046@gmail.com",
                        "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
                    },
                    "createdAt": "2023-05-02T06:13:09.952Z",
                    "updatedAt": "2023-05-09T11:11:30.541Z",
                    "__v": 0
                }
            ],
            "likes": [
                "642e7a82298841009d108385",
                "6459d93fb542bb10eb14b42c"
            ],
            "retweets": [],
            "typeOfTweet": "Original",
            "createdBy": {
                "_id": "642e7a82298841009d108385",
                "name": "Mohammed Mazhar Ali Shawon",
                "username": "shawon204",
                "email": "shawon2046@gmail.com",
                "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
            },
            "createdAt": "2023-05-02T06:12:57.844Z",
            "updatedAt": "2023-05-09T11:09:53.499Z",
            "__v": 0
        },
        {
            "_id": "64366741a0562763a8361ea0",
            "content": "Hello",
            "image": null,
            "comments": [],
            "likes": [],
            "retweets": [],
            "typeOfTweet": "Retweet",
            "originalTweetLink": {
                "_id": "64364ba3a0562763a8361d6d",
                "content": "Hello",
                "image": "/uploads/dcba569d057ab54ac1d043400.jpeg",
                "comments": [
                    {
                        "_id": "643668d6a0562763a8361ed5",
                        "content": "2nd Comment",
                        "comments": [],
                        "likes": [],
                        "retweets": [],
                        "typeOfTweet": "Comment",
                        "originalTweetLink": "64364ba3a0562763a8361d6d",
                        "createdBy": {
                            "_id": "642e7a82298841009d108385",
                            "name": "Mohammed Mazhar Ali Shawon",
                            "username": "shawon204",
                            "email": "shawon2046@gmail.com",
                            "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
                        },
                        "createdAt": "2023-04-12T08:16:22.428Z",
                        "updatedAt": "2023-04-12T08:16:22.428Z",
                        "__v": 0
                    },
                    {
                        "_id": "6436673ba0562763a8361e99",
                        "content": "Hi",
                        "comments": [],
                        "likes": [],
                        "retweets": [],
                        "typeOfTweet": "Comment",
                        "originalTweetLink": "64364ba3a0562763a8361d6d",
                        "createdBy": {
                            "_id": "642e7a82298841009d108385",
                            "name": "Mohammed Mazhar Ali Shawon",
                            "username": "shawon204",
                            "email": "shawon2046@gmail.com",
                            "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
                        },
                        "createdAt": "2023-04-12T08:09:31.784Z",
                        "updatedAt": "2023-04-12T08:09:31.784Z",
                        "__v": 0
                    }
                ],
                "likes": [
                    "6459d93fb542bb10eb14b42c"
                ],
                "retweets": [
                    "642e7a82298841009d108385",
                    "6459d93fb542bb10eb14b42c"
                ],
                "createdBy": {
                    "_id": "642e7a82298841009d108385",
                    "name": "Mohammed Mazhar Ali Shawon",
                    "username": "shawon204",
                    "email": "shawon2046@gmail.com",
                    "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
                }
            },
            "createdBy": {
                "_id": "642e7a82298841009d108385",
                "name": "Mohammed Mazhar Ali Shawon",
                "username": "shawon204",
                "email": "shawon2046@gmail.com",
                "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
            },
            "createdAt": "2023-04-12T08:09:37.401Z",
            "updatedAt": "2023-04-12T08:10:04.321Z",
            "__v": 0
        },
        {
            "_id": "64364ba3a0562763a8361d6d",
            "content": "Hello",
            "image": "/uploads/dcba569d057ab54ac1d043400.jpeg",
            "comments": [
                {
                    "_id": "643668d6a0562763a8361ed5",
                    "content": "2nd Comment",
                    "comments": [],
                    "likes": [],
                    "retweets": [],
                    "typeOfTweet": "Comment",
                    "originalTweetLink": "64364ba3a0562763a8361d6d",
                    "createdBy": {
                        "_id": "642e7a82298841009d108385",
                        "name": "Mohammed Mazhar Ali Shawon",
                        "username": "shawon204",
                        "email": "shawon2046@gmail.com",
                        "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
                    },
                    "createdAt": "2023-04-12T08:16:22.428Z",
                    "updatedAt": "2023-04-12T08:16:22.428Z",
                    "__v": 0
                },
                {
                    "_id": "6436673ba0562763a8361e99",
                    "content": "Hi",
                    "comments": [],
                    "likes": [],
                    "retweets": [],
                    "typeOfTweet": "Comment",
                    "originalTweetLink": "64364ba3a0562763a8361d6d",
                    "createdBy": {
                        "_id": "642e7a82298841009d108385",
                        "name": "Mohammed Mazhar Ali Shawon",
                        "username": "shawon204",
                        "email": "shawon2046@gmail.com",
                        "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
                    },
                    "createdAt": "2023-04-12T08:09:31.784Z",
                    "updatedAt": "2023-04-12T08:09:31.784Z",
                    "__v": 0
                }
            ],
            "likes": [
                "6459d93fb542bb10eb14b42c"
            ],
            "retweets": [
                "642e7a82298841009d108385",
                "6459d93fb542bb10eb14b42c"
            ],
            "typeOfTweet": "Original",
            "createdBy": {
                "_id": "642e7a82298841009d108385",
                "name": "Mohammed Mazhar Ali Shawon",
                "username": "shawon204",
                "email": "shawon2046@gmail.com",
                "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
            },
            "createdAt": "2023-04-12T06:11:47.486Z",
            "updatedAt": "2023-05-09T11:10:33.232Z",
            "__v": 34
        }
    ]
}
```


***Status Code:*** 200

<br>



### 3. ReTweet



***Endpoint:***

```bash
Method: POST
Type: 
URL: http://localhost:3000/api/tweets/64589b98b7e59d50cebbf59f
```



***More example Requests/Responses:***


#### I. Example Request: ReTweet



***Body: None***



#### I. Example Response: ReTweet
```js
{
    "success": true,
    "message": "Retweet Successful",
    "tweet": {
        "comments": [],
        "likes": [],
        "retweets": [],
        "typeOfTweet": "Retweet",
        "originalTweetLink": {
            "_id": "64589b98b7e59d50cebbf59f",
            "content": "Nice scenario",
            "image": "/uploads/1e8b3a8a0232d7c6aae743000.io-sunset-wallpaper-4k-3202978.jpg",
            "comments": [],
            "likes": [],
            "retweets": [
                "6459d93fb542bb10eb14b42c"
            ],
            "createdBy": {
                "_id": "642e7a82298841009d108385",
                "name": "Mohammed Mazhar Ali Shawon",
                "username": "shawon204",
                "email": "shawon2046@gmail.com",
                "profilePicture": "/uploads/21bcbac6f40d9b30643dbb909.jpg"
            }
        },
        "createdBy": {
            "_id": "6459d93fb542bb10eb14b42c",
            "name": "Farhan Mahtab Mahi",
            "username": "ironblood",
            "email": "ironblood@gmail.com",
            "profilePicture": "/uploads/779010dbc4cf1475b936ffa04.jpeg"
        },
        "_id": "645b3c6a942547e5cbc0770b",
        "createdAt": "2023-05-10T06:40:42.103Z",
        "updatedAt": "2023-05-10T06:40:42.103Z",
        "__v": 0
    }
}
```


***Status Code:*** 201

<br>



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



***More example Requests/Responses:***


#### I. Example Request: Update Tweet



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| content | Which anime is this? |  |
| imageURL | /uploads/779010dbc4cf1475b936ffa05.jpg |  |
| image |  |  |



#### I. Example Response: Update Tweet
```js
{
    "success": true,
    "tweet": {
        "_id": "645b3aca942547e5cbc076fd",
        "content": "Which anime is this?",
        "image": "/uploads/779010dbc4cf1475b936ffa05.jpg",
        "comments": [],
        "likes": [],
        "retweets": [],
        "typeOfTweet": "Original",
        "createdBy": {
            "_id": "6459d93fb542bb10eb14b42c",
            "name": "Farhan Mahtab Mahi",
            "username": "ironblood",
            "email": "ironblood@gmail.com",
            "profilePicture": "/uploads/779010dbc4cf1475b936ffa04.jpeg"
        },
        "createdAt": "2023-05-10T06:33:46.709Z",
        "updatedAt": "2023-05-10T06:45:16.783Z",
        "__v": 0
    }
}
```


***Status Code:*** 201

<br>



### 5. Delete A Tweet



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/tweets/645b3aca942547e5cbc076fd
```



***More example Requests/Responses:***


#### I. Example Request: Delete A Tweet



***Body: None***



#### I. Example Response: Delete A Tweet
```js
{
    "success": true,
    "message": "Tweet deleted"
}
```


***Status Code:*** 200

<br>



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



***More example Requests/Responses:***


#### I. Example Request: React To A Tweet



***Body:***

```js        
{
    "tweetID": "645b3e10942547e5cbc07717"
}
```



#### I. Example Response: React To A Tweet
```js
{
    "success": true,
    "message": "Reacted to this post"
}
```


***Status Code:*** 201

<br>



#### II. Example Request: React Removed From A Tweet



***Body:***

```js        
{
    "tweetID": "645b3e10942547e5cbc07717"
}
```



#### II. Example Response: React Removed From A Tweet
```js
{
    "success": true,
    "message": "React Deleted to this post"
}
```


***Status Code:*** 201

<br>



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



***More example Requests/Responses:***


#### I. Example Request: Comment in a Tweet



***Body:***

```js        
{
    "content": "Test Comment",
    "typeOfTweet": "Comment",
    "originalTweetLink": "645b3e10942547e5cbc07717"
}
```



#### I. Example Response: Comment in a Tweet
```js
{
    "success": true,
    "comment": {
        "content": "Test Comment",
        "comments": [],
        "likes": [],
        "retweets": [],
        "typeOfTweet": "Comment",
        "originalTweetLink": "645b3e10942547e5cbc07717",
        "createdBy": {
            "_id": "6459d93fb542bb10eb14b42c",
            "name": "Farhan Mahtab Mahi",
            "username": "ironblood",
            "email": "ironblood@gmail.com",
            "profilePicture": "/uploads/779010dbc4cf1475b936ffa04.jpeg"
        },
        "_id": "645b5eaa942547e5cbc07754",
        "createdAt": "2023-05-10T09:06:50.750Z",
        "updatedAt": "2023-05-10T09:06:50.750Z",
        "__v": 0
    }
}
```


***Status Code:*** 201

<br>



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



***More example Requests/Responses:***


#### I. Example Request: Update Comment



***Body:***

```js        
{
    "content": "Test Commen",
    "commentID": "645b5eaa942547e5cbc07754"
}
```



#### I. Example Response: Update Comment
```js
{
    "success": true,
    "comment": {
        "_id": "645b5eaa942547e5cbc07754",
        "content": "Test Commen",
        "comments": [],
        "likes": [],
        "retweets": [],
        "typeOfTweet": "Comment",
        "originalTweetLink": "645b3e10942547e5cbc07717",
        "createdBy": {
            "_id": "6459d93fb542bb10eb14b42c",
            "name": "Farhan Mahtab Mahi",
            "username": "ironblood",
            "email": "ironblood@gmail.com",
            "profilePicture": "/uploads/779010dbc4cf1475b936ffa04.jpeg"
        },
        "createdAt": "2023-05-10T09:06:50.750Z",
        "updatedAt": "2023-05-10T09:07:07.873Z",
        "__v": 0
    }
}
```


***Status Code:*** 201

<br>



### 9. Delete A Comment



***Endpoint:***

```bash
Method: DELETE
Type: 
URL: http://localhost:3000/api/comment/645b5eaa942547e5cbc07754
```



***More example Requests/Responses:***


#### I. Example Request: Delete A Comment



***Body: None***



#### I. Example Response: Delete A Comment
```js
{
    "success": true,
    "message": "Comment deleted Successfully"
}
```


***Status Code:*** 201

<br>



---
[Back to top](#twitter-clone)

>Generated at 2023-05-10 18:02:11 by [docgen](https://github.com/thedevsaddam/docgen)
