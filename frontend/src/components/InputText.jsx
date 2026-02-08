import { ExclamationCircleIcon } from '@heroicons/react/16/solid'
import clsx from "clsx"

const InputText = ({
    label,
    name,
    type = "text",
    placeholder,
    register,
    error,
    ...props
}) => {
    const hasError = Boolean(error)

    return(
        <div>
            { label && (
                <label
                    htmlFor={name}
                    className="block text-sm/6 font-medium text-gray-900 text-left"
                >
                    {label}
                </label>
            )}
            <div className="mt-2 grid grid-cols-1">
                <input
                    id={name}
                    type={type}
                    placeholder={placeholder}
                    aria-invalid={hasError}
                    aria-describedby={hasError ? `${name}-error` : undefined }
                    {...register(name)}
                    {...props}
                    className={clsx(
                        "col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pr-10 pl-3 text-gray-900 placeholder:text-gray-400 sm:text-sm",
                        "border focus:outline-none focus:ring-2",
                        hasError
                            ? " text-red-900 outline-1 -outline-offset-1 outline-red-300 placeholder:text-red-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:pr-9 sm:text-sm/6"
                            : "border-gray-300 focus:border-indigo-600 focus:ring-indigo-600/20"
                    )}
                />
                {hasError && (
                    <ExclamationCircleIcon
                        aria-hidden="true"
                        className="pointer-events-none col-start-1 row-start-1 mr-3 size-5 self-center justify-self-end text-red-500 sm:size-4"
                    />
                )}
            </div>
            {error && (
                <p id={`${name}-error`} className="mt-2 text-sm text-red-600 text-left">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default InputText