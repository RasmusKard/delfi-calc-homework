# GraphQL-Calc

GraphQL server homework for Delfi.

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

## Usage examples

### Basic operations with just one operator type

<details>
  <summary>5 + 12 + 8</summary>
  <br>
  
  ```graphql
  query {
    sum(nums: [5, 12, 8])
  }
  ```
</details>

<details>
  <summary>8 - 12 - 9 - 10</summary>
  <br>
  
  ```graphql
  query {
    subtract(nums: [8, 12, 9, 10])
  }
  ```
</details>

<details>
  <summary>4 x 10 x 88</summary>

  ```graphql
  query {
    multiply(nums: [4, 10, 88])
  }
  ```
</details>

<details>
  <summary>128 / 4 / 2</summary>

  ```graphql
  query {
    divide(nums: [128, 4, 2])
  }
  ```
</details>

### Nested operations with multiple operator types
<details>
  <summary>5 * 2 * ((5 + 12) / (5-14))</summary>

  ```graphql
query {
  nestedCalc(
    operation: {
      type: MULTIPLY
      values: [
        { numbers: [5, 2] }
        {
          operation: {
            type: DIVIDE
            values: [
              { operation: { type: SUM, values: { numbers: [5, 12] } } }
              { operation: { type: SUBTRACT, values: { numbers: [5, 14] } } }
            ]
          }
        }
      ]
    }
  )
}

  ```
</details>


