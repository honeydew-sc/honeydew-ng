<?php

class HoneydewJob
{
    public $_filename;
    public $_hostname;
    public $_browser;
    public $_sauce;
    public $_username;
    public $_size;
    private $_type;
    private $_local;
    private $_config;
    private $_config_file;

    /* required keys: filename|feature|set, host, browser */
    /* optional keys: username, reportId, size, channel */
    public function __construct($jobData)
    {
        $filename = "";
        if (array_key_exists("filename", $jobData))
        {
            $filename = $jobData["filename"];
        } else if (array_key_exists("feature", $jobData))
        {
            $filename = $jobData["feature"];
        } else if (array_key_exists("set", $jobData))
        {
            $filename = $jobData["set"];
        } else
        {
            throw new Exception("No filename set!");
        }

        $this->setFilename($filename);
        $this->setHostname($jobData["host"]);
        $this->setBrowser($jobData["browser"]);
        $this->setSauce($jobData["browser"]);

        $this->setLocal(@$jobData["browser"], @$jobData["local"]);
        $this->setUsername(@$jobData["username"]);
        $this->setReportId(@$jobData["reportId"]);
        $this->setSize(@$jobData["size"]);
        $this->setChannel(@$jobData["channel"]);

        $this->setQueue(@$jobData['queue']);
        $this->setTest(@$jobData['test']);

        $this->_config_file = @$jobData['config'];
    }

    private function setLocal($browser, $local)
    {
        if (preg_match("/local/i", $browser))
        {
            /* if local was passed in with the job, let's use the
            specified value */
            if (isset($local) && $local && !preg_match('/localhost/i', $local))
            {
                $this->_local = $local;
            } else
            {
                /* otherwise we have to figure out local ourselves */
                $this->_local = "127.0.0.1";
                if (preg_match("/^[^F]{2} /", $browser)) {
                    $this->_local = $this->get_webdriver_server($browser);
                } else
                {
                    $localAddress = $_SERVER['REMOTE_ADDR'];
                    if (array_key_exists("HTTP_X_FORWARDED_FOR", $_SERVER) || $localAddress == "192.168.169.9")
                    {
                        $this->_local = $_SERVER["HTTP_X_FORWARDED_FOR"];
                    }
                }
            }
        } else
        {
            $this->_local = "";
        }
    }

    private function get_webdriver_server($browser) {
        $local_servers = $this->getConfig('local');
        $matched = array_values( /* reset the array indices */
            array_filter(
                array_keys($local_servers), function ( $it ) use ( $browser ) {
                    return stristr($it, substr($browser, 0, 2));
                })
        );

        return $local_servers[$matched[0]];
    }

    protected function setSize($size)
    {
        if (preg_match("/\d+x\d+/", $size))
        {
            $this->_size = $size;
        }
    }

    protected function setReportId($reportId)
    {
        if (!(isset($reportId) && preg_match("/\d+/", $reportId)))
        {
            $reportId = "";
        }
        $this->_reportId = $reportId;
    }

    protected function setFilename($filename)
    {
        $base = "/opt/honeydew/";
        if (preg_match('/^\/*(?:features|phrases|sets)\//', $filename))
        {
            $filename = $base . $filename;
        } else if (preg_match('/\.feature$/', $filename))
        {
            $filename = $base . "features/" . $filename;
        } else
        {
            $filename = $base . "sets/" . $filename;
        }

        $this->_type = preg_match('/\.feature$/', $filename, $matches) ? "feature" : "setName";

        if (file_exists($filename))
        {
            $this->_filename = $filename;
        } else
        {
            throw new Exception('Cannot locate file: [' . $filename . ']');
        }
    }

    protected function setHostname($hostname)
    {
        if(!(preg_match("/https?:\/\//", $hostname)))
        {
            $hostname = "http://" . $hostname;
        }
        $this->_hostname = $hostname;
    }

    protected function setBrowser($browser)
    {
        $this->_browser = $browser;
    }

    protected function setSauce($browser)
    {
        $sauce = "";
        if (stripos($browser, "local") === FALSE)
        {
            $sauce = true;
        }

        $this->_sauce = $sauce;
    }

    protected function setUsername($username)
    {
        if (isset($_SERVER['PHP_AUTH_USER']))
        {
            $this->_user = $_SERVER['PHP_AUTH_USER'];
        } else if (isset($username))
        {
            $this->_user = $username;
        } else
        {
            $this->_user = "honeydoer";
        }
    }

    protected function setChannel($channel) {
        if (isset($channel)) {
            $this->_channel = $channel;
        }
    }

