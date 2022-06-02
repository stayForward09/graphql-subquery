# subquery-nodle

## How to use query on Subquery server. 
Subquery is a [gaphql](https://graphql.org) based API server. As it's the case with graphql you can either use HTTP to deliver your queries to the server using either of the two GET or POST methods explained [here](https://graphql.org/learn/serving-over-http/), or depending on the language of your client applications you use [a graphql library](https://graphql.org/code) and query the server in a way that's more idiomatic in your own coding language. The direct HTTP requests could be useful for the tests created in Postman or Insomnia, while the latter approach could be preferred inside your applications. Below you see the list of the queries that this project is supporting at the moment:

### Query transaction history
```
query TransactionHistoryByAddress ($address: String!){
	systemTokenTransfers (filter: {
      or: [
	{
	  fromId: {
	    equalTo: $address
	  }
	},        	
	{
	  toId: {
	    equalTo: $address
	  }
	}
      ]
    }) {
      nodes {
	id
	fromId
	toId
	amount
	extrinsicId
	timestamp
      }
    }
}
```
### Query vesting schedules for an address
```
query VestingSchedulesByAddress($address: String!){
  vestingSchedules (filter: {
      signer: {
	equalTo: $address
      }
    }) {
      nodes {
	id
	signer
	to
	data
      }
    }
}
```
