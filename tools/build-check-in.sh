#!/bin/bash
REPO="~/OSC/home:pvarkoly:CRANIX/cranix-web"
HERE=$( pwd )
DATE=$( date -u +"Built at: %Y-%m-%d %H:%M" )
git status

echo -n "Can we build y/n "; read b
if [ $b != "y" ]; then
	exit
fi
cp src/index-prod.html src/index.html
sed -i "s/VERSION-PLACE-HOLDER/${DATE}/" src/app/services/auth.service.ts
ionic build --prod
git stash
echo -n "Can we checkin y/n "; read b
if [ "${b}" != "y" ]; then
	exit
fi
cd www
tar cjf $REPO/cranix-web.tar.bz2 *
xterm -e "git log --raw" &
cd ${REPO}
echo "-------------------------------------------------------------------
$(LANG=en_EN date -u) - Peter Varkoly <pvarkoly@cephalix.eu>

- " > bla
cat bla cranix-web.changes > blabla
mv blabla cranix-web.changes
vi cranix-web.changes
osc ci
cd ${HERE}
