import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Treemap, ScatterChart, Scatter } from 'recharts';
import { Eye, Layers, Zap, Globe, TrendingUp, Users, DollarSign, Package, Brain, Activity, Filter, Download, Maximize2, RotateCcw } from 'lucide-react';

interface VisualizationData {
  id: string;
  title: string;
  type: 'heatmap' | 'network' | 'flow' | 'geographic' | 'temporal' | 'correlation';
  data: any[];
  insights: string[];
  interactivity: 'high' | 'medium' | 'low';
  complexity: number;
}

const advancedVisualizations: VisualizationData[] = [
  {
    id: '1',
    title: 'Customer Journey Flow Analysis',
    type: 'flow',
    data: [
      { stage: 'Awareness', visitors: 10000, conversion: 15 },
      { stage: 'Interest', visitors: 1500, conversion: 35 },
      { stage: 'Consideration', visitors: 525, conversion: 45 },
      { stage: 'Purchase', visitors: 236, conversion: 85 },
      { stage: 'Loyalty', visitors: 201, conversion: 92 }
    ],
    insights: [
      'Major drop-off at awareness to interest stage',
      'High conversion rate in purchase stage indicates strong product-market fit',
      'Loyalty stage shows excellent retention potential'
    ],
    interactivity: 'high',
    complexity: 85
  },
  {
    id: '2',
    title: 'Product Affinity Network',
    type: 'network',
    data: [
      { product: 'Formal Shirts', connections: 15, strength: 0.8, category: 'formal' },
      { product: 'Business Suits', connections: 12, strength: 0.9, category: 'formal' },
      { product: 'Ties', connections: 8, strength: 0.6, category: 'accessories' },
      { product: 'Dress Shoes', connections: 10, strength: 0.7, category: 'footwear' },
      { product: 'Cufflinks', connections: 5, strength: 0.4, category: 'accessories' }
    ],
    insights: [
      'Strong correlation between formal shirts and business suits',
      'Accessories show lower but consistent cross-selling potential',
      'Opportunity to bundle formal wear with accessories'
    ],
    interactivity: 'high',
    complexity: 92
  },
  {
    id: '3',
    title: 'Temporal Sales Patterns',
    type: 'temporal',
    data: [
      { hour: 9, weekday: 'Monday', sales: 45, intensity: 0.3 },
      { hour: 12, weekday: 'Monday', sales: 120, intensity: 0.8 },
      { hour: 18, weekday: 'Monday', sales: 200, intensity: 1.0 },
      { hour: 9, weekday: 'Saturday', sales: 180, intensity: 0.9 },
      { hour: 12, weekday: 'Saturday', sales: 250, intensity: 1.0 },
      { hour: 18, weekday: 'Saturday', sales: 220, intensity: 0.95 }
    ],
    insights: [
      'Weekend shopping peaks earlier in the day',
      'Evening hours show consistent high performance',
      'Monday lunch hours present optimization opportunity'
    ],
    interactivity: 'medium',
    complexity: 78
  },
  {
    id: '4',
    title: 'Price-Quality Perception Matrix',
    type: 'correlation',
    data: [
      { price: 2500, quality: 7.2, brand: 'Raymond', satisfaction: 8.1 },
      { price: 1800, quality: 6.8, brand: 'Allen Solly', satisfaction: 7.5 },
      { price: 3200, quality: 8.5, brand: 'Hugo Boss', satisfaction: 8.8 },
      { price: 1200, quality: 5.9, brand: 'Cotton King', satisfaction: 6.8 },
      { price: 4500, quality: 9.1, brand: 'Armani', satisfaction: 9.2 }
    ],
    insights: [
      'Raymond positioned optimally in price-quality matrix',
      'Opportunity to increase perceived quality through marketing',
      'Premium segment shows strong satisfaction correlation'
    ],
    interactivity: 'high',
    complexity: 88
  }
];

const interactiveFeatures = [
  { name: 'Real-time Filtering', icon: Filter, active: true },
  { name: 'Data Export', icon: Download, active: true },
  { name: 'Full Screen Mode', icon: Maximize2, active: true },
  { name: 'Auto Refresh', icon: RotateCcw, active: false },
  { name: 'AI Insights', icon: Brain, active: true },
  { name: 'Collaborative Annotations', icon: Eye, active: false }
];

