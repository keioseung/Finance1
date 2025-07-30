# 금융 SaaS 플랫폼

고급 포트폴리오 관리, 리스크 분석, 트레이딩 시스템을 제공하는 종합 금융 SaaS 플랫폼입니다.

## 주요 기능

### 1. 포트폴리오 관리
- 실시간 자산 배분 시각화
- 투자 전략 시뮬레이션
- 성과 분석 및 벤치마킹
- 다중 자산군 관리 (주식, 채권, 대체투자)

### 2. 리스크 관리
- VaR (Value at Risk) 계산
- 스트레스 테스트 및 시나리오 분석
- 리스크 요인별 민감도 분석
- 실시간 리스크 모니터링

### 3. 트레이딩 시스템
- 주문 관리 시스템 (OMS)
- 거래 실행 모니터링
- 비용 분석 및 최적화
- 규제 준수 관리

### 4. 분석 및 AI
- 머신러닝 기반 예측 모델
- NLP 기반 뉴스 분석
- 자동화된 인사이트 도출
- 고급 데이터 시각화

## 기술 스택

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Recharts (차트 라이브러리)
- React Query (데이터 페칭)
- Framer Motion (애니메이션)

### Backend
- FastAPI
- Python 3.11+
- Pydantic (데이터 검증)
- SQLAlchemy (ORM)

### Database
- PostgreSQL (프로덕션)
- SQLite (개발)

## 설치 및 실행

### 1. 백엔드 설정
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. 프론트엔드 설정
```bash
cd frontend
npm install
npm start
```

## 배포 (Railway)

### 1. Railway 계정 설정

1. **Railway 계정 생성**
   - [Railway.app](https://railway.app)에서 GitHub 계정으로 로그인
   - 새 프로젝트 생성

2. **Railway CLI 설치**
   ```bash
   npm install -g @railway/cli
   ```

3. **Railway 로그인**
   ```bash
   railway login
   ```

### 2. 백엔드 배포

1. **백엔드 디렉토리로 이동**
   ```bash
   cd backend
   ```

2. **Railway 프로젝트 초기화**
   ```bash
   railway init
   ```

3. **환경 변수 설정**
   ```bash
   railway variables set PORT=8000
   railway variables set CORS_ORIGINS=http://localhost:3000,https://your-frontend-domain.railway.app
   ```

4. **PostgreSQL 데이터베이스 추가**
   ```bash
   railway add
   # PostgreSQL 선택
   ```

5. **데이터베이스 환경 변수 설정**
   ```bash
   railway variables set DATABASE_URL=${{Postgres.DATABASE_URL}}
   ```

6. **백엔드 배포**
   ```bash
   railway up
   ```

### 3. 프론트엔드 배포

1. **프론트엔드 디렉토리로 이동**
   ```bash
   cd ../frontend
   ```

2. **새 Railway 프로젝트 생성**
   ```bash
   railway init --name financial-saas-frontend
   ```

3. **환경 변수 설정**
   ```bash
   railway variables set REACT_APP_API_URL=https://your-backend-url.railway.app
   railway variables set NODE_ENV=production
   ```

4. **프론트엔드 배포**
   ```bash
   railway up
   ```

### 4. 도메인 설정

1. **커스텀 도메인 추가 (선택사항)**
   - Railway 대시보드에서 프로젝트 선택
   - Settings > Domains에서 커스텀 도메인 추가

2. **SSL 인증서 자동 설정**
   - Railway에서 자동으로 SSL 인증서 제공

### 5. 모니터링 및 로그

1. **로그 확인**
   ```bash
   railway logs
   ```

2. **실시간 모니터링**
   - Railway 대시보드에서 실시간 메트릭 확인
   - CPU, 메모리, 네트워크 사용량 모니터링

### 6. 자동 배포 설정

1. **GitHub 연동**
   - Railway 프로젝트에서 GitHub 저장소 연결
   - main 브랜치에 push 시 자동 배포

2. **배포 트리거 설정**
   ```bash
   railway service --auto-deploy
   ```

### 7. 스케일링

1. **수평 스케일링**
   ```bash
   railway scale --count 3
   ```

2. **리소스 할당 조정**
   - Railway 대시보드에서 CPU/메모리 할당량 조정

### 8. 백업 및 복구

1. **데이터베이스 백업**
   ```bash
   railway connect
   pg_dump $DATABASE_URL > backup.sql
   ```

2. **환경 변수 백업**
   ```bash
   railway variables --json > variables.json
   ```

## 환경 변수

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost/finance_saas
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WEBSOCKET_URL=ws://localhost:8000/ws
```

## 프로젝트 구조
```
finance-saas/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── models/
│   │   ├── services/
│   │   └── utils/
│   ├── requirements.txt
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── package.json
│   └── tailwind.config.js
└── README.md
``` 