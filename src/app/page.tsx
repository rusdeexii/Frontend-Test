"use client";
import { useState, useRef } from "react";

type ItemType = "Fruit" | "Vegetable";

interface TodoItem {
  type: ItemType;
  name: string;
}

const initialItems: TodoItem[] = [
  { type: "Fruit", name: "Apple" },
  { type: "Vegetable", name: "Broccoli" },
  { type: "Vegetable", name: "Mushroom" },
  { type: "Fruit", name: "Banana" },
  { type: "Vegetable", name: "Tomato" },
  { type: "Fruit", name: "Orange" },
  { type: "Fruit", name: "Mango" },
  { type: "Fruit", name: "Pineapple" },
  { type: "Vegetable", name: "Cucumber" },
  { type: "Fruit", name: "Watermelon" },
  { type: "Vegetable", name: "Carrot" },
];

export default function Home() {
  const [mainList, setMainList] = useState<TodoItem[]>(initialItems);
  const [fruitList, setFruitList] = useState<TodoItem[]>([]);
  const [vegetableList, setVegetableList] = useState<TodoItem[]>([]);

  const timers = useRef<Record<string, NodeJS.Timeout>>({});

  const MoveItem = (item: TodoItem) => {
    setMainList((prev) => prev.filter((i) => i.name !== item.name));

    if (item.type === "Fruit") {
      setFruitList((prev) => [...prev, item]);
    } else {
      setVegetableList((prev) => [...prev, item]);
    }

    timers.current[item.name] = setTimeout(() => {
      moveBackToMain(item);
    }, 5000);
  };

  const moveBackToMain = (item: TodoItem) => {
    if (item.type === "Fruit") {
      setFruitList((prev) => prev.filter((i) => i.name !== item.name));
    } else {
      setVegetableList((prev) => prev.filter((i) => i.name !== item.name));
    }

    setMainList((prev) => [...prev, item]);

    clearTimeout(timers.current[item.name]);
    delete timers.current[item.name];
  };

  const ReturnToMain = (item: TodoItem) => {
    clearTimeout(timers.current[item.name]);
    moveBackToMain(item);
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border border-gray-300 rounded">
          <h3 className="text-lg font-bold mb-4 text-center">Main List</h3>
          {mainList.map((item) => (
            <button
              key={item.name}
              onClick={() => MoveItem(item)}
              className="block w-full mb-2 p-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="p-4 border border-green-300 rounded">
          <h3 className="text-lg font-bold mb-4 text-green-600 text-center">
            Fruits
          </h3>
          {fruitList.map((item) => (
            <button
              key={item.name}
              onClick={() => ReturnToMain(item)}
              className="block w-full mb-2 p-2 bg-green-100 hover:bg-green-200 rounded"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="p-4 border border-yellow-300 rounded">
          <h3 className="text-lg font-bold mb-4 text-yellow-600 text-center">
            Vegetables
          </h3>
          {vegetableList.map((item) => (
            <button
              key={item.name}
              onClick={() => ReturnToMain(item)}
              className="block w-full mb-2 p-2 bg-yellow-100 hover:bg-yellow-200 rounded"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
