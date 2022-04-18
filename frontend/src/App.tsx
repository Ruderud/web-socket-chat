import { useState } from "react";

import { Cat, getCatByAge, postNewCat } from "./api/catApi";

function App() {
  const [catAge, setCatAge] = useState<number>(0);
  const [catName, setCatName] = useState<string>("");
  const [newCat, setNewCat] = useState<Cat>({
    age: 0,
    breed: "",
    name: "",
  });
  const [isCreate, setIsCreate] = useState<boolean | undefined>(undefined);

  const handleChangeCatAge = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setCatAge(Number(value));
  };

  const handleChangeNewCat = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setNewCat({
      ...newCat,
      [name]: value,
    });
  };

  const findCat = async () => {
    const result = await getCatByAge(catAge);
    setCatName(result);
  };

  const createCat = async () => {
    const result = await postNewCat(newCat);
  };

  return (
    <>
      <div>
        <label htmlFor="catAge">findCatByAge</label>
        <input
          type="number"
          name="catAge"
          value={catAge}
          onChange={handleChangeCatAge}
        />
        <button onClick={findCat}>Find!!</button>
        <div>cat name:{catName}</div>
      </div>

      <hr />

      <div>
        addNewCat
        <br />
        <label htmlFor="name">cat name</label>
        <input
          type="text"
          name="name"
          value={newCat.name}
          onChange={handleChangeNewCat}
        />
        <br />
        <label htmlFor="breed">cat breed</label>
        <input
          type="text"
          name="breed"
          value={newCat.breed}
          onChange={handleChangeNewCat}
        />
        <br />
        <label htmlFor="age">cat age</label>
        <input
          type="number"
          name="age"
          value={newCat.age}
          onChange={handleChangeNewCat}
        />
        <br />
        <button onClick={createCat}>add cat</button>
        <div>{isCreate ? "등록완료!" : "등록되지않음"}</div>
      </div>
    </>
  );
}

export default App;
