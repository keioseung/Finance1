from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import json
import asyncio
from datetime import datetime, timedelta
import random
import numpy as np
import pandas as pd
from typing import List, Dict, Any

app = FastAPI(
    title="금융 SaaS API",
    description="고급 포트폴리오 관리 및 리스크 분석 시스템",
    version="1.0.0"
)

# CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://your-domain.railway.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# WebSocket 연결 관리
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                pass

manager = ConnectionManager()

# WebSocket 엔드포인트
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # 실시간 데이터 시뮬레이션
            await asyncio.sleep(2)
            data = {
                "type": "market_update",
                "timestamp": datetime.now().isoformat(),
                "portfolio_value": round(random.uniform(1000000, 1500000), 2),
                "daily_change": round(random.uniform(-50000, 50000), 2),
                "daily_change_percent": round(random.uniform(-5, 5), 2)
            }
            await manager.send_personal_message(json.dumps(data), websocket)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# 포트폴리오 데이터
@app.get("/api/portfolio/overview")
async def get_portfolio_overview():
    """포트폴리오 개요 데이터"""
    return {
        "total_value": 1250000,
        "daily_change": 25000,
        "daily_change_percent": 2.04,
        "monthly_change": 125000,
        "monthly_change_percent": 11.11,
        "yearly_change": 450000,
        "yearly_change_percent": 56.25,
        "cash": 150000,
        "invested": 1100000,
        "unrealized_pnl": 45000,
        "realized_pnl": 125000
    }

@app.get("/api/portfolio/allocation")
async def get_portfolio_allocation():
    """자산 배분 데이터"""
    return {
        "stocks": {
            "value": 600000,
            "percentage": 48.0,
            "change": 15000,
            "change_percent": 2.56
        },
        "bonds": {
            "value": 300000,
            "percentage": 24.0,
            "change": 5000,
            "change_percent": 1.69
        },
        "etfs": {
            "value": 200000,
            "percentage": 16.0,
            "change": 3000,
            "change_percent": 1.52
        },
        "alternatives": {
            "value": 150000,
            "percentage": 12.0,
            "change": 2000,
            "change_percent": 1.35
        }
    }

@app.get("/api/portfolio/performance")
async def get_portfolio_performance():
    """포트폴리오 성과 데이터"""
    # 30일간의 성과 데이터 생성
    dates = [(datetime.now() - timedelta(days=i)).strftime("%Y-%m-%d") for i in range(30, 0, -1)]
    values = []
    base_value = 1000000
    
    for i in range(30):
        # 랜덤 워크 시뮬레이션
        daily_return = np.random.normal(0.001, 0.02)  # 평균 0.1%, 표준편차 2%
        base_value *= (1 + daily_return)
        values.append(round(base_value, 2))
    
    return {
        "dates": dates,
        "values": values,
        "benchmark": [round(v * 0.95 + np.random.normal(0, 1000), 2) for v in values]
    }

@app.get("/api/risk/var")
async def get_risk_var():
    """VaR (Value at Risk) 데이터"""
    return {
        "daily_var_95": 45000,
        "daily_var_99": 65000,
        "weekly_var_95": 120000,
        "weekly_var_99": 180000,
        "monthly_var_95": 250000,
        "monthly_var_99": 350000,
        "confidence_levels": [90, 95, 99],
        "var_values": [35000, 45000, 65000]
    }

@app.get("/api/risk/stress-test")
async def get_stress_test():
    """스트레스 테스트 결과"""
    scenarios = [
        {"name": "시장 충격", "impact": -15.5, "probability": "높음"},
        {"name": "금리 상승", "impact": -8.2, "probability": "중간"},
        {"name": "환율 변동", "impact": -5.1, "probability": "낮음"},
        {"name": "유동성 위기", "impact": -12.3, "probability": "중간"},
        {"name": "정치적 불안", "impact": -6.8, "probability": "낮음"}
    ]
    
    return {
        "scenarios": scenarios,
        "worst_case": -15.5,
        "expected_case": -8.2,
        "best_case": -2.1
    }

@app.get("/api/trading/orders")
async def get_trading_orders():
    """거래 주문 데이터"""
    return {
        "pending_orders": [
            {
                "id": "ORD001",
                "symbol": "AAPL",
                "type": "BUY",
                "quantity": 100,
                "price": 150.50,
                "status": "PENDING",
                "timestamp": "2024-01-15T10:30:00Z"
            },
            {
                "id": "ORD002",
                "symbol": "TSLA",
                "type": "SELL",
                "quantity": 50,
                "price": 250.75,
                "status": "PENDING",
                "timestamp": "2024-01-15T11:15:00Z"
            }
        ],
        "recent_trades": [
            {
                "id": "TRD001",
                "symbol": "MSFT",
                "type": "BUY",
                "quantity": 200,
                "price": 380.25,
                "timestamp": "2024-01-15T09:45:00Z"
            }
        ]
    }

