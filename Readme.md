# Welcome to Koa!

You may have heard of Koa before, and much like React, it strives to come out of the gates with as few dependencies as possible. I recently have been growing more akin to the idea of building your own framework for your own unique business needs rather than grabbing a boilerplate off the shelf, so this is my attempt to do so. 


# What this is NOT

This is **not** another Koa boilerplate (there are plenty enough of those already)

## What does it have?

I'm proud to say that I actually did things "right" here so there is a whole bunch of unit tests and integration tests set up with Jest, Supertest, and Prisma. The line between Unit and Integration tests is intentionally blurry, but the bottom line is that a docker container with your database will spin up and down with each test run. So if you need to validate DB changes in your tests... go right ahead! For the rest of the stuff you'll probably wan't to use good old fashioned unit testing, spying, etc., but that's up to you. :) 

In addition to a sweet testing bed, this template also has:
- Typescript support OOTB with real-time compilation
- Routing
- Good error handling patterns supported by Hapi's BOOM plugin
- Prisma as the ORM (I'm using MySQL but this can easily be changed)
- A modest models/controllers folder layout (there is no frontend here and therefore no views)

## A little bit of theory

While I am not against classes, and while I also STRONGLY support OOP, you will not find many of those patterns in this template. I am trying to stay as "true" to JavaScript as I can while also practicing everyone's favorite SOLID design principles. 

## How to Use

The package.json has all the scripts you'll need, and I promise I'll try to leave lots of comments. Have fun!
