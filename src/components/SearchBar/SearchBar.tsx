import { Formik, Field, Form } from 'formik';
import toast, { Toaster } from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SeachBar({ onSearch }: SearchBarProps) {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          if (values.query === '') {
            toast.error('Please fill the form!');
            return;
          }
          onSearch(values.query);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit">
            Search
          </button>
          <Toaster position="top-right" />
        </Form>
      </Formik>
    </header>
  );
}
