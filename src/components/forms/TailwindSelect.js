import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon
} from '@heroicons/react/20/solid';
import { useEffect } from 'react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function TailwindSelect({
  options,
  defaultValue,
  onChange,
  ...props
}) {
  const [selected, setSelected] = useState(
    options ? options[0] : ''
  );

  useEffect(() => {
    setSelected(defaultValue)
  }, [defaultValue])
  

  const onChangeValue = (e) => {
    setSelected(e);
    onChange(e);
  };

  return (
    <Listbox value={selected} onChange={onChangeValue}>
      {({ open }) => (
        <>
          {props.label ? (
            <Listbox.Label
              htmlFor={props.name || ''}
              className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400 mb-2"
            >
              {props.label} {props.required && '*'}
            </Listbox.Label>
          ) : (
            ''
          )}

          <div className="relative">
            <Listbox.Button
              className={classNames(
                props?.className,
                'relative w-full min-w-[120px] h-11 cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              )}
            >
              <span className="block truncate">
                {selected
                  ? selected.name
                  : props?.placeholder}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options?.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={classNames(
                            selected
                              ? 'font-semibold'
                              : 'font-normal',
                            'block truncate'
                          )}
                        >
                          {item.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active
                                ? 'text-white'
                                : 'text-indigo-600',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
