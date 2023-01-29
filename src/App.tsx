import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Display from "./components/Display";
import Item from "./components/Item";
import Nav from "./components/Nav";
import {
  itemSelector,
  setItem,
  updateLocalStorage,
  updateState,
} from "./store/slices/itemSlice";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch } from "./store/store";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const dispatch = useAppDispatch();
  const itemReducer = useSelector(itemSelector);

  const dragItem = useRef<any>();
  const dragOverItem = useRef<any>();

  const handleSort = () => {
    const draggedItemContent = itemReducer.items[dragItem.current];

    const sortedItems = [
      ...itemReducer.items.slice(0, dragItem.current),
      ...itemReducer.items.slice(dragItem.current + 1),
    ];
    sortedItems.splice(dragOverItem.current, 0, draggedItemContent);
    dispatch(setItem({ items: sortedItems, total: itemReducer.total }));
    dragItem.current = null;
    dragOverItem.current = null;
  };

  useEffect(() => {
    toast.info("You can now hide columns.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    dispatch(updateLocalStorage());
    const items = JSON.parse(localStorage.getItem("items")!);
    try {
      if (items && items.items.length > 0) {
        dispatch(setItem({ items: items.items, total: items.total }));
      }
    } catch (error) {
      localStorage.setItem("items", JSON.stringify(itemReducer));
    }
  }, []);

  return (
    <>
      <div className="dark:bg-gray-800 bg-sky-500">
        <div className="container mx-auto dark:bg-gray-800 bg-sky-500 ">
          <Nav />
        </div>
      </div>
      <div className="sm:container mx-auto my-3 block text-gray-500 font-bold col-start-auto ">
        <ul className="grid grid-cols-12 items-center w-12/12 text-sm">
          <li className="text-center col-span-2">จำนวนที่มี</li>
          <li className="text-center col-span-2">จำนวนที่เหลือ</li>
          <li className="text-start col-span-2 ml-5">ชื่อ</li>
          <li className="text-start col-span-2 ml-5">รูป</li>
          <li className="text-center col-span-2">จำนวนที่ใช้</li>
          <li className="text-center col-span-2">จำนวนที่ได้คืน</li>
        </ul>
        {itemReducer.items.map((item, index) => (
          <div className="flex " key={index}>
            <button
              className="dropdown-button"
              onClick={() =>
                dispatch(
                  updateState({
                    index: index,
                    property: "toggleDropdown",
                    value: item.dropdown,
                  })
                )
              }
            >
              <svg
                className={`fill-current h-4 w-4 transform ${
                  item.dropdown && "-rotate-180"
                }
                transition duration-150 ease-in-out `}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </button>
            {!item.dropdown && (
              <p
                className="cursor-pointer"
                onClick={() =>
                  dispatch(
                    updateState({
                      index: index,
                      property: "toggleDropdown",
                      value: item.dropdown,
                    })
                  )
                }
              >
                {item.title}
              </p>
            )}
            <div className={`dropdown-menu ${item.dropdown ? "" : "hidden"}`}>
              <Item
                index={index}
                dragItem={dragItem}
                dragOverItem={dragOverItem}
                handleSort={handleSort}
              />
            </div>
          </div>
        ))}
        <Display />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
