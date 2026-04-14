import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Database, MessageSquare, Users, Clock, RefreshCw, ChevronRight, Search } from 'lucide-react';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  investment: string;
  message: string;
  created_at: string;
}

interface ChatLog {
  id: number;
  session_id: string;
  role: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [data, setData] = useState<{ inquiries: Inquiry[], logs: ChatLog[] }>({ inquiries: [], logs: [] });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'inquiries' | 'chats'>('inquiries');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/data');
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredInquiries = data.inquiries.filter(i => 
    i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    i.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    i.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredLogs = data.logs.filter(l => 
    l.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.session_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-32 pb-16 min-h-screen bg-ink">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-brand text-xs tracking-[0.5em] uppercase mb-2 block font-bold">Admin Dashboard</span>
            <h1 className="font-display text-5xl uppercase tracking-tight">Data Control Center</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/30" />
              <input 
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand transition-all w-64"
              />
            </div>
            <button 
              onClick={fetchData}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-brand"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-brand/20 rounded-xl flex items-center justify-center text-brand">
                <Users className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 font-bold">Total Inquiries</span>
            </div>
            <p className="font-display text-4xl">{data.inquiries.length}</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 font-bold">Chat Interactions</span>
            </div>
            <p className="font-display text-4xl">{data.logs.length}</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                <Database className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 font-bold">DB Status</span>
            </div>
            <p className="font-display text-4xl uppercase text-emerald-500">Active</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button 
            onClick={() => setActiveTab('inquiries')}
            className={`pb-4 px-4 font-display text-lg uppercase tracking-wider transition-all relative ${activeTab === 'inquiries' ? 'text-brand' : 'text-paper/40'}`}
          >
            Franchise Inquiries
            {activeTab === 'inquiries' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
          </button>
          <button 
            onClick={() => setActiveTab('chats')}
            className={`pb-4 px-4 font-display text-lg uppercase tracking-wider transition-all relative ${activeTab === 'chats' ? 'text-brand' : 'text-paper/40'}`}
          >
            AI Chat Logs
            {activeTab === 'chats' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {activeTab === 'inquiries' ? (
            filteredInquiries.length > 0 ? (
              filteredInquiries.map((inquiry) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={inquiry.id} 
                  className="glass p-6 rounded-2xl hover:bg-white/5 transition-all group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-xl uppercase tracking-wide">{inquiry.name}</h3>
                        <span className="px-2 py-0.5 bg-brand/10 text-brand text-[10px] font-mono uppercase rounded-md font-bold">₹{inquiry.investment}L Range</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-paper/40 font-light">
                        <span className="flex items-center gap-2"><Users className="w-3 h-3" /> {inquiry.email}</span>
                        <span className="flex items-center gap-2"><ChevronRight className="w-3 h-3" /> {inquiry.phone}</span>
                        <span className="flex items-center gap-2"><ChevronRight className="w-3 h-3" /> {inquiry.city}</span>
                        <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> {new Date(inquiry.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="md:w-1/3 bg-black/20 p-4 rounded-xl text-sm text-paper/60 font-light italic">
                      "{inquiry.message}"
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 glass rounded-3xl">
                <p className="text-paper/40 font-mono text-sm uppercase tracking-widest">No inquiries found</p>
              </div>
            )
          ) : (
            <div className="glass rounded-3xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 border-b border-white/10">
                      <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-paper/40">Time</th>
                      <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-paper/40">Session</th>
                      <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-paper/40">Role</th>
                      <th className="p-4 font-mono text-[10px] uppercase tracking-widest text-paper/40">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-white/5 transition-all">
                        <td className="p-4 text-[10px] font-mono text-paper/40 whitespace-nowrap">
                          {new Date(log.created_at).toLocaleTimeString()}
                        </td>
                        <td className="p-4 text-[10px] font-mono text-brand">
                          {log.session_id}
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${log.role === 'user' ? 'bg-brand/10 text-brand' : 'bg-white/10 text-paper/60'}`}>
                            {log.role}
                          </span>
                        </td>
                        <td className="p-4 text-sm text-paper/80 font-light">
                          {log.message}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredLogs.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-paper/40 font-mono text-sm uppercase tracking-widest">No chat logs found</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
