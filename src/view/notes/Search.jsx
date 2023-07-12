import React, { useEffect, useState } from 'react';
import * as Toast from 'components/toast/Toastify';
import { Navigate, useLocation } from 'react-router-dom';

import { request } from 'axios-helper';

import { globalViewStates, noteTitleList } from 'constants/constant';
import { searchInitialForm } from 'constants/constant';
import { urls } from 'constants/constant';

import Loading from 'components/loading/Loading';
import Table from 'components/table/Table';
import InputField from 'components/forms/InputField';

const Search = () => {
  const [viewState, setViewState] = useState(globalViewStates.IDLE);
  const [apiUrl] = useState(urls.URL_NOTES_SEARCH);
  const [formModel, setFormModel] = useState(searchInitialForm);
  const [formErrorModel, setFormErrorModel] = useState({
    text: false,
  });

  const { state } = useLocation();
  const { updatingData } = state ? state : '';

  const [searchData, setSearchData] = useState();

  let [containsText, setContainsText] = useState('');

  useEffect(() => {
    updatingData &&
      setFormModel({
        ...formModel,
        text: updatingData.text
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
    setFormModel(searchInitialForm);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const obj = {
      text: formModel.text.trim() === '',
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
      setViewState(globalViewStates.LOADING);

      const { success: successAdd } = await sendAddOrUpdateRequest(apiUrl, formModel, updatingData?.id);

      if (!successAdd) {
        Toast.error(`There was a problem. Please try again later.`);
        setViewState(globalViewStates.IDLE);
        return;
      } else {
        setViewState(globalViewStates.REDIRECT_TO_PARENT);
        Toast.success('Search was successful');
      }
    } catch (ex) {
      Toast.error(`There was a problem. Please try again later.`);
      setViewState(globalViewStates.IDLE);
    }
  };

  const sendAddOrUpdateRequest = async (apiUrl, formModel) => {

    try {
      const result = await request('POST', apiUrl, formModel); 
       
      if (result && result.data) {
          const r = result.data.map((r) => {
          const labels = r.labels?.map((l) => {
            return l.name;
          });

          return {
            id: String(r.noteId),
            title: r.title,
            content: r.content,
            labels: JSON.stringify(labels)
          }
        })

        setSearchData(r);

        return { success: true };
      }

      return { success: false };
    } catch (e) {
      console.log(e);
      return { success: false };
    }
  };


  // if (viewState === globalViewStates.REDIRECT_TO_PARENT) {
  //   return <Navigate to="/notes" />;
  // }

  if (viewState === globalViewStates.LOADING) {
    return <Loading />;
  }

  return (
    <div className="new-rest container mx-auto">
      <div className="my-2 py-2 max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 shadow sm:rounded-lg ">
          <h2 className="font-bold text-base mt-3 mb-10 text-center">
            Search
          </h2>

          <form>
            <div className="flex flex-col gap-6">
              <InputField 
                name="text"
                id="text"
                label={'What do you wish to search for'}
                placeholder=""
                maxLength="255"
                value={formModel.text}
                onChange={(e) => {
                  onChangeInput(e);
                }}
              />

              <div className="flex justify-center mb-8">
                <button type="button" className="btn btn-basic" onClick={() => clearForm()}>
                  Clear
                </button>

                <button type="button" className="btn btn-primary ml-5" onClick={(e) => onFormSubmit(e)}>
                  Search
                </button>
              </div>
            </div>
          </form>

          {searchData && (
            <Table
              list={searchData}
              titleList={noteTitleList}
              containsText={containsText}
              setContainsText={setContainsText}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
