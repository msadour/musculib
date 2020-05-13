FROM python:3.7

MAINTAINER Mehdi Sadour

ENV PYTHONBUFFERED 1
RUN mkdir /musculib
WORKDIR /musculib
COPY requirements.txt /musculib/
RUN pip install -r requirements.txt
COPY . /musculib/