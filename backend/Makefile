VENDORPATH:=${PWD}/_vendor
GOPATH:=$(VENDORPATH):${PWD}
GOC=go


#VERSION=$(shell head -n 1 debian/changelog | sed 's/.*(\(.*\)).*/\1/')
REVISION=$(shell git rev-parse --short HEAD)


all:
	GOPATH=$(VENDORPATH):${PWD} $(GOC) build -ldflags="-X main.version=${VERSION}-${REVISION}" -o  ./bin/backend ./src/*.go

run: all
	./bin/backend

get:
	GOPATH=$(VENDORPATH) $(GOC) get -d -v github.com/lib/pq
	GOPATH=$(VENDORPATH) $(GOC) get -d -v github.com/zenazn/goji
	GOPATH=$(VENDORPATH) $(GOC) get -d -v github.com/jmoiron/sqlx
	GOPATH=$(VENDORPATH) $(GOC) get -d -v github.com/BurntSushi/toml
	find _vendor/src/ -depth \( -name ".git" -or -name ".svn" -or -name ".hg" -or -name ".bzr" \) -exec rm -rf {} \;


install:
	install -g 0 -o 0 --mode 0755 bin/backend $(DESTDIR)/usr/sbin/
