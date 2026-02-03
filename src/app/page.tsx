"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ClipboardList, LayoutGrid, FileText, MessageCircle, Package, Phone, CheckSquare, Users, Share2, BarChart3, Settings, MapPin, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            بادر - Bader
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            منصة شاملة للنجارين - كل ما تحتاجه في مكان واحد
          </p>
          <Button 
            size="lg" 
            className="bg-white text-amber-700 hover:bg-amber-100 text-lg px-8 py-4 shadow-xl font-bold"
          >
            ابدأ الآن
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-right">
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="w-8 h-8 text-amber-600" />
                <span>آلة الحاسبة</span>
              </CardTitle>
              <CardDescription>
                أدوات القياس السريع والمحولات بين الوحدات
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-8 h-8 text-amber-600" />
                <span>قوائم القص</span>
              </CardTitle>
              <CardDescription>
                توليد قوائم قطع تلقائية مع تقليل الهدر
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutGrid className="w-8 h-8 text-amber-600" />
                <span>محسن التخطيط</span>
              </CardTitle>
              <CardDescription>
                ترتيب القطع على الألواح القياسية لتوفير المادة
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-8 h-8 text-amber-600" />
                <span>قوالب القياس</span>
              </CardTitle>
              <CardDescription>
                نماذج قياس جاهزة للأبواب والنوافذ
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-8 h-8 text-amber-600" />
                <span>بطاقات الوظائف</span>
              </CardTitle>
              <CardDescription>
                بطاقات تفقدية شاملة لكل مشروع
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-8 h-8 text-amber-600" />
                <span>المشاريع والعملاء</span>
              </CardTitle>
              <CardDescription>
                إدارة المشاريع والمهام والمواد
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-8 h-8 text-amber-600" />
                <span>التقارير</span>
              </CardTitle>
              <CardDescription>
                تقارير أرباح وخسائر برسوم بيانية تفصيلية
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-700 mb-6">
            هل أنت نجار جديد؟
          </h2>
          <p className="text-lg text-gray-600 mb-8 text-right">
            كل ما تحتاجه من أدوات ومعلومات في مكان واحد - مجاناً للأبدء
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline"
              className="flex-1 text-lg py-4 border-2 border-amber-300"
            >
              <Phone className="ml-2" />
              تسجيل
            </Button>
            <Button 
              size="lg"
              className="flex-1 text-lg py-4 bg-amber-600 hover:bg-amber-700"
            >
              <Users className="ml-2" />
              تصفح الكتالوج
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Phone className="w-12 h-12 mx-auto text-green-600 mb-3" />
            <h3 className="font-bold text-lg mb-2 text-right">يعمل بدون إنترنت</h3>
            <p className="text-gray-600 text-right">تطبيق متكامل بدون الحاجة للاتصال</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Share2 className="w-12 h-12 mx-auto text-blue-600 mb-3" />
            <h3 className="font-bold text-lg mb-2 text-right">تشارك فريقك</h3>
            <p className="text-gray-600 text-right">تعاون مع فريق العمل والزبائن</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <Zap className="w-12 h-12 mx-auto text-purple-600 mb-3" />
            <h3 className="font-bold text-lg mb-2 text-right">توفير الوقت</h3>
            <p className="text-gray-600 text-right">أدوات ذكية توفر لك ساعات من العمل</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <CheckSquare className="w-12 h-12 mx-auto text-red-600 mb-3" />
            <h3 className="font-bold text-lg mb-2 text-right">لا يوجد أخطاء</h3>
            <p className="text-gray-600 text-right">حسابات دقيقة تمنع الأخطاء</p>
          </div>
        </div>
      </section>
    </div>
  );
}
