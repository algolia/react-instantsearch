import React, { useEffect, useState } from 'react';
import * as Toast from '@radix-ui/react-toast';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

export function SearchErrorToast() {
  const { use } = useInstantSearch();
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    return use(({ instantSearchInstance }) => {
      function handleError(searchError: Error) {
        setError(searchError);
      }

      return {
        subscribe() {
          instantSearchInstance.addListener('error', handleError);
        },
        unsubscribe() {
          instantSearchInstance.removeListener('error', handleError);
        },
      };
    });
  }, [use]);

  if (!error) {
    return null;
  }

  return (
    <Toast.Provider>
      <Toast.Root
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setError(null);
          }
        }}
      >
        <div className="fixed z-10 bottom-2 left-2 max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="p-4">
            <div className="flex items-start">
              <div className="w-0 flex-1 pt-0.5">
                <Toast.Title className="text-sm font-medium text-gray-900">
                  {error.name}
                </Toast.Title>
                <Toast.Description className="mt-1 text-sm text-gray-500">
                  {error.message}
                </Toast.Description>
              </div>
            </div>
          </div>
        </div>
      </Toast.Root>

      <Toast.Viewport />
    </Toast.Provider>
  );
}
