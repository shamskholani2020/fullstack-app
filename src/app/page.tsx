"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ClipboardList, LayoutGrid, FileText, Package, Phone, CheckSquare, Users, Share2, BarChart3, Settings, Zap, MessageCircle, ArrowLeft } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-100">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center bg-amber-600 rounded-2xl p-4 shadow-xl mb-6">
            <Calculator className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-amber-900 mb-6 drop-shadow-lg">
            البادر
          </h1>
          <p className="text-xl md:text-2xl text-amber-800 max-w-3xl mx-auto mb-8 leading-relaxed">
            منصة شاملة للنجارين - أدوات، قياسات، وأكثر
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-4 shadow-xl font-bold"
            >
              ابدأ الآن مجاناً
            </Button>
            <Link href="/auth">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-amber-300 text-amber-700 text-lg px-8 py-4"
              >
                سجّل الدخول
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto text-right">
          {/* Feature 1: Calculator */}
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Calculator className="w-7 h-7 text-amber-600" />
                </div>
                <div>
                  <span className="text-xl font-bold text-amber-900">آلة الحاسبة</span>
                  <CardDescription className="text-sm">أدوات القياس السريع</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                محولات بين الوحدات، احسب المساحة والحجم بدقة
              </p>
            </CardContent>
          </Card>

          {/* Feature 2: Cut Lists */}
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ClipboardList className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <span className="text-xl font-bold text-blue-900">قوائم القص</span>
                  <CardDescription className="text-sm">توليد تلقائي مع تقليل الهدر</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                احسب القطع تلقائياً من القياسات، قلل الهدر
              </p>
            </CardContent>
          </Card>

          {/* Feature 3: Optimizer */}
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <LayoutGrid className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <span className="text-xl font-bold text-purple-900">محسن التخطيط</span>
                  <CardDescription className="text-sm">ترتيب القطع على الألواح</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                حسب أفضل ترتيب للألواح القياسية لتوفير المادة
              </p>
            </CardContent>
          </Card>

          {/* Feature 4: Templates */}
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <span className="text-xl font-bold text-green-900">قوالب القياس</span>
                  <CardDescription className="text-sm">نماذج قياس جاهزة</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                نماذج قياس للأبواب والنوافذ والخزائن والمطابخ
              </p>
            </CardContent>
          </Card>

          {/* Feature 5: Job Cards */}
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Package className="w-7 h-7 text-red-600" />
                </div>
                <div>
                  <span className="text-xl font-bold text-red-900">بطاقات الوظائف</span>
                  <CardDescription className="text-sm">بطاقات تفقدية لكل مشروع</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                بطاقات تفقدية شاملة لكل مشروع مع صور وملاحظات
              </p>
            </CardContent>
          </Card>

          {/* Feature 6: Suppliers */}
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-7 h-7 text-yellow-700" />
                </div>
                <div>
                  <span className="text-xl font-bold text-yellow-900">المواد</span>
                  <CardDescription className="text-sm">إدارة المخزون والأسعار</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                إدارة قائمة الموادين ومقارنة الأسعار بسهولة
              </p>
            </CardContent>
          </Card>

          {/* Feature 7: Jobs */}
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-7 h-7 text-cyan-600" />
                </div>
                <div>
                  <span className="text-xl font-bold text-cyan-900">المشاريع</span>
                  <CardDescription className="text-sm">تتبع الوظائف والمهام</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                إدارة جميع مشاريعك في مكان واحد مع تتبع سريع
              </p>
            </CardContent>
          </Card>

          {/* Feature 8: Reports */}
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-7 h-7 text-pink-600" />
                </div>
                <div>
                  <span className="text-xl font-bold text-pink-900">التقارير</span>
                  <CardDescription className="text-sm">تقارير أرباح وخسائر</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                تقارير مفصلة للأرباح والخسائر مع رسوم بيانية
              </p>
            </CardContent>
          </Card>

          {/* Feature 9: Voice Notes */}
          <Card className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all cursor-pointer border-2 border-transparent hover:border-amber-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-7 h-7 text-indigo-600" />
                </div>
                <div>
                  <span className="text-xl font-bold text-indigo-900">ملاحظات صوتية</span>
                  <CardDescription className="text-sm">سجل ملاحظاتك بصوتك</CardDescription>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                سجل ملاحظاتك بصوتك أثناء القياس لتنسيه لاحقاً
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto border-4 border-amber-200">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-6">
            هل أنت نجار جديد؟
          </h2>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
            كل ما تحتاجه من أدوات ومعلومات في مكان واحد - مجاناً للأبد
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="outline"
              className="flex-1 text-lg py-6 border-3 border-amber-300 font-semibold"
            >
              <Phone className="ml-2 w-6 h-6" />
              تسجيل
            </Button>
            <Link href="/auth" className="flex-1">
              <Button
                size="lg"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 font-semibold"
              >
                <Users className="ml-2 w-6 h-6" />
                تصفح الكتالوج
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Phone className="w-14 h-14 mx-auto text-green-600 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900">يعمل بدون إنترنت</h3>
            <p className="text-gray-600 text-sm">تطبيق متكامل بدون الحاجة للاتصال</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Share2 className="w-14 h-14 mx-auto text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900">تشارك فريقك</h3>
            <p className="text-gray-600 text-sm">تعاون مع فريق العمل والزبائن</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <Package className="w-14 h-14 mx-auto text-purple-600 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900">توفير الوقت</h3>
            <p className="text-gray-600 text-sm">أدوات ذكية توفر لك ساعات من العمل</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <CheckSquare className="w-14 h-14 mx-auto text-red-600 mb-4" />
            <h3 className="text-xl font-bold mb-3 text-gray-900">لا يوجد أخطاء</h3>
            <p className="text-gray-600 text-sm">حسابات دقيقة تمنع الأخطاء</p>
          </div>
        </div>
      </section>
    </div>
  );
}
