# P2P Interest Payments Exercise (Pre-interview)

Each morning at The P2P Investments Company, a batch job puts all the investors’ holdings for the previous day into a single log file of:
'investor id','account id','balance in GBP'

Another batch job puts the daily interest rate of each account into another log file of:
'account id','daily % rate'

However, there is a promotion on where each investor’s highest balance account has an additional 0.01% daily interest applied to the daily rate before the interest is paid.

## Task

Write an application in Node.js/TypeScript that when run will parse the holdings.csv and rates.csv files and print out the total portfolio value for each customer after daily interest has been paid. You can use any libraries you wish to, treat this an application that would be used in production (assume infrastructure is provided).

When you come in for interview, you will be given a pair-programming exercise (using Microsoft Teams) to add a feature to your program. During this exercise we are going to analyze your code structure, your problem-solving approach, and your ability to discuss your thought processes as you implement the feature.
