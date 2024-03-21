import { VStack, Heading } from 'native-base';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Input from '../components/Input';
import Button from '../components/Button';

type FormDataProps = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

const signUpSchema = yup.object({
  name: yup.string().required('Informe o nome'),
  email: yup.string().required('Informe o E-mail').email('E-mail inválido'),
  password: yup
    .string()
    .required('Informe a Senha')
    .min(6, 'A senha deve conter no mínimo 6 caracteres'),
  passwordConfirm: yup
    .string()
    .required('Confirme a senha')
    .min(6, 'A senha deve conter no mínimo 6 caracteres')
    .oneOf([yup.ref('password'), null], 'As senhas devem ser iguais')
});

export default function SignUp() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormDataProps>({
    resolver: yupResolver(signUpSchema)
  });

  function handleSignUp(data: FormDataProps) {
    console.log(data);
  }

  return (
    <VStack bgColor="gray.200" flex={1} alignItems="center" px={8}>
      <Heading my={24}>Crie Sua Conta</Heading>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange } }) => (
          <Input
            placeholder="Nome"
            onChangeText={onChange}
            errorText={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange } }) => (
          <Input
            placeholder="E-mail"
            onChangeText={onChange}
            errorText={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange } }) => (
          <Input
            placeholder="Senha"
            secureTextEntry
            onChangeText={onChange}
            errorText={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="passwordConfirm"
        render={({ field: { onChange } }) => (
          <Input
            placeholder="Confirme a senha"
            secureTextEntry
            onChangeText={onChange}
            errorText={errors.passwordConfirm?.message}
          />
        )}
      />
      <Button text="Cadastrar" onPress={handleSubmit(handleSignUp)} />
    </VStack>
  );
}
