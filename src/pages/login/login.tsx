import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormProvider, useForm } from 'react-hook-form';
import CustomTextInput from '../../components/input/input';
import { useAuth } from '../../hooks/auth';

interface SignInFormData {
  cpf: string;
  password: string;
}

const SignIn: React.FC = () => {
  const test = useAuth();
  const navigate = useNavigate()

  const handleSignIn = async ({ cpf, password }: SignInFormData) => {
    try {
      await test.signIn({
        cpf,
        password
      });

    } catch (err) {
      console.log(err)
      alert('Ocorreu um erro ao fazer login, cheque as credenciais.')
    }
  };

  const navigateToForgotPass = useCallback(() => {
    navigate('ForgotPass');
  }, [navigate])


  const methods = useForm({
    defaultValues: {
      cpf: '',
      password: '',
    },
  });

  return (
    <>
      <div className="container">

        <div className="logo">
          <img src={"./assets/images/logo.png"} alt="Logo" />
        </div>
        <div className="title"> Contracheque Fênix </div>
        <div className="subtitle">Faça seu logon </div>
        <FormProvider {...methods} >
          <form onSubmit={methods.handleSubmit(handleSignIn)} className='header--form'>
            <CustomTextInput name="cpf" label="CPF" type="text" />
            <CustomTextInput name="password" label="Senha" type="password" />
            <button type="submit">
              <FontAwesomeIcon icon={faUser} />
              <span>Acessar</span>
            </button>
            <button onClick={navigateToForgotPass}>Esqueci minha senha</button>
          </form>
        </FormProvider>
      </div>



    </>
  )


}

export default SignIn