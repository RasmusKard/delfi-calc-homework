# GraphQL-Calc

GraphQL server homework for Delfi.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

The things you need before installing the software.

- Docker Engine, Docker CLI, Docker Compose

### Installation

A step by step guide that will tell you how to get the development environment up and running.

```
$ git clone https://github.com/RasmusKard/delfi-calc-homework.git
$ cd delfi-calc-homework
$ docker compose up
```

GraphQL server will now be running at http://localhost:4000/

## Usage

A few examples of queries.

### Basic operations with just one operator type

<details>
  <summary><strong>SUM (5 + 12 + 8)</strong></summary>
  <br>
  ```graphql
  query {
    sum(nums: [5, 12, 8])
  }
  ```
</details>

<details>
  <summary><strong>SUBTRACT (8 - 12 - 9 - 10)</strong></summary>
  <br>
  ```graphql
  query {
    subtract(nums: [8, 12, 9, 10])
  }
  ```
</details>

```graphql
query {
  multiply(nums: [4, 10, 88])
}
```

<details>
  <summary><strong>MULTIPLY (4 x 10 x 88)</strong></summary>
  <br>
  ```graphql
  query {
    multiply(nums: [4, 10, 88])
  }
  ```
</details>

<details>
  <summary><strong>DIVIDE (128 / 4 / 2)</strong></summary>
  <br>
  ```graphql
  query {
    divide(nums: [128, 4, 2])
  }
  ```
</details>

## Deployment

Additional notes on how to deploy this on a live or release system. Explaining the most important branches, what pipelines they trigger and how to update the database (if anything special).

### Server

- Live:
- Release:
- Development:

### Branches

- Master:
- Feature:
- Bugfix:
- etc...

## Additional Documentation and Acknowledgments

- Project folder on server:
- Confluence link:
- Asana board:
- etc...

```

```
