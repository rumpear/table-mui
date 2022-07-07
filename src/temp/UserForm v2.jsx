import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { tableHeadData } from '../Table';
import { Button, Input } from '../ui/';

import './styles.scss';

const initialUserData = {
  id: '',
  name: '',
  username: '',
  email: '',
  city: '',
  phone: '',
};

const validateForm = (data, setErrors) => {
  const errors = {};
  const keys = Object.entries(data);
  const filterKeys = keys.filter(arr => !arr.includes('id'));

  filterKeys.forEach(([key, value]) => {
    if (!value) {
      errors[key] = 'Required';
    }
  });

  if (Object.entries(errors).length) {
    setErrors(errors);
  }
};

const UserForm = ({
  onSendForm,
  onCloseModal,
  currentUser,
  successMessage,
}) => {
  const [userData, setUserData] = useState(initialUserData);
  const [errors, setErrors] = useState({});
  // const [errors, setErrors] = useState(initialUserData);

  console.log(errors, 'errors');

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  const handleFormSubmit = e => {
    e.preventDefault();

    validateForm(userData, setErrors);

    console.log('errors', errors);
    console.log('Object.keys(errors).length', Object.keys(errors).length);

    // if (Object.keys(errors).length) {
    //   return;
    // }

    if (errors) {
      return;
    }

    onSendForm(userData);
    resetForm();
    onCloseModal();
    // alert(successMessage);
  };

  const resetForm = () => {
    setUserData(initialUserData);
  };

  const handleInputChange = useCallback((e, type) => {
    setErrors(prev => {
      return { ...prev, [type]: '' };
    });
    setUserData(prev => {
      return {
        ...prev,
        [type]: e.target.value,
      };
    });
  }, []);

  return (
    <form className="UserForm" onSubmit={handleFormSubmit}>
      {tableHeadData.map(({ id, type, title }) => {
        if (type === 'actions') {
          return type === null;
        }
        return (
          <Input
            key={id}
            label={title}
            name={type}
            className="UserForm-input"
            placeholder={`Please enter your ${type}`}
            value={userData[type]}
            error={errors[type]}
            onChange={e => handleInputChange(e, type)}
            onBlur={() => validateForm(userData, setErrors)}
          />
        );
      })}

      <Button type="submit" title="Submit" />
    </form>
  );
};

export default UserForm;

UserForm.propTypes = {
  onSendForm: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  successMessage: PropTypes.string,
};
