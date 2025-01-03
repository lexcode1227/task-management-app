import { Datepicker } from 'headless-datetimepicker';
import { useState } from 'react';

const DatePicker = () => {
const [value, setValue] = useState<Date | null>(new Date());
  return (
    <div>
      <Datepicker value={value} onChange={setValue}>
        <Datepicker.Picker
          defaultType="day"
          className="w-[352px] rounded-md bg-white p-4 shadow-md dark:bg-gray-800 dark:text-gray-300"
        >
          {({ monthName, hour, minute, year }) => (
            <>
              <div className="flex w-full items-center justify-between space-x-6 py-2 rtl:space-x-reverse">
                <Datepicker.Button
                  action="prev"
                  className="rounded-full p-2 text-sm font-medium hover:bg-gray-700 hover:text-white rtl:rotate-180"
                >
                  Prev
                </Datepicker.Button>
                <div className="flex">
                  <Datepicker.Button
                    action="toggleHourPicker"
                    className="leading-2 flex items-center space-x-2 p-2 text-lg font-semibold hover:bg-gray-700 hover:text-white"
                  >
                    {("0" + hour).slice(-2) + ":" + ("0" + minute).slice(-2)}
                  </Datepicker.Button>
                  <Datepicker.Button
                    action="toggleMonth"
                    className="leading-2 p-2 text-lg font-semibold hover:bg-gray-700 hover:text-white"
                  >
                    {monthName}
                  </Datepicker.Button>
                  <Datepicker.Button
                    action="toggleYear"
                    className="leading-2 p-2 text-lg font-semibold hover:bg-gray-700 hover:text-white"
                  >
                    {year}
                  </Datepicker.Button>
                </div>
                <Datepicker.Button
                  action="next"
                  className="rounded-full p-2 text-sm font-medium hover:bg-gray-700 hover:text-white rtl:rotate-180"
                >
                  Next
                </Datepicker.Button>
              </div>
              <Datepicker.Items
                className={({ type }) =>
                  `grid w-full auto-rows-max gap-4 overflow-y-auto scroll-smooth ${
                    type === "day" ? "grid-cols-7" : ""
                  } ${type === "month" ? "grid-cols-3" : ""} ${
                    type === "year" ? "max-h-[274px] grid-cols-4" : ""
                  }`
                }
              >
                {({ items }) =>
                  items.map((item) => (
                    <Datepicker.Item
                      key={item.key}
                      item={item}
                      action={
                        item.type === "day"
                          ? "close"
                          : item.type === "month"
                            ? "showDay"
                            : "showMonth"
                      }
                    >
                      {item.isHeader ? item.text.substring(0, 2) : item.text}
                    </Datepicker.Item>
                  ))
                }
              </Datepicker.Items>
              <Datepicker.Button
                action="today"
                className="mt-4 w-full bg-blue-700 p-2 text-sm font-medium hover:bg-blue-600"
              >
                Today
              </Datepicker.Button>
              <Datepicker.Picker
                className="flex max-h-56 rounded-md border border-gray-600 bg-white py-2 shadow-md rtl:flex-row-reverse dark:bg-gray-800 dark:text-gray-300"
                id="HourPicker"
              >
                <Datepicker.Items
                  type="hour"
                  className="overflow-y-auto scroll-smooth px-4"
                  disableAutoScroll
                >
                  {({ items }) =>
                    items.map((item) => (
                      <Datepicker.Item
                        key={item.key}
                        item={item}
                        action="close"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white"
                      >
                        {("0" + item.text).slice(-2)}
                      </Datepicker.Item>
                    ))
                  }
                </Datepicker.Items>
                <Datepicker.Items
                  type="minute"
                  className="overflow-y-auto scroll-smooth px-4"
                  disableAutoScroll
                >
                  {({ items }) =>
                    items.map((item) => (
                      <Datepicker.Item
                        key={item.key}
                        item={item}
                        action="close"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium hover:bg-gray-700 hover:text-white"
                      >
                        {("0" + item.text).slice(-2)}
                      </Datepicker.Item>
                    ))
                  }
                </Datepicker.Items>
              </Datepicker.Picker>
            </>
          )}
        </Datepicker.Picker>
      </Datepicker>
    </div>
  );
}

export default DatePicker