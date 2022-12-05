import { FlatList } from 'react-native';
import { useState } from 'react';

import { PlusCircle } from '../Icons';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';
import { baseURL } from '../../services/api';
import { IProduct } from '../../types/product';
import { formatCurrency, getAssetsURI } from '../../utils';

import * as S from './styles';

interface MenuProps {
  onAddToCart: (product: IProduct) => void;
  products: IProduct[];
}

export const Menu = ({ onAddToCart, products }: MenuProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const handleOpenModal = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <ProductModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />

      <FlatList
        data={products}
        style={{ marginTop: 32 }}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={S.Separator}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => (
          <S.Product onPress={() => handleOpenModal(product)}>
            <S.ProductImage
              resizeMode="cover"
              source={{
                uri: getAssetsURI(baseURL, product.imagePath),
              }}
            />

            <S.ProductDetails>
              <Text weight="600">{product.name}</Text>
              <Text size={14} color="#664" style={{ marginVertical: 8 }}>
                {product.description}
              </Text>
              <Text size={14} weight="600">
                {formatCurrency(product.price)}
              </Text>
            </S.ProductDetails>

            <S.AddToCartButton onPress={() => onAddToCart(product)}>
              <PlusCircle />
            </S.AddToCartButton>
          </S.Product>
        )}
      />
    </>
  );
};
