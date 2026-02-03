'use client';

import React, { useState, useEffect } from 'react';
import {
  Plus,
  User,
  Phone,
  MapPin,
  Camera,
  FileText,
  Save,
  Trash2,
  Search,
  Filter,
  ChevronDown,
  CheckCircle,
  Clock,
  DollarSign,
  Edit,
  ArrowLeft
} from 'lucide-react';

type JobStatus = 'inquiry' | 'measuring' | 'quoting' | 'in_progress' | 'finished' | 'paid';

interface Job {
  id: string;
  clientName: string;
  clientPhone: string;
  address: string;
  status: JobStatus;
  projectType: string;
  notes?: string;
  photos?: {
    before?: string[];
    during?: string[];
    after?: string[];
  };
  measurements?: string;
  createdAt: string;
  updatedAt: string;
}

const statusLabels: Record<JobStatus, { ar: string; en: string; color: string }> = {
  inquiry: { ar: 'استفسار', en: 'Inquiry', color: 'bg-gray-200 text-gray-800' },
  measuring: { ar: 'قياس', en: 'Measuring', color: 'bg-blue-200 text-blue-800' },
  quoting: { ar: 'عرض سعر', en: 'Quoting', color: 'bg-yellow-200 text-yellow-800' },
  in_progress: { ar: 'قيد التنفيذ', en: 'In Progress', color: 'bg-orange-200 text-orange-800' },
  finished: { ar: 'مكتمل', en: 'Finished', color: 'bg-green-200 text-green-800' },
  paid: { ar: 'مدفوع', en: 'Paid', color: 'bg-emerald-200 text-emerald-800' },
};

const projectTypes = [
  'باب (Door)',
  'نافذة (Window)',
  'خزانة (Cabinet)',
  'دولاب (Wardrobe)',
  'مطبخ (Kitchen)',
  'أثاث (Furniture)',
  'أخرى (Other)',
];

