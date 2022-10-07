# Backend Challenge

This is the backend technical challenge for candidates applying for an engineering role at Assetz Capital.

Please also read the [guidance](../README.md#guidance) and instructions for [submitting your task](../README.md#submitting-your-task).

## Task

Write an application in TypeScript that:
* Processes the investor holdings (`holdings.json`) and investment account rates (`rates.json`) data on a __daily__ basis
* Applies a promotion, whereby each investor’s highest balance account has an additional 1% interest per annum applied to the annualised rate.
* Then print/output the total portfolio value for each investor after daily interest (and the promotion) has been paid.
* [BONUS] - Add an alternative promotion of your choosing


### Additional Information

The investor holdings are located in `/data/holdings.json` with the format:
```
{
    "id": number,
    "investorId": number,
    "investmentAccount": string,
    "balance": string
}
```

The investment account rates are located in `/data/rates.json` with the format:
```
{
    "id": number,
    "investmentAccount": string, 
    "annualRate": number
}
```


