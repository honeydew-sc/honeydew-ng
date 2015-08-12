## Installing Webdriver locally

#### Get Java

You need java. Do you have it? Find out on
[their website][java-installed]. If you don't have it,
[download and install it][java-dl]. Webdriver comes as a java jar, so
we need Java to run it.

#### Get Node

Get `Node.js` installed on your machine. If you're on OS X with
Homebrew, that's just

``` shell
$ brew install node
```

If you're on windows, go to [the Node.js download page][node-dl]
and click on `Install`.

After the install, start a `cmd` window or a `Terminal` session,
and type in

``` shell
C:\> npm
```

to ensure that the `Node.js` installation succeeded.

![successful install](http://i.imgur.com/XH7K9q0.png)

There's a nifty NodeJS tool called [Protractor][] that includes a
command line tool that will download webdriver for us.

[java-installed]: http://java.com/en/download/installed.jsp
[java-dl]: http://java.com/en/
[node-dl]: http://nodejs.org
[protractor]: https://angular.github.io/protractor/#/

#### Get Webdriver (via protractor)

Run the following commands in your console or command window:

```
C:\> npm install -g protractor
C:\> webdriver-manager status
C:\> webdriver-manager update --ie
C:\> webdriver-manager status
C:\> webdriver-manager start
```

The commands are the same for Windows or OS X (although on OS X,
the `--ie` flag is immaterial). After running `webdriver-manager
start`, you can test out your shiny webdriver server at
[http://localhost:4444/wd/hub/][home] - use the 'Create Session' button
to make new browsers.

![wd hub](http://i.imgur.com/vVcR7YD.png)

[home]: http://localhost:4444/wd/hub/
[se-dl]: https://code.google.com/p/selenium/downloads/list

And you're done! Go to [honeydew](https://honeydew.be.jamconsultg.com)
and choose the Firefox Local browser from the dropdown!

#### (Optional) Make a shortcut!

Create a new text file in notepad with the following
text:

```
webdriver-manager update && webdriver-manager start
```

Save it somewhere useful like your desktop with a `.bat` extension
and choose 'All Files' as the type. Whenever you want to start up
Honeydew, you can just double click on this batch file and it'll
take care of it.

![save shortcut](http://i.imgur.com/vyNQqwC.png)
