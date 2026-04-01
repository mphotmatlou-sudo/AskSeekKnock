# A.S.K. - A Prayer App

Welcome to A.S.K., a web application designed to assist you in your prayer life.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
  - [Windows](#windows)
  - [macOS](#macos)
  - [Linux](#linux)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)

## Introduction

A.S.K. is a tool to help you organize your prayer life, find relevant bible verses, and connect with a community of believers.

## Prerequisites

Before you can run the A.S.K. application, you will need to install some software on your computer.

### Windows

1.  **Install Git:**
    *   Download and install Git for Windows from [git-scm.com](https://git-scm.com/download/win).
    *   During installation, you can accept the default settings.
2.  **Install Node.js:**
    *   Download and install the LTS (Long Term Support) version of Node.js from [nodejs.org](https://nodejs.org/en/download/).
    *   The installer will also install `npm` (Node Package Manager), which you will need.

### macOS

1.  **Install Git:**
    *   Open the Terminal app (you can find it in `/Applications/Utilities/`).
    *   Type `git --version` and press Enter. If you don't have git installed, it will prompt you to install the Xcode Command Line Tools. Follow the instructions to install it.
2.  **Install Node.js:**
    *   Download and install the LTS (Long Term Support) version of Node.js from [nodejs.org](https://nodejs.org/en/download/).

### Linux

1.  **Install Git:**
    *   Open your terminal.
    *   On Debian/Ubuntu-based systems, run: `sudo apt-get install git`
    *   On Fedora-based systems, run: `sudo dnf install git`
2.  **Install Node.js:**
    *   We recommend using `nvm` (Node Version Manager) to install Node.js and npm.
    *   Open your terminal and run the following command to install nvm:
        ```bash
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
        ```
    *   Close and reopen your terminal.
    *   Install the latest LTS version of Node.js:
        ```bash
        nvm install --lts
        ```

## Getting Started

1.  **Clone the Repository:**
    *   Open your terminal (on Windows, open "Git Bash" which was installed with Git).
    *   Navigate to the directory where you want to store the project. For example, to create a `projects` folder in your home directory:
        ```bash
        cd ~
        mkdir projects
        cd projects
        ```
    *   Clone the repository using the following command:
        ```bash
        git clone https://github.com/StronkOnes/A.S.K.git
        ```
    *   This will create a new folder named `A.S.K`. Navigate into it:
        ```bash
        cd A.S.K
        ```

2.  **Install Dependencies:**
    *   In the `A.S.K` directory, run the following command to install all the necessary software packages for the project:
        ```bash
        npm install
        ```

3.  **Set up Environment Variables:**
    *   The application needs API keys to work correctly. You need to create a special file to store these keys.
    *   In the `A.S.K` directory, create a new file named `.env.local`.
    *   Copy and paste the following content into this file, and replace the placeholder values with your actual API keys.

        ```
        # Bible API
        BIBLE_API_KEY=c812402305mshdd62dfb8f8d996bp1aa38cjsnec93650fb2ce
        BIBLE_API_HOST=iq-bible.p.rapidapi.com

        # IBM Watson API Key (if you have one)
        # IBM_API_KEY=YOUR_IBM_API_KEY_HERE
        ```

4.  **Run the Development Server:**
    *   Now you are ready to start the application. Run the following command:
        ```bash
        npm run dev
        ```
    *   This will start the development server. You will see some output in the terminal, and it will tell you that the server is running.

## Running the Application

*   Once the development server is running, open your web browser and navigate to:
    [http://localhost:3000](http://localhost:3000)

You should now see the A.S.K. application running in your browser.