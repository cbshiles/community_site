#!/usr/local/bin/perl
#When using, make sure to close editor
use strict;
use warnings;

my $argSize = @ARGV;
$argSize > 0 or die "Error: Which page do you want to go to?";
my $go2 = $ARGV[0];

my $dir = '/home/brenan/community_site/domains/subs/slack/slacks';
opendir(DIR, $dir) or die $!;

my @fileNums = ();
while (my $file = readdir(DIR)) {
        # Use a regular expression to ignore files beginning with a period
    next if ($file =~ m/^\./);
    my @f = split('\.', $file);
    push (@fileNums, $f[0]); #add file number to array (5.txt -> 5)
}
closedir(DIR);

my @sortedNums = reverse sort { $a <=> $b } @fileNums;

#write file
my $fNum = $sortedNums[$go2];
my $wf = $dir.'/'.$fNum.".txt";
my $ef = "/tmp/blah";
print "$wf";

#reve reverses each line, we kinda of want the whole flip
`cat $wf |  rev > $ef`;
`emacs $ef`;
`cat $ef | rev > $wf`;

exit 0;
