# Acme Bank

This sample projects is about bank accounts and its management

### API Specification:

1. Visit: https://editor.swagger.io/
2. Paste the content of `openapi.yml`

### Postman Collection:

- Import `Bank.postman_collection.json` into Postman

### Requirements

- `node 19.4`
- create files `.env` and `.env.test` based on `.env.example`

### Migrations

- Generate migration `npx prima migrate dev --name `

- Run development environment `npx prisma migrate dev`
- Run test environment `npx dotenv -e .env.test -- prisma migrate dev`
