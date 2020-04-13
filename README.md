# agent-js-cypress

Cypress js agent is runtime reporter for [EPAM report portal](https://github.com/reportportal/reportportal) which provides information about collection run.

## Install


```console
$ npm install agent-js-cypress --save-dev
```

## Usage


#### Cypress.json

Add the following options to cypress.json


```json

{
    "reporter": "agent-js-cypress",
    "reporterOptions": {
        "endpoint": "http://your-instance.com:8080/api/v1",
        "token": "00000000-0000-0000-0000-000000000000",
        "launch": "LAUNCH_NAME",
        "project": "PROJECT_NAME",
        "description": "PROJECT_DESCRIPTION",
        "isLaunchMergeRequired": false
    }
}

```

To run example tests also add the following settings to cypress.json, replace `"reporter": "agent-js-cypress"` by `"reporter": "index.js"` and use command `npm example`.

```json

{
  ...
  "integrationFolder": "example/integration",
  "screenshotsFolder": "example/screenshots",
  "fixturesFolder": "example/fixtures",
  "supportFile": "example/support/index.js",
  "pluginsFile": "example/plugins/index.js",
}

```

#### Add file to run Cypress with custom behavior

Create folder "scripts" on project folder. Copy the following script into "cypress.js" file and put it to "scripts"
folder.

```javascript

const cypress = require('cypress'),
    RPClient = require('reportportal-client')
    fs = require('fs'),
    glob = require("glob");

const cypressConfigFile = "cypress.json";


const getLaunchTempFiles = () => {
    return glob.sync("rplaunch-*.tmp");
}

const deleteTempFile = (filename) => {
    fs.unlinkSync(filename);
}

cypress.run().then(
    () => {
      fs.readFile(cypressConfigFile, 'utf8', function (err, data) {
        if (err) {
            throw err;
        }

        const config = JSON.parse(data);

        if (config.reporterOptions.isLaunchMergeRequired) {
            const client = new RPClient(config.reporterOptions);
            client.mergeLaunches();
            const files = getLaunchTempFiles();
            files.map(deleteTempFile);
        }
      });
    },
    error => {
      console.error(error)

      const files = getLaunchTempFiles();
      files.map(deleteTempFile);
      process.exit(1)
    }
);

```

#### Update package.json "scripts" section

```json

"scripts": {
    ...
    "cypress": "node scripts/cypress.js",
    ...
},

```

#### Setup [ReportPortal custom commands](#reportportal-custom-commands)

Add the following to your custom commands file (cypress/support/commands.js):

```javascript

require('agent-js-cypress/lib/commands/reportPortalCommands');

```

Register ReportPortal plugin (cypress/plugins/index.js):

```javascript

const registerReportPortalPlugin = require('./../../lib/plugin');

module.exports = (on) => registerReportPortalPlugin(on);

```

## Options

Runs support following options:

| Parameter             | Description                                                                                                       |
| --------------------- | ----------------------------------------------------------------------------------------------------------------- |
| token                 | User's Report Portal token from which you want to send requests. It can be found on the profile page of this user.|
| endpoint              | URL of your server. For example 'https://server:8080/api/v1'.                                                     |
| launch                | Name of launch at creation.                                                                                       |
| project               | The name of the project in which the launches will be created.                                                    |
| isLaunchMergeRequired | Determines merge Cypress run's in to one launch or not                                                            |
| rerun                 | Enable [rerun](https://github.com/reportportal/documentation/blob/master/src/md/src/DevGuides/rerun.md)           |
| rerunOf               | UUID of launch you want to rerun. If not specified, report portal will update the latest launch with the same name|
| reportHooks           | Determines report before and after hooks or not.                                                                  |
| skippedIssue          | ReportPortal provides feature to mark skipped tests as not 'To Investigate' items on WS side.<br> Parameter could be equal boolean values:<br> *TRUE* - skipped tests considered as issues and will be marked as 'To Investigate' on Report Portal (default value).<br> *FALSE* - skipped tests will not be marked as 'To Investigate' on application.|

## ReportPortal custom commands

### Logging

ReportPortal provides the following custom commands for reporting logs into the current test/step.

* log(*message*). Overrides standart Cypress `cy.log(log)`. Reports *message* as an info log of the current test.<br/>

You can use the following methods to report logs and attachments with different log levels:
* cy.trace (*message* , *file*). Reports *message* and optional *file* as a log of the current test/suite with trace log level.
* cy.debug (*message* , *file*). Reports *message* and optional *file* as a log of the current test/suite with debug log level.
* cy.info (*message* , *file*). Reports *message* and optional *file* as log of the current test/suite with info log level.
* cy.warn (*message* , *file*). Reports *message* and optional *file* as a log of the current test/suite with warning log level.
* cy.error (*message* , *file*). Reports *message* and optional *file* as a log of the current test/suite with error log level.
* cy.fatal (*message* , *file*). Reports *message* and optional *file* as a log of the current test/suite with fatal log level.
* cy.launchTrace (*message* , *file*). Reports *message* and optional *file* as a log of the launch with trace log level.
* cy.launchDebug (*message* , *file*). Reports *message* and optional *file* as a log of the launch with debug log level.
* cy.launchInfo (*message* , *file*). Reports *message* and optional *file* as log of the launch with info log level.
* cy.launchWarn (*message* , *file*). Reports *message* and optional *file* as a log of the launch with warning log level.
* cy.launchError (*message* , *file*). Reports *message* and optional *file* as a log of the launch with error log level.
* cy.launchFatal (*message* , *file*). Reports *message* and optional *file* as a log of the launch with fatal log level.

*file* should be an object: <br/>
```javascript
{
  name: "filename",
  type: "image/png",  // media type
  content: data,  // file content represented as 64base string
}
```

## Screenshot support

Curently supported only default usage of Cypress screenshot function. Using custom filename **is not supported**.

```javascript

cy.screenshot()
cy.get('.post').screenshot()

```

# Copyright Notice

Licensed under the [Apache License v2.0](LICENSE)

# Contribution

<img src="img/ahold-delhaize-logo-green.jpg" width="250">
