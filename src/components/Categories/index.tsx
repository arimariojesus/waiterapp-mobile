import { useState } from 'react';
import { FlatList } from 'react-native';

import { Text } from '../Text';
import { ICategory } from '../../types/category';

import * as S from './styles';

interface CategoriesProps {
  categories: ICategory[];
  onSelectCategory: (categoryId: string) => void;
}

export const Categories = ({ categories, onSelectCategory }: CategoriesProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectCategory = (categoryId: string) => {
    const category = categoryId === selectedCategory ? '' : categoryId;

    onSelectCategory(category);
    setSelectedCategory(category);
  };

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 24 }}
      data={categories}
      keyExtractor={category => category._id}
      renderItem={({ item: category }) => {
        const isSelected = selectedCategory === category._id;
        const opacity = isSelected ? 1 : 0.5;

        return (
          <S.Category onPress={() => handleSelectCategory(category._id)}>
            <S.Icon>
              <Text opacity={opacity}>{category.icon}</Text>
            </S.Icon>

            <Text size={14} weight="600" opacity={opacity}>
              {category.name}
            </Text>
          </S.Category>
        );
      }}
    />
  );
};
