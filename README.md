## 🔬 About

This is a **demo Web MVC application** for managing scientific articles.
It demonstrates the fundamentals of **Spring Web MVC** and serves as a solid foundation for future enhancements and
extensions.

---

## ✅ Prerequisites

Ensure the following are installed and configured on your system:

1. [JDK 17](https://adoptium.net)
2. [Apache Maven](https://maven.apache.org/install.html)
3. [Docker Desktop](https://www.docker.com/products/docker-desktop)

---

## 🚀 How to Run the Application

1. Start **PostgreSQL** in **Docker**:

   ```bash
   docker run --name sci_article \
     -p 5432:5432 \
     -e POSTGRES_USER=admin \
     -e POSTGRES_PASSWORD=admin \
     -e POSTGRES_DB=sci_article \
     -d postgres
   ```

2. Build the project using **Maven**:

   ```bash
   mvn clean package
   ```

3. Run the application:

   ```bash
   java -jar ./web/target/web-0.0.1-SNAPSHOT.jar
   ```

4. In you browser access:
   - [Application here](http://localhost:8080/web/article)
   - [API documentation here](http://localhost:8080/api-docs)
   - [OpenAPI definition](http://localhost:8080/swagger-ui/index.html)

