# 금융 SaaS 플랫폼

고급스럽고 세련된 디자인의 금융 SaaS 플랫폼입니다. 포트폴리오 관리, 리스크 관리, 트레이딩, 분석 및 보고 기능을 제공합니다.

## 🚀 주요 기능

### 1. 포트폴리오 관리 (Portfolio Management)
- 자산 배분(Asset Allocation)
- 투자 전략 수립 및 시뮬레이션
- 실시간 포트폴리오 모니터링
- 성과 분석 및 벤치마킹

### 2. 리스크 관리 (Risk Management)
- 시장 리스크, 신용 리스크, 운영 리스크 통합 관리
- 시나리오 분석 및 스트레스 테스트
- VaR(Value at Risk) 계산 및 리스크 한계 관리
- 리스크 요인별 민감도 분석(Delta, Gamma, Vega 등)

### 3. 트레이딩 및 거래 관리 (Trading & Execution)
- 거래 주문 관리(OMS: Order Management System)
- 거래 실행 및 모니터링
- 거래 비용 분석 및 최적화
- 규제 준수 및 거래 기록 관리

### 4. 회계 및 보고 (Accounting & Reporting)
- 포괄적 회계 처리 기능
- 규제 보고 및 컴플라이언스 지원
- 투자자 및 경영진용 보고서 자동 생성
- 세금, 회계 기준별 맞춤형 보고

### 5. 데이터 관리 및 통합 (Data Management & Integration)
- 다양한 시장 데이터, 펀드 데이터, 대체 데이터 통합
- 데이터 정합성 및 품질 관리
- API를 통한 외부 시스템 연동 지원
- 대규모 데이터 처리 및 실시간 업데이트

### 6. 규제 준수 및 감사 (Compliance & Audit)
- 투자 규제 및 회사 정책 준수 모니터링
- 자동화된 감사 추적 및 이력 관리
- 내부통제 및 위험관리 프레임워크 지원

### 7. 분석 및 인공지능 (Analytics & AI)
- 고급 데이터 분석 및 머신러닝 기반 예측
- 자연어 처리(NLP)로 뉴스 및 리서치 데이터 분석
- 자동화된 인사이트 도출 및 경고 시스템

## 🛠 기술 스택

### Frontend
- React 18 + TypeScript
- Tailwind CSS (스타일링)
- Recharts (차트)
- React Query (데이터 페칭)
- Framer Motion (애니메이션)
- Lucide React (아이콘)
- React Router DOM (라우팅)
- React Hot Toast (알림)

### Backend
- FastAPI (Python 3.11+)
- Pydantic (데이터 검증)
- SQLAlchemy (ORM)
- Uvicorn (ASGI 서버)
- WebSockets (실시간 통신)
- Pandas, NumPy, SciPy (데이터 분석)
- Scikit-learn (머신러닝)
- Yfinance (금융 데이터)

### Database
- PostgreSQL (프로덕션)
- SQLite (개발/MVP)

## 📦 설치 및 실행

### 방법 1: Docker Compose (권장)

```bash
# 전체 애플리케이션 실행
docker-compose up --build

# 백그라운드에서 실행
docker-compose up -d --build

# 로그 확인
docker-compose logs -f

# 중지
docker-compose down
```

### 방법 2: 개별 실행

#### 1. 백엔드 설정
```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload
```

#### 2. 프론트엔드 설정
```bash
cd frontend
npm install
npm start
```

### 방법 3: 개발 환경 (CodeSpaces)

```bash
# 백엔드 가상환경 생성 및 활성화
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt

# 백엔드 실행
uvicorn main:app --reload --host 0.0.0.0 --port 8000

# 새 터미널에서 프론트엔드 실행
cd frontend
npm install
npm start
```

## 🌐 접속 정보

- **프론트엔드**: http://localhost:3000 (개발) / http://localhost (Docker)
- **백엔드 API**: http://localhost:8000
- **API 문서**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432 (Docker 사용 시)

## 🚀 배포 (Railway)

