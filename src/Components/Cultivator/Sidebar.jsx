import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
const Sidebar = () => {
  const sidebarItems = [
    {
      title: "Main-Option-1",
      link: "/#",
      icon: <FontAwesomeIcon icon={faHome} />,
      subItems: [
        { title: "Sub-Option-1", link: "/#", icon: {} },
        { title: "Sub-Option-2", link: "/#", icon: {} },
      ],
    },
    {
      title: "Main-Option-2",
      link: "/#",
      icon: {},
      subItems: [
        { title: "Sub-Option-1", link: "/#", icon: {} },
        { title: "Sub-Option-2", link: "/#", icon: {} },
      ],
    },
  ];
  return (
    <>
      <h3>HEADING</h3>
      <ul>
        {sidebarItems.map((item, indx) => (
          <li key={indx}>{item.title}</li>
        ))}
      </ul>
    </>
  );
};

export default Sidebar;
