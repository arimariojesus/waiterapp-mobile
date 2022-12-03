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
import { useWaiter, useCart } from '../hooks';
import { IProduct } from '../types';

import * as S from './styles';

export const Main = () => {
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);

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

  const { items, addItem, removeItem } = useCart();

  const handleAddToCart = (product: IProduct) => {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    addItem(product);
  };

  const handleRemoveCartItem = (product: IProduct) => {
    removeItem(product);
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
              items={items}
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
