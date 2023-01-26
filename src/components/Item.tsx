import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  itemSelector,
  RemoveData,
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
    <div className="grid grid-cols-6 items-center">
      <div className="flex items-center">
        <p
          onClick={() => dispatch(RemoveData({ index: index }))}
          className="cursor-pointer"
        >
          x
        </p>
        <input
          className="sm:w-28 lg:w-auto shadow appearance-none border rounded py-2 m-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      </div>

      <input
        className="sm:w-28 lg:w-auto shadow appearance-none border rounded py-2 m-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        className="sm:text-xs lg:text-lg block text-gray-500 font-bold col-start-auto cursor-move"
      >
        {itemReducer.items[index].title}
      </div>

      <div
        className="cursor-move"
        onDragStart={(e) => (dragItem.current = index)}
        onDragEnter={(e) => (dragOverItem.current = index)}
        onDragEnd={handleSort}
        onDragOver={(e) => e.preventDefault()}
        draggable
      >
        <img
          width="75px"
          height="75px"
          className="lg:max-w-[69px] sm:max-w-[50px] mx-2 col-span-auto"
          src={itemReducer.items[index].pic}
          alt={itemReducer.items[index].title}
        />
      </div>

      <input
        className="sm:w-28 lg:w-auto shadow appearance-none border rounded py-2 m-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        className="sm:w-28 lg:w-auto shadow appearance-none border rounded py-2 m-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
