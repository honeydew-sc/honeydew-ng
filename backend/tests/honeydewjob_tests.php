<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');
require_once(dirname(__FILE__) . './../rest-routes/job/HoneydewJob.php');

class TestHoneydewJob extends UnitTestCase {
    function TestHoneydewJob()
    {
        $base = '/opt/honeydew/';
        $this->exampleSet = $base . 'sets/examples.set';
    }

    protected $jobData = array(
        "feature" => "test/dan.feature",
        "host" => "www.sharecare.com",
        "browser" => "chrome local",
        "username" => "dgempesaw",
        "reportId" => "132",
    );

    function setUp()
    {
        touch($this->exampleSet);
    }

    function tearDown()
    {
        unlink($this->exampleSet);
    }

    function testQueueJob()
    {
        $jobData = $this->jobData;
        $jobData['queue'] = true;
        $job = new HoneydewJob($jobData);

        $cmd = $job->syncShellCommand();
        $this->assertPattern('/queue/', $cmd, 'can queue a job');
    }

    /* N. B.: The following tests depend entirely upon
    features/test/dan.feature and sets/examples.set existing. */
    function testFeatureName()
    {
        try {
            $jobData = $this->jobData;
            $job = new HoneydewJob($jobData);

            $this->assertPattern('/^feature=\/opt\/honeydew\/features\//', $job->getJobString(), 'feature type is set');

            $jobData = array(
                "set" => "examples.set",
                "host" => "www.sharecare.com",
                "browser" => "chrome local",
                "username" => "dgempesaw",
            );
            $job = new HoneydewJob($jobData);
            $this->assertPattern('/^setName=\/opt\/honeydew\/sets\/examples.set/', $job->getJobString(), 'sets work');
            $this->assertPattern('/\^setRunId=.{8}\^/', $job->getJobString(), 'sets include set run id');

            $jobData = array(
                "filename" => "sets/examples.set",
                "host" => "www.sharecare.com",
                "browser" => "chrome local",
                "username" => "dgempesaw",
            );
            $job = new HoneydewJob($jobData);
            $this->assertPattern('/^setName=\/opt\/honeydew\/sets\/examples.set/', $job->getJobString(), 'new sets work');
            $this->assertPattern('/\^setRunId=.{8}\^/', $job->getJobString(), 'new sets include set run id');

            $jobData = array(
                "filename" => "features/test/dan.feature",
                "host" => "www.sharecare.com",
                "browser" => "chrome local",
                "username" => "dgempesaw",
            );
            $job = new HoneydewJob($jobData);
            $this->assertPattern('/^feature=\/opt\/honeydew\/features\/test\/dan.feature/', $job->getJobString(), 'new features work');
        }
        catch (Exception $e) {
            print_r($e);
        }
    }

    function testDefaultSizeJobs()
    {
        $jobData = $this->jobData;
        $size = "800x600";
        $jobData['size'] = $size;
        $honeydewJob = new HoneydewJob($jobData);
        $jobString = $honeydewJob->getJobString();
        $this->assertPattern("/\^size=$size/", $jobString);
    }

    function testReportIdJobs()
    {
        $honeydewJob = new HoneydewJob($this->jobData);

        $jobString = $honeydewJob->getJobString();
        $this->assertPattern("/\^reportId=$reportId/", $jobString);
    }

    function testUserJobs()
    {
        $jobData = array(
            "feature" => "test/dan.feature",
            "host" => "www.sharecare.com",
            "browser" => "chrome local",
            "username" => "dgempesaw",
        );
        $honeydewJob = new HoneydewJob($jobData);

        $jobString = $honeydewJob->getJobString();
        $this->assertPattern("/\^user=dgempesaw/", $jobString);
    }

