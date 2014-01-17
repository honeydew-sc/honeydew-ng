#! /usr/bin/perl

use strict;
use warnings;
use Test::More;
use LWP::UserAgent;
use JSON;

SLIM_ROUTES: {
    my $ua = LWP::UserAgent->new;

    # test get
    foreach my $type qw(feature phrase set)
    {
        testGetRouter($ua, $type);
    }

    # get with file paths in name
    testGetRouter($ua, "feature", "whee/");

    # get with encoded file paths in name
    # these have to be double encoded because %2F auto 404s
    # http://www.jampmark.com/web-scripting/5-solutions-to-url-encoded-slashes-problem-in-apache.html
    # allowencodedslashes apache httpd.conf directive
    testGetRouter($ua, "feature", "whee%252F");

    # test put
    my $time = time;
    my $putFeature = "/opt/honeydew/features/fake.feature";
    my $putFeatureUrl = "http://localhost/features_crud.php/fake.feature";
    my $req = HTTP::Request->new(PUT => $putFeatureUrl);
    $req->content('{"contents": "' . $time . '"}');
    $ua->request($req);
    cmp_ok(`cat $putFeature`, '=~', $time, "can put a file");

    # test delete
    $ua->delete($putFeatureUrl);
    ok(! -f $putFeature, "deleted it!");
    unlink $putFeature;

    sub testGetRouter {
        my $ua = shift;
        my $type = shift;
        my $prefix = shift || "";
        my $decodedPrefix = $prefix;
        $decodedPrefix =~ s/%252F/\//g;

        my $base = "/opt/honeydew/" . $type . "s/";
        mkdir $base . $decodedPrefix if $prefix ne "";

        my $name = $decodedPrefix . "04phptest." . $type;
        open (my $fh, ">", $base . $name);
        my $time = time;
        print $fh time;
        close ($fh);

        my $response = $ua->get('http://localhost/features_crud.php/' . $name);
        cmp_ok(decode_json($response->decoded_content)->{contents}, 'eq', $time, "get $type contents");
        unlink $base . $name;
        rmdir $base . $decodedPrefix if $prefix ne "";
    }
}

done_testing;
