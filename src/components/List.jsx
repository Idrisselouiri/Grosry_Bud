import React from "react";

export const List = ({ items, removeOne, editItem }) => {
  console.log(items);
  return (
    <ul>
      {items.map((item) => {
        const { value, id } = item;
        return (
          <li key={id}>
            <p>{value}</p>
            <div className="btns">
              <button onClick={() => removeOne(id)}>remove</button>
              <button onClick={() => editItem(id)}>edit</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
