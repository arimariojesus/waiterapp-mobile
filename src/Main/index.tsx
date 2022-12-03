import { useState } from 'react';
import { ActivityIndicator } from 'react-native';

import { Button } from '../components/Button';
import { Cart } from '../components/Cart';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Empty } from '../components/Icons/Empty';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';
import { Text } from '../components/Text';
import { useWaiter } from '../hooks';
import { ICartItem, IProduct } from '../types';

import * as S from './styles';

export const Main = () => {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const {
    isLoading,
    isLoadingProducts,
    selectedTable,
    products,
    categories,
    handleSelectCategory,
    handleSaveTable,
    handleResetOrder,
  } = useWaiter();

  const handleAddToCart = (product: IProduct) => {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems(_cartItems => {
      const itemIndex = _cartItems.findIndex(
        item => item.product._id === product._id,
      );

      if (itemIndex < 0) {
        return _cartItems.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [..._cartItems];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        quantity: item.quantity + 1,
        product,
      };

      return newCartItems;
    });
  };

  const handleRemoveCartItem = (product: IProduct) => {
    setCartItems(_cartItems => {
      const itemIndex = _cartItems.findIndex(
        item => item.product._id === product._id,
      );
      const newCartItems = [..._cartItems];
      const quantity = newCartItems[itemIndex]?.quantity ?? 0;

      if (quantity <= 1) {
        newCartItems.splice(itemIndex, 1);
      } else {
        newCartItems[itemIndex] = {
          quantity: quantity - 1,
          product,
        };
      }

      return newCartItems;
    });
  };

  return (
    <>
      <S.Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading ? (
          <S.CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </S.CenteredContainer>
        ) : (
          <>
            <S.CategoriesContainer>
              <Categories
                categories={categories}
                onSelectCategory={handleSelectCategory}
              />
            </S.CategoriesContainer>

            {isLoadingProducts ? (
              <S.CenteredContainer>
                <ActivityIndicator color="#d73035" size="large" />
              </S.CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <S.MenuContainer>
                    <Menu onAddToCart={handleAddToCart} products={products} />
                  </S.MenuContainer>
                ) : (
                  <S.CenteredContainer>
                    <Empty />
                    <Text color="#664" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </S.CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </S.Container>
      <S.Footer>
        <S.FooterContainer>
          {!selectedTable ? (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          ) : (
            <Cart
              items={cartItems}
              onAdd={handleAddToCart}
              onDecrement={handleRemoveCartItem}
              onConfirmOrder={handleResetOrder}
              selectedTable={selectedTable}
            />
          )}
        </S.FooterContainer>
      </S.Footer>

      <TableModal
        visible={isTableModalVisible}
        onClose={() => setIsTableModalVisible(false)}
        onSave={handleSaveTable}
      />
    </>
  );
};