### 1. Railway 계정 설정
1. [Railway.app](https://railway.app)에서 계정 생성
2. GitHub 계정 연결

### 2. Railway CLI 설치
```bash
npm install -g @railway/cli
```

### 3. Railway 로그인
```bash
railway login
```

### 4. 백엔드 배포
```bash
cd backend
railway init
railway up
```

**환경 변수 설정:**
```bash
railway variables set PORT=8000
railway variables set CORS_ORIGINS=https://your-frontend-domain.railway.app
```

**PostgreSQL 추가:**
```bash
railway add
# PostgreSQL 선택
railway variables set DATABASE_URL=${{PostgreSQL.DATABASE_URL}}
```

### 5. 프론트엔드 배포
```bash
cd frontend
railway init
railway up
```

**환경 변수 설정:**
```bash
railway variables set REACT_APP_API_URL=https://your-backend-domain.railway.app
railway variables set NODE_ENV=production
```

### 6. 커스텀 도메인 설정
```bash
railway domain
# 도메인 이름 입력
```

### 7. SSL 인증서
Railway에서 자동으로 SSL 인증서를 제공합니다.

### 8. 모니터링 및 로그
```bash
railway logs
railway status
```

### 9. 자동 배포 설정
```bash
railway service --auto-deploy
```

### 10. 스케일링
```bash
railway scale --count 2
```

### 11. 백업 및 복구
```bash
# 데이터베이스 백업
pg_dump $DATABASE_URL > backup.sql

# 환경 변수 백업
railway variables --json > variables.json
```

## 📁 프로젝트 구조

```
금융앱/
├── backend/
│   ├── main.py              # FastAPI 애플리케이션
│   ├── requirements.txt     # Python 의존성
│   └── Dockerfile          # 백엔드 Docker 설정
├── frontend/
│   ├── src/
│   │   ├── components/     # React 컴포넌트
│   │   ├── pages/         # 페이지 컴포넌트
│   │   ├── App.tsx        # 메인 앱 컴포넌트
│   │   └── index.tsx      # 진입점
│   ├── public/            # 정적 파일
│   ├── package.json       # Node.js 의존성
│   ├── tailwind.config.js # Tailwind 설정
│   ├── nginx.conf         # Nginx 설정
│   └── Dockerfile         # 프론트엔드 Docker 설정
├── docker-compose.yml     # 전체 서비스 구성
├── .dockerignore          # Docker 제외 파일
├── .gitignore            # Git 제외 파일
└── README.md             # 프로젝트 문서
```

## 🔧 개발 가이드

### API 엔드포인트

#### 포트폴리오 관리
- `GET /api/portfolio/overview` - 포트폴리오 개요
- `GET /api/portfolio/allocation` - 자산 배분
- `GET /api/portfolio/performance` - 성과 분석

#### 리스크 관리
- `GET /api/risk/var` - VaR 계산
- `GET /api/risk/stress-test` - 스트레스 테스트

#### 트레이딩
- `GET /api/trading/orders` - 주문 목록

#### 분석
- `GET /api/analytics/market-sentiment` - 시장 심리
- `GET /api/analytics/predictions` - 예측 분석

#### 보고
- `GET /api/reports/performance` - 성과 보고서
- `GET /api/reports/compliance` - 규제 준수 보고서

### WebSocket
- `WS /ws` - 실시간 시장 데이터

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: 세련된 파란색 계열
- **Success**: 녹색 계열
- **Warning**: 주황색 계열
- **Danger**: 빨간색 계열
- **Dark**: 어두운 회색 계열

### 애니메이션
- Framer Motion을 활용한 부드러운 전환 효과
- 스태거 애니메이션으로 시각적 계층 구조 표현
- 호버 효과 및 마이크로 인터랙션

### 차트 및 시각화
- Recharts를 활용한 반응형 차트
- 실시간 데이터 업데이트
- 인터랙티브 툴팁 및 줌 기능

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 지원

문제가 발생하거나 질문이 있으시면 이슈를 생성해주세요. 