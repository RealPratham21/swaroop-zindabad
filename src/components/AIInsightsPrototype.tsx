import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Sparkles, Zap, Target, TrendingUp, AlertTriangle, Lightbulb, Eye, Clock, Users, DollarSign, Package, Activity, Cpu, Database, Network } from 'lucide-react';

interface AIModel {
  id: string;
  name: string;
  type: 'predictive' | 'classification' | 'clustering' | 'recommendation' | 'nlp';
  accuracy: number;
  status: 'training' | 'deployed' | 'testing' | 'optimizing';
  lastUpdated: Date;
  predictions: number;
  confidence: number;
}

interface InsightCard {
  id: string;
  title: string;
  insight: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  category: 'sales' | 'customer' | 'inventory' | 'market' | 'operational';
  aiModel: string;
  actionable: boolean;
  timeframe: string;
}

const aiModels: AIModel[] = [
  {
    id: '1',
    name: 'Demand Forecasting Engine',
    type: 'predictive',
    accuracy: 94.2,
    status: 'deployed',
    lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000),
    predictions: 15420,
    confidence: 91
  },
  {
    id: '2',
    name: 'Customer Segmentation AI',
    type: 'clustering',
    accuracy: 87.8,
    status: 'deployed',
    lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000),
    predictions: 8934,
    confidence: 89
  },
  {
    id: '3',
    name: 'Price Optimization Model',
    type: 'recommendation',
    accuracy: 92.1,
    status: 'training',
    lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000),
    predictions: 5678,
    confidence: 85
  },
  {
    id: '4',
    name: 'Sentiment Analysis Engine',
    type: 'nlp',
    accuracy: 89.5,
    status: 'deployed',
    lastUpdated: new Date(Date.now() - 30 * 60 * 1000),
    predictions: 23456,
    confidence: 88
  },
  {
    id: '5',
    name: 'Inventory Optimization AI',
    type: 'predictive',
    accuracy: 91.3,
    status: 'optimizing',
    lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000),
    predictions: 12890,
    confidence: 93
  }
];

const insightCards: InsightCard[] = [
  {
    id: '1',
    title: 'Wedding Season Demand Spike',
    insight: 'AI predicts 340% increase in ethnic wear demand over next 3 weeks based on social sentiment, booking patterns, and historical data correlation.',
    confidence: 94,
    impact: 'high',
    category: 'sales',
    aiModel: 'Demand Forecasting Engine',
    actionable: true,
    timeframe: '3 weeks'
  },
  {
    id: '2',
    title: 'Premium Customer Segment Growth',
    insight: 'Machine learning identifies emerging high-value customer segment with 45% higher lifetime value, concentrated in IT professionals aged 28-35.',
    confidence: 89,
    impact: 'high',
    category: 'customer',
    aiModel: 'Customer Segmentation AI',
    actionable: true,
    timeframe: '6 weeks'
  },
  {
    id: '3',
    title: 'Dynamic Pricing Opportunity',
    insight: 'AI recommends 8-12% price adjustment on formal wear during peak hours to optimize revenue while maintaining competitive positioning.',
    confidence: 87,
    impact: 'medium',
    category: 'sales',
    aiModel: 'Price Optimization Model',
    actionable: true,
    timeframe: '2 weeks'
  },
  {
    id: '4',
    title: 'Social Sentiment Shift',
    insight: 'NLP analysis detects 67% positive sentiment increase around sustainable fashion, indicating market opportunity for eco-friendly lines.',
    confidence: 91,
    impact: 'medium',
    category: 'market',
    aiModel: 'Sentiment Analysis Engine',
    actionable: true,
    timeframe: '4 weeks'
  },
  {
    id: '5',
    title: 'Inventory Rebalancing Alert',
    insight: 'Predictive model suggests redistributing 25% of casual wear inventory to formal wear to prevent stockouts during corporate season.',
    confidence: 93,
    impact: 'high',
    category: 'inventory',
    aiModel: 'Inventory Optimization AI',
    actionable: true,
    timeframe: '1 week'
  }
];

