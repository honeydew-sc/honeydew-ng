<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class treeTests extends UnitTestCase {
    protected $baseUrl = "http://localhost/rest.php/tree";
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

    function testListTree() {
        $response = \Httpful\Request::get($this->testUrl)->send();
        $tree = $response->body->tree;
        $leaf = $tree[0];

        $this->assertEqual($leaf->label, $this->filename, "expected file is present");
        $this->assertEqual($leaf->folder, $this->folder, "proper folder is determined");
        $this->assertEqual($leaf->children, array(), "files have no children");
    }

    function testCleanUp() {
        unlink($this->featurePath);
        rmdir($this->testPath);
    }
}

?>
