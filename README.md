# DocsGPT - React Native

## Getting Started

The following instructions will get you a copy of the project up and running on your local machine for development and testing purposes. The project is built using [React Native](https://reactnative.dev/) and [Expo](https://expo.io/). The backend API calls are built upon the [DocsGPT](https://github.com/arc53/DocsGPT) docker service. Therein, you will find instructions on how to get the backend up and running.

### Installation

Clone the repo and install the dependencies.
    
```bash
cd Mobile-DocsGPT
npm install
```

### Configuration

Create a `.env` file in the root directory of the project. This file will contain the configuration variables for the app. The following variables are required:

```bash
API_KEY=<OPEN-AI-APIKEY>
```

A sample `.env` file is provided in the root directory of the project as `.env_template`.

### Running Locally

To start the Expo server, run the following

```bash
npm start
```

### Running on Android

To run the app on Android, you can either use an emulator or connect your Android device to your computer. If you are using an emulator, you can run the following command to start the emulator.

```bash
npm run android
```

### Screenshots


#### Upload Screen

![Upload](  
    screenshots/Upload.png
    )

#### Chat Screen

![Chat](  
    screenshots/Chat_Screen.png
    )
