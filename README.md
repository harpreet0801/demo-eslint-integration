# Hello World React App with Docker & CI/CD Pipeline

A simple React application demonstrating containerization with Docker, Nginx web server, and automated CI/CD deployment using GitHub Actions.

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose
- Node.js 18+
- Git

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Run with Docker

```bash
# Build Docker image
docker build -t hello-world-react .

# Run container
docker run -p 80:80 hello-world-react

# Access at http://localhost
```

### Run with Docker Compose

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f web
```

---

## 📚 Learning Guide: Docker & Deployment Pipeline

### Part 1: Understanding Docker

#### What is Docker?
Docker is a containerization platform that packages your application and all its dependencies into a single unit called a **container**. Containers ensure your app runs the same way on any machine.

**Key Concepts:**
- **Image**: A blueprint/template for creating containers (like a class)
- **Container**: A running instance of an image (like an object)
- **Registry**: A repository to store and share images (like Docker Hub)

#### Our Dockerfile Explained

**Stage 1 - Build Stage:**
- `FROM node:18-alpine` - Start with Node.js 18 on Alpine Linux (lightweight)
- `WORKDIR /app` - Set working directory inside container
- `COPY package*.json ./` - Copy package.json and package-lock.json
- `RUN npm ci` - Clean install dependencies (better for CI/CD)
- `COPY . .` - Copy all source code
- `RUN npm run build` - Build the React app (creates `dist/` folder)

**Why multi-stage?** The build stage is ~800MB, but we only need the final 50MB output.

**Stage 2 - Runtime Stage:**
- Fresh `nginx:alpine` image (lightweight)
- Copy only the built app from Stage 1
- Expose port 80 for HTTP traffic
- Start Nginx server

**Result:** Final image is ~50MB instead of 800MB! ✅

---

### Part 2: Nginx Configuration

**Why Nginx?**
- **Reverse Proxy** - Routes requests to backend services
- **Load Balancing** - Distributes traffic across multiple servers
- **Static File Serving** - Efficiently serves HTML, CSS, JS
- **Caching** - Improves performance with browser cache headers
- **Compression** - Gzip compression reduces file sizes by 70%+
- **Security** - Hides backend details from users

**Key nginx.conf Features:**
- Serves React app with SPA routing (`try_files` trick)
- Gzip compression for text assets (70% reduction!)
- Health check endpoint for load balancers
- Cache headers for browser optimization

---

### Part 3: Docker Compose

**What is Docker Compose?**
- Tool to define and run multi-container applications
- Uses `docker-compose.yml` configuration file
- Simplifies managing multiple services

**Key parts:**
- `build` - Instructions to build the image from Dockerfile
- `ports` - Map container port 80 to host port 80
- `environment` - Set environment variables
- `restart` - Automatically restart if container crashes
- `healthcheck` - Periodically check if app is healthy

---

### Part 4: GitHub Actions CI/CD Pipeline

**What is CI/CD?**
- **CI (Continuous Integration)**: Automatically test code on every push
- **CD (Continuous Deployment)**: Automatically deploy to production

**Our Workflows:**

**1. docker-build.yml - Build & Push Docker Image**
- Triggers on push to main/develop branches
- Builds Docker image with multi-stage build
- Pushes image to GitHub Container Registry (GHCR)
- Can be deployed to any server

**2. lint-and-build.yml - Lint & Build Verification**
- Runs on every push and pull request
- Ensures code passes ESLint
- Verifies build completes successfully
- Checks for production errors

---

### Part 5: Complete Deployment Flow

```
Developer → Git Push → GitHub Actions → Docker Build → Push to Registry → Deploy → User
```

**Steps:**
1. Developer pushes code to GitHub
2. GitHub Actions workflow triggers automatically
3. Code is linted and tested
4. Docker image is built (multi-stage)
5. Image is pushed to container registry
6. Image is deployed to production server
7. Nginx serves the React app
8. User accesses the application

---

### Part 6: Deployment Strategies

**Option 1: Docker Hub + Manual Deployment**
```bash
docker build -t yourusername/app .
docker push yourusername/app
docker run -p 80:80 yourusername/app
```

**Option 2: GitHub Container Registry (GHCR) + CI/CD**
- GitHub Actions automatically builds and pushes
- More secure, integrated with GitHub
- Free for public repositories

**Option 3: Kubernetes Deployment**
- Container orchestration platform
- Auto-scaling, load balancing, rolling updates
- Enterprise-grade solution

---

### Part 7: Useful Commands Cheatsheet

**Docker:**
```bash
docker build -t image-name .
docker run -p 80:80 image-name
docker ps
docker logs container-id
docker exec -it container-id bash
```

**Docker Compose:**
```bash
docker-compose up -d
docker-compose down
docker-compose logs -f
docker-compose ps
```

---

### Part 8: Best Practices

✅ **Do:**
- Use Alpine Linux images (lightweight: 5MB vs 150MB)
- Multi-stage builds (reduces final size by 94%)
- Health checks for monitoring
- Environment variables for configuration
- Semantic versioning for tags
- Push images to registry

❌ **Don't:**
- Run as root user
- Use `latest` tag in production
- Store secrets in Dockerfiles
- Ignore security vulnerabilities
- Make unnecessarily large images

---

## 📁 Project Structure

```
.
├── src/
│   ├── App.jsx              # "Hello World" component
│   ├── App.css              # Styles
│   └── main.jsx             # Entry point
├── public/                  # Static assets
├── Dockerfile               # Multi-stage Docker build
├── nginx.conf              # Nginx configuration
├── docker-compose.yml      # Docker Compose setup
├── .github/
│   ├── workflows/
│   │   ├── docker-build.yml        # CI/CD: Build Docker
│   │   └── lint-and-build.yml      # CI/CD: Test & Build
│   └── copilot-instructions.md     # Project guide
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Configuration

### Environment Variables
```
VITE_API_URL=https://api.example.com
NODE_ENV=production
```

### Docker Image Tagging
```bash
docker build -t app:v1.0.0 .
docker tag app:v1.0.0 ghcr.io/user/app:v1.0.0
docker push ghcr.io/user/app:v1.0.0
```

---

## 📊 Performance

- **Gzip**: Reduces JS/CSS by 70%
- **Caching**: Browser caches static assets
- **Multi-stage**: Final image ~50MB (vs 800MB build image)
- **Alpine**: Base image is only 5MB

---

## 🎓 Next Steps

1. Modify React components
2. Push to GitHub and trigger CI/CD
3. Deploy to AWS, Azure, or DigitalOcean
4. Add database (PostgreSQL, MongoDB)
5. Setup monitoring and alerts
6. Configure SSL/TLS with Let's Encrypt

---

**Happy learning! 🚀**
