# Peer-to-Peer Interest Payments Exercise

This is the technical challenge for candidates applying for an engineering role at Assetz Capital.

Feel free to use any libraries/packages that you wish and remember the goal of this challenge is to assess your technical ability, and we would expect to see automated tests verifying the accuracy of your solution. 


## Task

Each morning at The Peer-to-Peer Investments Company, a batch job puts all the investors’ holdings for the previous day into a single log file of:
```
{
    "investorId": string,
    "investmentAccount": string,
    "balance": string
}
```

Another batch job puts the annualised interest rate of each account into another log file of:
```
{
    "investmentAccount": string, 
    "annualRate": number
}
```

However, there is a promotion being run whereby each investor’s highest balance account has an additional 1% interest per annum applied to the daily rate **before** the interest is paid.

Write an application in TypeScript that:
* Would run daily and parses the `holdings.json` and `rates.json` files located in the `/data` directory
* Print or output the total portfolio value for each investor after daily interest has been paid.
* [BONUS] - Add an alternative promotion of your choosing



## Submitting Your Task

1. Please answer the questions in [FOLLOW-UP.md](./FOLLOW-UP.md) file
2. Then you can submit your application by adding [@mhouchin](https://github.com/mhouchin), [@frenomus](https://github.com/frenomus), [@jonokercher1](https://github.com/jonokercher1) and [@JamesWhite6](https://github.com/JamesWhite6) as collaborators to your GitHub repository, or by emailing as a .zip (remember to exclude node_modules).
