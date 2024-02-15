class Version:
    name: str
    local_port: int
    local_host: str

    def __init__(self, name, local_host, local_port):
        self.name = name
        self.local_host = local_host
        self.local_port = local_port

    def compile_server_name(self, base_url: str):
        base_strip = base_url.strip(".")

        if self.name == "":
            return base_strip

        return f'{self.name.strip(".")}.{base_strip}'

    def compile(self, base_url):
        return f'''\
# Version: {self.name}
server {{
    listen 80;
    server_name {self.compile_server_name(base_url)};
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $host;
    add_header Access-Control-Allow-Origin *;
    location / {{
        proxy_pass http://{self.local_host}:{self.local_port};
    }}
}}
'''

    def compile_as_serving(self, base_url):
        return f'''\
# PRIMARY VERSION ({self.name})
server {{
    listen 80;
    server_name {base_url.strip(".")};
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;
    proxy_set_header Host $host;
    add_header Access-Control-Allow-Origin *;
    location / {{
        proxy_pass http://{self.local_host}:{self.local_port};
    }}
}}
'''
