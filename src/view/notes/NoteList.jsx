import React, { useEffect, useState } from 'react';
import { globalViewStates } from 'constants/constant';
import Loading from 'components/loading/Loading';
import * as Toast from 'components/toast/Toastify';

import PageHeader from 'components/layout/PageHeader';
import Table from 'components/table/Table';
import { useNavigate } from 'react-router-dom';

import { urls, noteTitleList } from 'constants/constant';
import { request } from 'axios-helper';

const NoteList = () => {
  const [viewState, setViewState] = useState(globalViewStates.LOADING);
  const [apiUrl] = useState(urls.URL_NOTES);
  const [noteList, setNoteList] = useState([]); 

  // search
  let [containsText, setContainsText] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const onDeleteClick = (item) => {
    alert("Are you sure you want to delete this note?")
    if (!item.id) {
      return;
    }

    setViewState(globalViewStates.EXECUTING);
    sendDeleteRequest(apiUrl, item.id).then(
      () => {
        const newNodeList = noteList.filter((d) => d.id !== item.id);

        setNoteList(newNodeList);
        setViewState(globalViewStates.DONE);
        Toast.success(`${item.title} was deleted.`);
      },
      (err) => {
        console.log(err);
        setViewState(globalViewStates.DONE);
        Toast.error('There was a problem. Please try again!');
      }
    );
  };

  // Delete Item
  const sendDeleteRequest = async (apiUrl, id) => {
    try { 
      const result = await request('DELETE', `${apiUrl}/${id}`);

      void result;

      return { success: true };
    } catch (ex) {
      console.log(ex);
      return { success: false };
    }
  };

  // Get Data
  const getData = async() => {
      const result =
          await request("GET", apiUrl);

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

      setNoteList(r);
      setViewState(globalViewStates.DONE);
    }
  };

  const onUpdateClick = (updatingData) => {
    navigate('/notes/new', { state: { updatingData } });
  };

  if (viewState === globalViewStates.LOADING) {
    return <Loading />;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <PageHeader title={'Note List'} buttonName="New" buttonPath="/notes/new" />

      <Table
        list={noteList}
        titleList={noteTitleList}
        onUpdateClick={onUpdateClick}
        onDeleteClick={onDeleteClick}
        containsText={containsText}
        setContainsText={setContainsText}
      />
    </div>
  );
};

export default NoteList;
