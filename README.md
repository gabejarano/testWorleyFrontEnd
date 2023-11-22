# WorleyFront

This project was generated with Angular CLI version 16.2.1.

## Description

WorleyFront is an application that allows users to authenticate, register, and view filterable statistics that can be exported to Excel.

## API Connection

The application connects to an external API to retrieve data. API documentation and endpoints can be found at [testWorleyBackend](https://github.com/gabejarano/testWorleyBackend).

## Components

### Login

The `Login` component offers functionality to log in with an existing username and password.

### Signup

The `Signup` component allows users to create new accounts by providing necessary information such as username, password, etc.

### Statistics

The `Statistics` component displays a list of statistical elements that can be filtered by different criteria. It also provides a feature to export this data to an Excel file.

## Features

- **Authentication**: Users can log in using their existing credentials.
- **User Registration**: Enables the creation of new user accounts.
- **Statistics Display**: Presents a list of statistical elements with filtering options.
- **Export to Excel**: Offers the ability to export statistics data to an Excel file for further analysis.

## Main Commands

- `ng serve`: Starts the development server. Navigate to http://localhost:4200/ to access the application. File changes will be automatically reflected.
- `ng generate component component-name`: Generates a new component such as `login`, `signup`, or `statistics`.
- `ng build`: Compiles the project and stores the compiled files in the `dist/` directory.
- `ng test`: Executes unit tests via Karma.
- `ng e2e`: Runs end-to-end tests using a platform of your choice.

For more help on Angular CLI, use `ng help` or check out the Angular CLI Overview and Command Reference page.
