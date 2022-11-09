# Server

The API Server, or simply Server, is a Express server instance.  It's main functions are:
1. Security - via TLS, Referrer Policy, Content Security Policy, CORS, CSRF and XSS protection, etc.
2. Routing - via defined middlewares
3. (Optional) data manipulation and request orchestration - if the APIs are not "clean" (simple passthrus) or multiple calls need to be combined

## Security
An array of security safegards are implemented in the Server which can be found in `/src/server/initialServer.js`.  
These safeguares are fairly universal and follow best practices.

>TODO: with the introduction of StyleComponents into this solution template, we have to modify the CSP to include `styleSrc: ["'self'", "'unsafe-inline'"],`
This is not ideal and needs to be improved.


## Routing
It defines 2 main types of routes:
1. static web assests (i.e. .html, .js, .css, fonts, images, etc) - these are the files that comprise the Client UI
2. data requests - these are requests to the backend API 

Static web asset routes return files from `/dist/client/`.
Data request routes all start with `/api`,  These requests are routed to a specified handler function which in turn makes calls to a specific API endpoint
