"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Phone, ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";

export default function AuthScreen() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"phone" | "code" | "success">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Simulate sending SMS
    setTimeout(() => {
      setLoading(false);
      setStep("code");
      console.log("SMS sent to:", phone);
    }, 2000);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (code.length !== 6) {
      setError("الرجاء إدخال 6 أرقام");
      return;
    }
    
    setLoading(true);
    
    // Simulate verifying code
    setTimeout(() => {
      setLoading(false);
      if (code === "123456") {
        setStep("success");
        console.log("Verification successful");
      } else {
        setError("الكود غير صحيح");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl">
        <CardHeader className="text-center space-y-4 pb-6">
          <div className="mx-auto w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center">
            <Phone className="w-8 h-8 text-white" />
          </div>
          
          <CardTitle className="text-3xl font-bold text-amber-900">
            البادر
          </CardTitle>
          <CardDescription className="text-gray-600 text-lg">
            {step === "phone" && "أدخل رقم هاتفك للبدء"}
            {step === "code" && "أدخل الكود المرسل"}
            {step === "success" && "تم التحقق بنجاح!"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {step === "phone" && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-right text-lg font-semibold text-gray-700">
                  رقم الهاتف
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center px-3 bg-gray-50 border-2 border-gray-200 rounded-lg">
                    <Phone className="w-5 h-5 text-amber-600" />
                    <span className="text-xl font-medium text-gray-600">+963</span>
                  </div>
                  <Input
                    type="tel"
                    placeholder="xxx xxxx xxx"
                    className="text-lg text-right"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1"
                  />
                </div>
                <p className="text-sm text-gray-500 text-right">
                  سنرسل لك كود SMS للتحقق من رقمك
                </p>
              </div>
              
              <Button 
                type="submit" 
                disabled={!phone || loading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 shadow-lg"
              >
                {loading ? "جاري الإرسال..." : "إرسال الكود"}
              </Button>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-right text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
            </form>
          )}
          
          {step === "code" && (
            <form onSubmit={handleCodeSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-right text-lg font-semibold text-gray-700">
                  كود التحقق
                </label>
                <Input
                  type="text"
                  placeholder="xxxxxx"
                  className="text-2xl text-center font-mono tracking-wider"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  maxLength={6}
                  className="w-full"
                />
                <p className="text-sm text-gray-500 text-right">
                  أدخل الكود المكون من 6 أرقام المرسل إلى {phone}
                </p>
              </div>
              
              <Button 
                type="submit" 
                disabled={code.length !== 6 || loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-6 shadow-lg"
              >
                {loading ? "جاري التحقق..." : "تحقق"}
              </Button>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-right text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>{error}</span>
                </div>
              )}
              
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep("phone")}
                className="w-full text-gray-600 hover:text-gray-800 text-lg py-3"
              >
                <ArrowRight className="inline ml-2" />
                تغيير رقم الهاتف
              </Button>
            </form>
          )}
          
          {step === "success" && (
            <div className="space-y-6 text-center">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                أهلاً بك في البادر!
              </h3>
              
              <p className="text-lg text-gray-600 mb-6">
                تم التحقق من رقم هاتفك بنجاح
              </p>
              
              <Button 
                className="w-full bg-amber-600 hover:bg-amber-700 text-white text-lg py-6 shadow-lg"
              >
                ابدأ استخدام التطبيق
              </Button>
              
              <div className="border-t pt-4 mt-4">
                <p className="text-sm text-gray-500 text-right">
                  رقم هاتفك: <span className="font-mono text-gray-700">{phone}</span>
                </p>
                <p className="text-sm text-gray-500 text-right">
                  تاريخ التسجيل: {new Date().toLocaleDateString('ar-SY')}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
