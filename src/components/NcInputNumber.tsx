import React, { FC, useEffect, useState } from "react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/solid";

export interface NcInputNumberProps {
  className?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
  label?: string;
  desc?: string;
}

const NcInputNumber: FC<NcInputNumberProps> = ({
                                                 className = "w-full",
                                                 defaultValue = 1,
                                                 min = 1,
                                                 max = 99,
                                                 onChange,
                                                 label,
                                                 desc,
                                               }) => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Handle decrement button click
  const handleClickDecrement = () => {
    if (value <= min) return;
    const newValue = value - 1;
    setValue(newValue);
    onChange && onChange(newValue); // Call onChange callback if passed
  };

  // Handle increment button click
  const handleClickIncrement = () => {
    if (value >= max) return;
    const newValue = value + 1;
    setValue(newValue);
    onChange && onChange(newValue); // Call onChange callback if passed
  };

  const renderLabel = () => {
    return (
        <div className="flex flex-col">
        <span className="font-medium text-neutral-800 dark:text-neutral-200">
          {label}
        </span>
          {desc && (
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-normal">
            {desc}
          </span>
          )}
        </div>
    );
  };

  return (
      <div
          className={`nc-NcInputNumber flex items-center justify-between space-x-5 ${className}`}
      >
        {label && renderLabel()}

        <div
            className={`nc-NcInputNumber__content flex items-center justify-between w-[104px] sm:w-28`}
        >
          <button
              className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
              type="button"
              onClick={handleClickDecrement}
              disabled={value <= min}
          >
            <MinusIcon className="w-4 h-4" />
          </button>
          <span className="select-none block flex-1 text-center leading-none">
          {value}
        </span>
          <button
              className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 dark:border-neutral-500 bg-white dark:bg-neutral-900 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
              type="button"
              onClick={handleClickIncrement}
              disabled={value >= max}
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
  );
};

export default NcInputNumber;
