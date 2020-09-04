import React, { useMemo, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classNames from 'classnames';
import shortid from 'shortid';
import Icon from '../icon';

enum Types {
  CHECKBOX = 'checkbox',
  RADIO = 'radio',
}

const CHECKBOX_STATES = {
  CHECKED: 'on',
  INDETERMINATE: 'indeterminate',
  UNCHECKED: 'off',
};

const LABEL_PLACEMENTS = {
  TOP: 'top',
  RIGHT: 'right',
  BOTTOM: 'bottom',
  LEFT: 'left',
};

const Input = styled.input`
  // Hide the input without using 'display:none'.
  // Otherwise it will hide the checkbox from both browser and assistive technology (AT) users,
  // and we would also lose keyboard interactions.
  cursor: inherit;
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
`;

const GlobalContainer = styled.div`
  display: inline-block;
`;

const CheckboxComponent = styled.div`
  display: flex;
  align-items: center;
  &.tk-checkbox__labelPlacement {
    &--top {
      flex-direction: column-reverse;
    }
    &--left {
      flex-direction: row-reverse;
    }
    &--bottom {
      flex-direction: column;
    }
  }
`;

const IconContainer = styled.span`
  cursor: pointer;
  position: relative;
`;

const Common = ({
  id,
  type,
  label,
  name,
  value,
  checkedState,
  required,
  tabIndex,
  labelPlacement,
  handleClick = (event) => {},
  handleChange = (event) => {},
  disabled,
}) => {
  const memoizedId = useMemo(() => {
    // Generate unique ID
    return id || `${type}-${shortid.generate()}`;
  }, [id]);

  const [isFocused, setFocus] = useState(false);

  const iconType = type === 'radio' ? 'radio-button' : type;

  useEffect(() => {
    const keyPressHandler = (event) => {
      // Space key (https://www.w3.org/TR/uievents/#fixed-virtual-key-codes)
      // Space code (https://w3c.github.io/uievents-code/) Not supported on IE
      if (
        !disabled &&
        isFocused &&
        (event.code === 'Space' || event.keyCode === 32)
      ) {
        handleClick(event);
        event.preventDefault();
      }
    };
    window.addEventListener('keydown', keyPressHandler);
    return () => {
      window.removeEventListener('keydown', keyPressHandler);
    };
  }, [isFocused, handleClick]);

  const memoizeOnClick = useCallback(
    (event) => {
      if (!disabled) {
        handleClick(event);
      }
    },
    [disabled, handleClick]
  );

  const memoizeOnChange = useCallback(
    (event) => {
      if (!disabled) {
        handleChange(event);
      }
    },
    [disabled, handleChange]
  );

  const onFocusHandler = (e) => {
    setFocus(true);
  };

  const onBlurHandler = (e) => {
    setFocus(false);
  };

  return (
    <GlobalContainer>
      <CheckboxComponent
        className={classNames(
          'tk-checkbox',
          `tk-checkbox__labelPlacement--${labelPlacement}`,
          {
            'tk-checkbox--checked': checkedState !== CHECKBOX_STATES.UNCHECKED,
            'tk-checkbox--disabled': disabled,
            'tk-checkbox--focused': isFocused,
          }
        )}
        tabIndex={tabIndex || 0}
        onFocus={onFocusHandler}
        onBlur={onBlurHandler}
      >
        <IconContainer className="tk-checkbox__icon" tab-index="-1">
          <Input
            type={type}
            id={memoizedId}
            name={name}
            value={value}
            checked={checkedState === CHECKBOX_STATES.CHECKED}
            required={required}
            disabled={disabled}
            onClick={memoizeOnClick}
            onChange={memoizeOnChange}
            tabIndex={-1}
          />
          <Icon iconName={`${iconType}-${checkedState}`} aria-hidden />
        </IconContainer>
        <label
          className={classNames(
            'tk-checkbox__label',
            `tk-checkbox__label--${labelPlacement}`
          )}
          htmlFor={memoizedId}
          tabIndex={-1}
        >
          {label}
        </label>
      </CheckboxComponent>
    </GlobalContainer>
  );
};

const CommonPropTypes = {
  id: PropTypes.string,
  checkedState: PropTypes.oneOf(Object.values(CHECKBOX_STATES)),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  handleChange: PropTypes.func,
  checked: PropTypes.bool,
  required: PropTypes.bool,
  tabIndex: PropTypes.number,
  labelPlacement: PropTypes.oneOf(Object.values(LABEL_PLACEMENTS)),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Common.propTypes = {
  ...CommonPropTypes,
  type: PropTypes.oneOf(Object.values(Types)),
};

export { Common, CommonPropTypes, Types, LABEL_PLACEMENTS, CHECKBOX_STATES };
