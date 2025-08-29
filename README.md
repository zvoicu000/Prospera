
# Prospera

Prospera is a powerful full-stack web app for brand/product identification and environmental impact analysis. Capture or upload images, get instant brand detection, carbon footprint, recycling tips, and more—all in a modern, user-friendly interface.

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Google Cloud Vision](https://img.shields.io/badge/Google%20Vision-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

## Features
- **Image capture & upload**: Identify brands/products from photos
- **Environmental analysis**: Carbon footprint, recycling/disposal tips
- **User authentication**: Sign up, login, profile, leaderboard
- **Modern UI**: Responsive, fast, and beautiful
- **API integrations**: Google Vision, Tavily, Groq, Supabase

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/zvoicu000/Prospera.git
    cd Prospera
    ```
2. Install dependencies:
    ```bash
    cd backend
    npm install
    cd frontend
    npm install
    ```

## Configuration
1. Create a `.env` file in the `backend` folder and add your API keys and credentials. Example:
    ```env
   Add all of the following environment variables to your `.env` file and replace with your own values:

   ```
   PORT
   TAVILY_API_KEY
   SUPABASE_URL
   SUPABASE_ANON_KEY
   SUPABASE_SERVICE_ROLE_KEY
   JWT_SECRET
   GROQ_API_KEY
   GOOGLE_API_KEY
   GOOGLE_PROJECT_ID
   GOOGLE_APPLICATION_CREDENTIALS
   ```
    # Add any other required API keys here
    ```

## Usage
- Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```
- Start the frontend dev server:
   ```bash
   cd frontend
   npm run dev
   ```
- Access the app:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3000](http://localhost:3000)

## Folder Structure
```
backend/
   controllers/
   routes/
   middleware/
   utils/
   config/
   index.js
   package.json
frontend/
   src/
      components/
      pages/
      services/
      styles/
   public/
   index.html
   package.json
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Contact
For questions or support, open an issue or contact [zvoicu000](https://github.com/zvoicu000).

