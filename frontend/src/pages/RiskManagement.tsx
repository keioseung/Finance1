import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import {
  Shield,
  AlertTriangle,
  TrendingDown,
  BarChart3,
  Activity,
  Target,
  Zap,
  Download,
  Eye,
  Settings
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const RiskManagement: React.FC = () => {
  const [selectedRiskMetric, setSelectedRiskMetric] = useState('var');

  const { data: riskVar } = useQuery('risk-var', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/risk/var`);
    return response.data;
  });

  const { data: stressTest } = useQuery('stress-test', async () => {
    const response = await axios.get(`${API_BASE_URL}/api/risk/stress-test`);
    return response.data;
  });

  // VaR 차트 데이터
  const varData = riskVar ? [
    { confidence: '90%', var: riskVar.var_values[0] },
    { confidence: '95%', var: riskVar.var_values[1] },
    { confidence: '99%', var: riskVar.var_values[2] }
  ] : [];

  // 스트레스 테스트 데이터
  const stressData = stressTest?.scenarios?.map((scenario: any) => ({
    scenario: scenario.name,
    impact: Math.abs(scenario.impact),
    probability: scenario.probability
  })) || [];

  // 리스크 지표 데이터
  const riskMetrics = [
    { name: 'VaR (95%)', value: '$45,000', change: '+2.5%', status: 'normal' },
    { name: '최대 손실', value: '$125,000', change: '-1.2%', status: 'warning' },
    { name: '베타', value: '0.95', change: '+0.05', status: 'normal' },
    { name: '변동성', value: '12.5%', change: '-0.8%', status: 'good' }
  ];

  return (
    <div className="space-y-6">
      {/* 헤더 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">리스크 관리</h1>
          <p className="text-gray-600">포트폴리오 리스크를 모니터링하고 관리하세요</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={16} />
            <span>리포트 다운로드</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Settings size={16} />
            <span>리스크 설정</span>
          </button>
        </div>
      </motion.div>

      {/* 리스크 지표 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {riskMetrics.map((metric, index) => (
          <div key={index} className="card card-hover p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                metric.status === 'good' ? 'gradient-bg-success' :
                metric.status === 'warning' ? 'gradient-bg-warning' :
                'gradient-bg'
              }`}>
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className={`text-sm font-medium ${
                metric.change.startsWith('+') ? 'text-success-600' : 'text-danger-600'
              }`}>
                {metric.change}
              </span>
              <span className="ml-2 text-sm text-gray-500">전일 대비</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* 차트 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* VaR 차트 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Value at Risk (VaR)</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Eye size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Download size={16} />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={varData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="confidence" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'VaR']}
              />
              <Bar dataKey="var" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 스트레스 테스트 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">스트레스 테스트</h3>
            <AlertTriangle className="h-5 w-5 text-warning-500" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="scenario" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value: any) => [`${value.toFixed(1)}%`, '영향도']}
              />
              <Bar dataKey="impact" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 리스크 상세 정보 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* 리스크 알림 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">리스크 알림</h3>
            <Zap className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-warning-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">VaR 한계 접근</p>
                <p className="text-xs text-gray-500">현재 VaR이 설정 한계의 85%에 도달</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-danger-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">높은 변동성 감지</p>
                <p className="text-xs text-gray-500">TSLA 주식의 변동성이 30% 초과</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-success-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">리스크 완화 완료</p>
                <p className="text-xs text-gray-500">포트폴리오 분산화 개선</p>
              </div>
            </div>
          </div>
        </div>

        {/* 리스크 한계 설정 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">리스크 한계</h3>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">일일 VaR 한계</span>
              <span className="text-sm font-medium text-gray-900">$50,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-warning-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">주간 VaR 한계</span>
              <span className="text-sm font-medium text-gray-900">$150,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-success-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">월간 VaR 한계</span>
              <span className="text-sm font-medium text-gray-900">$300,000</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-primary-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>

        {/* 리스크 요인 분석 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">리스크 요인</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">시장 리스크</span>
              <span className="text-sm font-medium text-warning-600">높음</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">신용 리스크</span>
              <span className="text-sm font-medium text-success-600">낮음</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">유동성 리스크</span>
              <span className="text-sm font-medium text-primary-600">보통</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">운영 리스크</span>
              <span className="text-sm font-medium text-success-600">낮음</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">환율 리스크</span>
              <span className="text-sm font-medium text-warning-600">높음</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RiskManagement; 