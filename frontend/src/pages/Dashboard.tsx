import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  Shield,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Target,
  Zap
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const Dashboard: React.FC = () => {
  const [realTimeData, setRealTimeData] = useState<any>(null);

  // API 데이터 페칭
  const { data: portfolioOverview } = useQuery('portfolio-overview', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/portfolio/overview`);
    return response.data;
  });

  const { data: portfolioAllocation } = useQuery('portfolio-allocation', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/portfolio/allocation`);
    return response.data;
  });

  const { data: portfolioPerformance } = useQuery('portfolio-performance', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/portfolio/performance`);
    return response.data;
  });

  const { data: riskVar } = useQuery('risk-var', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/risk/var`);
    return response.data;
  });

  const { data: marketSentiment } = useQuery('market-sentiment', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/analytics/market-sentiment`);
    return response.data;
  });

  // 실시간 데이터 시뮬레이션
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData({
        portfolioValue: Math.random() * 500000 + 1000000,
        dailyChange: Math.random() * 100000 - 50000,
        dailyChangePercent: Math.random() * 10 - 5
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // 차트 데이터 변환
  const performanceData = portfolioPerformance?.dates?.map((date: string, index: number) => ({
    date,
    portfolio: portfolioPerformance?.values?.[index] || 0,
    benchmark: portfolioPerformance?.benchmark?.[index] || 0
  })) || [];

  const allocationData = portfolioAllocation ? [
    { name: '주식', value: portfolioAllocation.stocks.value, color: '#3B82F6' },
    { name: '채권', value: portfolioAllocation.bonds.value, color: '#10B981' },
    { name: 'ETF', value: portfolioAllocation.etfs.value, color: '#F59E0B' },
    { name: '대체투자', value: portfolioAllocation.alternatives.value, color: '#8B5CF6' }
  ] : [];

  const sectorData = marketSentiment?.sectors ? Object.entries(marketSentiment.sectors).map(([key, value]: [string, any]) => ({
    sector: key,
    sentiment: value.score * 100
  })) : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-600">포트폴리오 현황 및 시장 동향을 한눈에 확인하세요</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span>실시간 업데이트</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {/* 포트폴리오 가치 */}
        <motion.div variants={itemVariants} className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 포트폴리오 가치</p>
              <p className="text-2xl font-bold text-gray-900">
                ${portfolioOverview?.total_value?.toLocaleString() || '1,250,000'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg gradient-bg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {portfolioOverview?.daily_change_percent > 0 ? (
              <ArrowUpRight className="h-4 w-4 text-success-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-danger-500" />
            )}
            <span className={`ml-1 text-sm font-medium ${
              portfolioOverview?.daily_change_percent > 0 ? 'text-success-600' : 'text-danger-600'
            }`}>
              {portfolioOverview?.daily_change_percent?.toFixed(2) || '2.04'}%
            </span>
            <span className="ml-2 text-sm text-gray-500">오늘</span>
          </div>
        </motion.div>

        {/* 일일 수익률 */}
        <motion.div variants={itemVariants} className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">일일 수익률</p>
              <p className="text-2xl font-bold text-gray-900">
                ${portfolioOverview?.daily_change?.toLocaleString() || '25,000'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg gradient-bg-success flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500">월 수익률: {portfolioOverview?.monthly_change_percent?.toFixed(2) || '11.11'}%</span>
          </div>
        </motion.div>

        {/* VaR */}
        <motion.div variants={itemVariants} className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">일일 VaR (95%)</p>
              <p className="text-2xl font-bold text-gray-900">
                ${riskVar?.daily_var_95?.toLocaleString() || '45,000'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg gradient-bg-warning flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500">리스크 수준: 보통</span>
          </div>
        </motion.div>

        {/* 시장 센티먼트 */}
        <motion.div variants={itemVariants} className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">시장 센티먼트</p>
              <p className="text-2xl font-bold text-gray-900">
                {marketSentiment?.overall_sentiment || '긍정적'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg gradient-bg-secondary flex items-center justify-center">
              <Activity className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-500">점수: {(marketSentiment?.sentiment_score * 100)?.toFixed(0) || '75'}%</span>
          </div>
        </motion.div>
      </motion.div>

      {/* 차트 섹션 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* 포트폴리오 성과 차트 */}
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">포트폴리오 성과</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-sm text-gray-600">포트폴리오</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm text-gray-600">벤치마크</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line
                type="monotone"
                dataKey="portfolio"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="benchmark"
                stroke="#9CA3AF"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 자산 배분 파이 차트 */}
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">자산 배분</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={allocationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {allocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, '가치']}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {allocationData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* 추가 섹션 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* 섹터별 센티먼트 */}
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">섹터별 센티먼트</h3>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={sectorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="sector" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`${value.toFixed(0)}%`, '센티먼트']}
              />
              <Bar dataKey="sentiment" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* 실시간 알림 */}
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">실시간 알림</h3>
            <Zap className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">AAPL 주가 상승</p>
                <p className="text-xs text-gray-500">2분 전</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-warning-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">VaR 한계 접근</p>
                <p className="text-xs text-gray-500">5분 전</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">새 거래 주문 완료</p>
                <p className="text-xs text-gray-500">10분 전</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 빠른 액션 */}
        <motion.div variants={itemVariants} className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">빠른 액션</h3>
            <Eye className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            <button className="w-full btn-primary text-sm">
              새 거래 주문
            </button>
            <button className="w-full btn-secondary text-sm">
              포트폴리오 리밸런싱
            </button>
            <button className="w-full btn-secondary text-sm">
              리스크 리포트 생성
            </button>
            <button className="w-full btn-secondary text-sm">
              성과 분석 실행
            </button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 