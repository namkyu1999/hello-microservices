# Hello 👋 Microservices
A TODO application with a microservice architecture.

## Demo
- **TODO application -> https://todo.namkyupark.tech**
- **ArgoCD UI Dashboard -> https://argocd.namkyupark.tech**
- **Traefik UI Dashboard -> https://traefik.namkyupark.tech/dashboard/#/**
- **Litmus UI Dashboard -> https://litmus.namkyupark.tech**
- **Jaeger UI Dashboard -> https://jaeger.namkyupark.tech**
- **Grafana UI Dashboard -> https://grafana.namkyupark.tech**

## Architecture Diagram
![architecture_diagram](assets/architecture.png)

## Folder Structure
```
.
├── README.md
├── api-server # todo application api server
├── assets # assets for README.md
├── authentication # todo application authentication server
├── frontend # todo application frontend
├── installation # helm chats for installation
├── mongo # todo application mongo db
```

## Prerequisites
- buy your domain
- create your GCP project
- install helm, argocd cli tools

## How to start
1. complete prerequisites
2. setup Kubernetes Cluster
3. install OpenTelemetry, Jaeger, Prometheus, Grafana, Grafana
    ```shell
    kubectl create namespace observability
    # jaeger
    kubectl create -f https://github.com/jaegertracing/jaeger-operator/releases/download/v1.46.0/jaeger-operator.yaml -n observability
    kubectl create -f ./installation/00-monitoring/jaeger.yaml -n observability
    
    # prometheus operator, quick start guide: https://prometheus-operator.dev/docs/prologue/quick-start/
    git clone https://github.com/prometheus-operator/kube-prometheus.git
    kubectl create -f ./kube-prometheus/manifests/setup
    # wait for namespaces and CRDs to become available, then
    kubectl create -f ./kube-prometheus/manifests/

    # prometheus
    kubectl create -f ./installation/00-monitoring/prometheus.yaml
    
    # OpenTelemetry Collector
    kubectl create -f ./installation/00-monitoring/otel-collector.yaml
    ```
4. install ArgoCD
    ```shell
    # quick start guide: https://argo-cd.readthedocs.io/en/stable/
    kubectl create namespace argocd
    kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
    ```
5. install Litmus
   ```shell
   # quick start guide: https://docs.litmuschaos.io/docs/getting-started/installation
   kubectl apply -f https://litmuschaos.github.io/litmus/3.0.0-beta8/litmus-3.0.0-beta8.yaml
   ```
6. install cert-manager
   ```shell
   kubectl apply -f https://github.com/cert-manager/cert-manager/releases/download/v1.12.0/cert-manager.yaml
   ```
7. install Traefik
    ```shell
    helm install traefik ./installation/01-traefik-helm -n traefik-system --create-namespace
    ```
8. buy domain name & setup Cloud DNS
   > set 'A record' to traefik external IP
   ![a_record](assets/a_record.png)
9. Access to ArgoCD UI
   ```shell
   # access to ArgoCD UI via https://argocd.your.domain
   # setup user
   kubectl edit configmap argocd-cm -n argocd
   # data:
   #   accounts.username: apiKey, login
   argocd account update-password \
    --account username \
    --current-password admin-password \
    --new-password new-password
   # edit RBAC
   kubectl edit configmap argocd-rbac-cm -n argocd
   # data:
   # policy.csv: |
   #    g, new-username, role:admin # you can set role what you want
   #    policy.default: role:''
   ```
10. deploy application by ArgoCD
     ```shell
     # Access ArgoCD UI
     # application name: todo
     ```

## Reference
1. [setup GKE](https://cloud.google.com/sdk/gcloud/reference/container/clusters/create)
2. [setup traefik with cert-manager](https://www.padok.fr/en/blog/traefik-kubernetes-certmanager#access)
3. [Jaeger 101](https://medium.com/jaegertracing/jaeger-tracing-a-friendly-guide-for-beginners-7b53a4a568ca)
4. [OpenTelemetry 101](https://www.aspecto.io/blog/what-is-opentelemetry-the-infinitive-guide/?utm_source=jaeger-medium&utm_medium=post&utm_campaign=jaeger-tracing-the-ultimate-guide)
5. [OpenTelemetry with Jaeger in Go](https://www.aspecto.io/blog/opentelemetry-go-getting-started/)
6. [Prometheus vs Open Telemetry](https://www.timescale.com/blog/prometheus-vs-opentelemetry-metrics-a-complete-guide/)
7. [OpenTelemtry collector example](https://github.com/open-telemetry/opentelemetry-go/tree/v1.16.0/example/otel-collector)