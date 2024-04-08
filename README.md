# ICD-10 API 🌎🩺📃⚕

ICD-10 API is a microservice to allow a easy and quick way to access to the World Health Organization's International Classification of Diseases data. This microservice use docker compose to setup all the configurations to ensure a real fast launch, this means:

- Create database.
- Seed data.
- Run the API RESTful server.

All the endpoints are documented using Swagger and are divided in __management__ and __query__. The first is used to perform CRUD operations and the second for useful endpoints to search data from chapters, ranges and keyword.
