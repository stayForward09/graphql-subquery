# subquery-nodle

## How to use query on Subquery server. 

Users can use query that can fetch the data which they want. Below content can helpfull to using query.
### How to get transaction history
 User should be able to see transaction history list so that user can understand their transaction history by their account.
```graphql
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
### How to get vesting schedule by address

Users should be able to see their vesting schedules by account address.

```graphql VestingSchedulesByAddress
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

### How to get transfer lists by specific address & timestamp

```graphql
query transfersByFields($from: String! $to: String!) {
    systemTokenTransfers(filter: {
      and: [
        {
          fromId: {
            equalTo: $from
          }
        }
        {
          toId: {
            equalTo: $to
          }
        }
      ]
    }) {
    	nodes {
        id
        fromId
        toId
        timestamp
      }
  }
}
```

```graphql
query transfersByFields($from: String! $to: String! $start: Date! $end: Date!) {
    systemTokenTransfers(filter: {
      and: [
        {
          fromId: {
            equalTo: $from
          }
        }
        {
          toId: {
            equalTo: $to
          }
        }
        {
          timestamp: {
            greaterThanOrEqualTo: $start
          }
        }
        {
          timestamp: {
            lessThanOrEqualTo: $end
          }
        }
      ]
    }) {
    	nodes {
        id
        fromId
        toId
        timestamp
      }
  }
}
```