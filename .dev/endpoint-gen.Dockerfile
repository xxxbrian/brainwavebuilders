FROM python:3.12

VOLUME [ "/app" ]

RUN pip install --upgrade pip
COPY rpc/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt
