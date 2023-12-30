# Build Stage
FROM maven:3.8.3-openjdk-17-slim AS build

WORKDIR /app

COPY src /app/src
COPY pom.xml /app/pom.xml

RUN mvn -f /app/pom.xml clean package

# Package Stage
FROM openjdk:17-slim

COPY --from=build /app/target/WE_Database-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
