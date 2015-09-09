# Backend API

The Honeydew server is written in PHP via the
[Slim Framework][]. Although most of the endpoints are undocumented,
there are a few that are generally useful and they are documented
here.

### POST /rest.php/jobs

Execute a Honeydew [Job](#Job). This endpoint requires your AD
authorization in the `Authorization` header as [basic auth][].

The payload expects a JSON object which MUST at a minimum include a
`file`, `host`, and `browser`.

    POST https://honeydew.be.jamconsultg.com/rest.php/jobs
    Authorization: Basic QUQ6YXV0aG9yaXphdGlvbg==

    {
        "file": "name.feature",
        "host": "https://www.sharecare.com",
        "browser": [ "Chrome Local" ]
    }

If successful, it will return an array of the exact system `command`
to be executed for diagnostic purposes and the `jobs` data that were
used to create the system commands. The jobs are run asynchronously;
your `POST` should return as soon as we're done constructing the
commands themselves.

    {
        "command": [
            "perl /opt/honeydew/bin/jobRunner.pl  \"feature=/opt/honeydew/features/name.feature^host=https://www.sharecare.com^sauce=true^user=dgempesaw^browser=Chrome\" > /dev/null 2>&1 &"
        ],
        "jobs": [ ... ],
        "success": "true"
    }

#### Examples

-   To run the `sc_stage_wall` set against Stage in Chrome on the GP
    machine:

        POST https://honeydew.be.jamconsultg.com/rest.php/jobs
        Authorization: Basic QUQ6YXV0aG9yaXphdGlvbg==

        {
            "file": "sets/sc_stage_wall.set",
            "host": "https://www.stage.sharecare.com",
            "browser": [ "GP Chrome Local" ]
        }

    As a `cURL`, that's

        curl -X POST https://honeydew.be.jamconsultg.com/rest.php/jobs -H"Authorization: Basic QUQ6YXV0aG9yaXphdGlvbg==" -d'{"file": "sets/sc_stage_wall.set", "host": "https://www.stage.sharecare.com", "browser": [ "GP Chrome Local" ]}'

-   To run the `drozAcctDashboard` set against Stage DrOZ in Chrome on
    the J5 machine:

        POST https://honeydew.be.jamconsultg.com/rest.php/jobs
        Authorization: Basic QUQ6YXV0aG9yaXphdGlvbg==

        {
            "file": "sets/drozAcctDashboard.set",
            "host": "https://www.stage.doctoroz.com",
            "browser": [ "J5 Chrome Local" ]
        }

    As a `cURL`, that's

        curl -X POST https://honeydew.be.jamconsultg.com/rest.php/jobs -H"Authorization: Basic QUQ6YXV0aG9yaXphdGlvbg==" -d'{"file": "sets/drozAcctDashboard.set", "host": "https://www.stage.doctoroz.com", "browser": [ "J5 Chrome Local" ]}'

Note that the authorization in the examples above is for show only;
you must fill in your own auth, of course.

#### Payload options

#### file

If you provide a `.feature`, it will run a [system command][] for one
instance of `honeydew` for each browser in the browser array - the
queueing system will not be involved.

    "file": "/droz/Account/Dashboard/AdsGPT/LG.feature"

If the job uses a `.set` file, it will open the `.set` file and
enqueue a separate Resque Job for each feature in the set.

    "file": "sets/corset.set"

The leading `/opt/honeydew/` folder path is not necessary: the
following are the same:

    "file": "sets/corset.set"
    "file": "/opt/honeydew/sets/corset.set"

#### host

We only check that this isn't empty, _not_ that it looks like a valid
hostname or anything. If you submit an unhelpful `host`, expect your
test to blindly run and assume everything is okay.

    "host": "https://www.sharecare.com"

#### browser

This must be an array of browser names. If the browser name doesn't
end with the word `Local`, Honeydew assumes you want to run the test
on Saucelabs. You probably want to append `Local`.

    "browser": [ "Chrome Local" ]

You can choose which local machine you want to run the job on by using
the machine's 2 letter abbreviation:

    "browser": [ "GP Chrome Local", "AL Chrome Local", "S1 Chrome Local" ]

#### local

Specify the IP of the server where you want the test to run. This only
applies if the [browser](#browser) matches `/local/i`. The primary use
of this option is to run jobs against your current network/VPN IP.

    "local": "10.10.2.125"

*NB*: This IP will _override_ the machine abbreviation method
mentioned in the [browser](#browser) section. That is,

    // will run the job on GP
    { ... "browser": [ "GP Chrome Local" ], ... }

    // will run the job on 127.0.0.1, but the report will store the browser as GP Chrome Local
    { ... "browser": [ "GP Chrome Local" ], local: "127.0.0.1", ... }

### Dictionary

#### Job

A job is primarily composed of a host, a browser, and a file. The file
can either be a `.feature` file or a `.set` file.

[Slim Framework]: http://www.slimframework.com/
[system command]: http://php.net/manual/en/function.system.php
[basic auth]: https://en.wikipedia.org/wiki/Basic_access_authentication
