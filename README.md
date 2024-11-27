# Frontend Repository with RBAC Features

This repository contains the frontend implementation of a project built using **Next.js**. The frontend is designed to provide a seamless user experience for the Role-Based Access Control (RBAC) system integrated with the backend. It dynamically renders interfaces and functionalities based on user roles. The application is hosted on the **DigitalOcean App Platform** for reliable and scalable performance.

Project Link --> [https://rbac-nextjs-ry8w2.ondigitalocean.app](https://rbac-nextjs-ry8w2.ondigitalocean.app/)

---

## Key Features

- **RBAC Features**:
  - **Admin**:
    - Access to a dashboard for viewing and managing all users.
    - Can update user roles (e.g., switch Manager to User and vice versa).
  - **Manager**:
    - Restricted to viewing users only within the department they manage.
  - **User**:
    - Can access and view only their own profile details.
- **Responsive Design**:
  - Built with a mobile-first approach for optimal performance across all devices.
- **UI Components**:
  - Designed using reusable components for enhanced scalability and maintainability.
- **API Integration**:
  - Fully integrated with the backend API for dynamic data rendering.
- **Secure Hosting**:
  - Deployed on **DigitalOcean App Platform** for consistent and secure access.

---

## Test Users

You can log in to the application using the following test credentials:

- **Admin**:  
  Email: `terry.colby@e-corp.com`  
  Password: `newpass`

- **Manager**:  
  Email: `tyrell.wellick@e-corp.com`  
  Password: `pwned`

- **User**:  
  Email: `Bailee_Williamson82@e-corp.com`  
  Password: `pwned`

---

## Tech Stack

- **Frontend Framework**: Next.js
- **Styling**: Tailwind CSS
- **State Management**: Tanstack Query
- **API Communication**: Ky
