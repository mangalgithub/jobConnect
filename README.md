# Job Portal Application

This is a job portal application built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). The application has two types of profiles: Recruiter and Jobseeker.

## Features

### Recruiter
- Add new job postings
- Update existing job postings
- View all job postings
- Filter applicants for job postings
- Download resumes of applicants


### Jobseeker
- Browse job postings
- Filter suitable jobs
- Apply for jobs
- View application status
- Update profile
- Upload resume
- Receive email notifications upon applying for a job
- Receive notifications when a new job is posted

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js
- MongoDB

### Backend Setup

1. Navigate to the backend folder:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the `backend` folder with the following environment variables:
    ```plaintext
    MONGO_URI=<your_mongodb_uri>
    JWT_SECRET=<your_jwt_secret>
    EMAIL_USER=<your_email_address>
    EMAIL_PASS=<your_email_password>
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend folder:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the frontend server:
    ```bash
    npm start
    ```

## Project Structure

```plaintext
job-portal/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
│
└── README.md