export const AdvancedVisualizationHub: React.FC = () => {
  const [selectedViz, setSelectedViz] = useState<VisualizationData>(advancedVisualizations[0]);
  const [isInteractive, setIsInteractive] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [dataPoints, setDataPoints] = useState(100);

  const renderVisualization = (viz: VisualizationData) => {
    switch (viz.type) {
      case 'flow':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={viz.data}>
              <defs>
                <linearGradient id="flowGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="stage" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }} 
              />
              <Area type="monotone" dataKey="visitors" stroke="#8B5CF6" strokeWidth={3} fill="url(#flowGradient)" />
              <Line type="monotone" dataKey="conversion" stroke="#10B981" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'network':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={viz.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="connections" stroke="#6b7280" />
              <YAxis dataKey="strength" stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px'
                }}
                formatter={(value, name) => [value, name === 'strength' ? 'Connection Strength' : 'Connections']}
              />
              <Scatter dataKey="strength" fill="#8B5CF6" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      case 'correlation':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart data={viz.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="price" stroke="#6b7280" />
              <YAxis dataKey="quality" stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px'
                }}
                formatter={(value, name, props) => [
                  value, 
                  name === 'quality' ? 'Quality Score' : 'Price',
                  props.payload.brand
                ]}
              />
              <Scatter dataKey="satisfaction" fill="#10B981" />
            </ScatterChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={viz.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="hour" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="sales" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-gray-800 to-slate-800 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl"
              animate={{ 
                boxShadow: isInteractive ? '0 0 20px rgba(139, 92, 246, 0.5)' : '0 0 0px rgba(139, 92, 246, 0)'
              }}
              transition={{ duration: 0.3 }}
            >
              <Eye className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h2 className="text-white font-bold text-xl">Advanced Visualization Hub</h2>
              <p className="text-slate-300 text-sm">Interactive data exploration and pattern discovery</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {interactiveFeatures.slice(0, 3).map((feature) => {
                const Icon = feature.icon;
                return (
                  <button
                    key={feature.name}
                    className={`p-2 rounded-lg transition-all ${
                      feature.active 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : 'bg-slate-600 text-slate-400'
                    }`}
                    title={feature.name}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-slate-600 rounded-full">
              <Activity className="w-4 h-4 text-slate-300" />
              <span className="text-slate-300 text-sm font-medium">Live Data</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Visualization Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {advancedVisualizations.map((viz, index) => (
            <motion.button
              key={viz.id}
              onClick={() => setSelectedViz(viz)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                selectedViz.id === viz.id 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  viz.interactivity === 'high' ? 'bg-green-500' :
                  viz.interactivity === 'medium' ? 'bg-amber-500' : 'bg-gray-400'
                }`}></div>
                <span className="text-xs text-gray-500 uppercase">{viz.type}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-2">{viz.title}</h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Complexity</span>
                <span className="text-xs font-bold text-purple-600">{viz.complexity}%</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Main Visualization */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{selectedViz.title}</h3>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedViz.interactivity === 'high' ? 'bg-green-100 text-green-700' :
                    selectedViz.interactivity === 'medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {selectedViz.interactivity} interactivity
                  </span>
                  <span className="text-xs text-gray-500">{selectedViz.type}</span>
                </div>
              </div>
              
              <motion.div
                key={selectedViz.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {renderVisualization(selectedViz)}
              </motion.div>
            </div>

            {/* Interactive Controls */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-xl">
                <label className="block text-sm font-medium text-blue-900 mb-2">Animation Speed</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={animationSpeed}
                  onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-blue-700 mt-1">{animationSpeed}x</div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl">
                <label className="block text-sm font-medium text-green-900 mb-2">Data Points</label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={dataPoints}
                  onChange={(e) => setDataPoints(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-green-700 mt-1">{dataPoints} points</div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-xl">
                <label className="block text-sm font-medium text-purple-900 mb-2">Interactive Mode</label>
                <button
                  onClick={() => setIsInteractive(!isInteractive)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-all ${
                    isInteractive 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {isInteractive ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </div>
          </div>

          {/* Insights Panel */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI-Generated Insights</h3>
              <div className="space-y-3">
                {selectedViz.insights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 bg-blue-50 rounded-lg border border-blue-200"
                  >
                    <div className="flex items-start gap-2">
                      <Brain className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-blue-800 text-sm">{insight}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Visualization Features</h3>
              <div className="space-y-2">
                {interactiveFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={feature.name}
                      className={`flex items-center gap-3 p-3 rounded-lg ${
                        feature.active ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${feature.active ? 'text-green-600' : 'text-gray-400'}`} />
                      <span className={`text-sm ${feature.active ? 'text-green-800' : 'text-gray-600'}`}>
                        {feature.name}
                      </span>
                      <div className={`ml-auto w-2 h-2 rounded-full ${
                        feature.active ? 'bg-green-500' : 'bg-gray-300'
                      }`}></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
              <h4 className="font-semibold text-purple-900 mb-2">Performance Metrics</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">Render Time:</span>
                  <span className="font-medium text-purple-900">0.8s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Data Quality:</span>
                  <span className="font-medium text-purple-900">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-700">Interactivity:</span>
                  <span className="font-medium text-purple-900">{selectedViz.interactivity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};