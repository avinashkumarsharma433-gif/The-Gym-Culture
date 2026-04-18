import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, MessageSquare, Users, Clock, RefreshCw, ChevronRight, Search, LogOut, Trash2, Download, CheckSquare, X, Calendar, ChevronLeft, CalendarDays, ArrowRight, XCircle } from 'lucide-react';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import CustomDatePicker from '../components/CustomDatePicker';

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
  chatHistory?: { role: string; message: string }[];
}

const Admin = () => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'contact' | 'franchise' | 'ai_chats'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [lastSelectedId, setLastSelectedId] = useState<string | null>(null);
  const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null);
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
    if (activeTab === 'contact' && i.type !== 'contact' && i.type !== 'general_contact') return false;
    if (activeTab === 'franchise' && i.type !== 'franchise') return false;
    if (activeTab === 'ai_chats' && i.type !== 'ai_chat') return false;
    
    const itemDate = new Date(i.created_at);
    
    let filterStartStr = startDate;
    let filterEndStr = endDate;

    if (startDate && !endDate) {
      filterEndStr = startDate;
    } else if (!startDate && endDate) {
      filterStartStr = endDate;
    }

    if (filterStartStr) {
      const start = new Date(filterStartStr);
      start.setHours(0, 0, 0, 0);
      if (itemDate < start) return false;
    }
    
    if (filterEndStr) {
      const end = new Date(filterEndStr);
      end.setHours(23, 59, 59, 999);
      if (itemDate > end) return false;
    }
    
    return true;
  });

  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeTab, startDate, endDate]);

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
    const pageIds = paginatedInquiries.map(i => i.id);
    const allPageSelected = pageIds.length > 0 && pageIds.every(id => selectedIds.has(id));
    
    if (allPageSelected) {
      const newSelected = new Set(selectedIds);
      pageIds.forEach(id => newSelected.delete(id));
      setSelectedIds(newSelected);
    } else {
      const newSelected = new Set(selectedIds);
      pageIds.forEach(id => newSelected.add(id));
      setSelectedIds(newSelected);
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
    const csvRows = [
      headers.join(','),
      ...selectedData.map(i => [
        new Date(i.created_at).toLocaleString().replace(/,/g, ''),
        i.type,
        `"${i.name}"`,
        `"${i.email}"`,
        `\t${i.phone || ''}`,
        `"${i.city || ''}"`,
        `"${i.location || ''}"`,
        `"${i.investment || ''}"`,
        `"${i.subject || ''}"`,
        `"${i.message.replace(/"/g, '""')}"`
      ].join(','))
    ];

    const csvContent = csvRows.join('\n');
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
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
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-6 md:mt-0">
            <div className="flex items-center glass rounded-xl px-4 py-2.5 shrink-0 max-w-full gap-3 transition-all focus-within:border-brand/40 border-white/5 hover:border-white/10 relative z-50">
               <CalendarDays className="w-4 h-4 text-brand shrink-0" />
               <div className="flex items-center gap-2">
                 <CustomDatePicker 
                   value={startDate}
                   onChange={setStartDate}
                   placeholder="Start Date"
                 />
                 <ArrowRight className="w-3 h-3 text-brand/40 shrink-0" />
                 <CustomDatePicker 
                   value={endDate}
                   onChange={setEndDate}
                   placeholder="End Date"
                 />
               </div>
               <AnimatePresence>
                 {(startDate || endDate) && (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8, width: 0 }}
                     animate={{ opacity: 1, scale: 1, width: 'auto' }}
                     exit={{ opacity: 0, scale: 0.8, width: 0 }}
                     className="pl-2 border-l border-white/10 overflow-hidden"
                   >
                     <button 
                       onClick={() => { setStartDate(''); setEndDate(''); }} 
                       className="text-paper/40 hover:text-brand transition-colors flex items-center justify-center p-1 rounded-md hover:bg-white/5"
                       title="Clear Dates"
                     >
                       <XCircle className="w-4 h-4" />
                     </button>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>

            <div className="relative flex-grow md:flex-grow-0">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-paper/30" />
              <input 
                type="text"
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand transition-all w-full md:w-64"
              />
            </div>
            <button 
              onClick={fetchData}
              className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-brand shrink-0"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 md:px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl font-mono text-sm uppercase tracking-wider transition-all shrink-0"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
          <div className="glass p-8 rounded-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-500">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-paper/40 font-bold">AI Chat Leads</span>
            </div>
            <p className="font-display text-4xl">{inquiries.filter(i => i.type === 'ai_chat').length}</p>
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
            <button 
              onClick={() => setActiveTab('ai_chats')}
              className={`px-4 font-display text-lg uppercase tracking-wider transition-all relative ${activeTab === 'ai_chats' ? 'text-brand' : 'text-paper/40'}`}
            >
              AI Chats
              {activeTab === 'ai_chats' && <motion.div layoutId="tab" className="absolute -bottom-4 left-0 right-0 h-0.5 bg-brand" />}
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
                        <CheckSquare className={`w-5 h-5 ${paginatedInquiries.length > 0 && paginatedInquiries.every(i => selectedIds.has(i.id)) ? 'text-brand' : ''}`} />
                      </button>
                    </th>
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold">Date</th>
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold">Type</th>
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold">Name</th>
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold">Contact Info</th>
                    <th className="pb-4 font-mono text-xs uppercase tracking-widest text-paper/40 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-light">
                  {paginatedInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-paper/40">
                        {filteredInquiries.length === 0 ? "No inquiries found." : "No inquiries on this page."}
                      </td>
                    </tr>
                  ) : (
                    paginatedInquiries.map((inquiry) => (
                      <tr 
                        key={inquiry.id} 
                        className={`border-b border-white/5 hover:bg-white/5 transition-colors group ${selectedIds.has(inquiry.id) ? 'bg-brand/5' : ''}`}
                      >
                        <td className="py-3.5 pl-2">
                          <button onClick={(e) => handleSelect(e, inquiry.id)} className="text-paper/20 hover:text-brand transition-colors">
                            <CheckSquare className={`w-5 h-5 ${selectedIds.has(inquiry.id) ? 'text-brand' : ''}`} />
                          </button>
                        </td>
                        <td className="py-3.5 pr-4 whitespace-nowrap text-paper/60">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 pr-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-wider ${inquiry.type === 'franchise' ? 'bg-brand/20 text-brand' : inquiry.type === 'ai_chat' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'}`}>
                            {inquiry.type.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3.5 pr-4 font-medium">
                          {inquiry.name}
                          {inquiry.matchReason && <span className="block text-[10px] font-mono text-brand mt-1">{inquiry.matchReason}</span>}
                        </td>
                        <td className="py-3.5 pr-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="leading-tight">{inquiry.email}</span>
                            {inquiry.phone && <span className="text-paper/40 text-xs leading-tight">{inquiry.phone}</span>}
                          </div>
                        </td>
                        <td className="py-3.5 text-right">
                          <button 
                            onClick={() => setViewingInquiry(inquiry)}
                            className="px-4 py-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-xs font-mono uppercase tracking-wider transition-all text-brand"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 pt-6 mt-4 gap-4">
                  <div className="text-sm text-paper/40 font-mono">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredInquiries.length)} of {filteredInquiries.length} leads
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 bg-white/5 rounded-lg text-white disabled:opacity-30 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="text-sm font-mono px-4 py-2 glass rounded-lg min-w-[100px] text-center">
                      Page {currentPage} of {totalPages}
                    </div>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 bg-white/5 rounded-lg text-white disabled:opacity-30 hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Submission Details Modal */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-8 rounded-[2rem] w-full max-w-2xl relative border-brand/20 max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button 
              onClick={() => setViewingInquiry(null)}
              className="absolute top-6 right-6 text-paper/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="font-display text-3xl uppercase mb-6">Submission Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-paper/40 mb-1">Name</p>
                  <p className="font-medium text-lg">{viewingInquiry.name}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-paper/40 mb-1">Date</p>
                  <p className="font-medium text-lg">{new Date(viewingInquiry.created_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-paper/40 mb-1">Email</p>
                  <a href={`mailto:${viewingInquiry.email}`} className="font-medium text-lg text-brand hover:underline break-all">{viewingInquiry.email}</a>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-paper/40 mb-1">Phone</p>
                  {viewingInquiry.phone ? (
                    <a href={`tel:${viewingInquiry.phone}`} className="font-medium text-lg text-brand hover:underline">{viewingInquiry.phone}</a>
                  ) : (
                    <p className="font-medium text-lg text-paper/40">N/A</p>
                  )}
                </div>
                {viewingInquiry.city && (
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-paper/40 mb-1">City/Location</p>
                    <p className="font-medium text-lg">{viewingInquiry.city || viewingInquiry.location}</p>
                  </div>
                )}
                {viewingInquiry.investment && (
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-paper/40 mb-1">Investment Range</p>
                    <p className="font-medium text-lg text-emerald-400">
                      {viewingInquiry.investment === '20-50' ? '₹20L - ₹50L' : 
                       viewingInquiry.investment === '50-100' ? '₹50L - ₹1Cr' : 
                       viewingInquiry.investment === '100+' ? '₹1Cr+' : 
                       viewingInquiry.investment}
                    </p>
                  </div>
                )}
                {viewingInquiry.subject && (
                  <div className="col-span-1 md:col-span-2">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-paper/40 mb-1">Subject</p>
                    <p className="font-medium text-lg">{viewingInquiry.subject}</p>
                  </div>
                )}
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <p className="text-[10px] font-mono uppercase tracking-widest text-paper/40 mb-2">Message Content</p>
                {viewingInquiry.type === 'ai_chat' && viewingInquiry.chatHistory ? (
                  <div className="bg-ink/50 border border-white/5 p-4 rounded-xl space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {viewingInquiry.chatHistory.map((msg, idx) => (
                      <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <span className="text-[10px] font-mono uppercase text-paper/30 mb-1">{msg.role === 'user' ? viewingInquiry.name : 'AI Support'}</span>
                        <div className={`p-3 rounded-xl max-w-[85%] text-sm font-light ${msg.role === 'user' ? 'bg-brand text-white rounded-br-sm' : 'bg-white/10 text-paper rounded-bl-sm'}`}>
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-black/20 p-4 rounded-xl text-paper/80 whitespace-pre-wrap">
                    {viewingInquiry.message}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
