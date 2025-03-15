# Smart Insurance Application Portal

## 🚀 Overview

The **Smart Insurance Application Portal** is a Next.js-based web application that allows users to dynamically apply for various types of insurance (Health, Home, Car, Life, etc.). The forms are **fetched dynamically from an API** and built on the fly, enabling conditional fields, API-driven options, and seamless user interactions. Users can also **manage their applications** in a customizable list view with sorting, filtering, and column selection.

## ✨ Features

### ✅ Smart Dynamic Forms

-   Fetches form structures dynamically from an API (**No hardcoded forms**).
-   Supports **conditional fields** that appear/disappear based on user responses.
-   **Nested sections** for complex data inputs (e.g., Address, Vehicle Details).
-   **Dynamic dropdown options** (e.g., states based on selected country).
-   **Form validation** using **Zod**.
-   **API submission with Axios**.

### ✅ Customizable List View

-   Users can **view, filter, and sort** submitted applications.
-   **Dynamic column selection** for a customizable table view.
-   **Pagination & searching** for efficient browsing.

### ✅ Additional Features

-   **Translation support** with **next-intl**.
-   **API state management** using **React Query**.
-   **Unit tests** implemented with **Vite Testing Library (VTL)**.
-   **Form validation and parsing** with **Zod**.
-   **Optimized API handling** with **Axios**.

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/smart-insurance-portal.git
cd smart-insurance-portal
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env.local` file in the root directory and add:

```env
NEXT_PUBLIC_API_BASE_URL=https://assignment.devotel.io
```

### 4️⃣ Run the Development Server

```bash
npm run dev
```

Open `http://localhost:3000` to view in the browser.

### 🛠️ API Endpoints

The application interacts with the following endpoints:

| Method | Endpoint                    | Description                       |
| :----- | :-------------------------- | :-------------------------------- |
| GET    | `/api/insurance/forms`      | Fetches dynamic form structure    |
| POST   | `/api/insurance/forms/submit` | Submits a filled form             |
| GET    | `/api/insurance/forms/submissions` | Fetches submitted applications |

### 🧪 Running Tests

Unit tests are implemented with Vite Testing Library (VTL). To run tests:

```bash
npm run test
```

### 🚀 Deployment

The app can be deployed using Vercel or Netlify. To deploy on Vercel:

```bash
npm install -g vercel
vercel
```

### 🚀 Future Enhancements

-   Drag-and-drop field reordering (Upcoming)
-   Autosave drafts before submission
-   Dark Mode toggle
-   Additional unit and integration tests

### 📄 License

This project is licensed under the MIT License.
