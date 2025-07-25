import { Icon } from "@mui/material";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import ChatIcon from "@mui/icons-material/Chat";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { createContext } from "react";
import { useGlobalContext } from "../Context/useGlobalContext";
import { useRef } from "react";
const selectItem = () => {
  // You might want to add some logic here
};

function Sidebar({ selectedListItemIndex, setSelectedListItemIndex }) {
  return (
    <div className="sidebar">
      <div className="searchBar">
        {/* <ListItem title="My Games" icon={VideogameAssetIcon} index={0} /> */}
        <ListParentItem title="My Games" icon={VideogameAssetIcon} index={0}>
            <ListItem isChild={true} title="Reviews" icon={ChatIcon} index={1} />
            <ListItem isChild={true} title="Lists" icon={ChatIcon} index={2} />
            <ListItem isChild={true} title="Export" icon={ChatIcon} index={3} />



        </ListParentItem>
        
        <ListParentItem title="Malene" icon={ChatIcon} index={4}>
          <ListItem isChild={true} title="Child2" icon={ChatIcon} index={5} />
          <ListItem isChild={true} title="Child3" icon={ChatIcon} index={6} />
          <ListItem isChild={true} title="Child4" icon={ChatIcon} index={7} />

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
  const { selectedListItemIndex, setSelectedListItemIndex } = useGlobalContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const selected = selectedListItemIndex === index;

  // Handles clicking the row
  const handleRowClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      onExpand?.(index);
    }
    if (!selected) setSelectedListItemIndex(index);
  };

  // Handles clicking the collapse arrow only
  const handleCollapseClick = (e) => {
    e.stopPropagation(); // Prevent row click
    const next = !isExpanded;
    setIsExpanded(next);
    next ? onExpand?.(index) : onCollapse?.(index);
  };

  return (
    <div className="list_item_parent_container">
      <div
        className={`list_item list_item_parent ${selected ? "selected" : ""}`}
        onClick={handleRowClick}
        style={{
          background: selected ? "#2D2D2D" : "#202020",
          cursor: "pointer",
        }}
      >
        <div className="list_item_icon">
          <Icon component={icon} />
        </div>
        <div className="list_item_title">{title}</div>
        <div className="flex collapseBtn" onClick={handleCollapseClick}>
          <ArrowDropDownIcon className={isExpanded ? "rotated" : ""} />
        </div>
      </div>
      {isExpanded && children}
    </div>
  );
}
