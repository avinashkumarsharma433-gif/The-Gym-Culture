import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Database, MessageSquare, Users, Clock, RefreshCw, ChevronRight, Search, LogOut, Trash2, Download, CheckSquare } from 'lucide-react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
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
  matchReason?: string;
}

const Admin = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'contact' | 'franchise'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
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
      setSelectedIds(new Set());
      setLastSelectedId(null);
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

  const filteredInquiries = inquiries.map(i => {
    let matchReason = '';
    const searchLower = searchTerm.toLowerCase();
    if (searchTerm) {
      if (i.name.toLowerCase().includes(searchLower)) matchReason = 'Found in Name';
      else if (i.email.toLowerCase().includes(searchLower)) matchReason = 'Found in Email';
      else if (i.phone?.toLowerCase().includes(searchLower)) matchReason = 'Found in Phone';
      else if (i.city?.toLowerCase().includes(searchLower)) matchReason = 'Found in City';
      else if (i.location?.toLowerCase().includes(searchLower)) matchReason = 'Found in Location';
      else if (i.subject?.toLowerCase().includes(searchLower)) matchReason = 'Found in Subject';
      else if (i.investment?.toLowerCase().includes(searchLower)) matchReason = 'Found in Investment';
      else if (i.message.toLowerCase().includes(searchLower)) matchReason = 'Found in Message';
    }
    return { ...i, matchReason };
  }).filter(i => {
    if (searchTerm && !i.matchReason) return false;
    if (activeTab === 'all') return true;
    if (activeTab === 'contact') return i.type === 'contact' || i.type === 'general_contact';
    if (activeTab === 'franchise') return i.type === 'franchise';
    return true;
  });

  const handleSelect = (e: React.MouseEvent, id: string) => {
    const newSelected = new Set(selectedIds);
    if (e.shiftKey && lastSelectedId) {
      const currentIndex = filteredInquiries.findIndex(i => i.id === id);
      const lastIndex = filteredInquiries.findIndex(i => i.id === lastSelectedId);
      const start = Math.min(currentIndex, lastIndex);
      const end = Math.max(currentIndex, lastIndex);
      
      for (let i = start; i <= end; i++) {
        newSelected.add(filteredInquiries[i].id);
      }
    } else {
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
    }
    setSelectedIds(newSelected);
    setLastSelectedId(id);
  };

  const handleSelectAll = () => {
    if (selectedIds.size === filteredInquiries.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredInquiries.map(i => i.id)));
    }
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Are you sure you want to delete ${selectedIds.size} submissions?`)) return;
    setLoading(true);
    try {
      for (const id of selectedIds) {
        await deleteDoc(doc(db, 'inquiries', id));
      }
      setSelectedIds(new Set());
      await fetchData();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Error deleting submissions");
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const selectedData = filteredInquiries.filter(i => selectedIds.has(i.id));
    if (selectedData.length === 0) return;

    const headers = ['Date', 'Type', 'Name', 'Email', 'Phone', 'City', 'Location', 'Investment', 'Subject', 'Message'];
    const csvContent = [
      headers.join(','),
      ...selectedData.map(i => [
        new Date(i.created_at).toLocaleString().replace(/,/g, ''),
        i.type,
        `"${i.name}"`,
        `"${i.email}"`,
        `"${i.phone || ''}"`,
        `"${i.city || ''}"`,
        `"${i.location || ''}"`,
        `"${i.investment || ''}"`,
        `"${i.subject || ''}"`,
        `"${i.message.replace(/"/g, '""')}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `gym_culture_leads_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

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

        {/* Tabs and Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-white/10 pb-4">
          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 font-display text-lg uppercase tracking-wider transition-all relative ${activeTab === 'all' ? 'text-brand' : 'text-paper/40'}`}
            >
              All Leads
              {activeTab === 'all' && <motion.div layoutId="tab" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-brand" />}
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className={`px-4 font-display text-lg uppercase tracking-wider transition-all relative ${activeTab === 'contact' ? 'text-brand' : 'text-paper/40'}`}
            >
              Contact
              {activeTab === 'contact' && <motion.div layoutId="tab" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-brand" />}
            </button>
            <button 
              onClick={() => setActiveTab('franchise')}
              className={`px-4 font-display text-lg uppercase tracking-wider transition-all relative ${activeTab === 'franchise' ? 'text-brand' : 'text-paper/40'}`}
            >
              Franchise
              {activeTab === 'franchise' && <motion.div layoutId="tab" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-brand" />}
            </button>
          </div>
          
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
              <span className="text-sm font-mono text-paper/60">{selectedIds.size} selected</span>
              <button 
                onClick={handleExportCSV}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-mono uppercase tracking-wider transition-all"
              >
                <Download className="w-4 h-4" /> Export
              </button>
              <button 
                onClick={handleDeleteSelected}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-mono uppercase tracking-wider transition-all"
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
            </div>
          )}
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
                    <th className="pb-4 pl-2 w-10">
                      <button onClick={handleSelectAll} className="text-paper/40 hover:text-brand transition-colors">
                        <CheckSquare className={`w-5 h-5 ${selectedIds.size === filteredInquiries.length && filteredInquiries.length > 0 ? 'text-brand' : ''}`} />
                      </button>
                    </th>
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
                      <td colSpan={6} className="py-12 text-center text-paper/40">No inquiries found.</td>
                    </tr>
                  ) : (
                    filteredInquiries.map((inquiry) => (
                      <tr 
                        key={inquiry.id} 
                        className={`border-b border-white/5 hover:bg-white/5 transition-colors group ${selectedIds.has(inquiry.id) ? 'bg-brand/5' : ''}`}
                      >
                        <td className="py-6 pl-2">
                          <button onClick={(e) => handleSelect(e, inquiry.id)} className="text-paper/20 hover:text-brand transition-colors">
                            <CheckSquare className={`w-5 h-5 ${selectedIds.has(inquiry.id) ? 'text-brand' : ''}`} />
                          </button>
                        </td>
                        <td className="py-6 pr-4 whitespace-nowrap text-paper/60">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-6 pr-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${inquiry.type === 'franchise' ? 'bg-brand/20 text-brand' : 'bg-blue-500/20 text-blue-400'}`}>
                            {inquiry.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-6 pr-4 font-medium">
                          {inquiry.name}
                          {inquiry.matchReason && <span className="block text-[10px] font-mono text-brand mt-1">{inquiry.matchReason}</span>}
                        </td>
                        <td className="py-6 pr-4">
                          <div className="flex flex-col gap-1">
                            <span>{inquiry.email}</span>
                            {inquiry.phone && <span className="text-paper/40">{inquiry.phone}</span>}
                          </div>
                        </td>
                        <td className="py-6 pr-4 max-w-md">
                          <div className="flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2">
                              {inquiry.city && <span className="text-brand text-xs uppercase tracking-wider">Location: {inquiry.city}</span>}
                              {inquiry.location && <span className="text-brand text-xs uppercase tracking-wider">Location: {inquiry.location}</span>}
                              {inquiry.investment && <span className="text-emerald-400 text-xs uppercase tracking-wider">Investment: {inquiry.investment}</span>}
                            </div>
                            {inquiry.subject && <span className="font-medium text-paper/80">Subject: {inquiry.subject}</span>}
                            <span className="text-paper/60">Message: {inquiry.message}</span>
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
