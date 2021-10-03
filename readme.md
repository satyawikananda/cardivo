<div align="center">
<h1>Cardivo card name</h1>

<p>Get your card name dynamically 😎</p>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://raw.githubusercontent.com/satyawikananda/cardivo/main/LICENSE?token=AH44ZFH7IF2KSEDK7LSIW3C7YOFYC)
[![Issue](https://img.shields.io/github/issues/satyawikananda/cardivo)](https://img.shields.io/github/issues/satyawikananda/cardivo)
[![Forks](https://img.shields.io/github/forks/satyawikananda/cardivo)](https://img.shields.io/github/forks/satyawikananda/cardivo)
[![Stars](https://img.shields.io/github/stars/satyawikananda/cardivo)](https://img.shields.io/github/stars/satyawikananda/cardivo)

</div>

# Description
A few months ago, GitHub launched a new feature call Magic Readme which is that file readme will be appear in your GitHub profile and you can set your skills, portfolio, etc in that file readme.

Cardivo is a serverless dynamically card name based on SVG (Scalable Vector Graphics) which is you can make your own card name and set in your magic readme. For the tech stack, Cardivo using Typescript and serverless function from Vercel and also this project had been deployed on Vercel.

# How to use this?
It's simple, you can copy paste this markdown content, like this one:

```
![Satya Wikananda's card name](https://cardivo.vercel.app/api?name=[name]&description=[description]&image=[image_url])
```
There are several options you can use, and the options is:

|  Options  | Description |   Type     | Example | Query Params | 
|---------- | ---------- | ------- | ----------- | ------------ |
| Name | **Mandatory** Your name | String | Satya Wikananda | ```?name=[value]``` |
| Description | **Mandatory** Some text about you | String | I am a coder | ```?description=[value]``` |
| Image | **Mandatory** An avatar image of you | URL | `https://example.com/image.jpg` | ```?image=[value]``` |
| Background Color | Background color for the card name | Hex color code | `%23ffffff` | ```?backgroundColor=[value]``` |
| Icon Color | Colorize the icons in card name | Hex color code | `%23e64a19` | ```?iconColor=[value]``` |
| Font Color | Font color for the card name | Hex color code | `%23000000` | ```?fontColor=[value]``` |
| Site | If you have a site, you can fill this one | String | `https://satyawikananda.tech` | ```?site=[value]``` |
| Pattern | You can use a pattern for the background. You can see the list below | String | plus | ```?pattern=[value]``` |
| Color Pattern | Fill the color pattern | Hex color code | `%231abc9c` | ```?colorPattern=[value]``` |
| Opacity Pattern | Opacity of the pattern background | Float | `0` - `1` | ```?opacity=[value]``` |
| Instagram | Your Instagram username | String | satyawikananda | ```?instagram=[value]``` |
| Linkedin | Your Linkedin username | String | Satya Wikananda | ```?linkedin=[value]``` |
| GitHub | Your GitHub username | String | satyawikananda | ```?github=[value]``` |
| Twitter | Your Twitter username | String | satya_wikananda | ```?twitter=[value]``` |

> NB: Remove the square bracket

Pattern in Cardivo, i'm used the [Hero Pattern](https://github.com/lowmess/hero-patterns) package which is developed by [Lowmess](https://github.com/lowmess/), and here the list: 

| Pattern | Value | 
| -------- | ---- |
| Plus | plus |
| Topography | topography |
| Texture | texture |
| Hideout | hideout |
| FallingTriangles | fallingTriangles |
| I Like Food | iLikeFood |
| Four point stars | fourPointStars |
| Brick wall | brickWall |
| Wiggle | wiggle |
| Bubbles | bubbles |
| Floating Cogs | floatingCogs |
| Leaf | leaf |
| Rain | rain |
| Polkadots | polkadots |
| Tic Tac Toe | ticTacToe |

# Example
This is example of using cardivo:

Markdown content: 

```md
![Satya wikananda's card name](https://cardivo.vercel.app/api?name=Satya%20Wikananda&description=Hi,%20i%27m%20a%20front%20end%20web%20developer%20and%20i%27m%2020%20y.o.%20Nice%20to%20meet%20you%20%F0%9F%91%8B&image=https://avatars.githubusercontent.com/u/33148052?v=4&backgroundColor=%23ecf0f1&instagram=satyawikananda&linkedin=I%20Gusti%20Ngurah%20Satya%20%20Wikananda&github=satyawikananda&twitter=satya_wikananda&pattern=leaf&colorPattern=%23eaeaea)
```

Result:

![Satya wikananda's card name](https://cardivo.vercel.app/api?name=Satya%20Wikananda&description=Hi,%20i%27m%20a%20front%20end%20web%20developer%20and%20i%27m%2020%20y.o.%20Nice%20to%20meet%20you%20%F0%9F%91%8B&image=https://avatars.githubusercontent.com/u/33148052?v=4&backgroundColor=%23ecf0f1&instagram=satyawikananda&linkedin=I%20Gusti%20Ngurah%20Satya%20%20Wikananda&github=satyawikananda&twitter=satya_wikananda&pattern=leaf&colorPattern=%23eaeaea)

# Contribution
Want to make this project better? You can contribute this project, I am very open if there are contributions to this project.

---
![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)
![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)

Powered by Typescript and vercel. Code licensed under MIT License.
