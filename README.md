## Demo

Live Demo, [click here](https://master.d9877m9w5di5h.amplifyapp.com/)

## Cloning and installing

Clone this repository.

```
git clone https://github.com/Bart-15/auction.git
cd auction
```

Install the NPM dependencies for this project.

```
npm install
```

## Setting up env variables

Create a `.env.local` file in the root folder of this project. You need to specify five variables:

- `AUTH0_SECRET`: Generate a random JWT secret node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

- `AUTH0_BASE_URL`: Your Auth0 Base URL.

- `AUTH0_ISSUER_BASE_URL`: Your Auth0 application domain.

- `AUTH0_CLIENT_ID`: Your Auth0 application client ID.

- `NEXT_PUBLIC_API_BASE_URL`: Your API Endpoint.

For an example, you can take a look at the [.env.example](.env.example) file in this repository.

## Running the application

You can run the application by typing in:

```
npm run dev
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## AWS Microservices

<p>
  </br>
  <a href="https://github.com/Bart-15/serverless-auction-service" target=”_blank”>Auction Serverless Backend</a>
  <br/>
  <a href="https://github.com/Bart-15/auth-service" target=”_blank”>Auth Service</a>
  <br/>
  <a href="https://github.com/Bart-15/notification-service" target=”_blank”>Notification Service</a>
  <br/>
</p>
