<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class filesTests extends UnitTestCase {
    protected $base = 'http://localhost/rest.php';
    protected $baseUrl = "http://localhost/rest.php/sets";
    protected $basePath = "/opt/honeydew";

    private $names = array( 'fake.feature', 'fake2.feature' );
    function setupFakeSet() {
        $features_dir = $this->basePath . '/features/';
        $contents = "Feature: hello\nSet: @haystack @needle @okay\n\nScenario: yes okay";

        $names = $this->names;
        array_walk( $names, function ( $it ) use ( $features_dir, $contents ) {
            $filename = $features_dir . $it;
            unlink( $filename );
            file_put_contents( $filename, $contents );
        });
    }

    function cleanupFakeSet() {
        $names = $this->names;
        array_walk( $names, function ( $it ) use ( $features_dir, $contents ) {
            $filename = $features_dir . $it;
            unlink( $filename );
        });
    }

    function testGet() {
        $response = \Httpful\Request::get($this->baseUrl)->send();
        $this->assertFalse( in_array( '-.set', $response->body->sets ) );
        $this->assertFalse( in_array( '.set', $response->body->sets ) );
    }

    function testRenameExistingSet() {
        $this->setupFakeSet();

        /* rename @needle to @renamed */
        $response = \Httpful\Request::post($this->baseUrl . '/needle.set')
             ->body(json_encode(array( 'newSetName' => 'renamed' )))
        /* ->withoutAutoParsing() */
             ->send();

        /* check that @renamed exists */
        $response = \Httpful\Request::get($this->base . '/files/sets/renamed.set')
             ->send();
        $this->assertPattern( '/fake.feature\s+fake2.feature/', $response->body->contents );

        /* check that @needle is gone */
        $response = \Httpful\Request::get($this->base . '/files/sets/needle.set')
             ->send();
        $this->assertEqual( 404, $response->code );
        $this->assertPattern( '/No such file or directory/', $response->body->reason );

        $this->cleanupFakeSet();
    }

    function testInvalidNewRenames() {
        $invalid = array(
            '!@#$%',
            'renamed)',

        );

        foreach ( $invalid as $newName ) {
            $this->setupFakeSet();

            $response = \Httpful\Request::post($this->baseUrl . '/needle.set')
                 ->body(json_encode(array( 'newSetName' => $newName )))
                 ->send();

            $this->assertPattern(
                '/Set rename error: The new filename is funky/',
                $response->body->reason,
                'cannot rename to ' . $newName
            );

            $this->cleanupFakeSet();
        }

    }

    function testValidNewRenames() {
        $valid = array(
            'reNAMED',
            'superm_-.n',
            're_na-ME-ed90'
        );

        foreach ( $invalid as $newName ) {
            $this->setupFakeSet();

            $response = \Httpful\Request::post($this->baseUrl . '/needle.set')
                 ->body(json_encode(array( 'newSetName' => $newName )))
                 ->send();

            $this->assertEqual( 200, $response->code, 'can rename to ' . $newName);

            $this->cleanupFakeSet();
        }

    }
}
