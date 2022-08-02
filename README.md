# Peer-to-Peer Interest Payments Exercise

This is the technical challenge for candidates applying for an engineering role at Assetz Capital.

Feel free to use any libraries/packages that you wish and remember the goal of this challenge is to assess your technical ability, and you should write it as if this could potentially be used in a production environment.


## Task

Write an application in TypeScript that:
* Processes the investor holdings (`holdings.json`) and investment account rates (`rates.json`) data
* Applies a promotion, whereby each investor’s highest balance account has an additional 1% interest per annum applied to the annualised rate.
* Then print/output the total portfolio value for each investor after daily interest (and the promotion) has been paid.
* [BONUS] - Add an alternative promotion of your choosing


### Additional Information

The investor holdings are located in `/data/holdings.json` with the format:
```
{
    "investorId": string,
    "investmentAccount": string,
    "balance": string
}
```

The investment account rates are located in `/data/rates.json` with the format:
```
{
    "investmentAccount": string, 
    "annualRate": number
}
```


## Submitting Your Task

1. Please answer the questions in [FOLLOW-UP.md](./FOLLOW-UP.md) file
2. Then you can submit your application by adding [@mhouchin](https://github.com/mhouchin), [@frenomus](https://github.com/frenomus) and [@JamesWhite6](https://github.com/JamesWhite6) as collaborators to your GitHub repository, or by emailing as a .zip (_remember to exclude node_modules_).
