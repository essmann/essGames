import { Icon } from "@mui/material";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import ChatIcon from '@mui/icons-material/Chat';

const selectItem = () => {
  // You might want to add some logic here
}

function Sidebar({ selectedListItemIndex, setSelectedListItemIndex }) {
  return (
    <div className="sidebar">
      <div className="searchBar">
        <ListItem
          title="My Games"
          icon={VideogameAssetIcon}
          onClick={() => setSelectedListItemIndex(0)}
          selected={selectedListItemIndex === 0}   // <-- here

        />
        <ListItem
          title="My Reviews"
          icon={ChatIcon}
          onClick={() => setSelectedListItemIndex(1)}
          selected={selectedListItemIndex === 1}   // <-- here
        />
      </div>
    </div>
  );
}

export default Sidebar;

function ListItem({ title, icon, onClick, selected }) {
  return (
    <div
      className="list_item"
      onClick={onClick}
      style={{ background: selected ? '#2D2D2D' : '#202020', cursor: 'pointer' }} // blue if selected, else black
    >
      <div className="list_item_icon">
        <Icon component={icon} />
      </div>
      <div className="list_item_title">{title}</div>
    </div>
  );
}

