# 🗺️ RoadmapAI

> **AI-Powered Learning Path Generator** - Transform any learning goal into a comprehensive, interactive roadmap with the power of artificial intelligence.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## ✨ Features

🤖 **AI-Powered Generation** - Leverages Google's Gemini AI to create structured learning roadmaps  
🎨 **Interactive Visualization** - Beautiful, interactive flow charts using ReactFlow  
👤 **User Authentication** - Secure user accounts with Appwrite backend  
💾 **Personal Library** - Save and manage your custom roadmaps  
📱 **Responsive Design** - Works seamlessly on desktop and mobile devices  
🎯 **Smart Structure** - Organized learning phases with prerequisites and subtopics  
⚡ **Real-time Generation** - Fast roadmap creation with instant visualization

## 🚀 Demo

**Live Demo:** [Coming Soon](#)

### Example Roadmaps

- **Frontend Development** - Complete web development journey
- **Machine Learning** - From basics to advanced ML concepts
- **DevOps** - Infrastructure and deployment mastery
- **Data Science** - Analytics and data processing pipeline

## 🛠️ Tech Stack

### Frontend

- **React** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first styling
- **ReactFlow** - Interactive node-based UI
- **React Router** - Client-side routing

### Backend & Services

- **Appwrite** - Backend-as-a-Service for authentication and database
- **Google Gemini AI** - Advanced language model for roadmap generation

## 🎯 How It Works

1. **Input Your Goal** - Enter any learning topic or skill you want to master
2. **AI Analysis** - Gemini AI analyzes your input and creates a structured learning path
3. **Visual Roadmap** - Your roadmap is rendered as an interactive flow chart
4. **Save & Track** - Store your roadmaps and track your learning progress
5. **Explore Details** - Click through nodes to see detailed subtopics and examples

## 📁 Project Structure

```
roadmap-ai/
├── src/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   │   ├── appwrite.ts
│   │   └── gemini.ts
│   ├── nodes/
│   │   ├── AnnotationNode.tsx
│   │   ├── CircleNode.tsx
│   │   ├── InputNode.tsx
│   │   └── MainNode.tsx
│   ├── App.tsx
│   ├── Canvas.tsx
│   ├── HomePage.tsx
│   ├── MyRoadmaps.tsx
│   └── main.tsx
├── public/
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Bun** (recommended) or npm/yarn
- **Appwrite Account** - For backend services
- **Google AI API Key** - For Gemini integration

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/dhruvdankhara/roadmap-ai.git
   cd roadmap-ai
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Environment Setup**

   Create a `.env` file in the root directory:

   ```env
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_GEMINI_API_KEY=your_gemini_api_key
   ```

4. **Configure Appwrite**

   - Create a new Appwrite project
   - Set up a database with appropriate collections
   - Configure authentication settings

5. **Start the development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Dhruv Dankhara** - [@dhruvdankhara](https://github.com/dhruvdankhara)

Project Link: [https://github.com/dhruvdankhara/roadmap-ai](https://github.com/dhruvdankhara/roadmap-ai)

---

<div align="center">
  
**Made with ❤️ by Dhruv Dankhara**

_Transform your learning journey with AI-powered roadmaps_

</div>
