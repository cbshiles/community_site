cat ~/webAML/community_site/domains/subs/slack/slacks/$1.txt |  rev > /tmp/blah
emacs /tmp/blah
cat /tmp/blah | rev > ~/webAML/community_site/domains/subs/slack/slacks/$1.txt
