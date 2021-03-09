# Angular Certification mini-project

This project as built as a requirement to obtain the [Angular Certification](https://www.angulartraining.com/angular-certification.html).

## What is it?

A simple weather info application, using the [Open Weather Map API](https://openweathermap.org/api) to show current weather conditions and 5-day forecast of given zipcodes.

## Instructions to run

Just run `npm install` and `npx ng serve` and then open `http://localhost:4200/` on your browser.

## Implemented requirements

- Allow users to enter a zipcode;
- Store zipcodes in local storage;
- Restore zipcodes from local storage when page is reloaded or reopened;
- Show the weather conditions for given location, using each of the provided zipcodes;
- Display name of the city, weather conditions, temperatures, a relevante weather icon and a link to see 5-day forecast;
- Remove location from zipcode list when clicking the "x";
- Display new locations as the user adds new zipcodes using the input field;
- Allow users to direct check 5-day forecast in a page routed as /forecast/:zipcode.

## Improvments

- Updated bootstap and Angular versions;
- Layout changes to provide feedback and better interaction experience;
- Input validations and hints;
- Optional choice of country code to add valid zipcodes outside US;
- Deploy to Github pages.

## Hosted application

You can see the hosted application visiting (https://ederfranco23.github.io/ng-certification-live/)[https://ederfranco23.github.io/ng-certification-live/].

## Deploy to Github pages

Just run `npx ng deploy [base-href=https://ederfranco23.github.io/ng-certification-live/` and visit the (hosted application URL)[https://ederfranco23.github.io/ng-certification-live/].

## Contact

You can send me an email to [efranco23@gmail.com](efranco23@gmail.com) :]
