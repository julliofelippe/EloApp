import { Box, Button, Center, CheckIcon, Modal, Select } from 'native-base';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UseFormSetValue } from 'react-hook-form';

type ModalTextProps = {
  onSelect: UseFormSetValue<any>;
  fieldName: string;
};

export default function ModalText({ onSelect, fieldName }: ModalTextProps) {
  const [showModal, setShowModal] = useState(false);
  const [select, setSelect] = useState('');
  const handleSelect = (itemValue) => {
    setSelect(itemValue);
    onSelect(fieldName, itemValue);
  };
  return (
    <Center>
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <Box alignItems="center" justifyContent="center" mx={3}>
          <FontAwesome name="search" size={24} color="black" />
        </Box>
      </TouchableOpacity>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        _backdrop={{
          _dark: {
            bg: 'coolGray.800'
          },
          bg: 'warmGray.50'
        }}
      >
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>Nome do Cliente</Modal.Header>
          <Modal.Body>
            <Center>
              <Box maxW="300">
                <Select
                  selectedValue={select}
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Escolha o Nome"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />
                  }}
                  mt={1}
                  onValueChange={(itemValue) => handleSelect(itemValue)}
                >
                  <Select.Item label="UX Research" value="ux" />
                  <Select.Item label="Web Development" value="web" />
                  <Select.Item
                    label="Cross Platform Development"
                    value="cross"
                  />
                  <Select.Item label="UI Designing" value="ui" />
                  <Select.Item label="Backend Development" value="backend" />
                </Select>
              </Box>
            </Center>
            ;
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Salvar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
