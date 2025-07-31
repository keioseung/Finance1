FROM python:3.12-slim

# 시스템 패키지 및 빌드 필수 패키지 설치
RUN apt-get update && \
    apt-get install -y python3-distutils gcc

# 최신 pip, setuptools, wheel 설치 (별도 RUN)
RUN pip install --upgrade pip setuptools wheel

# 작업 디렉터리 생성 및 소스 복사
WORKDIR /app
COPY . /app

# 의존성 설치
RUN pip install --upgrade -r requirements.txt

# 컨테이너 실행 시 main.py 실행
CMD ["python", "main.py"]