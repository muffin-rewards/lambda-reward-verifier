# AWS Lambda: Apply For Reward

Checks the APIs for if a competition has been entered.

The event object has to be of following structure:

```
event.body = {
    "token": String,
    "promoter": String,
    "slug": String,
}
```

## Enviroment variables
- `DDB_REWARDS_TABLE` with information about rewards.
- `DDB_ENTRIES_TABLE` with information about past rewards claims.

## Deployment
Deploy with `npm run deploy:{env}`.

## Tests
Yet to be written.
