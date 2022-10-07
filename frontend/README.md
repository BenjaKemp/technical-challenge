# Frontend Challenge

This is the frontend technical challenge for candidates applying for an engineering role at Assetz Capital.

Please also read the [guidance](../README.md#guidance) and instructions for [submitting your task](../README.md#submitting-your-task).


## Task

Write a frontend application in TypeScript that Fetches and displays
[investor holdings](https://raw.githubusercontent.com/AssetzSMECapital/technical-challenge/master/data/holdings.json) while:
1. Having a responsive layout.
2. Having the following filters:
   1. Investor `riskLevel` range filter (min/max value)
   2. Investor holdings `Total` range filter (min/max value)
3. Having the following sorting:
   1. Can sort asc/desc by `Annual Interest Due`
   2. Can sort asc/desc by `Total`
   3. Can reset sorting
   4. We expect filters and sorting to be compatible with one another.
5. Having a BoE (Bank of England) rate input field that should be applied on top of the investment account rate. Default BoE rate should be 2.25%


|                                  | `${investmentAccount} (${annualRate}%)`   | ... | Investor Total [^1] | Investor Annual Interest Due [^2] |
|----------------------------------|-------------------------------------------|-----|---------------------|-----------------------------------|
| `${investor.name}`               | `${holding.balance}`                      |     | £                   | £                                 |
| ...                              |                                           |     |                     |                                   |
| Account Total [^3]               | £                                         |     | £                   | £                                 |
| Account Annual Interest Due [^4] | £                                         |     | £                   | -                                 |

[^1]:`Investor Total` = Sum of all holdings for each investor

[^2]:`Investor Annual Interest Due` = Annual interest due to each investor based on their total holdings and interest rates (`annualRate` + `BoE`).

[^3]:`Account Total` = Sum of all holdings for each investment account type

[^4]:`Account Annual Interest Due` = Annual interest due for each investment account type based on total holdings and interest rates (`annualRate` + `BoE`).


Don't worry about making a dazzling interface, basic aesthetics are welcome, but we're not assessing your design skills.


### API Information

The investor holdings can be retrieved at:

https://raw.githubusercontent.com/AssetzSMECapital/technical-challenge/master/data/holdings.json

And have the format:
```
{
    "id": number,
    "investorId": number,
    "investmentAccount": string,
    "balance": string
}
```

The investors can be retrieved at:

https://raw.githubusercontent.com/AssetzSMECapital/technical-challenge/master/data/investors.json

And have the format:
```
{
    "id": number,
    "name": string,
    "riskLevel": number
}
```

The investment account rates can be retrieved at:

https://raw.githubusercontent.com/AssetzSMECapital/technical-challenge/master/data/rates.json

And have the format:
```
{
    "id": number,
    "investmentAccount": string, 
    "annualRate": number
}
```
