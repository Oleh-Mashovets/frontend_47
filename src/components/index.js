import React from "react";

import CreateTask from "./createTaskComponent/CreateTaskComponent";
import ShowList from "./showListComponent/ShowListComponent";

export default function InputComponent() {

  return (
    <div>
      <CreateTask />
      <ShowList/>
    </div>
  );
}