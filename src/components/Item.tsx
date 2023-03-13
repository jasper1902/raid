import React from "react";
import { useSelector } from "react-redux";
import {
  itemSelector,
  updateState,
} from "../store/slices/itemSlice";
import { useAppDispatch } from "../store/store";

type Props = {
  index: number;
  dragItem: any;
  dragOverItem: any;
  handleSort: any;
};

const Item = ({ index, dragItem, dragOverItem, handleSort }: Props) => {
  const dispatch = useAppDispatch();
  const itemReducer = useSelector(itemSelector);

  return (
    <div className="grid grid-cols-12 items-center">
      <input
        onDragStart={(e) => (dragItem.current = index)}
        onDragEnter={(e) => (dragOverItem.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
        className="sm:w-28 lg:w-auto col-span-2 shadow appearance-none border rounded lg:py-2 lg:m-2 lg:px-3 m-1 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[0.5rem] lg:text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
        type="number"
        value={itemReducer.items[index].available}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(
            updateState({
              index: index,
              property: "available",
              value: parseInt(e.target.value),
            })
          )
        }
      />

      <input
        onDragStart={(e) => (dragItem.current = index)}
        onDragEnter={(e) => (dragOverItem.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
        className="sm:w-28 lg:w-auto col-span-2 shadow appearance-none border rounded lg:py-2 lg:m-2 lg:px-3 m-1 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[0.5rem] lg:text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
        type="number"
        value={itemReducer.items[index].left}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(
            updateState({
              index: index,
              property: "left",
              value: parseInt(e.target.value),
            })
          )
        }
      />

      <div
        onDragStart={(e) => (dragItem.current = index)}
        onDragEnter={(e) => (dragOverItem.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
        draggable
        className="text-[0.5rem] lg:text-lg col-span-2 block text-gray-500 font-bold col-start-auto cursor-move dark:text-gray-50"
      >
        {itemReducer.items[index].title}
      </div>

      <div
        className="cursor-move col-span-2"
        onDragStart={(e) => (dragItem.current = index)}
        onDragEnter={(e) => (dragOverItem.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
        draggable
      >
        <img
          width="75px"
          height="75px"
          className="lg:max-w-[69px] sm:max-w-[50px] max-w-[20px] mx-2 col-span-auto"
          src={itemReducer.items[index].pic}
          alt={itemReducer.items[index].title}
        />
      </div>

      <input
        onDragStart={(e) => (dragItem.current = index)}
        onDragEnter={(e) => (dragOverItem.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
        className="sm:w-28 lg:w-auto col-span-2 shadow appearance-none border rounded lg:py-2 lg:m-2 lg:px-3 m-1 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[0.5rem] lg:text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
        type="number"
        value={itemReducer.items[index].use}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(
            updateState({
              index: index,
              property: "use",
              value: parseInt(e.target.value),
            })
          )
        }
      />

      <input
        onDragStart={(e) => (dragItem.current = index)}
        onDragEnter={(e) => (dragOverItem.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
        className="sm:w-28 lg:w-auto col-span-2 shadow appearance-none border rounded lg:py-2 lg:m-2 lg:px-3 m-1 p-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-[0.5rem] lg:text-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
        type="number"
        value={itemReducer.items[index].receive}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(
            updateState({
              index: index,
              property: "receive",
              value: parseInt(e.target.value),
            })
          )
        }
      />
    </div>
  );
};

export default Item;