    function testLocalJobs()
    {
        $jobData = array(
            "feature" => "test/dan.feature",
            "host" => "www.sharecare.com",
            "browser" => "chrome local",
            "username" => "dgempesaw",
        );
        $honeydewJob = new HoneydewJob($jobData);

        /* this is dirty, but HoneydewJob checks in the $_SERVER
        superglobal for this header */
        $_SERVER["HTTP_X_FORWARDED_FOR"] = "127.0.0.2";
        $jobString = $honeydewJob->getJobString();
        $this->assertPattern("/\^local=(\d+\.){3}\d+/", $jobString);
        $this->assertNoPattern("/\^sauce/", $jobString);

        $jobData = array(
            "feature" => "test/dan.feature",
            "host" => "www.sharecare.com",
            "browser" => "chrome Local",
            "username" => "dgempesaw",
        );
        $honeydewJob = new HoneydewJob($jobData);

        $jobString = $honeydewJob->getJobString();
        $this->assertPattern("/\^local=(\d+\.){3}\d+/", $jobString);
        $this->assertNoPattern("/\^sauce/", $jobString);

        $jobData = array(
            "feature" => "test/dan.feature",
            "host" => "www.sharecare.com",
            "browser" => "GP Chrome Local",
            "username" => "dgempesaw",
        );
        $honeydewJob = new HoneydewJob($jobData);

        $jobString = $honeydewJob->getJobString();
        $this->assertPattern("/\^local=(\d+\.){3}\d+/", $jobString);
        $this->assertPattern("/\^local=10\.10/", $jobString);
        $this->assertNoPattern("/\^sauce/", $jobString);

        {
            /* figure out what the local IP is for jobs with a local
            option passed in */

            $jobData = array(
                "feature" => "test/dan.feature",
                "host" => "www.sharecare.com",
                "browser" => "C5 Chrome Local",
                "username" => "dgempesaw",
            );
            $honeydewJob = new HoneydewJob($jobData);
            $jobString = $honeydewJob->getJobString();

            $this->assertPattern("/\^local=10\.10/", $jobString);
            $this->assertNoPattern("/\^sauce/", $jobString);
        }

        {
            /* respect the local property if it's passed into the
            constructor */
            $jobData = array(
                "feature" => "test/dan.feature",
                "host" => "www.sharecare.com",
                "browser" => "GP Chrome Local",
                "local" => "999.999.999.999",
                "username" => "dgempesaw",
            );
            $honeydewJob = new HoneydewJob($jobData);

            $jobString = $honeydewJob->getJobString();
            $this->assertPattern("/\^local=999\.999\.999\.999/", $jobString);
            $this->assertNoPattern("/\^sauce/", $jobString);
        }

        {
            /* but substitute local for an ip if it's "localhost" */
            $jobData = array(
                "feature" => "test/dan.feature",
                "host" => "www.sharecare.com",
                "browser" => "GP Chrome Local",
                "local" => "localhost",
                "username" => "dgempesaw",
            );
            $honeydewJob = new HoneydewJob($jobData);

            $jobString = $honeydewJob->getJobString();
            $this->assertPattern("/\^local=(\d+\.?){4}/i", $jobString);
            $this->assertNoPattern("/\^local=localhost/", $jobString);
            $this->assertNoPattern("/\^sauce/", $jobString);
        }
    }

    function testHoneydewJobInputs()
    {
        $jobData = array(
            "feature" => "test/dan.feature",
            "host" => "www.sharecare.com",
            "browser" => "chrome",
            "username" => "dgempesaw",
        );
        $honeydewJob = new HoneydewJob($jobData);

        $hostname = $honeydewJob->_hostname;
        $protocol = "/^http:\/\//";
        $this->assertIsA($hostname, "string");
        $this->assertPattern($protocol, $hostname);

        $jobBrowser = $honeydewJob->_browser;
        $this->assertEqual($jobBrowser, $jobData['browser'] );

        $jobSauce = $honeydewJob->_sauce;
        $this->assertEqual($jobSauce, true);

        $jobUsername = $honeydewJob->_username;
        $this->assertEqual($jobUsername, $username);

        $jobString = $honeydewJob->getJobString();
        $basedirRegex = "/\/opt\/honeydew\/features/";
        $this->assertPattern($basedirRegex, $jobString);
    }

    function testHoneydewJobClassDuplicatesOldFunctionality()
    {
        $honeydewJob = new HoneydewJob(array(
            "feature" => "test/dan.feature",
            "host" => "www.sharecare.com",
            "browser" => "*firefox sauce",
        ));
        $featureRegex = "/feature=\/opt\/honeydew\/features\/test\/dan\.feature\^/";
        $hostRegex = "/host=http:\/\/www\.sharecare\.com\^/";
        $sauceRegex = "/sauce=true\^/";
        $browserRegex = "/browser=\*firefox/";

        $newJobString = $honeydewJob->getJobString();

        $this->assertIsA($newJobString, "string");
        $this->assertPattern($featureRegex, $newJobString);
        $this->assertPattern($hostRegex, $newJobString);
        $this->assertPattern($sauceRegex, $newJobString);
        $this->assertPattern($browserRegex, $newJobString);
    }

    function testHoneydewJobQueuesAJob()
    {
        $honeydewJob = new HoneydewJob($this->jobData);
        $test = true;
        $queued = $honeydewJob->addToQueue($test);

        $this->assertIsA($queued, "string");
        $this->assertEqual($queued, true);

        /* TODO: check that the job actually got queued, instead of faking
        it out like we're doing now ? */

    }

    function testConfig()
    {
        $job = new HoneydewJob(array(
            "feature" => "test/dan.feature",
            "host" => "www.sharecare.com",
            "browser" => "*firefox sauce",
            "config" => "/opt/honeydew/honeydew.ini"
        ));

        $jenn = $job->getConfig("jenn_cs");
        $this->assertPattern("/(\d{1,3}\.?){4}/", $jenn);
    }

    function testCanCreateReplaceJob() {
        $jobData = array(
            'setRunId' => 47,
            'setName' => 'sets/examples.set',
            'filename' => 'test/dan.feature',
            "set" => "examples.set",
            "host" => "www.sharecare.com",
            "browser" => "chrome local",
            "username" => "dgempesaw",
        );

        $job = new HoneydewJob($jobData);
        $jobString = $job->getJobString();
        $this->assertPattern('%feature=/opt/honeydew/features/test/dan.feature\^%', $jobString,
                             'replace jobs have a feature');

        /* this gets us past a sanity check in Reports.pm that wants
        us to have a non-empty setName */
        $this->assertPattern('%setName=sets/examples.set\^%', $jobString,
                             'replace jobs have a setName');

        /* having a set run id is crucial! this is how we know what
        set to add it to. */
        $this->assertPattern('%setRunId=47\^%', $jobString,
                             'replace jobs have a setRunId');
    }
}
