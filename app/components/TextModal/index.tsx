import { Box, Button, Center, CheckIcon, Modal, Select } from 'native-base';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UseFormSetValue } from 'react-hook-form';

type ModalTextProps = {
  onSelect: UseFormSetValue<any>;
  fieldName: string;
  fieldHeader: string;
  fieldArray: any;
};

export default function ModalText({
  onSelect,
  fieldName,
  fieldArray,
  fieldHeader
}: ModalTextProps) {
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
          <Modal.Header>{fieldHeader}</Modal.Header>
          <Modal.Body>
            <Center>
              <Box maxW="300">
                <Select
                  selectedValue={select}
                  minWidth="200"
                  accessibilityLabel="Choose"
                  placeholder="Selecione"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size="5" />
                  }}
                  mt={1}
                  onValueChange={(itemValue) => handleSelect(itemValue)}
                >
                  {fieldArray.map((item, index) => {
                    return (
                      <Select.Item
                        label={item.label}
                        value={item.value}
                        key={index}
                      />
                    );
                  })}
                </Select>
              </Box>
            </Center>
            ;
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              {/* <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancelar
              </Button> */}
              <Button
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Confirmar
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
