<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class treeTests extends UnitTestCase {
    protected $baseUrl = "http://127.0.0.1/rest.php/tree";
    protected $basePath = "/opt/honeydew";

    public function __construct() {
        $this->folder = "/tmp";
        $this->testPath = $this->basePath . $this->folder;
        mkdir($this->testPath);

        $this->filename = "test.feature";
        $this->featurePath = $this->testPath . '/' . $this->filename;
        touch($this->featurePath);

        $this->testUrl = $this->baseUrl . $this->folder;
    }

    function touchInTmp( $files ) {
        foreach ($files as $file) {
            touch($this->testPath . '/' . $file);
        }
    }

    function testListTree() {
        $response = \Httpful\Request::get($this->testUrl)->send();
        $tree = $response->body->tree;
        $leaf = $tree[0];

        $this->assertEqual($leaf->label, $this->filename, "expected file is present");
        $this->assertEqual($leaf->folder, $this->folder, "proper folder is determined");
        $this->assertEqual($leaf->children, array(), "files have no children");
    }

    function testOrder() {
        $this->touchInTmp( array( 'okay.feature', 'Okay_Okay.feature', 'OK' ));
        $response = \Httpful\Request::get($this->testUrl)->send();
        $tree = $response->body->tree;

        $this->assertEqual($tree[0]->label, 'Okay_Okay.feature');
    }

    function testGrep() {
        file_put_contents($this->testPath . '/found.feature', 'needle');
        file_put_contents($this->testPath . '/missing.feature', 'haystack');

        $response = \Httpful\Request::get($this->testUrl . '?needle=needle')->send();
        $this->assertPattern('/^tmp\/found.feature/', $response->body->list[0], "grep found the needle");
    }

    function rrmdir($dir) {
        foreach(glob($dir . '/*') as $file) {
            if(is_dir($file))
                rrmdir($file);
            else
                unlink($file);
        }
        rmdir($dir);
    }

    function testCleanUp() {
        $this->rrmdir($this->testPath);
    }
}

?>
