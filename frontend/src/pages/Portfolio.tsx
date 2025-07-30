import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import {
  Plus,
  Filter,
  Search,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Percent,
  Eye,
  Edit,
  Trash2,
  Download,
  Share2
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

const Portfolio: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [searchTerm, setSearchTerm] = useState('');

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

  // 샘플 포트폴리오 보유 종목 데이터
  const holdings = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      quantity: 100,
      avgPrice: 150.25,
      currentPrice: 175.50,
      marketValue: 17550,
      unrealizedPnL: 2525,
      unrealizedPnLPercent: 16.81,
      weight: 12.5
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      quantity: 80,
      avgPrice: 280.75,
      currentPrice: 320.25,
      marketValue: 25620,
      unrealizedPnL: 3160,
      unrealizedPnLPercent: 14.07,
      weight: 18.2
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      quantity: 50,
      avgPrice: 120.50,
      currentPrice: 145.75,
      marketValue: 7287.5,
      unrealizedPnL: 1262.5,
      unrealizedPnLPercent: 20.95,
      weight: 5.2
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      quantity: 30,
      avgPrice: 200.00,
      currentPrice: 185.25,
      marketValue: 5557.5,
      unrealizedPnL: -442.5,
      unrealizedPnLPercent: -7.38,
      weight: 3.9
    }
  ];

  const allocationData = portfolioAllocation ? [
    { name: '주식', value: portfolioAllocation.stocks.value, color: '#3B82F6' },
    { name: '채권', value: portfolioAllocation.bonds.value, color: '#10B981' },
    { name: 'ETF', value: portfolioAllocation.etfs.value, color: '#F59E0B' },
    { name: '대체투자', value: portfolioAllocation.alternatives.value, color: '#8B5CF6' }
  ] : [];

  const performanceData = portfolioPerformance?.dates?.map((date: string, index: number) => ({
    date,
    portfolio: portfolioPerformance?.values?.[index] || 0,
    benchmark: portfolioPerformance?.benchmark?.[index] || 0
  })) || [];

  const timeframes = [
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' },
    { label: '1Y', value: '1Y' },
    { label: 'ALL', value: 'ALL' }
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
          <h1 className="text-2xl font-bold text-gray-900">포트폴리오 관리</h1>
          <p className="text-gray-600">포트폴리오 현황 및 자산 배분을 관리하세요</p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button className="btn-secondary flex items-center space-x-2">
            <Download size={16} />
            <span>내보내기</span>
          </button>
          <button className="btn-primary flex items-center space-x-2">
            <Plus size={16} />
            <span>새 거래</span>
          </button>
        </div>
      </motion.div>

      {/* 포트폴리오 개요 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <div className="card card-hover p-6">
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
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">총 수익률</p>
              <p className="text-2xl font-bold text-success-600">
                {portfolioOverview?.yearly_change_percent?.toFixed(2) || '56.25'}%
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg gradient-bg-success flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">미실현 손익</p>
              <p className="text-2xl font-bold text-success-600">
                ${portfolioOverview?.unrealized_pnl?.toLocaleString() || '45,000'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg gradient-bg-secondary flex items-center justify-center">
              <Percent className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="card card-hover p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">현금 보유</p>
              <p className="text-2xl font-bold text-gray-900">
                ${portfolioOverview?.cash?.toLocaleString() || '150,000'}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* 차트 섹션 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* 자산 배분 파이 차트 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">자산 배분</h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Share2 size={16} />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Download size={16} />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
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
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {allocationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ${item.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 성과 차트 */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">포트폴리오 성과</h3>
            <div className="flex items-center space-x-2">
              {timeframes.map((timeframe) => (
                <button
                  key={timeframe.value}
                  onClick={() => setSelectedTimeframe(timeframe.value)}
                  className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                    selectedTimeframe === timeframe.value
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {timeframe.label}
                </button>
              ))}
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
        </div>
      </motion.div>

      {/* 보유 종목 테이블 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-semibold text-gray-900">보유 종목</h3>
            <div className="mt-4 sm:mt-0 flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="종목 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button className="btn-secondary flex items-center space-x-2">
                <Filter size={16} />
                <span>필터</span>
              </button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  종목
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  수량
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  평균단가
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  현재가
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  시장가치
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  미실현 손익
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  비중
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  액션
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {holdings.map((holding, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{holding.symbol}</div>
                      <div className="text-sm text-gray-500">{holding.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {holding.quantity.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${holding.avgPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${holding.currentPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${holding.marketValue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {holding.unrealizedPnL > 0 ? (
                        <TrendingUp className="h-4 w-4 text-success-500" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-danger-500" />
                      )}
                      <span className={`text-sm font-medium ${
                        holding.unrealizedPnL > 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        ${holding.unrealizedPnL.toLocaleString()}
                      </span>
                      <span className={`text-sm ${
                        holding.unrealizedPnL > 0 ? 'text-success-600' : 'text-danger-600'
                      }`}>
                        ({holding.unrealizedPnLPercent > 0 ? '+' : ''}{holding.unrealizedPnLPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {holding.weight.toFixed(1)}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Edit size={16} />
                      </button>
                      <button className="text-danger-600 hover:text-danger-900">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Portfolio; 