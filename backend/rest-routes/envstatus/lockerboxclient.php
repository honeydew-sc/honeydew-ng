<?php
/* from https://github.com/Sharecare/lockerbox/blob/master/clients/php/lockerboxclient.php */

class LockerBox {
    private $_secret;
    private $_timeout;

    public function __construct($secret, $timeout=10){
        $this->_secret = $secret;
        $this->_timeout = $timeout;
    }

    public function sign($opts){
        if(!isset($opts['access'])){
            throw new Exception('No access on opts');
        }
        if(!isset($opts['lbtime'])){
            throw new Exception('No lbtime on opts');
        }
        if(!isset($opts['method'])){
            throw new Exception('No method on opts');
        }

        // build up the query string that we sign
        $queryString = $opts['access'] . ':' . $opts['lbtime'] . ':' . $opts['method'];

        // create an escaped signature based off of the query string
        $sig = base64_encode(hash_hmac("sha256", $queryString, $this->_secret, True));
        $sig = str_replace("%7E", "~", rawurlencode($sig));

        return($sig);
    }

    public function buildUrl($url, $opts){
        if(!isset($opts['access'])){
            throw new Exception('No access on opts');
        }
        if(!isset($opts['lbtime'])){
            $opts['lbtime'] = time();
        }
        if(!isset($opts['method'])){
            throw new Exception('No method on opts');
        }

        $sig = $this->sign($opts);
        if(strpos($url, '?')){
            $url = $url . '&lbtime=' . $opts['lbtime'] . '&lbsig=' . $sig;
        }else{
            $url = $url . '?lbtime=' . $opts['lbtime'] . '&lbsig=' . $sig;
        }
        return($url);
    }

    public function request($url, $signopts, $data=false, $method=false, $headers=false){
        if($method){
            $method = strtoupper($method);
        }else{
            if($data){
                $method = 'POST';
            }else{
                $method = 'GET';
            }
        }
        if($signopts){
            $signopts['method'] = $method;
            $url = $this->buildUrl($url, $signopts);
        }

        $response = $this->_query($url, $method, $data, $headers);
        return($response);
    }

    private function _query($url, $method, $data=false, $headers=false){
        $curlHandle = curl_init ();

        $curlOpt = Array (
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => true,
            CURLOPT_CONNECTTIMEOUT => 3,
            CURLOPT_TIMEOUT => $this->_timeout,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLINFO_HEADER_OUT => true
        );

        // set the curl options
        curl_setopt_array($curlHandle, $curlOpt);

        if($method == 'POST'){
            curl_setopt($curlHandle, CURLOPT_POST, true);
            curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $data);
        }elseif($method == 'DELETE'){
            curl_setopt($curlHandle, CURLOPT_CUSTOMREQUEST, 'DELETE');
        }

        if($headers){
            curl_setopt($curlHandle, CURLOPT_HTTPHEADER, $headers);
        }

        $time_start = microtime(true);

        // do the curl
        try{
            $content = curl_exec($curlHandle);
        }catch (Exception $e){
            echo "error " . $e->getMessage() . " during curl_exec\n";
        }

        if(curl_errno($curlHandle)){
            $content = curl_error($curlHandle);
        }

        $status = curl_getinfo($curlHandle, CURLINFO_HTTP_CODE);
        $request = curl_getinfo($curlHandle, CURLINFO_HEADER_OUT);

        curl_close($curlHandle);

        $time_end = microtime(true);

        list($header, $body) = explode("\r\n\r\n", $content, 2);

        $response = Array(
            'headers' => $header,
            'response' => $body,
            'request' => $request,
            'status' => $status,
            'speed' => ($time_end - $time_start)
        );

        return($response);
    }

}

function getBuildOnEnv( $env, $app ) {
    $globalConfig = readInConfSettings();

    /* The bucket abstracts out which URL to query, and what the build
    number should look like */
    $bucket = appToBucket($app);

    $config['access'] = $globalConfig['lockerbox_access'];
    $config['secret'] = $globalConfig['lockerbox_secret'];
    $config['owner'] = $globalConfig['lockerbox_owner'];
    $config['bucket'] = '/site/' . $bucket['siteId'] . '/builds/' . $bucket['serverClass'] . '/' . $env;

    $lb = new LockerBox($config['secret']);
    $hostname = $globalConfig['lockerbox_host'];
    $url = $hostname . '/lock/' . $config['access'] . '/' . $config['bucket'];

    $res = $lb->request($url, $config);
    $res = $res['response'];
    $res = json_decode($res);
    $res = $res->CONTENT;

    if (preg_match('/' . $bucket['regex'] . '/', $res, $matches)) {
        $res = $matches[1];
    }

    return $res;
}

function appToBucket ( $app = 'SC' ) {
    $app = strtolower( $app );
    switch ($app) {
        case 'sc'   : return lockerParts( 'sc', 'webpub', java_build_regex() );
        case 'droz' : return lockerParts( 'oz', 'droz', php_build_regex() );
        case 'hca'  : return lockerParts( 'hc', 'webpub', java_build_regex() );
        case 'ds'   : return lockerParts( 'ds', 'ds', php_build_regex() );
        case 'army' : return lockerParts( 'ar', 'webarmy', java_build_regex() );
        case 'tma'  : return lockerParts( 'um', 'webpub', java_build_regex() );
    };
}

function lockerParts( $site, $server, $regex ) {
    return array(
        'siteId' => $site,
        'serverClass' => $server,
        'regex' => $regex
    );
}

function java_build_regex ( $type = 'sharecare') {
    return 'builds\/' . $type . '\/rc\/(.*)';
}

function php_build_regex () {
    return 'build-(.*)\.tar\.';
}
