export const APP_ROOT = 'https://note-taking-be.onrender.com/api/v1';

export const urls = {
  URL_NOTES: `${APP_ROOT}/note`,
  URL_LOGIN: `${APP_ROOT}/auth/login`,
};

export const globalViewStates = {
  DEFAULT: 'DEFAULT',
  LOADING: 'LOADING',
  POSTING: 'POSTING',
  ERROR: 'ERROR',
  DONE: 'DONE',
  REDIRECT_TO_PARENT: 'REDIRECT_TO_PARENT',
  REDIRECT: 'REDIRECT'
};

export const newNoteInitialForm = {
  title: '',
  content: '',
  labels: '',
};

export const loginInitialForm = {
  login: '',
  password: ''
};

export const noteTitleList = ['Title', 'Content', 'Labels', 'Actions'];
