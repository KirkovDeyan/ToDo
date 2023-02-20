import Header from './Header';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";


function App() {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("shoppinglist")) ?? []
  );

  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");

  const setAndSave = (newItems) => {
    setItems(newItems);
    localStorage.setItem("shoppinglist", JSON.stringify(newItems));
  };

  const addItem = (item) => {
    const myNewItem = { id: uuidv4(), checked: false, item };
    const listItems = [myNewItem, ...items];
    setAndSave(listItems);
  };

  const handleCheck = (id) => {
    if (items.find((item) => item.id === id)?.checked) {
      const listItems = [...items];
      let item = listItems.findIndex((item) => item.id === id);
      item = listItems.splice(item, 1)[0];
      item.checked = false;
      listItems.unshift(item);
      setAndSave(listItems);
    } else {
      const listItems = items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      const sorted = listItems.sort((a, b) => a.checked - b.checked);
      setAndSave(sorted);
    }
  };

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSave(listItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Header title="To Do List" />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <Content
        items={items.filter((item) =>
          item.item.toLowerCase().includes(search.toLowerCase())
        )}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer length={items.length} />
    </div>
  );
}

export default App;
