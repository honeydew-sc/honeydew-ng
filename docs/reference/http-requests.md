# HTTP Requests

You can now make arbitrary HTTP requests in a Honeydew
feature. Ideally, this could be helpful for setup or cleanup for a
test - you can create and delete your test via the appropriate API
instead of having to do it through the UI.

Here's an example feature with a GET request:

    Feature: GET request example

     Scenario: use response in URL
     ```
     GET https://www.stage.sharecare.com/healthcheck
     ```

     Given I am on the /$res1 page

The URL `https://www.stage.sharecare.com/healthcheck` just returns
the string `Ok`, so that `Given` line ends up saying `Given I am on
the /ok page`.

There are some new things here:

- The triple backquote `` ` `` fence surrounding the HTTP
  request. There must be three backquotes ```` ``` ```` to denote the
  start of the request, and three backquotes ```` ``` ```` to denote
  the end of the request.

- There's a response variable `$res1` that isn't declared anywhere. It
  comes from the HTTP request itself - the response to each request is
  automatically named and numbered in increasing order. The report
  will indicate what value is stored in the appropriate `$res`
  variable.

- The format of the HTTP request is new. This is the template for a
  request:

        <METHOD> <URL>                # MANDATORY
        <HEADER NAME>: <HEADER VALUE> # OPTIONAL, as many as you like
                                      # BLANK LINE if you want a body
        <JSONPAYLOAD>                 # OPTIONAL, whatever JSON body

    and this is an example of a PUT using all the optional parts:

        PUT https://hello.from/the
        Content-Type: other/side
        X-Flow-Id: I must have

        {"called":"a", "thousand": "times"}

    Let's go line by line. The first line consists of the only two
    MANDATORY parts: the method and the url. Put a single space between
    them:

        # LINE 1: <METHOD> <URL>
        # examples of method/urls:
        POST https://www.example.org/thing
        GET https://www.example.org/thing
        PUT https://www.example.org/thing
        DELETE https://www.example.org/thing

    On the following lines, you can OPTIONALLY specify request
    headers. Put `: ` between the header name and header value.

        # LINES 2-?: Header Name: Header Value
        # examples of request headers:
        Content-Type: application/json
        Authorization: Basic bWFnaWM6Y2FycGV0
        X-Flow-Id: Honeytwo

    OPTIONALLY, you may send a request body. You indicate that it's
    body time by putting a blank line before the body. You're
    responsible for putting valid JSON here; if it's not valid JSON,
    the request will fail unhelpfully. You can spread the JSON out on
    more than one line if you want.

        # LINES ?-?: JSON payload
        # examples of JSON payload
        {"username":"hello", "password": "goodbye"}
        # or
        {
            "json":"payload"
        }

If the response to your request is a JSON object, it will be stored in
the appropriately numbered response variable, and you can access its
parts with normal JSON notation: `arrays[5]` and
`object.properties`. However, you must reference the variables
slightly differently. For all the HD variables up until now, we used
the dollar sign `$` to say "this is a variable", like this:

    $host = 'https://www.sharecare.com'
    Scenario: hello
     Given I am on the $host/login page

If you have an object or array in a variable, to dereference it you
must use `${variable.property}` to dereference it.

    // assume that res1 is a HTTP request that responds with:
    // $res1 = { host: "https://www.sharecare.com" }
    Scenario: hello
     Given I am on the ${res1.host}/login page

### Example: Login without UI

For a real example, we can do a quick-login for Sharecare. For this
example, it helps to know that this SSO request responds with the
following,

    {
        "access_token": "stuff",
        "refresh_token": "stuff",
        ...                       # other stuff we don't care about
    }

and after completing the request, we can refer to them in our script
with `${res1.access_token}` and `${res1.refresh_token}`.
The following script will do a quick login if you fix the REDACTED
header and SSO credentials:

    Feature: Login, no UI
     Scenario: It's not magic
     ```
     POST https://auth.sharecare.com/access?grant_type=password
     Content-Type: application/json
     Authorization: Basic REDACTED

     {"username": "REDACTED","password": "REDACTED"}
     ```
     Given I am on the https://auth.sharecare.com/session/login?grant_type=bearer&access_token=${res1.access_token}&redirect_uri=https://www.sharecare.com page

### Automatic Hostname Variables

In order to make it easier to run these across environments, there are
now a few variables derived from the hostname automatically. For
example, on a test run where the hostname is
`https://www.stage.sharecare.com`, the following will be set up for
you:

    $host = {
        auth: 'https://auth.stage.sharecare.com',
        api: 'https://api.stage.sharecare.com',
        data: 'https://data.stage.sharecare.com',
        global: 'https://global.stage.sharecare.com',
        www: 'https://www.stage.sharecare.com'
    }

This means that in your test, `${host.auth}` should give you the
appropriate SSO url, and `${host.data}` would give you the data
server, etc.

So, going back to our previous example, you can replace the hardcoded
hostnames to make it environment-agnostic like such:

    Feature: Login, no UI
     Scenario: It's not magic
     ```
     POST ${host.auth}/access?grant_type=password
     Content-Type: application/json
     Authorization: Basic REDACTED

     {"username": "REDACTED","password": "REDACTED"}
     ```

     Given I am on the ${host.auth}/session/login?grant_type=bearer&access_token=${res1.access_token}&redirect_uri=${host.www} page

(As a bonus, note that this example also indicates that you can use
variables in HTTP requests).
