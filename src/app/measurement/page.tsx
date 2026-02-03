"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calculator, ArrowLeft, ArrowRight, Trash2, Save, Plus } from "lucide-react";

export default function MeasurementHelper() {
  const [roomName, setRoomName] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [length, setLength] = useState("");
  const [unit, setUnit] = useState<"m" | "cm" | "mm">("m");
  const [savedMeasurements, setSavedMeasurements] = useState<Array<{id: string; room: string; width: string; height: string; length: string; unit: string}>>([]);

  const calculateArea = () => {
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const l = parseFloat(length) || 0;
    
    // Convert to meters for calculation
    let wM = w;
    let hM = h;
    let lM = l;
    
    if (unit === "cm") {
      wM = w / 100;
      hM = h / 100;
      lM = l / 100;
    } else if (unit === "mm") {
      wM = w / 1000;
      hM = h / 1000;
      lM = l / 1000;
    }
    
    // Area = width * height (in m²)
    const area = wM * hM;
    
    // Volume = width * height * length (in m³)
    const volume = wM * hM * lM;
    
    return {
      area: area.toFixed(2),
      volume: volume.toFixed(3),
      areaFt2: (area * 10.764).toFixed(2), // 1 m² = 10.764 ft²
      volumeFt3: (volume * 35.314).toFixed(3), // 1 m³ = 35.314 ft³
      squareMeters: area,
      cubicMeters: volume,
    };
  };

  const calculation = calculateArea();
  
  const handleSave = () => {
    if (!roomName || !width || !height) {
      return;
    }
    
    const newMeasurement = {
      id: Date.now().toString(),
      room: roomName,
      width,
      height,
      length: length || "",
      unit,
    };
    
    setSavedMeasurements([...savedMeasurements, newMeasurement]);
    
    // Clear form
    setRoomName("");
    setWidth("");
    setHeight("");
    setLength("");
    alert("تم حفظ القياسات!");
  };

  const handleDelete = (id: string) => {
    setSavedMeasurements(savedMeasurements.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            مساعد القياس
          </h1>
          <p className="text-lg text-gray-600">
            احسب المساحة والحجم بسهولة
          </p>
        </div>

        {/* Input Card */}
        <Card className="bg-white shadow-2xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-amber-600" />
              <span>قياس جديد</span>
            </CardTitle>
            <CardDescription className="text-right">
              أدخل أبعاد الغرفة أو المساحة
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-right text-sm font-semibold text-gray-700 mb-2">
                  اسم الغرفة (اختياري)
                </label>
                <Input
                  type="text"
                  placeholder="مثالً: المطبخ، غرفة النوم، إلخ"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="text-right text-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-right text-sm font-semibold text-gray-700 mb-2">
                      العرض
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="text-right text-lg pl-12"
                    />
                    <div className="absolute top-1/2 left-2 text-gray-500">
                      {unit === "m" ? "متر" : unit === "cm" ? "سم" : "مم"}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-right text-sm font-semibold text-gray-700 mb-2">
                      الارتفاع
                  </label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="text-right text-lg pl-12"
                    />
                    <div className="absolute top-1/2 left-2 text-gray-500">
                      {unit === "m" ? "متر" : unit === "cm" ? "سم" : "مم"}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-right text-sm font-semibold text-gray-700 mb-2">
                    الطول (اختياري)
                </label>
                <div className="relative">
                  <Input
                      type="number"
                      placeholder="0"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="text-right text-lg pl-12"
                  />
                  <div className="absolute top-1/2 left-2 text-gray-500">
                    {unit === "m" ? "متر" : unit === "cm" ? "سم" : "مم"}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-right text-sm font-semibold text-gray-700 mb-2">
                    وحدة القياس
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={unit === "m" ? "default" : "outline"}
                    onClick={() => setUnit("m")}
                    className="flex-1"
                  >
                    متر
                  </Button>
                  <Button
                    variant={unit === "cm" ? "default" : "outline"}
                    onClick={() => setUnit("cm")}
                    className="flex-1"
                  >
                    سم
                  </Button>
                  <Button
                    variant={unit === "mm" ? "default" : "outline"}
                    onClick={() => setUnit("mm")}
                    className="flex-1"
                  >
                    مم
                  </Button>
                </div>
              </div>
            </div>

            <Button
              onClick={handleSave}
              disabled={!roomName || !width || !height}
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-4"
            >
              <Save className="ml-2" />
              حفظ القياس
            </Button>
          </CardContent>
        </Card>

        {/* Results Card */}
        {(width || height) && (
          <Card className="bg-white shadow-2xl mb-8">
            <CardHeader>
              <CardTitle>النتيجة</CardTitle>
              <CardDescription className="text-right">
                المساحة: {calculation.area} م²
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">المساحة</div>
                  <div className="text-xl font-bold text-gray-900">{calculation.area} م²</div>
                  <div className="text-xs text-gray-500">{calculation.areaFt2} قدم²</div>
                </div>
                {length && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">الحجم</div>
                    <div className="text-xl font-bold text-gray-900">{calculation.volume} م³</div>
                    <div className="text-xs text-gray-500">{calculation.volumeFt3} قدم³</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Saved Measurements */}
        {savedMeasurements.length > 0 && (
          <Card className="bg-white shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="w-6 h-6 text-amber-600" />
                <span>القياسات المحفوظة</span>
                <span className="text-sm text-gray-500">({savedMeasurements.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedMeasurements.map((measurement) => (
                  <div
                    key={measurement.id}
                    className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{measurement.room}</div>
                      <div className="text-sm text-gray-600">
                        العرض: {measurement.width} {measurement.unit} |
                        الارتفاع: {measurement.height} {measurement.unit}
                        {measurement.length && `| الطول: ${measurement.length} ${measurement.unit}`}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setWidth(measurement.width);
                          setHeight(measurement.height);
                          if (measurement.length) setLength(measurement.length);
                          setUnit(measurement.unit as any);
                        }}
                      >
                        <Calculator className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(measurement.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tips Card */}
        <Card className="bg-amber-50 border-amber-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-amber-900">
              <Calculator className="w-6 h-6" />
              <span>نصائح للقياس</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-right text-gray-700">
              <li className="flex items-start gap-2">
                  <ArrowLeft className="w-5 h-5 text-amber-600 mt-0.5" />
                  <span>قياس مرتين للتأكد من الدقة</span>
                </li>
              <li className="flex items-start gap-2">
                  <ArrowLeft className="w-5 h-5 text-amber-600 mt-0.5" />
                  <span>استخدم وحدة واحدة (متر، سم، مم) لكل مشروع</span>
                </li>
              <li className="flex items-start gap-2">
                  <ArrowLeft className="w-5 h-5 text-amber-600 mt-0.5" />
                  <span>أضف التقياس قبل شراء المواد لتوفير الهدر</span>
                </li>
              <li className="flex items-start gap-2">
                  <ArrowLeft className="w-5 h-5 text-amber-600 mt-0.5" />
                  <span>احتفظ القياسات للرجوع إليها لاحقاً</span>
                </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
