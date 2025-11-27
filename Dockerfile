###############################################
# Build stage: compila la app de Vite + React #
###############################################
FROM node:22-alpine AS build

WORKDIR /app

# pnpm es el gestor que usa el proyecto
ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN corepack enable && corepack prepare pnpm@9.12.3 --activate

# Permite inyectar la URL del backend al momento del build (opcional)
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

#########################################
# Runtime stage: sirve estáticos con Nginx
#########################################
FROM nginx:1.27-alpine AS runtime

ENV NODE_ENV=production

RUN apk add --no-cache curl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl -f http://localhost/healthz || exit 1
