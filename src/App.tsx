import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Display from "./components/Display";
import Item from "./components/Item";
import Nav from "./components/Nav";
import { itemSelector, setItem } from "./store/slices/itemSlice";
import { useAppDispatch } from "./store/store";

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
    const items = JSON.parse(localStorage.getItem("items1")!);
    try {
      if (items && items.items.length > 0) {
        dispatch(setItem({ items: items.items, total: items.total }));
      }
    } catch (error) {
      localStorage.setItem("items1", JSON.stringify(itemReducer))
    }
  }, []);

  return (
    <>
      <div className="dark:bg-gray-800 bg-sky-500">
        <div className="container mx-auto dark:bg-gray-800 bg-sky-500 ">
          <Nav />
        </div>
      </div>
      <div className="sm:container mx-auto my-3 block text-gray-500 font-bold col-start-auto">
        <ul className="grid grid-cols-6 items-center w-12/12">
          <li className="text-center">จำนวนที่มี</li>
          <li className="text-start">จำนวนที่เหลือ</li>
          <li className="text-start">ชื่อ</li>
          <li className="text-start">รูป</li>
          <li className="text-center">จำนวนที่ใช้</li>
          <li className="text-center">จำนวนที่ได้คืน</li>
        </ul>
        {itemReducer.items.map((item, index) => (
          <Item
            key={index}
            index={index}
            dragItem={dragItem}
            dragOverItem={dragOverItem}
            handleSort={handleSort}
          />
        ))}
        <Display />
      </div>
    </>
  );
}

export default App;
