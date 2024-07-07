# Petshop

## Getting Started

### Prerequisites
- Node 20 or higher
- Npm 10 or higher
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Clone the repository
```shell
git clone https://github.com/imyuvii/petshop-frontend.git
cd petshop-frontend
```

### Run the docker container
```shell
docker-compose up -d --build
```

### Open the Browser and Navigate to the Following URL
- http://127.0.0.1/

### Credentials 
```shell
username: admin@buckhill.co.uk
password: admin
```

## Install Development Dependencies 
```shell
npm install
```

### Setup Environment Variables
```shell
cp .env.production .env
```
## Development
### Compile and Hot-Reload for Development
```sh
npm run dev
```

### Run Unit Tests with [Vitest](https://vitest.dev/)
```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)
```sh
npm run lint
```

### Prettier with [Prettier](https://prettier.io/)
```sh
npm run format
```

### Type-Check, Compile, and Minify for Production
```sh
npm run build
```

## Features Implemented
- [x] Login
- [x] Logout
- [x] Customers list with Pagination, Search, and Sort
- [x] Customer Delete
- [x] Vitest Cases