    private function setQueue($queue) {
        if (isset($queue) && $queue) {
            $this->_queue = true;
        }
        else {
            $this->_queue = false;
        }
    }

    private function setTest($test) {
        if (isset($test) && $test) {
            $this->_test = true;
        }
        else {
            $this->_test = false;
        }
    }

    protected function getChannelString() {
        $string = "";
        if(isset($this->_channel)) {
            $string = "channel=" .  $this->_channel . "^";
        }
        return $string;
    }

    public function getSizeString()
    {
        return $this->_size == "" ? "" : "size=" . $this->_size . "^";
    }

    public function getReportIdString()
    {
        return $this->_reportId == "" ? "" : "reportId=" . $this->_reportId . "^";
    }

    public function getJobString()
    {
        $feature = $this->getFileString();
        $hostname = $this->getHostnameString();
        $sauce = $this->getSauceString();
        $setRunId = $this->getSetRunIdString();
        $browser = $this->getBrowserString();
        $user = $this->getUserString();
        $reportId = $this->getReportIdString();
        $size = $this->getSizeString();
        $channel = $this->getChannelString();
        $local = $this->getLocalString();

        $job = $feature
             . $hostname
             . $sauce
             . $setRunId
             . $user
             . $reportId
             . $size
             . $channel
             . $local
             . $browser;
        /* echo $job . "  \n<br />  "; */
        return $job;
    }

    private function getLocalString()
    {
        if (isset($this->_local) && $this->_local != "")
        {
            return "local=" . $this->_local . "^";
        } else
        {
            return "";
        }
    }

    protected function getSetRunIdString()
    {
        if (preg_match("/.set$/", $this->_filename))
        {
            return "setRunId=" . $this->genRandomString(8) . "^";
        }

        return "";
    }

    protected function getBrowserString()
    {
        $browser = $this->_browser;

        $string = "browser=" . $browser;
        return $string;
    }



    protected function getFileString()
    {
        $filename = $this->_filename;
        $type = $this->_type;

        $string = $type . "=" . $filename . "^";
        return $string;
    }

    protected function getHostnameString()
    {
        $hostname = $this->_hostname;
        $string = "host=" . $hostname . "^";
        return $string;
    }

    protected function getSauceString()
    {
        $isSauce = $this->_sauce;
        $string = "";
        if ($isSauce)
        {
            $string = "sauce=true^";
        }
        return $string;
    }

    protected function getUserString()
    {
        $string = "user=" . $this->_user . "^";
        return $string;
    }

    public function addToQueue($test = false)
    {
        $cmd = $this->asyncShellCommand();

        if (!$test && !$this->_test)
        {
            system($cmd);
        }

        return $cmd;
    }

    public function syncShellCommand()
    {
        $jobString = $this->getJobString();
        if ($this->getConfig('libs')) {
            $libs = $this->getConfig('libs');
        }
        else {
            $libs = '-I/home/honeydew/perl5/lib/perl5';
        }

        $cmd = 'perl ' . $libs . ' /opt/honeydew/bin/jobRunner.pl "' . $jobString . '"';

        return $cmd;
    }

    public function asyncShellCommand()
    {
        $cmd = $this->syncShellCommand();

        $cmd .= ' > /dev/null 2>&1 &';
        return $cmd;
    }

    private function genRandomString($length = 10) {
        $chars = '0123456789abcdefghijklmnopqrstuvwxyz';
        $string = '';
        for($p = 0; $p < $length; $p++)
        {
            $string .= $chars[mt_rand(0, (strlen($chars) - 1))];
        }
        return($string);
    }

    public function getConfig($key)
    {
        if (isset($this->_config) && $this->_config)
        {
            return $this->_config[$key];
        } else
        {
            $this->readConfig();
            return $this->getConfig($key);
        }
    }

    private function readConfig($file = "/opt/honeydew/honeydew.ini")
    {
        if ($this->_config_file) {
            $file = $this->_config_file;
        }

        $contents = file($file);

        foreach ($contents as $row)
        {
            if (preg_match("/^\[(.*)\]/", $row, $matches)) {
                $group = $matches[1];
            }
            if (preg_match("/^\s*#/", $row) || !preg_match('/=/', $row))
            {
                continue;
            } else
            {
                list($name, $value) = explode("=", trim($row));
                $settings[$name] = $value;
                if (isset($group)) {
                    $settings[$group][$name] = $value;
                }
            }
        }

        $this->_config = $settings;
    }

}

?>
