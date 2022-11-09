# Client

The puprose of this sample is to illustrate best practices and intended to be a starter project for BCHCLS React UI implementations. It works in conjuction with the Server project which serves as a proxy to backend services.

## About this sample client

This sample client contains the following pages:

- Login
- About
- Privacy (link to Privacy Policy)
- User Page ( user must be authenticated to access this page)
- Admin Page ( user must be authenticated and authorized to access this page)
- Unauthorized Page ( user is directed here when authenicated but not authorized )

This client demonstrates the following features and practices recommended for BCHCLS React UI implementations:

- Authorization and Authentication
- Routing including protected routes
- Internationalization
- Recommended file structure
- Recommended coding practices

  - React Functional Components using Hooks
  - Styling using Styled Components
  - eslint + prettier + airbnb style

  ## Development Configuration

  The `.env` file is used at development time to specify the port on which the client application will be run ans also the port of the Server process (also running on localhost). The default ports are `3000` and `5000` respectively.
