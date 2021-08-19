import { useState, useRef } from 'react';
import Card from '../UI/Card';
import ErrorModal from '../UI/ErrorModal';
import styles from './AddUser.module.css';
import Button from '../UI/Button';
import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {
  const nameInputRef = useRef();
  const ageInputRef = useRef();
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredFullName = nameInputRef.current.value;
    const enteredFullAge = ageInputRef.current.value;
    if (
      enteredFullName.trim().length === 0 ||
      enteredFullAge.trim().length === 0
    ) {
      setError({
        title: 'Invalid Input',
        message: 'Please Enter A Valid Name and Age',
      });
      return;
    }
    if (+enteredFullAge < 1) {
      setError({
        title: 'Invalid Age',
        message: 'Please enter a valid age (>0)',
      });
      return;
    }
    props.onAddUser(enteredFullName, enteredFullAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}{' '}
      <Card className={styles.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input id="username" type="text" ref={nameInputRef} />
          <label htmlFor="age">Age</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;
