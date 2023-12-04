import React, { useState } from "react";
import "./App.css";
import { Alert } from "./components/Alert";
import { List } from "./components/List";

export const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) {
      showAlert(true, "danger", "please enter value");
    } else if (inputValue && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, value: inputValue };
          }
          return item;
        })
      );
      setEditID(null);
      setIsEditing(false);
      setInputValue("");
      showAlert(true, "success", "item edited to the list");
    } else {
      showAlert(true, "success", "item added to the list");
      const newItem = {
        id: new Date().getTime().toString(),
        value: inputValue,
      };
      setList([...list, newItem]);
      setInputValue("");
      console.log(list);
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearItems = () => {
    showAlert(true, "success", "items removed to the list");
    setList([]);
  };
  const removeOne = (id) => {
    showAlert(true, "success", "item removed to the list");
    setList(list.filter((item) => item.id !== id));
  };
  const editItem = (id) => {
    const newValue = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setInputValue(newValue.value);
  };
  return (
    <section className="section-grocery">
      <div className="title">
        <h1>Grocery Bud</h1>
      </div>
      <div className="alert">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. eggs"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">{isEditing ? "Edit" : "Submit"}</button>
      </form>
      <div className="container-list">
        {list.length > 0 && (
          <List items={list} removeOne={removeOne} editItem={editItem} />
        )}
        <button onClick={clearItems}> clear items</button>
      </div>
    </section>
  );
};
