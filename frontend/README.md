# Frontend Challenge

This is the frontend technical challenge for candidates applying for an engineering role at Assetz Capital.

Please also read the [guidance](../#guidance) and instructions for [submitting your task](../#submitting-your-task).


## Task

Write an application in TypeScript using your frontend framework of choice that:
* Fetches and displays [investor holdings](https://raw.githubusercontent.com/AssetzSMECapital/technical-challenge/master/data/holdings.json)
* Add a responsive functionality for the layout, which will display one column on mobile
  devices, two columns on tablet devices, and three columns on desktops.
* Allow for the user to filter by `investorId` and/or `investmentAccount`
* Add a button so that the data can be sorted by balance ascending, or descending
* Shows the total balance for any rows being displayed

Don't worry about making a dazzling interface, basic aesthetics are welcome, but we're not assessing your design skills.


### Additional Information

The investor holdings can be retrieved at:

https://raw.githubusercontent.com/AssetzSMECapital/technical-challenge/master/data/holdings.json

And have the format:
```
{
    "investorId": number,
    "investmentAccount": string,
    "balance": string
}
```
