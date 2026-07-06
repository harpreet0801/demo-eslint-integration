<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

# Project Instructions

This is a React + Vite project with Docker and CI/CD pipeline setup for learning deployment processes.

## Key Technologies
- **React 18** - UI library
- **Vite** - Build tool
- **Docker** - Containerization
- **Nginx** - Web server and reverse proxy
- **GitHub Actions** - CI/CD automation

## Project Structure
- `src/` - React source code
- `Dockerfile` - Multi-stage Docker build (Node + Nginx)
- `nginx.conf` - Nginx server configuration
- `docker-compose.yml` - Docker Compose orchestration
- `.github/workflows/` - CI/CD pipeline configurations

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Docker Commands
- `docker build -t hello-world-react .` - Build Docker image
- `docker run -p 80:80 hello-world-react` - Run container
- `docker-compose up` - Run with Docker Compose
