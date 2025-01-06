# Next.js Application on k3s Cluster in AWS Lightsail

This project sets up a Kubernetes (k3s) cluster on AWS Lightsail to host a Next.js application that fetches data from a WordPress backend.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Architecture](#architecture)
- [Installation Guide](#installation-guide)
  - [1. Set Up AWS Lightsail Instances](#1-set-up-aws-lightsail-instances)
  - [2. Install k3s on Instances](#2-install-k3s-on-instances)
  - [3. Configure kubectl Access](#3-configure-kubectl-access)
  - [4. Deploy the Next.js Application](#4-deploy-the-nextjs-application)
  - [5. Configure Networking and Security](#5-configure-networking-and-security)
  - [6. Set Up CI/CD Pipeline](#6-set-up-cicd-pipeline)
  - [7. Implement Monitoring and Logging](#7-implement-monitoring-and-logging)
- [Technologies Used](#technologies-used)
- [License](#license)

## Prerequisites

- AWS account with access to Lightsail.
- Domain name for your application.
- Existing WordPress installation accessible via API.
- Basic knowledge of Kubernetes and Docker.

## Architecture

![Architecture Diagram](architecture-diagram.png)

## Installation Guide

Follow the steps below to set up your Kubernetes cluster and deploy the Next.js application.

### 1. Set Up AWS Lightsail Instances

#### a. Create Instances
- Log in to your AWS account and navigate to Lightsail
- Create at least two instances (one master and one worker node)
- Choose a Linux distribution (e.g., Ubuntu 20.04)
- Select the instance plan according to your resource needs
- Assign static IPs to each instance

#### b. Security Groups
Configure the firewall settings for each instance:
- Open ports 6443 (k3s API server)
- Open port 80 (HTTP)
- Open port 443 (HTTPS)
- Open ports 30000-32767 (NodePort range)

### 2. Install k3s on Instances

#### a. Install k3s on Master Node
SSH into the master node and run:

```bash
curl -sfL https://get.k3s.io | sh -
```

#### b. Retrieve Join T ~/.kube/configoken
On the master node:

```bash
sudo cat /var/lib/rancher/k3s/server/node-token
```

#### c. Install k3s on Worker Nodes
SSH into each worker node and run:

```bash
curl -sfL https://get.k3s.io | K3S_URL=https://<MASTER_IP>:6443 K3S_TOKEN=<NODE_TOKEN> sh -
```

curl -sfL https://get.k3s.io | K3S_URL=https://50.16.22.163:6443 K3S_TOKEN=K1079ad5862cb87678617cde68cb95b256da05422e9ba67cad462761629b43fe143::server:b976fc4150f2beda15b472c264dfae84 sh -


### 3. Configure kubectl Access

On your local machine, copy the kubeconfig file from the master node:

```bash
scp ubuntu@<MASTER_IP>:/etc/rancher/k3s/k3s.yaml
```

Modify the kubeconfig to replace 127.0.0.1 with the master node's public IP.

Test the connection:

```bash
kubectl get nodes
```

### 4. Deploy the Next.js Application

#### a. Containerize the Application
Create a Dockerfile:

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### b. Build and Push the Docker Image

```bash
docker build -t <your-dockerhub-username>/nextjs-app:latest .
docker push <your-dockerhub-username>/nextjs-app:latest
```

#### c. Create Kubernetes Deployment and Service
Create deployment.yaml:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nextjs-deployment
spec:
  replicas: 2
  selector:
    matchLabels:
      app: nextjs
  template:
    metadata:
      labels:
        app: nextjs
    spec:
      containers:
        - name: nextjs
          image: <your-dockerhub-username>/nextjs-app:latest
          ports:
            - containerPort: 3000
```

Create service.yaml:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nextjs-service
spec:
  type: NodePort
  selector:
    app: nextjs
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
```

Apply the configurations:

```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

#### d. Configure Ingress
Install Nginx Ingress Controller:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.41.2/deploy/static/provider/cloud/deploy.yaml
```

Create ingress.yaml:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: nextjs-ingress
  annotations:
    kubernetes.io/ingress.class: nginx
spec:
  rules:
    - host: your-domain.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: nextjs-service
                port:
                  number: 80
```

Apply the ingress configuration:

```bash
kubectl apply -f ingress.yaml
```

### 5. Configure Networking and Security

#### a. Secure Communication with HTTPS
Install Cert-Manager for TLS certificates:

```bash
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.0.4/cert-manager.yaml
```

Configure TLS in your ingress.yaml:

```yaml
tls:
  - hosts:
      - your-domain.com
    secretName: tls-secret
```

#### b. Network Policies
Create network-policy.yaml to restrict traffic:

```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
spec:
  podSelector: {}
  policyTypes:
    - Ingress
    - Egress
```

Apply the network policy:

```bash
kubectl apply -f network-policy.yaml
```

### 6. Set Up CI/CD Pipeline

Create .github/workflows/deploy.yml:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v1
      - name: Login to DockerHub
        uses: docker/login-action@v1
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}
      - name: Build and Push Docker Image
        run: |
          docker build -t <your-dockerhub-username>/nextjs-app:${{ github.sha }} .
          docker push <your-dockerhub-username>/nextjs-app:${{ github.sha }}
      - name: Deploy to Kubernetes
        uses: appleboy/ssh-action@v0.1.4
        with:
          host: ${{ secrets.K8S_MASTER_IP }}
          username: ubuntu
          key: ${{ secrets.K8S_SSH_KEY }}
          script: |
            kubectl set image deployment/nextjs-deployment nextjs=<your-dockerhub-username>/nextjs-app:${{ github.sha }}
```

Add necessary secrets in your GitHub repository settings.

### 7. Implement Monitoring and Logging

#### a. Install Prometheus and Grafana
Use Helm to install:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack
```

#### b. Access Grafana Dashboard
Forward the Grafana service to your local machine:

```bash
kubectl port-forward svc/prometheus-grafana 3000:80
```

Open http://localhost:3000 in your browser.

#### c. Configure Logging
Install Fluentd or EFK stack for logging.

## Technologies Used

- **AWS Lightsail**
- **k3s**
- **Docker**
- **Next.js**
- **WordPress**
- **kubectl**
- **Nginx Ingress Controller**
- **GitHub Actions** (or your preferred CI/CD tool)
- **Prometheus and Grafana**

## License

This project is licensed under the MIT License.