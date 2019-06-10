# Simple Finance Manager

Progressive web app for helping you maintaning a google spreadsheet for controlling your cash flow. The spreadsheet format supports inputing expenses, incomes, categories and monthly goals.

![sfm-screenshot-dashboard](/docs/screenshots/screenshot_dashboard.png?raw=true "Dashboard Screenshot")
![sfm-screenshot-add-entry](/docs/screenshots/screenshot_add_entry.png?raw=true "Add Entry")
![sfm-screenshot-list-entries](/docs/screenshots/screenshot_list_entries.png?raw=true "Entries List")

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* Node >= 8.16.0 and npm >= 6.4.1.
* A google client id so that users are able to authenticate through their google accounts.
* A google development API key with read and write permissions to user spreadsheets.

### Installing

```
npm install
GOOGLE_API_KEY='<your_google_api_key>' GOOGLE_CLIENT_ID='<your_google_client_id>' npm run start
```

System should be available for browsing at http://localhost:3000.

## Deployment

I have a personal deployment of this system at Heroku myself. It is dead simple. You can see detailed instructions on how to deploy this in Heroku (or in other places as well) in this [doc](docs/general/deployment.md).

## Contributing

Feel free to reach out to me if you think this personal project could also be useful to you and if you have ideas on how to evolve it.

## Acknowledgments

Special thanks to the [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate) team. Without this amazing boilerplate I would certainly not be able to release this project so quickly =)
