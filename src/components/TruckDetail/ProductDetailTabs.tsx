import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import ContactForm from '../ContactForm';
import CostEstimator from './CostEstimator';
import { Truck } from '@/models/TruckTypes';

interface ProductDetailTabsProps {
  truck: Truck;
}

const ProductDetailTabs: React.FC<ProductDetailTabsProps> = ({ truck }) => {
  return (
    <Tabs defaultValue="description" className="mt-12">
      <TabsList>
        <TabsTrigger value="description">Mô tả</TabsTrigger>
        <TabsTrigger value="specs">Thông số kỹ thuật</TabsTrigger>
        <TabsTrigger value="calculator">Dự toán chi phí</TabsTrigger>
        <TabsTrigger value="contact">Liên hệ</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-6">
        <div className="prose max-w-none">
          <p className="text-lg">{truck.description}</p>
          {truck.detailedDescription && (
            <div dangerouslySetInnerHTML={{ __html: truck.detailedDescription }} />
          )}
        </div>
      </TabsContent>

      <TabsContent value="specs" className="mt-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Thông số kỹ thuật</h3>
          <dl className="space-y-3">
            {truck.features && truck.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2">
                <svg className="w-5 h-5 text-green-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>{feature}</span>
              </div>
            ))}
          </dl>
        </div>
      </TabsContent>

      <TabsContent value="calculator" className="mt-6">
        <CostEstimator truck={truck} />
      </TabsContent>

      <TabsContent value="contact" className="mt-6">
        <ContactForm productName={truck.name} />
      </TabsContent>
    </Tabs>
  );
};

export default ProductDetailTabs;
