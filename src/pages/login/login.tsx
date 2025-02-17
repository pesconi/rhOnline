import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Controller, ControllerRenderProps, FormProvider, useForm } from 'react-hook-form';
import CustomTextInput from '../../components/input/input';
import { useMask } from '@react-input/mask';
import { ICredentials } from '../../hooks/useAuth';



interface LoginPros {
  handleSignIn: (credentials: ICredentials) => Promise<void>
}

const Login: React.FC<LoginPros> = ({ handleSignIn }) => {

  useEffect(() => {
    localStorage.getItem('user') ? navigate('/contracheque') : null
  }, [])

  const navigate = useNavigate()

  const onSubmit = useCallback(async (data: ICredentials) => {
    try {
      await handleSignIn(data);
      navigate('/contracheque');
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  }, [handleSignIn, navigate]);

  const navigateToForgotPass = useCallback(() => {
    navigate('/ForgotPass');
  }, [navigate])


  const methods = useForm({
    defaultValues: {
      user: '',
      password: '',
      cd_cliente: Number(localStorage.getItem('cd_cliente')) || 0,
    },
  });

  const inputRef = useMask({
    mask: '___.___.___-__', // mask pattern
    replacement: { _: /\d/ },

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
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Controller
              name="user"
              control={methods.control}
              render={({ field }) => (
                <CustomTextInput
                  field={field}
                  label="Usuário"
                  type="text"
                  inputRef={inputRef}
                />
              )}
            />
            <Controller
              name="password"
              control={methods.control}
              render={({ field }) => (
                <CustomTextInput
                  field={field}
                  label="Senha"
                  type="password"
                />
              )}
            />
            <Controller
              name="cd_cliente"
              control={methods.control}
              render={({ field }) => (
                <CustomTextInput
                  field={field}
                  label=""
                  type="hidden"
                />
              )}
            />
            <button type="submit">
              <FontAwesomeIcon icon={faUser} />
              <span>Acessar</span>
            </button>
            <button type="button" onClick={navigateToForgotPass}>Esqueci minha senha</button>
          </form>
        </FormProvider>
      </div >



    </>
  )


}

export default Login