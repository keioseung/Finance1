import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import {
  FileText, Download, Eye, Calendar, DollarSign, TrendingUp,
  AlertTriangle, CheckCircle, Clock, BarChart3, PieChart as PieChartIcon,
  Filter, Search, Download as DownloadIcon, Share2, Printer
} from 'lucide-react';
import axios from 'axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('performance');
  const [dateRange, setDateRange] = useState('1M');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data fetching
  const { data: performanceReport } = useQuery('performanceReport', async () => {
    const response = await axios.get('/api/reports/performance');
    return response.data;
  });

  const { data: complianceReport } = useQuery('complianceReport', async () => {
    const response = await axios.get('/api/reports/compliance');
    return response.data;
  });

  const { data: taxReport } = useQuery('taxReport', async () => {
    const response = await axios.get('/api/reports/tax');
    return response.data;
  });

  // Mock data for charts
  const performanceData = [
    { month: '1월', portfolio: 2.1, benchmark: 1.8, excess: 0.3 },
    { month: '2월', portfolio: 2.8, benchmark: 2.2, excess: 0.6 },
    { month: '3월', portfolio: 3.2, benchmark: 2.9, excess: 0.3 },
    { month: '4월', portfolio: 2.9, benchmark: 2.7, excess: 0.2 },
    { month: '5월', portfolio: 3.5, benchmark: 3.1, excess: 0.4 },
    { month: '6월', portfolio: 3.8, benchmark: 3.4, excess: 0.4 },
  ];

  const assetAllocationData = [
    { name: '주식', value: 45, color: '#0088FE' },
    { name: '채권', value: 30, color: '#00C49F' },
    { name: '부동산', value: 15, color: '#FFBB28' },
    { name: '대체투자', value: 10, color: '#FF8042' },
  ];

  const complianceData = [
    { category: '내부통제', status: '준수', score: 95, lastCheck: '2024-01-15' },
    { category: '리스크 관리', status: '준수', score: 88, lastCheck: '2024-01-10' },
    { category: '정보보호', status: '주의', score: 72, lastCheck: '2024-01-12' },
    { category: '거래 모니터링', status: '준수', score: 91, lastCheck: '2024-01-08' },
    { category: '보고서 정확성', status: '준수', score: 96, lastCheck: '2024-01-14' },
  ];

  const taxData = [
    { category: '배당소득', amount: 1250000, tax: 187500, rate: 15 },
    { category: '양도소득', amount: 850000, tax: 170000, rate: 20 },
    { category: '이자소득', amount: 320000, tax: 32000, rate: 10 },
    { category: '기타소득', amount: 180000, tax: 36000, rate: 20 },
  ];

  const reportsList = [
    {
      id: 1,
      title: '월간 성과 보고서',
      type: 'performance',
      status: 'completed',
      date: '2024-01-15',
      size: '2.3MB',
      downloads: 45
    },
    {
      id: 2,
      title: '분기별 규제 준수 보고서',
      type: 'compliance',
      status: 'pending',
      date: '2024-01-10',
      size: '1.8MB',
      downloads: 23
    },
    {
      id: 3,
      title: '연말 세무 보고서',
      type: 'tax',
      status: 'completed',
      date: '2024-01-05',
      size: '3.1MB',
      downloads: 67
    },
    {
      id: 4,
      title: '리스크 관리 보고서',
      type: 'risk',
      status: 'completed',
      date: '2024-01-12',
      size: '1.5MB',
      downloads: 34
    },
    {
      id: 5,
      title: '투자자 보고서',
      type: 'investor',
      status: 'draft',
      date: '2024-01-08',
      size: '2.7MB',
      downloads: 12
    }
  ];

  const filteredReports = reportsList.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'pending':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'draft':
        return 'text-blue-400 bg-blue-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'draft':
        return <FileText className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">보고서 및 회계</h1>
          <p className="text-gray-400 mt-2">포괄적 회계 처리 및 규제 보고서 관리</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn-primary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>새 보고서 생성</span>
          </button>
        </div>
      </div>

      {/* Report Type Tabs */}
      <div className="card p-6">
        <div className="flex space-x-1 mb-6">
          {[
            { key: 'performance', label: '성과 보고서', icon: TrendingUp },
            { key: 'compliance', label: '규제 준수', icon: CheckCircle },
            { key: 'tax', label: '세무 보고서', icon: DollarSign },
            { key: 'risk', label: '리스크 보고서', icon: AlertTriangle },
            { key: 'investor', label: '투자자 보고서', icon: BarChart3 }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setSelectedReport(tab.key)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                selectedReport === tab.key
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Date Range Selector */}
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-gray-400">기간:</span>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2"
          >
            <option value="1M">1개월</option>
            <option value="3M">3개월</option>
            <option value="6M">6개월</option>
            <option value="1Y">1년</option>
            <option value="YTD">연초부터</option>
          </select>
        </div>
      </div>

      {/* Performance Report */}
      {selectedReport === 'performance' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">총 수익률</p>
                  <p className="text-2xl font-bold text-white">18.7%</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +2.3% vs 벤치마크
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">샤프 비율</p>
                  <p className="text-2xl font-bold text-white">1.85</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                우수한 위험조정수익률
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">최대 낙폭</p>
                  <p className="text-2xl font-bold text-white">-8.5%</p>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <CheckCircle className="w-4 h-4 mr-1" />
                허용 범위 내
              </div>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">정보 비율</p>
                  <p className="text-2xl font-bold text-white">0.92</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <PieChartIcon className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-green-400 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                +0.15 개선
              </div>
            </div>
          </div>

          {/* Performance Chart */}
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white mb-6">성과 추이</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="portfolio"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.6}
                  name="포트폴리오"
                />
                <Area
                  type="monotone"
                  dataKey="benchmark"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                  name="벤치마크"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Asset Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-white mb-6">자산 배분</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-semibold text-white mb-6">초과 수익률 분석</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="excess" fill="#10B981" name="초과 수익률" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* Compliance Report */}
      {selectedReport === 'compliance' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white mb-6">규제 준수 현황</h3>
            <div className="space-y-4">
              {complianceData.map((item, index) => (
                <motion.div
                  key={item.category}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{item.category}</p>
                      <p className="text-sm text-gray-400">마지막 점검: {item.lastCheck}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">{item.score}%</p>
                      <p className={`text-sm px-2 py-1 rounded-full ${
                        item.status === '준수' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {item.status}
                      </p>
                    </div>
                    <div className="w-20 bg-gray-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.score >= 90 ? 'bg-green-500' : 
                          item.score >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Tax Report */}
      {selectedReport === 'tax' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="card p-6">
            <h3 className="text-xl font-semibold text-white mb-6">세무 현황</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-medium text-white mb-4">소득별 세금 현황</h4>
                <div className="space-y-3">
                  {taxData.map((item, index) => (
                    <motion.div
                      key={item.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-white">{item.category}</p>
                        <p className="text-sm text-gray-400">세율: {item.rate}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-white">{item.amount.toLocaleString()}원</p>
                        <p className="text-sm text-red-400">{item.tax.toLocaleString()}원</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white mb-4">세금 요약</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={taxData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="category" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1F2937',
                        border: '1px solid #374151',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="tax" fill="#EF4444" name="세금" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reports List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">보고서 목록</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="보고서 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
              <Filter className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{report.title}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span>{report.date}</span>
                    <span>{report.size}</span>
                    <span>다운로드: {report.downloads}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                  {getStatusIcon(report.status)}
                  <span className="ml-1">
                    {report.status === 'completed' ? '완료' :
                     report.status === 'pending' ? '진행중' :
                     report.status === 'draft' ? '초안' : '오류'}
                  </span>
                </span>
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <Eye className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <DownloadIcon className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                  <Share2 className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Reports; 