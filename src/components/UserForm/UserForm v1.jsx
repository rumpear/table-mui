import PropTypes from 'prop-types';
import { useCallback, useEffect, useState, useRef } from 'react';
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

const validate = data => {
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
  const ref = useRef();
  const [userData, setUserData] = useState(initialUserData);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setUserData(currentUser);
    }
  }, [currentUser]);

  const handleFormSubmit = e => {
    e.preventDefault();
    ref.current = true;

    const validateErrors = validate(userData);
    if (Object.entries(validateErrors).length) {
      setErrors(validateErrors);
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
    const { value } = e.target;

    setErrors(prev => {
      if (!value && ref.current) {
        return { ...prev, [type]: 'Required' };
      }
      return { ...prev, [type]: '' };
    });

    setUserData(prev => {
      return {
        ...prev,
        [type]: value,
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
