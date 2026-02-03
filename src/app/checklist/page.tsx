'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Circle, Plus, Save, Trash2, Camera, FileText, ChevronRight } from 'lucide-react';

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  photo?: string;
  notes?: string;
}

interface ChecklistTemplate {
  id: string;
  name: string;
  items: Omit<ChecklistItem, 'id'>[];
}

export default function ChecklistPage() {
  const [activeTab, setActiveTab] = useState<'templates' | 'custom'>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<ChecklistTemplate | null>(null);
  const [customItems, setCustomItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');
  const [savedChecklists, setSavedChecklists] = useState<ChecklistItem[][]>([]);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Pre-built templates
  const templates: ChecklistTemplate[] = [
    {
      id: 'door',
      name: 'باب (Door)',
      items: [
        { text: 'قياس الباب (Door measurement)', checked: false },
        { text: 'نوع الخشب (Wood type)', checked: false },
        { text: 'أبعاد الباب (Dimensions)', checked: false },
        { text: 'نوع المقبض (Handle type)', checked: false },
        { text: 'البراغي والمسامير (Screws and nails)', checked: false },
        { text: 'الورنيش (Varnish)', checked: false },
        { text: 'الصوف (Foam/Weatherstrip)', checked: false },
        { text: 'المقاطعة (Hinges)', checked: false },
      ]
    },
    {
      id: 'window',
      name: 'نافذة (Window)',
      items: [
        { text: 'قياس النافذة (Window measurement)', checked: false },
        { text: 'نوع الخشب (Wood type)', checked: false },
        { text: 'الأبعاد (Dimensions)', checked: false },
        { text: 'الزجاج (Glass)', checked: false },
        { text: 'المفصلات (Hinges)', checked: false },
        { text: 'البراغي (Screws)', checked: false },
        { text: 'الورنيش (Varnish)', checked: false },
        { text: 'المقاطع (Frames)', checked: false },
      ]
    },
    {
      id: 'cabinet',
      name: 'خزانة (Cabinet)',
      items: [
        { text: 'قياس الخزانة (Cabinet measurement)', checked: false },
        { text: 'نوع الخشب (Wood type - MDF/نحاس/شجرة)', checked: false },
        { text: 'الأرفف (Shelves)', checked: false },
        { text: 'الأبواب (Doors)', checked: false },
        { text: 'البراغي والمسامير (Screws and nails)', checked: false },
        { text: 'المفصلات (Hinges)', checked: false },
        { text: 'الورنيش (Varnish)', checked: false },
        { text: 'الملحقات (Accessories)', checked: false },
      ]
    },
    {
      id: 'wardrobe',
      name: 'دولاب (Wardrobe)',
      items: [
        { text: 'قياس الدولاب (Wardrobe measurement)', checked: false },
        { text: 'نوع الخشب (Wood type)', checked: false },
        { text: 'الأبواب (Doors - عدد ونوع)', checked: false },
        { text: 'الأدراج (Drawers)', checked: false },
        { text: 'الرفوف (Shelves)', checked: false },
        { text: 'البراغي والمسامير (Screws and nails)', checked: false },
        { text: 'المفصلات (Hinges)', checked: false },
        { text: 'الورنيش (Varnish)', checked: false },
        { text: 'خطافات (Hooks)', checked: false },
      ]
    },
    {
      id: 'kitchen',
      name: 'مطبخ (Kitchen)',
      items: [
        { text: 'قياس المطبخ (Kitchen measurement)', checked: false },
        { text: 'نوع الخشب (Wood type)', checked: false },
        { text: 'الخزائن (Cabinets)', checked: false },
        { text: 'الأدراج (Drawers)', checked: false },
        { text: 'الرفوف (Shelves)', checked: false },
        { text: 'البراغي والمسامير (Screws and nails)', checked: false },
        { text: 'المفصلات (Hinges)', checked: false },
        { text: 'الورنيش (Varnish)', checked: false },
        { text: 'الملحقات (Accessories)', checked: false },
        { text: 'الحوض (Sink)', checked: false },
      ]
    }
  ];

  // Load saved checklists from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('bader-saved-checklists');
    if (saved) {
      setSavedChecklists(JSON.parse(saved));
    }
  }, []);

  // Save checklists to localStorage
  const saveChecklists = (checklists: ChecklistItem[][]) => {
    localStorage.setItem('bader-saved-checklists', JSON.stringify(checklists));
    setSavedChecklists(checklists);
  };

  const handleTemplateSelect = (template: ChecklistTemplate) => {
    const items: ChecklistItem[] = template.items.map((item, index) => ({
      ...item,
      id: `template-${template.id}-${index}`,
    }));
    setCustomItems(items);
    setSelectedTemplate(template);
    setActiveTab('custom');
  };

  const addCustomItem = () => {
    if (newItemText.trim()) {
      const newItem: ChecklistItem = {
        id: `custom-${Date.now()}`,
        text: newItemText,
        checked: false,
      };
      setCustomItems([...customItems, newItem]);
      setNewItemText('');
    }
  };

  const toggleItemCheck = (id: string) => {
    setCustomItems(customItems.map(item =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: string) => {
    setCustomItems(customItems.filter(item => item.id !== id));
  };

  const saveCurrentChecklist = () => {
    if (customItems.length === 0) {
      alert('لا يوجد عناصر للحفظ (No items to save)');
      return;
    }
    const newSaved = [...savedChecklists, [...customItems]];
    saveChecklists(newSaved);
    alert('تم حفظ القائمة بنجاح (Checklist saved successfully)');
  };

  const loadSavedChecklist = (index: number) => {
    setCustomItems(savedChecklists[index]);
    setSelectedTemplate(null);
    setActiveTab('custom');
  };

  const deleteSavedChecklist = (index: number) => {
    if (confirm('هل أنت متأكد من حذف هذه القائمة؟ (Are you sure you want to delete this checklist?)')) {
      const newSaved = savedChecklists.filter((_, i) => i !== index);
      saveChecklists(newSaved);
    }
  };

  const addPhotoToItem = (itemId: string) => {
    // Simulate photo upload (in real app, this would use camera/file picker)
    const photoUrl = `photo-${itemId}-${Date.now()}.jpg`;
    setCustomItems(customItems.map(item =>
      item.id === itemId ? { ...item, photo: photoUrl } : item
    ));
    alert('تم إضافة الصورة (Photo added)');
  };

  const addNotesToItem = (itemId: string, notes: string) => {
    setCustomItems(customItems.map(item =>
      item.id === itemId ? { ...item, notes } : item
    ));
  };

  const progress = customItems.length > 0
    ? Math.round((customItems.filter(item => item.checked).length / customItems.length) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50" dir="rtl">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">قوائم المراجعة (Checklists)</h1>
          <p className="text-gray-600">
            أنشئ قوائم مراجعة لمشاريعك وتتبع التقدم
            <br />
            <span className="text-sm">Create checklists for your projects and track progress</span>
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('templates')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'templates'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            القوالب (Templates)
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all ${
              activeTab === 'custom'
                ? 'bg-green-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            قائمة مخصصة (Custom)
          </button>
        </div>

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-800 mb-4">اختر قالب (Select Template)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="bg-white rounded-xl p-6 text-right hover:shadow-xl transition-all hover:scale-105 border-2 border-transparent hover:border-green-500 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600">
                        {template.items.length} عناصر (items)
                      </p>
                    </div>
                    <ChevronRight className="text-green-600 group-hover:translate-x-[-8px] transition-transform" />
                  </div>
                </button>
              ))}
            </div>

            {/* Saved Checklists */}
            {savedChecklists.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4">القوائم المحفوظة (Saved Checklists)</h2>
                <div className="space-y-3">
                  {savedChecklists.map((checklist, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl p-4 flex items-center justify-between hover:shadow-lg transition-all"
                    >
                      <div>
                        <p className="font-semibold text-gray-900">
                          القائمة {index + 1} ({checklist.length} عناصر)
                        </p>
                        <p className="text-sm text-gray-600">
                          {checklist.filter(item => item.checked).length} من {checklist.length} مكتمل
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => loadSavedChecklist(index)}
                          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                          تحميل (Load)
                        </button>
                        <button
                          onClick={() => deleteSavedChecklist(index)}
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                        >
                          حذف (Delete)
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Checklist Tab */}
        {activeTab === 'custom' && (
          <div className="space-y-4">
            {/* Progress Bar */}
            {customItems.length > 0 && (
              <div className="bg-white rounded-xl p-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-gray-900">التقدم (Progress)</span>
                  <span className="font-bold text-green-600">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Template Info */}
            {selectedTemplate && (
              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-4">
                <p className="text-green-800 font-semibold">
                  القالب: {selectedTemplate.name}
                </p>
              </div>
            )}

            {/* Add New Item */}
            <div className="bg-white rounded-xl p-4 shadow-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  placeholder="أضف عنصراً جديداً (Add new item)"
                  className="flex-1 p-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none text-right"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomItem()}
                />
                <button
                  onClick={addCustomItem}
                  className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <Plus size={20} />
                  <span className="hidden sm:inline">إضافة (Add)</span>
                </button>
              </div>
            </div>

            {/* Checklist Items */}
            {customItems.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center text-gray-500">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p>لا توجد عناصر في القائمة</p>
                <p className="text-sm">No items in the checklist</p>
              </div>
            ) : (
              <div className="space-y-3">
                {customItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleItemCheck(item.id)}
                        className="flex-shrink-0 mt-1"
                      >
                        {item.checked ? (
                          <CheckCircle className="text-green-600" size={24} />
                        ) : (
                          <Circle className="text-gray-400 hover:text-green-600 transition-colors" size={24} />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium text-gray-900 ${
                            item.checked ? 'line-through text-gray-500' : ''
                          }`}
                        >
                          {item.text}
                        </p>

                        {/* Photo and Notes Section */}
                        {expandedItem === item.id && (
                          <div className="mt-3 space-y-2">
                            <div className="flex gap-2">
                              <button
                                onClick={() => addPhotoToItem(item.id)}
                                className="bg-blue-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                              >
                                <Camera size={16} />
                                <span>صورة (Photo)</span>
                              </button>
                              {item.photo && (
                                <span className="text-green-600 text-sm flex items-center gap-1">
                                  ✓ صورة مضافة
                                </span>
                              )}
                            </div>
                            <textarea
                              placeholder="ملاحظات (Notes)..."
                              value={item.notes || ''}
                              onChange={(e) => addNotesToItem(item.id, e.target.value)}
                              className="w-full p-2 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-sm text-right"
                              rows={2}
                            />
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          title="ملاحظات (Notes)"
                        >
                          <FileText size={20} className="text-gray-600" />
                        </button>
                        <button
                          onClick={() => deleteItem(item.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="حذف (Delete)"
                        >
                          <Trash2 size={20} className="text-red-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Save Button */}
            {customItems.length > 0 && (
              <div className="sticky bottom-4">
                <button
                  onClick={saveCurrentChecklist}
                  className="w-full bg-green-600 text-white py-4 rounded-xl shadow-lg hover:bg-green-700 transition-all hover:shadow-xl flex items-center justify-center gap-2 font-semibold text-lg"
                >
                  <Save size={24} />
                  <span>حفظ القائمة (Save Checklist)</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
