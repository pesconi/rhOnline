import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import CustomTextInput from '../../components/input/input';
import { useMask } from '@react-input/mask';
import { ICredentials, ILoginResponse, IUser } from '../../hooks/useAuth';
import api from '../../services/api';



interface LoginPros {
  handleSignIn: (credentials: ICredentials) => Promise<ILoginResponse>
}

const Login: React.FC<LoginPros> = ({ handleSignIn }) => {
  const user: IUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '') : null;
  const cd_cliente = localStorage.getItem('cd_cliente');
  const clienteNome = localStorage.getItem('cliente');

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<String>('');

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const navigate = useNavigate()

  const onSubmit = async (data: ICredentials) => {
    setError("")
    setLoading(true);
    try {
      await handleSignIn(data)
    } catch (error) {
      console.log(error);
      setError('Erro ao realizar login, verifique suas credenciais e tente novamente.');
      setLoading(false);
      return;
    }

    if (error) {
      return;
    }
    setLoading(false);
    navigate('/contracheque');
  }

  const navigateToForgotPass = useCallback(() => {
    navigate('/ForgotPass');
  }, [navigate])


  const methods = useForm({
    defaultValues: {
      cpf: '',
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
          <div className="title">{`${clienteNome}`} </div>
        </div>

        {cd_cliente ? (
          <FormProvider {...methods} >
            <form onSubmit={methods.handleSubmit(onSubmit)} className='form__login'>
              <Controller
                name="cpf"
                control={methods.control}
                render={({ field }) => (
                  <CustomTextInput
                    field={field}
                    label="CPF (somente números)"
                    type="text"
                    inputRef={inputRef}
                    customClassName='input__flex'
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
                    customClassName='input__flex'
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
                    customClassName='custom_text_input__hidden'
                  />
                )}
              />
              {error && <div className="error">{error}</div>}
              <div className="button__container">
                <button type="button" className='button__forgot' onClick={navigateToForgotPass} >Esqueci minha senha</button>
                <button type="submit" className='button__login' disabled={methods.formState.isSubmitting}>
                  {loading ? (
                    <span className="loader"></span>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faUser} />
                      <span>Acessar</span>
                    </>
                  )}
                </button>

              </div>
            </form>
          </FormProvider>

        ) : (
          <div className="error">
            <h1>Cliente não encontrado</h1>
            <p>Verifique se a URL está correta, caso esteja entre em contato com o Órgão.</p>
          </div>
        )}

      </div >



    </>
  )


}

export default Login