import React, { useEffect, useState } from 'react';
import * as Toast from 'components/toast/Toastify';

import { globalViewStates } from 'constants/constant';
import InputField from 'components/forms/InputField';
import { newNoteInitialForm } from 'constants/constant';
import { Navigate, useLocation } from 'react-router-dom';
import { urls } from 'constants/constant';
import { request } from 'axios-helper';

const NoteNew = () => {
  const [viewState, setViewState] = useState(globalViewStates.IDLE);
  const [apiUrl] = useState(urls.URL_NOTES);
  const [formModel, setFormModel] = useState(newNoteInitialForm);
  const [formErrorModel, setFormErrorModel] = useState({
    title: false,
    content: false,
    labels: false,
  });

  const { state } = useLocation();
  const { updatingData } = state ? state : '';

  useEffect(() => {
    updatingData &&
      setFormModel({
        ...formModel,
        title: updatingData.title,
        content: updatingData.content,
        labels: updatingData.labels && JSON.parse(updatingData.labels)[0] //TODO: To improve
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
    setFormModel(newNoteInitialForm);
  };

  const onFormSubmit = (updatingData, e) => {
    e.preventDefault();

    const obj = {
      title: updatingData ? false : formModel.title?.trim() === '',
      content: updatingData ? false : formModel.content?.trim() === '',
      labels: updatingData ? false : formModel.labels?.trim() === '',
    };

    setFormErrorModel(obj);

    if (Object.values(obj).includes(true)) {
      Toast.error('Please fill the required areas!');
      return;
    } else {
      updatingData ? onFormSave(updatingData) : onFormSave();
    }
  };

  const onFormSave = async (updatingData) => {
    try {
      setViewState(globalViewStates.POSTING);

      const { success: successAdd } = await sendAddOrUpdateRequest(apiUrl, formModel, updatingData?.id);

      if (!successAdd) {
        Toast.error(`There was a problem ${updatingData ? 'updating' : 'saving'} your data. Please try again later.`);
        setViewState(globalViewStates.IDLE);
        return;
      } else {
        setViewState(globalViewStates.REDIRECT_TO_PARENT);
        updatingData ? Toast.success(`Updated successfully`) : Toast.success('New note added');
      }
    } catch (ex) {
      Toast.error(`There was a problem ${updatingData ? 'updating' : 'saving'} your data. Please try again later.`);
      setViewState(globalViewStates.IDLE);
    }
  };

  const sendAddOrUpdateRequest = async (apiUrl, formModel, itemID) => {
    // debugger
    try {
      let result;
        if (itemID) {
          formModel.labels = formModel.labels ? [formModel.labels] : undefined;
          formModel.noteId = itemID;
          result = await request('PUT', `${apiUrl}`, formModel); 
        } else {
          formModel.labels = formModel.labels ? [formModel.labels] : undefined;
          result = await request('POST', apiUrl, formModel);
        }

      if (result && result.data) {
        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };

  if (viewState === globalViewStates.REDIRECT_TO_PARENT) {
    return <Navigate to="/notes" />;
  }

  return (
    <div className="new-rest container mx-auto">
      <div className="my-2 py-2 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 shadow sm:rounded-lg ">
          <h2 className="font-bold text-base mt-3 mb-10 text-center">
            {updatingData ? 'UPDATE NOTE' : 'ADD NEW NOTE'}
          </h2>

          <form>
            <div className="flex flex-col gap-6">
              <InputField 
                name="title"
                id="title"
                label={'Note Title'}
                placeholder=""
                maxLength="32"
                required
                value={formModel.title}
                onChange={(e) => {
                  onChangeInput(e);
                }}
              />

              <InputField 
                name="content"
                id="content"
                label={'Note Content'}
                placeholder=""
                maxLength="300"
                required
                value={formModel.content}
                onChange={(e) => {
                  onChangeInput(e);
                }}
              />

              <InputField 
                name="labels"
                id="labels"
                label={'Labels'}
                placeholder=""
                maxLength="32"
                value={formModel.labels}
                onChange={(e) => {
                  onChangeInput(e);
                }}
              />

              <div className="flex justify-center">
                <button type="button" className="btn btn-basic" onClick={() => clearForm()}>
                  Clear
                </button>

                <button type="button" className="btn btn-primary ml-5" onClick={(e) => onFormSubmit(updatingData, e)}>
                  {updatingData ? 'Update' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteNew;