export default function JobsPage() {
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<JobStatus | 'all'>('all');

  // New/Edit Job Form State
  const [formData, setFormData] = useState({
    clientName: '',
    clientPhone: '',
    address: '',
    status: 'inquiry' as JobStatus,
    projectType: 'باب (Door)',
    notes: '',
    measurements: '',
  });

  // Load jobs from localStorage
  useEffect(() => {
    const savedJobs = localStorage.getItem('bader-jobs');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  // Save jobs to localStorage
  const saveJobs = (newJobs: Job[]) => {
    localStorage.setItem('bader-jobs', JSON.stringify(newJobs));
    setJobs(newJobs);
  };

  const handleCreateJob = () => {
    if (!formData.clientName || !formData.clientPhone || !formData.address) {
      alert('يرجى ملء جميع الحقول المطلوبة (Please fill all required fields)');
      return;
    }

    const newJob: Job = {
      id: `job-${Date.now()}`,
      ...formData,
      photos: {
        before: [],
        during: [],
        after: [],
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveJobs([...jobs, newJob]);
    resetForm();
    setView('list');
    alert('تم إنشاء بطاقة الوظيفة بنجاح (Job card created successfully)');
  };

  const handleUpdateJob = () => {
    if (!selectedJob) return;

    const updatedJobs = jobs.map((job) =>
      job.id === selectedJob.id
        ? { ...job, ...formData, updatedAt: new Date().toISOString() }
        : job
    );

    saveJobs(updatedJobs);
    resetForm();
    setView('list');
    setSelectedJob(null);
    alert('تم تحديث بطاقة الوظيفة بنجاح (Job card updated successfully)');
  };

  const handleDeleteJob = (jobId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الوظيفة؟ (Are you sure you want to delete this job?)')) {
      saveJobs(jobs.filter((job) => job.id !== jobId));
    }
  };

  const handleEditJob = (job: Job) => {
    setSelectedJob(job);
    setFormData({
      clientName: job.clientName,
      clientPhone: job.clientPhone,
      address: job.address,
      status: job.status,
      projectType: job.projectType,
      notes: job.notes || '',
      measurements: job.measurements || '',
    });
    setView('edit');
  };

  const resetForm = () => {
    setFormData({
      clientName: '',
      clientPhone: '',
      address: '',
      status: 'inquiry',
      projectType: 'باب (Door)',
      notes: '',
      measurements: '',
    });
    setSelectedJob(null);
  };

  const addPhoto = (type: 'before' | 'during' | 'after') => {
    // Simulate photo upload
    const photoUrl = `${type}-${Date.now()}.jpg`;

    if (selectedJob) {
      const updatedJobs = jobs.map((job) =>
        job.id === selectedJob.id
          ? {
              ...job,
              photos: {
                ...job.photos,
                [type]: [...(job.photos?.[type] || []), photoUrl],
              },
              updatedAt: new Date().toISOString(),
            }
          : job
      );
      saveJobs(updatedJobs);
      setSelectedJob(updatedJobs.find((j) => j.id === selectedJob.id)!);
      alert('تم إضافة الصورة (Photo added)');
    }
  };

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.clientPhone.includes(searchQuery) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.projectType.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || job.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // Status counts
  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<JobStatus, number>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50" dir="rtl">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">بطاقات الوظائف (Job Cards)</h1>
          <p className="text-gray-600">
            أدج وإدارة مشاريعك وتتبع حالتها
            <br />
            <span className="text-sm">Manage your projects and track their status</span>
          </p>
        </div>

        {/* List View */}
        {view === 'list' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
              {Object.entries(statusLabels).map(([status, info]) => (
                <div
                  key={status}
                  className={`${info.color} rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition-transform`}
                  onClick={() => setFilterStatus(status as JobStatus)}
                >
                  <p className="text-2xl font-bold">{statusCounts[status as JobStatus] || 0}</p>
                  <p className="text-sm font-semibold">{info.ar}</p>
                </div>
              ))}
              <div
                className={`bg-gray-100 text-gray-800 rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition-transform ${
                  filterStatus === 'all' ? 'ring-2 ring-green-600' : ''
                }`}
                onClick={() => setFilterStatus('all')}
              >
                <p className="text-2xl font-bold">{jobs.length}</p>
                <p className="text-sm font-semibold">الكل (All)</p>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
              <div className="flex gap-2 mb-3">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="بحث... (Search)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-right"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    filterStatus === 'all'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  الكل (All)
                </button>
                {Object.entries(statusLabels).map(([status, info]) => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status as JobStatus)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      filterStatus === status
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {info.ar}
                  </button>
                ))}
              </div>
            </div>

            {/* Job Cards */}
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>لا توجد وظائف</p>
                <p className="text-sm">No jobs found</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    onClick={() => handleEditJob(job)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{job.clientName}</h3>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                          <Phone size={14} />
                          <span>{job.clientPhone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm mt-1">
                          <MapPin size={14} />
                          <span>{job.address}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusLabels[job.status].color}`}>
                        {statusLabels[job.status].ar}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                      <div>
                        <p className="text-gray-500">نوع المشروع (Project Type)</p>
                        <p className="font-semibold text-gray-900">{job.projectType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">تاريخ الإنشاء (Created)</p>
                        <p className="font-semibold text-gray-900">
                          {new Date(job.createdAt).toLocaleDateString('ar-SY')}
                        </p>
                      </div>
                    </div>

                    {job.photos && (job.photos.before?.length || job.photos.during?.length || job.photos.after?.length) && (
                      <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
                        <Camera size={16} />
                        <span>
                          {(job.photos.before?.length || 0) + (job.photos.during?.length || 0) + (job.photos.after?.length || 0)} صور
                        </span>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditJob(job);
                        }}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm"
                      >
                        <Edit size={16} />
                        <span>تعديل (Edit)</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteJob(job.id);
                        }}
                        className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Create New Button */}
            <button
              onClick={() => {
                resetForm();
                setView('create');
              }}
              className="fixed bottom-24 left-4 right-4 md:left-auto md:right-6 md:w-auto bg-green-600 text-white py-4 px-8 rounded-2xl shadow-lg hover:bg-green-700 transition-all hover:shadow-xl flex items-center justify-center gap-2 font-bold text-lg z-50"
            >
              <Plus size={24} />
              <span>وظيفة جديدة (New Job)</span>
            </button>
          </>
        )}

        {/* Create/Edit View */}
        {(view === 'create' || view === 'edit') && (
          <div className="space-y-4">
            <button
              onClick={() => setView('list')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft size={20} />
              <span>رجوع (Back)</span>
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {view === 'create' ? 'وظيفة جديدة (New Job)' : 'تعديل الوظيفة (Edit Job)'}
              </h2>

              <div className="space-y-4">
                {/* Client Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    اسم العميل (Client Name) *
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.clientName}
                      onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                      className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                      placeholder="أدخل اسم العميل"
                    />
                  </div>
                </div>

                {/* Client Phone */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    رقم الهاتف (Phone Number) *
                  </label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={formData.clientPhone}
                      onChange={(e) => setFormData({ ...formData, clientPhone: e.target.value })}
                      className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                      placeholder="+963 XXX XXX XXX"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    العنوان (Address) *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                      placeholder="أدخل العنوان"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    نوع المشروع (Project Type)
                  </label>
                  <div className="relative">
                    <ChevronDown className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full pr-4 pl-10 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right appearance-none bg-white"
                    >
                      {projectTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الحالة (Status)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {Object.entries(statusLabels).map(([status, info]) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({ ...formData, status: status as JobStatus })}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                          formData.status === status
                            ? info.color
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {info.ar}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Measurements */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    القياسات (Measurements)
                  </label>
                  <textarea
                    value={formData.measurements}
                    onChange={(e) => setFormData({ ...formData, measurements: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                    rows={3}
                    placeholder="أدخل تفاصيل القياسات..."
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ملاحظات (Notes)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                    rows={3}
                    placeholder="أدخل أي ملاحظات إضافية..."
                  />
                </div>

                {/* Photos Section (Edit Only) */}
                {view === 'edit' && selectedJob && selectedJob.photos && (
                  <div className="border-t-2 border-gray-200 pt-4 mt-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      الصور (Photos)
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          قبل (Before): {selectedJob.photos.before?.length || 0}
                        </span>
                        <button
                          onClick={() => addPhoto('before')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Camera size={16} />
                          <span>إضافة (Add)</span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          أثناء (During): {selectedJob.photos.during?.length || 0}
                        </span>
                        <button
                          onClick={() => addPhoto('during')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Camera size={16} />
                          <span>إضافة (Add)</span>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          بعد (After): {selectedJob.photos.after?.length || 0}
                        </span>
                        <button
                          onClick={() => addPhoto('after')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Camera size={16} />
                          <span>إضافة (Add)</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  onClick={view === 'create' ? handleCreateJob : handleUpdateJob}
                  className="w-full bg-green-600 text-white py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all hover:shadow-xl flex items-center justify-center gap-2 font-bold text-lg mt-6"
                >
                  <Save size={24} />
                  <span>{view === 'create' ? 'إنشاء (Create)' : 'حفظ التعديلات (Save Changes)'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
