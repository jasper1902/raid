import { useSelector } from "react-redux";
import {
  itemSelector,
  RemoveData,
  setLeftHandler,
} from "../store/slices/itemSlice";
import { useAppDispatch } from "../store/store";

type Props = {};

const Display = (props: Props) => {
  const dispatch = useAppDispatch();
  const itemReducer = useSelector(itemSelector);
  const value = itemReducer.total.receive - itemReducer.total.use;
  return (
    <div className="text-center lg:font-bold lg:text-5xl sm:text-xl text-[0.5rem]">
      <div className="flex justify-around items-center">
        <p>ใช้ไป {itemReducer.total.use.toLocaleString()}</p>

        <div className="flex items-center flex-col">
          <button
            onClick={() => dispatch(RemoveData({ index: -1 }))}
            className={`${
              value > 0
                ? "bg-green-500 hover:bg-green-700"
                : value == 0
                ? "bg-yellow-500 hover:bg-yellow-700"
                : "bg-red-500 hover:bg-red-700"
            } lg:p-2.5 p-2 rounded-xl transition-colors duration-50 hover:animate-pulse ease-out text-white lg:font-semibold`}
          >
            {value > 0
              ? `คุ้ม ${value.toLocaleString()}`
              : value == 0
              ? "เท่าทุน"
              : `ไม่คุ้ม ${value}`}
          </button>
          <span className="lg:text-md flex justify-center mt-3 text-[0.45rem] lg:text-sm">
            กดปุ่มเพื่อล้างค่า
          </span>
        </div>

        <div className="flex items-center flex-col">
          <button
            onClick={() => dispatch(setLeftHandler({}))}
            className={`bg-blue-500 hover:bg-blue-700 lg:p-2.5 p-2 rounded-xl transition-colors duration-50 hover:animate-pulse ease-out text-white lg:font-semibold`}
          >
            เซ็ตจำนวนที่เหลือ
          </button>
          <span className="lg:text-md flex justify-center mt-3 text-[0.45rem] lg:text-sm">
            จำนวนที่มี = จำนวนที่เหลือ+จำนวนที่ได้คืน
          </span>
        </div>

        <p>ได้คืน {itemReducer.total.receive.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default Display;
