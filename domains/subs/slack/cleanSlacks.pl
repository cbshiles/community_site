#!/usr/bin/perl
#This script need work!
#keeps emacs processes open? and doesnt account for the fact that the #s might not start @ 1
use strict;
use warnings;

my $argSize = @ARGV;
$argSize > 0 or die "Error: Which page do you want to go to?";
my $go2 = $ARGV[0];

my $dir = '/home/ec2-user/webAML/community_site/domains/subs/slack/slacks';
opendir(DIR, $dir) or die $!;

my $n = 0;
while (my $file = readdir(DIR)) {
        # Use a regular expression to ignore files beginning with a period
    next if ($file =~ m/^\./);
    $n++;
}
closedir(DIR);

#write file
my $wf = $dir.'/'.($n - $go2 - 1).".txt";
my $ef = "/tmp/blah";
print "$wf";

#reve reverses each line, we kinda of want the whole flip
`cat $wf |  rev > $ef`;
`emacs $ef`;
`cat $ef | rev > $wf`;

exit 0;
