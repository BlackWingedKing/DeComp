import React from "react";

const Card = ({ address, balance }) => {
  return (
    <div class="w-full max-w-sm h-52 p-4 bg-white border rounded-lg shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
      <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white text-center">
        Wallet Connected
      </h5>
      <ul class="my-4 space-y-3">
        <li>
          <div class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            <span class="flex-1 ml-3 whitespace-nowrap">Address</span>
            <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              {address}
            </span>
          </div>
        </li>
        <li>
          <div class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
            <span class="flex-1 ml-3 whitespace-nowrap">Balance</span>
            <span class="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">
              {balance}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Card;
