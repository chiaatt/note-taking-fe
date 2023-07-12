import React, { useEffect, useState } from 'react';
import * as Toast from 'components/toast/Toastify';

import { globalViewStates } from 'constants/constant';
import InputField from 'components/forms/InputField';
import { loginInitialForm } from 'constants/constant';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { urls } from 'constants/constant';
import { request, setAuthToken } from 'axios-helper';

const Login = () => {
  const [viewState, setViewState] = useState(globalViewStates.IDLE);
  const [apiUrl] = useState(urls.URL_LOGIN);
  const [formModel, setFormModel] = useState(loginInitialForm);
  const [formErrorModel, setFormErrorModel] = useState({
    login: false,
    password: false
  });

  const { state } = useLocation();
  const { updatingData } = state ? state : '';

  const navigate = useNavigate();

  useEffect(() => {
    updatingData &&
      setFormModel({
        ...formModel,
        login: updatingData.login,
        password: updatingData.password
      });
  }, [updatingData]);

  //Change Input
   const onChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormModel({
      ...formModel,
      [name]: value
    });
  };

  // clear form
  const clearForm = () => {
    setFormModel(loginInitialForm);
  };

  const onFormSubmit = (updatingData, e) => {
    e.preventDefault();

    const obj = {
      login: formModel.login.trim() === '',
      password: formModel.password.trim() === '',
    };

    setFormErrorModel(obj);

    if (Object.values(obj).includes(true)) {
      Toast.error('Please fill the required areas!');
      return;
    } else {
      onFormSave();
    }
  };

  const onFormSave = async (updatingData) => {
    try {
      setViewState(globalViewStates.POSTING);

      const { success: successAdd } = await login(apiUrl, formModel);

      if (!successAdd) {
        Toast.error(`There was a problem with login. Please try again later.`);
        setViewState(globalViewStates.IDLE);
        return;
      } else {
        setViewState(globalViewStates.REDIRECT_TO_PARENT);
         Toast.success('Login Successful');
      }
    } catch (ex) {
      Toast.error(`There was a problem with login. Please try again later.`);
      setViewState(globalViewStates.IDLE);
    }
  };

  const login = async (apiUrl, formModel) => {
    try {
      const result =
           await request("POST", apiUrl, formModel);

      if (result && result.data) {
        setAuthToken(result.data.token);

        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  if (viewState === globalViewStates.REDIRECT_TO_PARENT) {
    window.location.href = "/notes";
    // return <Navigate to="/notes" />;
  }

  return (
    <div className="new-rest container mx-auto">
      <div className="my-2 py-2 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 shadow sm:rounded-lg ">
          <h2 className="font-bold text-base mt-3 mb-10 text-center">
            Login to Note Taking App
          </h2>

          <form>
            <div className="flex flex-col gap-6">
              <InputField 
                name="login"
                id="login"
                label={'Username'}
                placeholder=""
                maxLength="250"
                required
                value={formModel.login}
                onChange={(e) => {
                  onChangeInput(e);
                }}
              />

              <InputField 
                name="password"
                id="password"
                label={'Password'}
                type="password"
                placeholder=""
                maxLength="250"
                required
                value={formModel.password}
                onChange={(e) => {
                  onChangeInput(e);
                }}
              />

              <div className="flex justify-center">
                <button type="button" className="btn btn-basic" onClick={() => clearForm()}>
                  Clear
                </button>

                <button type="button" className="btn btn-primary ml-5" onClick={(e) => onFormSubmit(updatingData, e)}>
                 Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
