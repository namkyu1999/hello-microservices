# Hello 👋 Microservices
A TODO application with a microservices architecture.

## Architecture Diagram
<img width="2336" alt="architecture" src="https://github.com/namkyu1999/hello-microservices/assets/53862866/61d9c396-638d-4e5e-b7ca-e7691fc3cddd">

## Prerequisites
- buy your domain
- create your GCP project

## How to start

1. setup ENV
2. setup GKE cluster
3. install ArgoCD
4. install traefik
    ```shell
    cd ./helm
    helm repo add traefik https://helm.traefik.io/traefik
    helm repo update
    helm install --namespace=traefik-system --create-namespace traefik traefik/traefik -f traefik-values.yaml
    ```
5. buy domain name & setup Cloud DNS
6. install cert-manager
   ```shell
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml
   ```
7. deploy application by ArgoCD



## Reference
1. [setup GKE](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create)
2. [setup traefik with cert-manager](https://www.padok.fr/en/blog/traefik-kubernetes-certmanager#access)