# ![RealWorld Example App](logo.png)

> ### [Mithril](https://mithril.js.org/) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.


### [Demo](TODO add production url)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **[Mithril](https://mithril.js.org/)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **[Mithril](https://mithril.js.org/)** community styleguides & best practices.

For more information on how this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


## How it works


### 10 000 foot View

```

                    +---------------+
                    |               |
            +------->  Component X  +-------+
            |       |               |       |
            |       +---------------+       |
            |                               |
 [store.prop reference]               (function call)
            |                               |
            |    +--------------------+     |
            |    |                    |     |
            -----+       domain       <-----+
                 |                    |
                 |    Updates its     |
                 | internal state obj |
                 |   in response to   |
                 |      API data      |
                 |                    |
                 +----------^---------+
                            |
                            |
                            V
                    (External API(s))

```


`domain.js`

Handles app-level concerns and is UI agnostic. It knows nothing about Mithril and is therefore an optional element in a Mithril-based app. Its basic `store` data object can be (relatively) easily replaced with mobX, Redux, etc. with/out Immutable data structures.


`api-adapter.js`

Handles communication with external APIs. Its responsibility is to abstract any API-level changes away from the rest of the app.


`router.js`

[TODO Add detail]


`components/*.js`
[TODO Add detail]


## Getting started

You can view a live demo over at [TODO add production url]

To get the frontend running locally:

- Clone this repo
- Run $ `npm install` to install all the required dependencies
- Run $ `npm start` to start the local server and JS build
