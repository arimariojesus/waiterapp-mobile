import { FlatList, Modal } from 'react-native';

import { Button } from '../Button';
import { Text } from '../Text';
import { Close } from '../Icons';
import { baseURL } from '../../services/api';
import { IProduct } from '../../types/product';
import { formatCurrency, getAssetsURI } from '../../utils';

import * as S from './styles';
import { useTheme } from '../../hooks';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  product: IProduct | null;
  onAddToCart: (product: IProduct) => void;
}

export const ProductModal = (props: ProductModalProps) => {
  const { visible, onClose, product, onAddToCart } = props;

  const { theme } = useTheme();

  if (!product) {
    return null;
  }

  function handleAddToCart() {
    onAddToCart(product!);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <S.Image
        source={{
          uri: getAssetsURI(baseURL, product.imagePath),
        }}
      >
        <S.CloseButton onPress={onClose}>
          <Close />
        </S.CloseButton>
      </S.Image>

      <S.ModalBody>
        <S.Header>
          <Text size={24} weight="600">
            {product.name}
          </Text>
          <Text color={theme.color.grey} style={{ marginTop: 8 }}>
            {product.description}
          </Text>
        </S.Header>

        {product.ingredients.length > 0 && (
          <S.IngredientsContainer>
            <Text weight="600" color={theme.color.grey}>
              Ingredientes
            </Text>

            <FlatList
              data={product.ingredients}
              showsVerticalScrollIndicator={false}
              style={{ marginTop: 16 }}
              keyExtractor={ingredient => ingredient._id}
              renderItem={({ item: ingredient }) => (
                <S.Ingredient>
                  <Text>{ingredient.icon}</Text>
                  <Text
                    size={14}
                    color={theme.color.grey}
                    style={{ marginLeft: 20 }}
                  >
                    {ingredient.name}
                  </Text>
                </S.Ingredient>
              )}
            />
          </S.IngredientsContainer>
        )}
      </S.ModalBody>

      <S.Footer>
        <S.FooterContainer>
          <S.PriceContainer>
            <Text color={theme.color.grey}>Preço</Text>
            <Text size={20} weight="600">
              {formatCurrency(product.price)}
            </Text>
          </S.PriceContainer>

          <Button onPress={handleAddToCart}>Adicionar ao pedido</Button>
        </S.FooterContainer>
      </S.Footer>
    </Modal>
  );
};
