import PropTypes from 'prop-types'

import { classNames } from '../../../utils'

const ActionButton = ({
  children,
  className,
  disabled,
  onClick,
  theme,
  type,
  isLoading,
  loadingText,
  dataTestId,
  buttonRef
}) => {
  const THEMES = {
    purple: 'bg-certus-brand-purple hover:opacity-75 text-white',
    disabled: 'bg-certus-neutro-40 cursor-not-allowed text-white',
    violet: 'bg-certus-brand-violet text-white',
    white: 'bg-white text-certus-brand-purple',
    outlinePurple:
      'bg-white text-certus-brand-purple border-2 border-certus-brand-purple',
    outlineViolet:
      'bg-white text-certus-brand-violet border-2 border-certus-brand-violet',
    disabledOutlinePurple:
      'bg-white text-certus-neutro-40 border-2 border-certus-neutro-40 cursor-not-allowed',
    disabledOutlineViolet:
      'bg-white text-certus-neutro-40 border-2 border-certus-neutro-40 cursor-not-allowed'
  }

  const onClickHandler = (e) => {
    if (!disabled && typeof onClick === 'function') onClick(e)
  }

  return (
    <button
      disabled={disabled}
      data-test-id={dataTestId}
      type={type}
      ref={buttonRef}
      className={classNames(
        'rounded-md text-base transition ease-in-out delay-150 duration-500 px-6 py-2',
        THEMES[theme],
        className
      )}
      onClick={onClickHandler}
    >
      {isLoading ? loadingText : children}
    </button>
  )
}

ActionButton.defaultProps = {
  className: '',
  disabled: false,
  onClick: () => {},
  theme: 'violet',
  type: '',
  isLoading: false,
  loadingText: ''
}

ActionButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  theme: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  loadingText: PropTypes.string
}

export default ActionButton
