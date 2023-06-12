# syntax=docker/dockerfile:experimental
FROM openjdk:17-jdk-slim AS build
WORKDIR /workspace/app

COPY . /workspace/app
RUN ./gradlew clean build

FROM openjdk:17-jdk-slim
WORKDIR /workspace/app
EXPOSE 8080
COPY --from=build /workspace/app/build/libs/*.jar /workspace/app/*.jar
ENTRYPOINT ["java", "-jar", "/workspace/app/*.jar" ]