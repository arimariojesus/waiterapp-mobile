import { FlatList, TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { ICartItem, IProduct } from '../../types';
import { formatCurrency, getTotalPrice } from '../../utils';

import * as S from './styles';

interface CartProps {
  items: ICartItem[];
  onAdd: (product: IProduct) => void;
  onDecrement: (product: IProduct) => void;
}

export const Cart = ({ items, onAdd, onDecrement }: CartProps) => {
  const isEmpty = items.length === 0;
  const total = getTotalPrice(items);

  return (
    <>
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
                    uri: `http://10.0.2.2:3333/uploads/${cartItem.product.imagePath}`,
                  }}
                />

                <S.QuantityContainer>
                  <Text size={14} color="#664">
                    {cartItem.quantity}x
                  </Text>
                </S.QuantityContainer>

                <S.ProductDetails>
                  <Text size={14} weight="600">
                    {cartItem.product.name}
                  </Text>
                  <Text size={14} color="#664">
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
            <Text color="#664">Seu carrinho está vazio</Text>
          ) : (
            <>
              <Text color="#664">Total</Text>
              <Text size={20} weight="600">
                {formatCurrency(total)}
              </Text>
            </>
          )}
        </S.TotalContainer>

        <Button disabled={isEmpty}>Confirmar Pedido</Button>
      </S.Summary>
    </>
  );
};
