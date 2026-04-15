import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Database, MessageSquare, Users, Clock, RefreshCw, ChevronRight, Search, LogOut } from 'lucide-react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  city?: string;
  investment?: string;
  subject?: string;
  location?: string;
  message: string;
  type: string;
  created_at: string;
}

const Admin = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'contact' | 'franchise'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'inquiries'), orderBy('created_at', 'desc'));
      const querySnapshot = await getDocs(q);
      const data: Inquiry[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Inquiry);
      });
      setInquiries(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out', error);
    }
  };

  const filteredInquiries = inquiries.filter(i => {
    const matchesSearch = 
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (i.city && i.city.toLowerCase().includes(searchTerm.toLowerCase()));
      
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'contact') return matchesSearch && i.type === 'contact';
    if (activeTab === 'franchise') return matchesSearch && i.type === 'franchise';
    return matchesSearch;
  });

  const filteredLogs: any[] = []; // Removed chat logs for now

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
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-mono text-xs uppercase tracking-widest font-bold"
            >
              <LogOut className="w-4 h-4" />
              Logout
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
            <p className="font-display text-4xl">{inquiries.length}</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 font-bold">Franchise Leads</span>
            </div>
            <p className="font-display text-4xl">{inquiries.filter(i => i.type === 'franchise').length}</p>
          </div>
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-500">
                <Database className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 font-bold">Contact Messages</span>
            </div>
            <p className="font-display text-4xl">{inquiries.filter(i => i.type === 'contact' || i.type === 'general_contact').length}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-white/10">
          <button 
            onClick={() => setActiveTab('all')}
            className={`pb-4 px-4 font-display text-lg uppercase tracking-wider transition-all relative ${activeTab === 'all' ? 'text-brand' : 'text-paper/40'}`}
          >
            All Leads
            {activeTab === 'all' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
          </button>
          <button 
            onClick={() => setActiveTab('contact')}
            className={`pb-4 px-4 font-display text-lg uppercase tracking-wider transition-all relative ${activeTab === 'contact' ? 'text-brand' : 'text-paper/40'}`}
          >
            Contact
            {activeTab === 'contact' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
          </button>
          <button 
            onClick={() => setActiveTab('franchise')}
            className={`pb-4 px-4 font-display text-lg uppercase tracking-wider transition-all relative ${activeTab === 'franchise' ? 'text-brand' : 'text-paper/40'}`}
          >
            Franchise
            {activeTab === 'franchise' && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand" />}
          </button>
        </div>

        {/* Content */}
        <div className="glass rounded-[3rem] p-8 min-h-[500px]">
          {loading ? (
            <div className="h-full flex items-center justify-center min-h-[400px]">
              <div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold">Date</th>
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold">Type</th>
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold">Name</th>
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold">Contact Info</th>
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold">Details</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light">
                  {filteredInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-paper/40">No inquiries found.</td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                        <td className="py-6 pr-4 whitespace-nowrap text-paper/60">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-6 pr-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${inquiry.type === 'franchise' ? 'bg-brand/20 text-brand' : 'bg-blue-500/20 text-blue-400'}`}>
                            {inquiry.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-6 pr-4 font-medium">{inquiry.name}</td>
                        <td className="py-6 pr-4">
                          <div className="flex flex-col gap-1">
                            <span>{inquiry.email}</span>
                            {inquiry.phone && <span className="text-paper/40">{inquiry.phone}</span>}
                          </div>
                        </td>
                        <td className="py-6 pr-4 max-w-xs">
                          <div className="flex flex-col gap-1">
                            {inquiry.city && <span className="text-brand text-xs uppercase tracking-wider">{inquiry.city} • {inquiry.investment}</span>}
                            {inquiry.location && <span className="text-brand text-xs uppercase tracking-wider">{inquiry.location}</span>}
                            {inquiry.subject && <span className="font-medium text-paper/80">{inquiry.subject}</span>}
                            <span className="truncate text-paper/60">{inquiry.message}</span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
