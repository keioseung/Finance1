import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import {
  TrendingUp, TrendingDown, Activity, Brain, BarChart3, PieChart as PieChartIcon,
  AlertTriangle, CheckCircle, Clock, DollarSign, Target, Zap
} from 'lucide-react';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Analytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [selectedMetric, setSelectedMetric] = useState('returns');

  // Mock data fetching
  const { data: marketPredictions } = useQuery('marketPredictions', async () => {
    const response = await axios.get('/api/analytics/market-predictions');
    return response.data;
  });

  const { data: sentimentAnalysis } = useQuery('sentimentAnalysis', async () => {
    const response = await axios.get('/api/analytics/sentiment');
    return response.data;
  });

  const { data: aiInsights } = useQuery('aiInsights', async () => {
    const response = await axios.get('/api/analytics/insights');
    return response.data;
  });

  const { data: performanceMetrics } = useQuery('performanceMetrics', async () => {
    const response = await axios.get('/api/analytics/performance');
    return response.data;
  });

  // Mock data for charts
  const predictionData = [
    { date: '2024-01', actual: 2.1, predicted: 2.3, confidence: 85 },
    { date: '2024-02', actual: 2.8, predicted: 2.6, confidence: 78 },
    { date: '2024-03', actual: 3.2, predicted: 3.1, confidence: 82 },
    { date: '2024-04', actual: 2.9, predicted: 3.0, confidence: 79 },
    { date: '2024-05', actual: 3.5, predicted: 3.4, confidence: 87 },
    { date: '2024-06', actual: 3.8, predicted: 3.7, confidence: 91 },
  ];

  const sentimentData = [
    { sector: 'Technology', positive: 65, negative: 15, neutral: 20 },
    { sector: 'Healthcare', positive: 45, negative: 25, neutral: 30 },
    { sector: 'Finance', positive: 55, negative: 20, neutral: 25 },
    { sector: 'Energy', positive: 35, negative: 40, neutral: 25 },
    { sector: 'Consumer', positive: 60, negative: 18, neutral: 22 },
  ];

  const correlationData = [
    { x: 0.2, y: 0.8, size: 20, name: 'AAPL' },
    { x: 0.4, y: 0.6, size: 15, name: 'GOOGL' },
    { x: 0.6, y: 0.4, size: 18, name: 'MSFT' },
    { x: 0.8, y: 0.2, size: 12, name: 'AMZN' },
    { x: 0.3, y: 0.7, size: 16, name: 'TSLA' },
  ];

  const riskMetrics = [
    { metric: 'Beta', value: 1.2, target: 1.0, status: 'warning' },
    { metric: 'Sharpe Ratio', value: 1.8, target: 1.5, status: 'success' },
    { metric: 'Max Drawdown', value: -8.5, target: -10.0, status: 'success' },
    { metric: 'Volatility', value: 15.2, target: 12.0, status: 'warning' },
    { metric: 'VaR (95%)', value: -2.1, target: -2.5, status: 'success' },
  ];

  const aiInsightsData = [
    {
      id: 1,
      type: 'opportunity',
      title: '기술주 모멘텀 감지',
      description: 'AI 분석 결과 기술주 섹터에서 강한 상승 모멘텀을 감지했습니다.',
      confidence: 87,
      impact: 'high',
      timestamp: '2시간 전'
    },
    {
      id: 2,
      type: 'risk',
      title: '에너지 섹터 리스크 증가',
      description: '정치적 불확실성으로 인한 에너지 섹터 리스크가 증가하고 있습니다.',
      confidence: 92,
      impact: 'medium',
      timestamp: '4시간 전'
    },
    {
      id: 3,
      type: 'trend',
      title: 'ESG 투자 트렌드 강화',
      description: 'ESG 관련 주식들의 상대적 성과가 향상되고 있습니다.',
      confidence: 78,
      impact: 'high',
      timestamp: '6시간 전'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">분석 및 AI</h1>
          <p className="text-gray-400 mt-2">고급 데이터 분석 및 머신러닝 기반 인사이트</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2"
          >
            <option value="1W">1주</option>
            <option value="1M">1개월</option>
            <option value="3M">3개월</option>
            <option value="6M">6개월</option>
            <option value="1Y">1년</option>
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2"
          >
            <option value="returns">수익률</option>
            <option value="volatility">변동성</option>
            <option value="sharpe">샤프 비율</option>
            <option value="correlation">상관관계</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">AI 예측 정확도</p>
              <p className="text-2xl font-bold text-white">87.3%</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Brain className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +2.1% 이번 주
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">시장 감정 지수</p>
              <p className="text-2xl font-bold text-white">72.5</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
            <TrendingUp className="w-4 h-4 mr-1" />
            +5.2% 이번 주
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">리스크 점수</p>
              <p className="text-2xl font-bold text-white">23.8</p>
            </div>
            <div className="p-3 bg-yellow-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-red-400 text-sm">
            <TrendingDown className="w-4 h-4 mr-1" />
            +1.5% 이번 주
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">알고리즘 신호</p>
              <p className="text-2xl font-bold text-white">8/10</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-400 text-sm">
            <CheckCircle className="w-4 h-4 mr-1" />
            강한 매수 신호
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Predictions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">시장 예측 모델</h3>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10B981"
                strokeWidth={2}
                name="실제 수익률"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#3B82F6"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="예측 수익률"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Sentiment Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white">섹터별 감정 분석</h3>
            <PieChartIcon className="w-5 h-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sentimentData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis type="number" stroke="#9CA3AF" />
              <YAxis dataKey="sector" type="category" stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '8px',
                }}
              />
              <Legend />
              <Bar dataKey="positive" stackId="a" fill="#10B981" name="긍정" />
              <Bar dataKey="neutral" stackId="a" fill="#6B7280" name="중립" />
              <Bar dataKey="negative" stackId="a" fill="#EF4444" name="부정" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">AI 인사이트</h3>
          <Brain className="w-5 h-5 text-blue-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiInsightsData.map((insight, index) => (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${
                insight.type === 'opportunity'
                  ? 'border-green-500/30 bg-green-500/10'
                  : insight.type === 'risk'
                  ? 'border-red-500/30 bg-red-500/10'
                  : 'border-blue-500/30 bg-blue-500/10'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {insight.type === 'opportunity' && (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  )}
                  {insight.type === 'risk' && (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                  {insight.type === 'trend' && (
                    <Activity className="w-4 h-4 text-blue-400" />
                  )}
                  <span className="text-sm font-medium text-white">
                    {insight.title}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{insight.timestamp}</span>
              </div>
              <p className="text-sm text-gray-300 mb-3">{insight.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-400">신뢰도:</span>
                  <span className="text-sm font-medium text-white">
                    {insight.confidence}%
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    insight.impact === 'high'
                      ? 'bg-red-500/20 text-red-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {insight.impact === 'high' ? '높음' : '보통'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Risk Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">리스크 지표</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {riskMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-4 rounded-lg bg-gray-800/50"
            >
              <p className="text-sm text-gray-400 mb-2">{metric.metric}</p>
              <p className="text-2xl font-bold text-white mb-1">
                {metric.value}
              </p>
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xs text-gray-400">목표: {metric.target}</span>
                {metric.status === 'success' && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
                {metric.status === 'warning' && (
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Correlation Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">상관관계 분석</h3>
        <ResponsiveContainer width="100%" height={400}>
          <ScatterChart>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="x"
              name="수익률"
              stroke="#9CA3AF"
              domain={[0, 1]}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="변동성"
              stroke="#9CA3AF"
              domain={[0, 1]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '8px',
              }}
            />
            <Scatter data={correlationData} fill="#8884d8">
              {correlationData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default Analytics; 
};

export default Analytics; 