import { Icon } from "@mui/material";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { createContext } from "react";
import { useGlobalContext } from "../Context/useGlobalContext";
const selectItem = () => {
  // You might want to add some logic here
};

function Sidebar({ selectedListItemIndex, setSelectedListItemIndex }) {
  return (
    <div className="sidebar">
      <div className="searchBar">
        <ListItem title="My Games" icon={VideogameAssetIcon} index={0} />
        <ListItem title="My Reviews" icon={ChatIcon} index={1} />
        <ListParentItem title="Malene" icon={ChatIcon} index={2}>
          <ListItem isChild={true} title="Child2" icon={ChatIcon} index={3} />
          <ListItem isChild={true} title="Child3" icon={ChatIcon} index={4} />
          <ListItem isChild={true} title="Child4" icon={ChatIcon} index={5} />

        </ListParentItem>
      </div>
    </div>
  );
}

export default Sidebar;

function ListItem({ title, icon, isChild, index }) {
  const { selectedListItemIndex, setSelectedListItemIndex } =
    useGlobalContext();
  const whenClicked = () => {
    if (selectedListItemIndex == index) {
      return;
    }
    setSelectedListItemIndex(index);
  };
  var selected = selectedListItemIndex == index;
  return (
    <div
      className={`list_item ${selected ? "selected" : ""} ${
        isChild ? "list_item_child" : ""
      }`}
      onClick={whenClicked}
    >
      <div className="list_item_icon">
        <Icon component={icon} />
      </div>
      <div className="list_item_title">{title}</div>
    </div>
  );
}

function ListParentItem({
  title,
  icon,
  onExpand,
  onCollapse,
  index,
  children,
}) {
  const { selectedListItemIndex, setSelectedListItemIndex } =
    useGlobalContext();
    const whenClicked = () => {
    if (selectedListItemIndex == index) {
      return;
    }
    setSelectedListItemIndex(index);
  };
  const [isExpanded, setIsExpanded] = useState(false);
  var selected = selectedListItemIndex == index;

  return (
    <div
      className="list_item_parent_container"
      
    >
      <div
        className={`list_item list_item_parent ${selected ? "selected" : ""}`}
        onClick={() => {
          setIsExpanded((prev) => !prev);
          whenClicked();
        }}
        style={{
          background: selected ? "#2D2D2D" : "#202020",
          cursor: "pointer",
        }} // blue if selected, else black
      >
        <div className="list_item_icon">
          <Icon component={icon} />
        </div>
        <div className="list_item_title">{title}</div>
        <ArrowDropDownIcon />
      </div>
      {isExpanded && children}
    </div>
  );
}
