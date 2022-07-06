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

const validateForm = data => {
  const errors = {};
  const keys = Object.entries(data);
  const filterKeys = keys.filter(arr => !arr.includes('id'));

  filterKeys.forEach(([key, value]) => {
    if (!value) {
      errors[key] = 'Required';
    }
  });

  return errors;
};

const UserForm = ({
  onSendForm,
  onCloseModal,
  currentUser,
  successMessage,
}) => {
  const [userData, setUserData] = useState(initialUserData);
  // const [errors, setErrors] = useState({});
  const [errors, setErrors] = useState(initialUserData);

  console.log(errors, 'errors');

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  const handleFormSubmit = e => {
    e.preventDefault();

    const submitErrors = validateForm(userData);

    if (Object.keys(submitErrors).length) {
      setErrors(submitErrors);
      return;
    }

    // const isShouldPreventSubmit = Object.entries(submitErrors)
    //   .map(([key, value]) => {
    //     if (!value) {
    //       return '';
    //     }
    //     return key;
    //   })
    //   .filter(Boolean).length;

    // if (isShouldPreventSubmit) {
    //   setErrors(submitErrors);
    //   return;
    // }

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
