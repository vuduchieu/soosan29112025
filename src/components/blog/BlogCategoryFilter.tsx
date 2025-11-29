import React from 'react';
import {
  TrendingUp,
  Tag,
  User,
  Wrench,
  Lightbulb,
  Zap
} from 'lucide-react';
import type { BlogCategoryInfo } from '@/utils/blogCategories';

interface BlogCategoryFilterProps {
  categories: BlogCategoryInfo[];
  activeCategory?: string;
  onCategoryClick?: (categoryId: string) => void;
}

const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'industry-news': TrendingUp,
  'tin-tuc-nganh-van-tai': TrendingUp,
  'product-review': Tag,
  'danh-gia-xe': Tag,
  'driver-tips': User,
  'kinh-nghiem-lai-xe': User,
  'maintenance': Wrench,
  'bao-duong-xe': Wrench,
  'buying-guide': Lightbulb,
  'tu-van-mua-xe': Lightbulb,
  'technology': Zap,
  'cong-nghe': Zap,
};

const BlogCategoryFilter = ({
  categories,
  activeCategory,
  onCategoryClick
}: BlogCategoryFilterProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const IconComponent = categoryIcons[category.id] || Tag;
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryClick?.(category.id)}
              className={`
                flex flex-col items-center justify-center
                p-4 rounded-lg border-2 transition-all duration-300
                min-w-[100px] sm:min-w-[120px]
                ${
                  isActive
                    ? 'border-primary bg-primary/5 shadow-md scale-105'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-gray-50'
                }
              `}
            >
              <div className={`
                p-3 rounded-full mb-2
                ${isActive ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}
              `}>
                <IconComponent className="h-6 w-6" />
              </div>
              <span className={`
                text-sm font-medium text-center
                ${isActive ? 'text-primary' : 'text-gray-700'}
              `}>
                {category.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BlogCategoryFilter;
