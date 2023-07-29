# build from scratch
# syntax=docker/dockerfile:experimental
FROM openjdk:17-jdk-slim AS build
WORKDIR /workspace/app

COPY . /workspace/app
RUN ./gradlew clean build

FROM openjdk:17-jdk-slim
WORKDIR /workspace/app
EXPOSE 8080
COPY --from=build /workspace/app/build/libs/*.jar /workspace/app/auth.jar
ENTRYPOINT java -javaagent:/workspace/app/opentelemetry-javaagent.jar \
 -Dotel.exporter.otlp.endpoint=http://otel-collector.observability.svc.cluster.local:4317 \
 -Dotel.resource.attributes=service.name=auth-server \
 -jar /workspace/app/auth.jar

### build from exist jar
#FROM openjdk:17-jdk-slim
#COPY build/libs/*.jar auth.jar
#COPY opentelemetry-javaagent.jar opentelemetry-javaagent.jar
#EXPOSE 8080
#ENTRYPOINT java -javaagent:./opentelemetry-javaagent.jar \
# -Dotel.exporter.otlp.endpoint=http://otel-collector.observability.svc.cluster.local:4317 \
# -Dotel.resource.attributes=service.name=auth-server \
# -jar auth.jar