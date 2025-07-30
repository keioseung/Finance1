FROM python:3.12-slim

RUN apt-get update && apt-get install -y python3-distutils

# 프로젝트 파일 복사 및 작업 디렉터리 설정
WORKDIR /app
COPY . /app

# 의존성 설치
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

CMD ["python", "main.py"]