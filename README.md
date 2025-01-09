# Task Management App

## Introduction
This project is a task management application similar to Jira or Trello. It allows users to create, manage, and track tasks efficiently. The application supports task assignment, priority setting and a search feature to filter the tasks.

## Features
- **Task Management**: Create, edit, and delete tasks.
- **Task Assignment**: Assign tasks to users.
- **Boards and Lists**: Organize tasks into boards and lists.
- **Status Tracking**: Track task progress with status updates.
- **Drag and Drop**: Drag and drop functionality for  change task by status.
- **Search and Filter**: Set task priorities and deadlines.

## Technologies Used
- **Frontend**:
  - React
  - TypeScript
  - Apollo Client
  - Zustand
  - Tailwind CSS
  - Radix UI
  - React Hook Forms
  - Zod
  - Sonner
  - Drag and Drop Library

## Installation

### Steps
1. **Clone the repository**:
    ```sh
    git clone git@github.com:lexcode1227/task-management-app.git
    cd task-management-app
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a [.env](http://_vscodecontentref_/0) file in the root directory and add the following variables:
    ```env
    VITE_REACT_APP_GRAPHQL_URI=graphql_uri
    VITE_BEAREER_TOKEN=secret_token
    ```

4. **Run the project**:
    ```sh
    npm start
    ```

## Usage

### Task Management
- Create new tasks with titles, point estimates, tags, assigned to and due date.
- Edit existing tasks to update details.
- Delete tasks that are no longer needed.

### Task Assignment
- Assign tasks to specific users.
- View tasks assigned to you.

### Drag and Drop
- Drag tasks between different columns to update their status.

## Contributing
We welcome contributions from the community. To contribute, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Contact
For any questions or feedback, please contact us at [henryagustin@ravn.co](mailto:henryagustin@ravn.co)

## Authors

- [@lexcode1227](https://www.github.com/lexcode1227)


## Demo

Insert gif or link to demo

![](/src/assets/images/Task-Management-App-Dasboard-Page.png)
![](/src/assets/images/Task-Management-App-Profile-Page.png)
![](/src/assets/images/Task-Management-App-FilterByName.png)
![](/src/assets/images/Task-Management-App-FilterByName-Results.png)
![](/src/assets/images/Task-Management-App-Modal-Form.png)
![](/src/assets/images/Task-Management-App-Modal-Form-Edit.png)
## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)