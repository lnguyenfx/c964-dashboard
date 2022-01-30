import { XCircleIcon } from "@heroicons/react/solid";

export interface ErrorsPanelProps {
  errors: Array<string>;
}

function ErrorsPanel({ errors }: ErrorsPanelProps) {
  if (errors.length < 1) {
    return null;
  }

  const errorsCountText = errors.length > 1 ? `There were ${errors.length} errors with your submission` : errors[0];

  return (
    <div className="rounded-md bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">{errorsCountText}</h3>
          {errors.length > 1 ? (
            <div className="mt-2 text-sm text-red-700">
              <ul role="list" className="list-disc pl-5 space-y-1">
                {errors.map((errorText, index) => (
                  <li key={index}>{errorText}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default ErrorsPanel;