export const AIInsightsPrototype: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(aiModels[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeInsight, setActiveInsight] = useState(0);
  const [modelMetrics, setModelMetrics] = useState({
    totalPredictions: 0,
    avgAccuracy: 0,
    activeModels: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveInsight(prev => (prev + 1) % insightCards.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const totalPredictions = aiModels.reduce((sum, model) => sum + model.predictions, 0);
    const avgAccuracy = aiModels.reduce((sum, model) => sum + model.accuracy, 0) / aiModels.length;
    const activeModels = aiModels.filter(model => model.status === 'deployed').length;
    
    setModelMetrics({ totalPredictions, avgAccuracy, activeModels });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'deployed': return 'bg-green-100 text-green-800 border-green-200';
      case 'training': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'testing': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'optimizing': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-amber-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'sales': return DollarSign;
      case 'customer': return Users;
      case 'inventory': return Package;
      case 'market': return TrendingUp;
      case 'operational': return Activity;
      default: return Brain;
    }
  };

  return (
    <div className="space-y-8">
      {/* Prototype Disclaimer */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-xl">
            <Brain className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-blue-900 text-xl mb-2">AI Insights Module - Advanced Prototype</h3>
            <p className="text-blue-800 mb-4">
              This is a prototype of the AI Insight module. Additional features and enhancements will be introduced in future iterations.
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">{modelMetrics.activeModels}</div>
                <div className="text-sm text-blue-600">Active AI Models</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">{modelMetrics.avgAccuracy.toFixed(1)}%</div>
                <div className="text-sm text-blue-600">Average Accuracy</div>
              </div>
              <div className="p-3 bg-white rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-700">{(modelMetrics.totalPredictions / 1000).toFixed(0)}K</div>
                <div className="text-sm text-blue-600">Predictions Made</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Models Dashboard */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
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
                <Cpu className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-white font-bold text-xl">AI Model Observatory</h2>
                <p className="text-indigo-100 text-sm">Real-time monitoring of machine learning models and predictions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-white font-bold text-lg">{modelMetrics.totalPredictions.toLocaleString()}</div>
                <div className="text-indigo-200 text-xs">Total Predictions</div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-indigo-500 rounded-full">
                <Activity className="w-4 h-4 text-white animate-pulse" />
                <span className="text-white text-sm font-medium">AI Processing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Model List */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Active AI Models</h3>
              <div className="space-y-4">
                {aiModels.map((model, index) => (
                  <motion.div
                    key={model.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedModel?.id === model.id 
                        ? 'border-purple-500 bg-purple-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedModel(model)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                            {model.type === 'predictive' && <TrendingUp className="w-4 h-4 text-white" />}
                            {model.type === 'classification' && <Target className="w-4 h-4 text-white" />}
                            {model.type === 'clustering' && <Users className="w-4 h-4 text-white" />}
                            {model.type === 'recommendation' && <Lightbulb className="w-4 h-4 text-white" />}
                            {model.type === 'nlp' && <Brain className="w-4 h-4 text-white" />}
                          </div>
                          <h4 className="font-semibold text-gray-900">{model.name}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(model.status)}`}>
                            {model.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 capitalize">{model.type} model</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-gray-500">Accuracy</div>
                        <div className="text-lg font-bold text-green-600">{model.accuracy}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Predictions</div>
                        <div className="text-lg font-bold text-blue-600">{model.predictions.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Confidence</div>
                        <div className="text-lg font-bold text-purple-600">{model.confidence}%</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        Updated {Math.floor((Date.now() - model.lastUpdated.getTime()) / (1000 * 60 * 60))}h ago
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${model.accuracy}%` }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Model Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Details</h3>
              <AnimatePresence mode="wait">
                {selectedModel ? (
                  <motion.div
                    key={selectedModel.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                      <h4 className="font-bold text-lg mb-2">{selectedModel.name}</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="opacity-75">Type</div>
                          <div className="font-bold capitalize">{selectedModel.type}</div>
                        </div>
                        <div>
                          <div className="opacity-75">Status</div>
                          <div className="font-bold capitalize">{selectedModel.status}</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-xl">
                      <h5 className="font-semibold text-gray-900 mb-3">Performance Metrics</h5>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Accuracy Rate</span>
                          <span className="font-bold text-green-600">{selectedModel.accuracy}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Confidence Level</span>
                          <span className="font-bold text-blue-600">{selectedModel.confidence}%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total Predictions</span>
                          <span className="font-bold text-purple-600">{selectedModel.predictions.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <h5 className="font-semibold text-blue-900 mb-3">Model Capabilities</h5>
                      <div className="space-y-2 text-sm text-blue-800">
                        {selectedModel.type === 'predictive' && (
                          <>
                            <div>• Future trend forecasting</div>
                            <div>• Demand pattern analysis</div>
                            <div>• Risk assessment modeling</div>
                          </>
                        )}
                        {selectedModel.type === 'clustering' && (
                          <>
                            <div>• Customer segmentation</div>
                            <div>• Behavioral pattern grouping</div>
                            <div>• Market segment identification</div>
                          </>
                        )}
                        {selectedModel.type === 'recommendation' && (
                          <>
                            <div>• Personalized suggestions</div>
                            <div>• Cross-selling optimization</div>
                            <div>• Dynamic pricing recommendations</div>
                          </>
                        )}
                        {selectedModel.type === 'nlp' && (
                          <>
                            <div>• Sentiment analysis</div>
                            <div>• Text classification</div>
                            <div>• Social media monitoring</div>
                          </>
                        )}
                      </div>
                    </div>

                    <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg transition-all">
                      View Model Details
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <Cpu className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Select a model to view details</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* AI-Generated Insights */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-white font-bold text-lg">AI-Generated Business Insights</h2>
              <p className="text-emerald-100 text-sm">Real-time intelligent analysis and actionable recommendations</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insightCards.map((insight, index) => {
              const CategoryIcon = getCategoryIcon(insight.category);
              return (
                <motion.div
                  key={insight.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    activeInsight === index 
                      ? 'border-emerald-500 bg-emerald-50 shadow-lg' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 bg-gradient-to-r ${getImpactColor(insight.impact)} rounded-lg`}>
                        <CategoryIcon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">{insight.title}</h4>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      insight.impact === 'high' ? 'bg-red-100 text-red-700' :
                      insight.impact === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {insight.impact.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{insight.insight}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div>
                      <div className="text-xs text-gray-500">AI Confidence</div>
                      <div className="text-lg font-bold text-blue-600">{insight.confidence}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Timeframe</div>
                      <div className="text-sm font-semibold text-gray-900">{insight.timeframe}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-xs text-gray-500">
                      Model: {insight.aiModel}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      insight.actionable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {insight.actionable ? 'Actionable' : 'Informational'}
                    </div>
                  </div>

                  {insight.actionable && (
                    <button className="w-full py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      Generate Action Plan
                    </button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};