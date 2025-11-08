import React from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/navigation";

interface propTypes {
    toggleClick:any
    Icon:any
    text:any
    open:any
    data:any
    drawerToggle:any
    setOpen:any
    queryParam:any
}

const CustomCollapsibleListItem = (props: propTypes) => {
  const {
    toggleClick,
    Icon,
    text,
    open,
    data,
    drawerToggle,
    setOpen,
    queryParam
  } = props;

  const router = useRouter();
  return (
    <>
      <ListItem disablePadding sx={{ display: "block" }}>
        <ListItemButton onClick={toggleClick} className="list_item_text">
          <ListItemIcon sx={{ minWidth: "25px" }}>
            <Icon sx={{ color: "#01437d", fontSize: "20px" }} />
          </ListItemIcon>
          <ListItemText
            sx={{ color: "black", fontWeight: "600" }}
            primary={text}
          />
          {open ? (
            <RemoveIcon sx={{ fontSize: "13px" }} />
          ) : (
            <AddIcon sx={{ fontSize: "13px" }} />
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {data.map((item: any) => (
              <ListItemButton
                key={item._id || item._id}
                className="list_item_text"
                sx={{ textAlign: "left" }}
                onClick={() => {
                  router.push(
                    `/pages/carWithLocation?${queryParam || item.name}=${item.Name || item.name}`
                  );
                  drawerToggle();
                  setOpen(false);
                }}
              >
                <ListItemText
                  primary={item.Name || item.name}
                  sx={{ paddingLeft: "25px", textTransform:"uppercase" }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </ListItem>
    </>
  );
};

export default CustomCollapsibleListItem;
