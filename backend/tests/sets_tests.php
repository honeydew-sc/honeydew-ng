<?php
error_reporting(E_ALL ^ (E_NOTICE | E_WARNING));
ini_set("display_errors", 1);
require(dirname(__FILE__) . './../vendor/autoload.php');
require_once(dirname(__FILE__) . './../vendor/simpletest/simpletest/autorun.php');

class SetsTests extends UnitTestCase {
    protected $base = 'http://localhost/rest.php';
    protected $baseUrl = "http://localhost/rest.php/sets";
    protected $basePath = "/opt/honeydew";

    private $names = array( 'fake.feature', 'fake2.feature' );

    function getSetFilenames() {
        $names = $this->names;

        $fullNames = array_map( function ( $it ) {
            $features_dir = $this->basePath . '/features/';
            $filename = $features_dir . $it;
            return $filename;
        }, $names);

        return $fullNames;
    }

    function setupFakeSet( $setLine = 'Set: @haystack @needle @okay' ) {
        $contents = $this->featureTemplate( $setLine );

        $files = $this->getSetFilenames();
        array_walk( $files, function ( $file ) use ( $contents ) {
            unlink( $file );
            file_put_contents( $file, $contents );
        });
    }

    function featureTemplate( $setLine = 'Set: @haystack @needle @okay') {
        return "Feature: hello\n$setLine\n\nScenario: yes okay";
    }

    function cleanupFakeSet() {
        $files = $this->getSetFilenames();
        array_walk( $files, function ( $it )  {
            unlink( $it );
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

    function testRenameSetRegex() {
        $tests = array(
            array(
                'name' => 'alone, no leading space',
                'old' => 'Set:@needle',
                'new' => 'Set:@shiny',
            ),
            array(
                'name' => 'alone, leading space',
                'old' => 'Set: @needle',
                'new' => 'Set: @shiny',
            ),
            array(
                'name' => 'first of N, leading space',
                'old' => 'Set: @needle @haystack',
                'new' => 'Set: @shiny @haystack',
            ),
            array(
                'name' => 'middle, no leading space',
                'old' => 'Set:@haystack @needle @haystack2',
                'new' => 'Set:@haystack @shiny @haystack2',
            ),
            array(
                'name' => 'middle, leading space',
                'old' => 'Set: @haystack @needle @haystack2',
                'new' => 'Set: @haystack @shiny @haystack2',
            ),
            array(
                'name' => 'last, leading space',
                'old' => 'Set: @haystack @needle',
                'new' => 'Set: @haystack @shiny',
            ),
            array(
                'name' => 'skipping substring matches',
                'old' => 'Set: @needleNeedle',
                'new' => 'Set: @needleNeedle',
            )
        );

        $files = $this->getSetFilenames();
        foreach ( $tests as $test ) {
            $this->setupFakeSet( $test['old'] );

            /* rename @needle to @shiny */
            $response = \Httpful\Request::post($this->baseUrl . '/needle.set')
                 ->body(json_encode(array( 'newSetName' => 'shiny' )))
                 ->send();

            foreach ( $files as $file ) {
                $this->assertEqual(
                    file_get_contents( $file ),
                    $this->featureTemplate( $test['new'] ),
                    $test['name']
                );
            }

            $this->cleanupFakeSet();
        }
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
