# React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

```
react-login-registration/
├── .github/
│   └── workflows/
│       └── main.yml
│   .gitignore
│   package.json
│   README.md
│   package-lock.json (.git-ignored. Run npm install)
|   .env (.git-ignored please add to run. Check below for instructions)
│   node-modules/ (.git-ignored. Run npm install)
│
├── public/
│   ├── index.html
│   ├── favicon.ico
│   ├── manifest.json
│   ├── static/
│       ├── user.png
│
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Form.tsx
│   │   ├── Header.tsx
│   │   ├── UserCard.tsx
│   │
│   ├── pages/               # Main pages of the application
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── UserList.tsx
│   │
│   ├── services/            # API services
│   │   ├── httpService.ts
│   │
│   ├── constants/            # Reusable Constants
│   │   ├── message.ts
│   │
│   ├── model/            # Response Model
│   │   ├── apiResponse.ts
│   │
│   ├── App.css
│   ├── App.tsx 
│   ├── App.test.tsx 
│   ├── index.tsx 
│   ├── index.css
│   ├── reportWebVitals.ts
│   ├── setupTests.ts


```

## Available Scripts

### `.env file`

Create .env file and add:

1. REACT_APP_API_BASE_URL={base_url} 

Note:
1. The above config is needed for connecting to backend.

### `npm install/npm i`

1. Installs all the dependencies needed for the project to run.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
