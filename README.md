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
- `REWARDS_TABLE` with information about rewards.
- `ENTRIES_TABLE` with information about past rewards claims.
- `MAX_RETRIES` specifies how many times the call to IG APIs is made.
- `DELAY_BETWEEN_RETRIES` specifies how long should lambda wait between each call.
- `PROBATION_PERIOD` how many hours is the reward still available for given account.
- `BLOCKED_PERIOD` how many hours has the user wait before redeeming a reward again.

## Deployment
Deploy with `npm run deploy:{env}`.

## Tests
Yet to be written.
