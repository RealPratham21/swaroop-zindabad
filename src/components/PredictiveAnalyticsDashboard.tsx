import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Brain, TrendingUp, Zap, Target, AlertTriangle, Sparkles, Clock, DollarSign, Users, Package, Eye, Activity } from 'lucide-react';

interface PredictiveInsight {
  id: string;
  title: string;
  prediction: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeframe: string;
  category: 'sales' | 'inventory' | 'market' | 'customer';
  actionable: boolean;
  riskLevel: number;
}

interface AIRecommendation {
  id: string;
  type: 'optimization' | 'opportunity' | 'risk-mitigation' | 'growth';
  title: string;
  description: string;
  expectedImpact: number;
  implementationCost: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  aiConfidence: number;
}

const predictiveInsights: PredictiveInsight[] = [
  {
    id: '1',
    title: 'Wedding Season Demand Surge',
    prediction: 'Ethnic wear demand will increase by 340% in next 3 weeks based on booking patterns and social sentiment',
    confidence: 94,
    impact: 'high',
    timeframe: '3 weeks',
    category: 'sales',
    actionable: true,
    riskLevel: 15
  },
  {
    id: '2',
    title: 'Corporate Bulk Order Opportunity',
    prediction: 'IT sector expansion in Pune will drive 25% increase in corporate formal wear orders',
    confidence: 87,
    impact: 'medium',
    timeframe: '6 weeks',
    category: 'market',
    actionable: true,
    riskLevel: 25
  },
  {
    id: '3',
    title: 'Inventory Optimization Alert',
    prediction: 'Premium fabric shortage risk detected - 78% probability of stockout in luxury segment',
    confidence: 91,
    impact: 'high',
    timeframe: '2 weeks',
    category: 'inventory',
    actionable: true,
    riskLevel: 82
  },
  {
    id: '4',
    title: 'Customer Behavior Shift',
    prediction: 'Gen Z customers showing 45% preference shift towards sustainable premium fashion',
    confidence: 83,
    impact: 'medium',
    timeframe: '8 weeks',
    category: 'customer',
    actionable: true,
    riskLevel: 35
  }
];

const aiRecommendations: AIRecommendation[] = [
  {
    id: '1',
    type: 'opportunity',
    title: 'Launch AI-Powered Personal Styling Service',
    description: 'Implement AI-driven personal styling recommendations based on customer preferences, body type, and occasion analysis',
    expectedImpact: 28,
    implementationCost: '₹12-18L',
    priority: 'high',
    aiConfidence: 89
  },
  {
    id: '2',
    type: 'optimization',
    title: 'Dynamic Pricing Intelligence System',
    description: 'Deploy real-time pricing optimization based on demand patterns, competitor analysis, and inventory levels',
    expectedImpact: 22,
    implementationCost: '₹8-12L',
    priority: 'critical',
    aiConfidence: 92
  },
  {
    id: '3',
    type: 'growth',
    title: 'Predictive Customer Lifetime Value Engine',
    description: 'Build ML models to predict customer lifetime value and optimize marketing spend allocation',
    expectedImpact: 35,
    implementationCost: '₹15-25L',
    priority: 'high',
    aiConfidence: 86
  },
  {
    id: '4',
    type: 'risk-mitigation',
    title: 'Supply Chain Risk Prediction',
    description: 'Implement early warning system for supply chain disruptions using external data feeds',
    expectedImpact: 18,
    implementationCost: '₹6-10L',
    priority: 'medium',
    aiConfidence: 84
  }
];

const performanceMetrics = [
  { metric: 'AI Accuracy', current: 94, target: 96, trend: 'up' },
  { metric: 'Prediction Confidence', current: 89, target: 92, trend: 'up' },
  { metric: 'Response Time', current: 1.2, target: 1.0, trend: 'down' },
  { metric: 'Data Quality', current: 91, target: 95, trend: 'up' },
  { metric: 'Model Performance', current: 87, target: 90, trend: 'up' },
  { metric: 'User Satisfaction', current: 4.6, target: 4.8, trend: 'up' }
];

