import { FlatList, TouchableOpacity } from 'react-native';

import { Button } from '../Button';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { Text } from '../Text';
import { ICartItem } from '../../types';
import { formatCurrency } from '../../utils';

import * as S from './styles';

interface CartProps {
  items: ICartItem[];
}

export const Cart = ({ items }: CartProps) => {
  const isEmpty = items.length === 0;

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
                <TouchableOpacity style={{ marginRight: 20 }}>
                  <PlusCircle />
                </TouchableOpacity>

                <TouchableOpacity>
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
              <Text size={20} weight="600">{formatCurrency(120)}</Text>
            </>
          )}
        </S.TotalContainer>

        <Button disabled={isEmpty}>Confirmar Pedido</Button>
      </S.Summary>
    </>
  );
};
