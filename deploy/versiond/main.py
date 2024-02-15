#!/usr/bin/python3
#
# This script deploys and routes to the correct version of the running service.
# It is meant to be ran as a daemon service.

# from flask import Flask

from configuration_generator import Version, Service

# The following code are as a test.
srv = Service("curves.social")

srv.add_version(
    Version(
        name="blue",
        local_host="localhost",
        local_port=5000,
    )
)

srv.add_version(
    Version(
        name="green",
        local_host="localhost",
        local_port=5001,
    )
)

srv.promote_version("blue")

print(srv.compile())