export const PredictiveAnalyticsDashboard: React.FC = () => {
  const [selectedInsight, setSelectedInsight] = useState<PredictiveInsight | null>(predictiveInsights[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric(prev => (prev + 1) % performanceMetrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-amber-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-3 bg-white bg-opacity-20 rounded-xl"
              animate={{ 
                scale: isProcessing ? [1, 1.1, 1] : 1,
                rotate: isProcessing ? [0, 360] : 0
              }}
              transition={{ duration: 2, repeat: isProcessing ? Infinity : 0 }}
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-white font-bold text-xl">Predictive Analytics Engine</h2>
              <p className="text-indigo-100 text-sm">AI-powered forecasting and intelligent recommendations</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-white font-bold text-lg">
                {performanceMetrics[activeMetric].current}
                {performanceMetrics[activeMetric].metric.includes('Time') ? 's' : 
                 performanceMetrics[activeMetric].metric.includes('Satisfaction') ? '/5' : '%'}
              </div>
              <div className="text-indigo-200 text-xs">{performanceMetrics[activeMetric].metric}</div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500 rounded-full">
              <Activity className="w-4 h-4 text-white animate-pulse" />
              <span className="text-white text-sm font-medium">AI Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* AI Performance Radar */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">AI System Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={performanceMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" fontSize={12} />
                <PolarRadiusAxis angle={90} domain={[0, 100]} fontSize={10} />
                <Radar name="Current" dataKey="current" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} strokeWidth={2} />
                <Radar name="Target" dataKey="target" stroke="#10B981" fill="none" strokeWidth={2} strokeDasharray="5 5" />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Real-time Metrics</h3>
            {performanceMetrics.slice(0, 4).map((metric, index) => (
              <motion.div
                key={metric.metric}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-xl border-2 ${
                  activeMetric === index ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{metric.metric}</span>
                  <div className={`flex items-center gap-1 ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingUp className="w-3 h-3 rotate-180" />}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {metric.current}
                  {metric.metric.includes('Time') ? 's' : 
                   metric.metric.includes('Satisfaction') ? '/5' : '%'}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.current / metric.target) * 100}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Predictive Insights */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Predictive Insights</h3>
            <div className="space-y-4">
              {predictiveInsights.map((insight, index) => (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedInsight?.id === insight.id 
                      ? 'border-purple-500 bg-purple-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedInsight(insight)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 bg-gradient-to-r ${getImpactColor(insight.impact)} rounded-lg`}>
                          {insight.category === 'sales' && <DollarSign className="w-4 h-4 text-white" />}
                          {insight.category === 'inventory' && <Package className="w-4 h-4 text-white" />}
                          {insight.category === 'market' && <TrendingUp className="w-4 h-4 text-white" />}
                          {insight.category === 'customer' && <Users className="w-4 h-4 text-white" />}
                        </div>
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                          insight.impact === 'medium' ? 'bg-amber-100 text-amber-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.impact.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{insight.prediction}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Brain className="w-3 h-3" />
                        <span>{insight.confidence}% confidence</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{insight.timeframe}</span>
                      </div>
                    </div>
                    {insight.actionable && (
                      <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition-all">
                        Take Action
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Insight Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Insight Analysis</h3>
            <AnimatePresence mode="wait">
              {selectedInsight ? (
                <motion.div
                  key={selectedInsight.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className={`p-4 bg-gradient-to-r ${getImpactColor(selectedInsight.impact)} rounded-xl text-white`}>
                    <h4 className="font-bold text-lg mb-2">{selectedInsight.title}</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="opacity-75">Confidence</div>
                        <div className="font-bold">{selectedInsight.confidence}%</div>
                      </div>
                      <div>
                        <div className="opacity-75">Risk Level</div>
                        <div className="font-bold">{selectedInsight.riskLevel}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-xl">
                    <h5 className="font-semibold text-gray-900 mb-3">AI Analysis</h5>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div>• Data sources: 15 integrated feeds</div>
                      <div>• Pattern recognition: 94% accuracy</div>
                      <div>• Historical correlation: Strong</div>
                      <div>• External factors: Considered</div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <h5 className="font-semibold text-blue-900 mb-3">Recommended Actions</h5>
                    <div className="space-y-2 text-sm text-blue-800">
                      <div>• Immediate inventory adjustment</div>
                      <div>• Marketing campaign optimization</div>
                      <div>• Supplier communication</div>
                      <div>• Customer notification system</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-8"
                >
                  <Brain className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Select an insight to view analysis</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* AI Recommendations */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Powered Strategic Recommendations</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {aiRecommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      rec.type === 'optimization' ? 'bg-blue-100' :
                      rec.type === 'opportunity' ? 'bg-green-100' :
                      rec.type === 'growth' ? 'bg-purple-100' :
                      'bg-amber-100'
                    }`}>
                      {rec.type === 'optimization' && <Target className="w-4 h-4 text-blue-600" />}
                      {rec.type === 'opportunity' && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {rec.type === 'growth' && <Sparkles className="w-4 h-4 text-purple-600" />}
                      {rec.type === 'risk-mitigation' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                    </div>
                    <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.toUpperCase()}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{rec.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-gray-500">Expected Impact</div>
                    <div className="text-lg font-bold text-green-600">+{rec.expectedImpact}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">AI Confidence</div>
                    <div className="text-lg font-bold text-blue-600">{rec.aiConfidence}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Investment</div>
                    <div className="font-semibold text-gray-900">{rec.implementationCost}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Type</div>
                    <div className="font-semibold text-gray-900 capitalize">{rec.type.replace('-', ' ')}</div>
                  </div>
                </div>

                <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                  Implement Recommendation
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};