@app.get("/api/analytics/market-sentiment")
async def get_market_sentiment():
    """시장 센티먼트 분석"""
    return {
        "overall_sentiment": "긍정적",
        "sentiment_score": 0.75,
        "sectors": {
            "technology": {"sentiment": "매우 긍정적", "score": 0.85},
            "healthcare": {"sentiment": "긍정적", "score": 0.70},
            "finance": {"sentiment": "중립", "score": 0.50},
            "energy": {"sentiment": "부정적", "score": 0.30},
            "consumer": {"sentiment": "긍정적", "score": 0.65}
        },
        "trending_topics": [
            "AI 기술 발전", "중앙은행 정책", "기업 실적", "지정학적 위험"
        ]
    }

@app.get("/api/analytics/predictions")
async def get_ai_predictions():
    """AI 예측 모델 결과"""
    return {
        "market_direction": "상승",
        "confidence": 0.78,
        "key_factors": [
            "기업 실적 개선", "금리 인하 기대", "기술 혁신"
        ],
        "risk_factors": [
            "인플레이션 지속", "지정학적 불안정", "규제 강화"
        ],
        "recommendations": [
            "성장주 비중 확대", "방어적 자산 일부 보유", "분산 투자 유지"
        ]
    }

@app.get("/api/reports/performance")
async def get_performance_report():
    """성과 보고서"""
    return {
        "period": "2024년 1월",
        "total_return": 11.25,
        "benchmark_return": 8.50,
        "alpha": 2.75,
        "beta": 0.95,
        "sharpe_ratio": 1.45,
        "max_drawdown": -8.20,
        "volatility": 12.50,
        "top_performers": [
            {"symbol": "NVDA", "return": 25.5},
            {"symbol": "AAPL", "return": 18.2},
            {"symbol": "MSFT", "return": 15.8}
        ],
        "bottom_performers": [
            {"symbol": "TSLA", "return": -5.2},
            {"symbol": "META", "return": -2.1},
            {"symbol": "NFLX", "return": 1.5}
        ]
    }

@app.get("/api/analytics/market-predictions")
async def get_market_predictions():
    """시장 예측 데이터"""
    return {
        "predictions": [
            {
                "date": "2024-01",
                "actual": 2.1,
                "predicted": 2.3,
                "confidence": 85
            },
            {
                "date": "2024-02",
                "actual": 2.8,
                "predicted": 2.6,
                "confidence": 78
            },
            {
                "date": "2024-03",
                "actual": 3.2,
                "predicted": 3.1,
                "confidence": 82
            }
        ]
    }

@app.get("/api/analytics/sentiment")
async def get_sentiment_analysis():
    """감정 분석 데이터"""
    return {
        "sentiment": [
            {
                "sector": "Technology",
                "positive": 65,
                "negative": 15,
                "neutral": 20
            },
            {
                "sector": "Healthcare",
                "positive": 45,
                "negative": 25,
                "neutral": 30
            },
            {
                "sector": "Finance",
                "positive": 55,
                "negative": 20,
                "neutral": 25
            }
        ]
    }

@app.get("/api/analytics/insights")
async def get_ai_insights():
    """AI 인사이트 데이터"""
    return {
        "insights": [
            {
                "id": 1,
                "type": "opportunity",
                "title": "기술주 모멘텀 감지",
                "description": "AI 분석 결과 기술주 섹터에서 강한 상승 모멘텀을 감지했습니다.",
                "confidence": 87,
                "impact": "high",
                "timestamp": "2시간 전"
            },
            {
                "id": 2,
                "type": "risk",
                "title": "에너지 섹터 리스크 증가",
                "description": "정치적 불확실성으로 인한 에너지 섹터 리스크가 증가하고 있습니다.",
                "confidence": 92,
                "impact": "medium",
                "timestamp": "4시간 전"
            }
        ]
    }

@app.get("/api/analytics/performance")
async def get_performance_metrics():
    """성과 지표 데이터"""
    return {
        "metrics": {
            "ai_accuracy": 87.3,
            "sentiment_index": 72.5,
            "risk_score": 23.8,
            "algorithm_signals": 8
        }
    }

@app.get("/api/reports/compliance")
async def get_compliance_report():
    """규제 준수 보고서"""
    return {
        "compliance": [
            {
                "category": "내부통제",
                "status": "준수",
                "score": 95,
                "lastCheck": "2024-01-15"
            },
            {
                "category": "리스크 관리",
                "status": "준수",
                "score": 88,
                "lastCheck": "2024-01-10"
            },
            {
                "category": "정보보호",
                "status": "주의",
                "score": 72,
                "lastCheck": "2024-01-12"
            }
        ]
    }

@app.get("/api/reports/tax")
async def get_tax_report():
    """세무 보고서"""
    return {
        "tax_data": [
            {
                "category": "배당소득",
                "amount": 1250000,
                "tax": 187500,
                "rate": 15
            },
            {
                "category": "양도소득",
                "amount": 850000,
                "tax": 170000,
                "rate": 20
            },
            {
                "category": "이자소득",
                "amount": 320000,
                "tax": 32000,
                "rate": 10
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 