import React from 'react'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const noop = () => {}

const InputField = ({
  id,
  name,
  type,
  value,
  placeholder,
  required,

  disabled,
  readonly,

  className,
  minLength,
  maxLength,
  autoFocus,

  label,
  secondLabel,
  onChange,
  error,
}) => {
  const defaultClass =
    'appearance-none block w-full px-3 py-2 h-11 rounded-md placeholder-gray-400 focus:outline-none focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 !bg-transparent'

  let errorClass = ''
  if (error && error.length > 0) {
    errorClass += 'border !border-red-600'
  }

  return (
    <div>
      {label && (
        <label
          htmlFor={name || ''}
          className="label-primary"
        >
          {label} {required&& "*"}
        </label>
      )}
      <div className="relative mt-1.5 rounded-md shadow-sm">
        <input
          id={id || ''}
          type={type || 'text'}
          name={name || ''}
          placeholder={placeholder || ''}
          value={value || ''}
          className={`${defaultClass} ${errorClass} ${className || ''}`}
          minLength={minLength || +'3'}
          maxLength={maxLength || +'250'}
          autoFocus={autoFocus || false}
          required={required || false}
          disabled={disabled || false}
          readOnly={readonly || false} 
          onChange={onChange || noop()}
          aria-invalid="true"
          aria-describedby="email-error"
        />

        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon className="h-5 w-5 text-red-600" aria-hidden="true" />
          </div>
        )}
      </div>

      <p className={`label-secondary`}>
        {error && error.length > 0 ? <span className="text-red-600 block">{error}</span> : ''}

        {secondLabel}
      </p>
    </div>
  )
}

export default InputField
