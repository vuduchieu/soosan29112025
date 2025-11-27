import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const PROVINCES = [
  { value: 'hanoi', label: 'Hà Nội', area_key: 'HANOI' },
  { value: 'hochiminh', label: 'TP. Hồ Chí Minh', area_key: 'HOCHIMINH' },
  { value: 'danang', label: 'Đà Nẵng', area_key: 'DANANG' },
  { value: 'haiphong', label: 'Hải Phòng', area_key: 'HAIPHONG' },
  { value: 'cantho', label: 'Cần Thơ', area_key: 'CANTHO' },
  { value: 'others', label: 'Tỉnh khác', area_key: 'OTHERS' }
];

const REGISTRATION_PLATE_FEES: Record<string, number> = {
  'HANOI': 2000000,
  'HOCHIMINH': 2500000,
  'DANANG': 1500000,
  'HAIPHONG': 1200000,
  'CANTHO': 1000000,
  'OTHERS': 500000
};

const BEFORE_REGISTRATION_FEE_RATE = 0.02;
const VAT_RATE = 0.10;

const CostEstimation: React.FC = () => {
  const [vehiclePrice, setVehiclePrice] = useState<string>('');
  const [province, setProvince] = useState<string>('');
  const [otherFees, setOtherFees] = useState<string>('');
  const [vehicleType, setVehicleType] = useState<string>('');
  const [weightCategory, setWeightCategory] = useState<string>('');
  const [results, setResults] = useState<any>(null);

  const formatCurrencyInput = (value: string) => {
    const numbers = value.replace(/[^\d]/g, '');
    return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const parseCurrencyInput = (value: string) => {
    return parseInt(value.replace(/[^\d]/g, '')) || 0;
  };

  const handleVehiclePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setVehiclePrice(formatted);
  };

  const handleOtherFeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrencyInput(e.target.value);
    setOtherFees(formatted);
  };

  const calculateCosts = () => {
    if (!vehiclePrice || !province || !vehicleType || !weightCategory) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const price = parseCurrencyInput(vehiclePrice);
    const otherFeesAmount = parseCurrencyInput(otherFees);

    const selectedProvince = PROVINCES.find(p => p.value === province);
    const plateArea = selectedProvince?.area_key || 'OTHERS';

    const beforeRegistrationFee = price * BEFORE_REGISTRATION_FEE_RATE;
    const plateFee = REGISTRATION_PLATE_FEES[plateArea];

    const roadMaintenanceFee = 3600000;
    const inspectionFee = 540000;
    const insuranceFee = 1500000 * (1 + VAT_RATE);

    const totalCost = price + beforeRegistrationFee + plateFee + roadMaintenanceFee + inspectionFee + insuranceFee + otherFeesAmount;

    setResults({
      vehiclePrice: price,
      beforeRegistrationFee,
      plateFee,
      roadMaintenanceFee,
      inspectionFee,
      insuranceFee,
      otherFees: otherFeesAmount,
      totalCost
    });
  };

  const getWeightOptions = () => {
    if (vehicleType === 'trailer') {
      return [
        { value: 'FROM_19_TO_UNDER_27_TONS', label: '19 - 27 tấn' },
        { value: 'FROM_27_TONS_UP', label: 'Trên 27 tấn' }
      ];
    } else if (vehicleType === 'tractor') {
      return [
        { value: 'UNDER_19_TONS', label: 'Dưới 19 tấn' },
        { value: 'FROM_19_TO_UNDER_27_TONS', label: '19 - 27 tấn' },
        { value: 'FROM_27_TO_UNDER_40_TONS', label: '27 - 40 tấn' },
        { value: 'FROM_40_TONS_UP', label: 'Trên 40 tấn' }
      ];
    }
    return [
      { value: 'UNDER_4_TONS', label: 'Dưới 4 tấn' },
      { value: 'FROM_4_TO_UNDER_8_5_TONS', label: '4 - 8.5 tấn' },
      { value: 'FROM_8_5_TO_UNDER_13_TONS', label: '8.5 - 13 tấn' },
      { value: 'FROM_13_TO_UNDER_19_TONS', label: '13 - 19 tấn' },
      { value: 'FROM_19_TO_UNDER_27_TONS', label: '19 - 27 tấn' },
      { value: 'FROM_27_TONS_UP', label: 'Trên 27 tấn' }
    ];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">Thông Tin Xe</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="vehiclePrice">Giá xe (đã bao gồm VAT)</Label>
            <Input
              id="vehiclePrice"
              placeholder="Nhập giá xe (VNĐ)"
              value={vehiclePrice}
              onChange={handleVehiclePriceChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">Tỉnh/thành phố đăng ký</Label>
            <Select value={province} onValueChange={setProvince}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn tỉnh/thành phố" />
              </SelectTrigger>
              <SelectContent>
                {PROVINCES.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleType">Loại xe</Label>
            <Select value={vehicleType} onValueChange={setVehicleType}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn loại xe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="truck">Xe tải</SelectItem>
                <SelectItem value="crane">Xe cẩu</SelectItem>
                <SelectItem value="trailer">Sơ mi rơ mooc</SelectItem>
                <SelectItem value="tractor">Xe đầu kéo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="weightCategory">Phân loại tải trọng</Label>
            <Select value={weightCategory} onValueChange={setWeightCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Chọn tải trọng" />
              </SelectTrigger>
              <SelectContent>
                {getWeightOptions().map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="otherFees">Phí dịch vụ khác (VNĐ)</Label>
            <Input
              id="otherFees"
              placeholder="Nhập phí dịch vụ khác (không bắt buộc)"
              value={otherFees}
              onChange={handleOtherFeesChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={calculateCosts} className="w-full">
            <Calculator className="mr-2 h-4 w-4" />
            Tính Toán Chi Phí Lăn Bánh
          </Button>
        </div>
      </div>

      {results && (
        <div className="bg-green-50 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800">Kết Quả Tính Toán</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Giá trị xe:</span>
                <span className="font-semibold">{formatCurrency(results.vehiclePrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Phí trước bạ (2%):</span>
                <span className="font-semibold">{formatCurrency(results.beforeRegistrationFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Phí biển số:</span>
                <span className="font-semibold">{formatCurrency(results.plateFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Phí đăng kiểm:</span>
                <span className="font-semibold">{formatCurrency(results.inspectionFee)}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-700">Bảo hiểm TNDS:</span>
                <span className="font-semibold">{formatCurrency(results.insuranceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Phí bảo trì đường bộ:</span>
                <span className="font-semibold">{formatCurrency(results.roadMaintenanceFee)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Phí dịch vụ khác:</span>
                <span className="font-semibold">{formatCurrency(results.otherFees)}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="text-lg font-bold text-green-800">Tổng chi phí:</span>
                <span className="text-lg font-bold text-green-600">{formatCurrency(results.totalCost)}</span>
              </div>
            </div>
          </div>

          {vehicleType === 'trailer' && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-700">
                <strong>Lưu ý đặc biệt cho sơ mi rơ mooc:</strong> Sơ mi rơ mooc không phải đóng phí bảo trì đường bộ riêng và thường được bảo hiểm chung với xe đầu kéo. Chi phí có thể thấp hơn so với các loại xe khác.
              </p>
            </div>
          )}

          {vehicleType === 'tractor' && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-700">
                <strong>Lưu ý cho xe đầu kéo:</strong> Xe đầu kéo có mức phí đăng kiểm và bảo hiểm cao hơn xe tải thường do tính chất vận hành đặc biệt. Phí bảo hiểm đã bao gồm cả rơ mooc kéo theo.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CostEstimation;
