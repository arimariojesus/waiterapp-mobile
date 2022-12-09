import { FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { Button } from '../Button';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { MinusCircle, PlusCircle } from '../Icons';
import { Text } from '../Text';
import { baseURL, OrdersService } from '../../services';
import { ICartItem, IProduct } from '../../types';
import { formatCurrency, getTotalPrice, getAssetsURI } from '../../utils';

import * as S from './styles';
import { useTheme } from '../../hooks';

interface CartProps {
  items: ICartItem[];
  onAdd: (product: IProduct) => void;
  onDecrement: (product: IProduct) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export const Cart = ({
  items,
  onAdd,
  onDecrement,
  onConfirmOrder,
  selectedTable,
}: CartProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { theme } = useTheme();

  const isEmpty = items.length === 0;
  const total = getTotalPrice(items);

  const handleConfirmOrder = async () => {
    try {
      setIsLoading(true);

      const payload = {
        table: selectedTable,
        products: items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      };

      await OrdersService.add(payload);

      setIsModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFinishOrder = () => {
    onConfirmOrder();
    setIsModalVisible(false);
  };

  return (
    <>
      <OrderConfirmedModal
        visible={isModalVisible}
        onConfirm={handleFinishOrder}
      />

      {!isEmpty && (
        <FlatList
          data={items}
          keyExtractor={cartItem => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 130 }}
          renderItem={({ item: cartItem }) => (
            <S.CartItem>
              <S.ProductContainer>
                <S.ProductImage
                  source={{
                    uri: getAssetsURI(baseURL, cartItem.product.imagePath),
                  }}
                />

                <S.QuantityContainer>
                  <Text size={14} color={theme.color.grey}>
                    {cartItem.quantity}x
                  </Text>
                </S.QuantityContainer>

                <S.ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color={theme.color.grey}>
                    {formatCurrency(cartItem.product.price)}
                  </Text>
                </S.ProductDetails>
              </S.ProductContainer>

              <S.Actions>
                <TouchableOpacity
                  style={{ marginRight: 20 }}
                  onPress={() => onAdd(cartItem.product)}
                >
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </S.Actions>
            </S.CartItem>
          )}
        />
      )}

      <S.Summary>
        <S.TotalContainer>
          {isEmpty ? (
            <Text color={theme.color.grey}>Seu carrinho está vazio</Text>
          ) : (
            <>
              <Text color={theme.color.grey}>Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          )}
        </S.TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={isEmpty}
          isLoading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </S.Summary>
    </>
  );
};
