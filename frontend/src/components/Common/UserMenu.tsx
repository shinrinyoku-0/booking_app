import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { FaUserAstronaut } from "react-icons/fa";
import { FiLogOut, FiUser, FiHome } from "react-icons/fi";
import { HamburgerIcon } from "@chakra-ui/icons";
import useAuth from "../../hooks/useAuth";

const UserMenu = () => {
  const { logout } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    logout();
  };

  const MenuItems = () => (
    <>
      <MenuItem icon={<FiHome fontSize="18px" />} as={Link} to="/">
        Home Page
      </MenuItem>
      <MenuItem icon={<FiUser fontSize="18px" />} as={Link} to="settings">
        My profile
      </MenuItem>
      <MenuItem
        icon={<FiLogOut fontSize="18px" />}
        onClick={handleLogout}
        color="ui.danger"
        fontWeight="bold"
      >
        Log out
      </MenuItem>
    </>
  );

  return (
    <Flex
      as="header"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="ui.main"
      color="white"
    >
      <IconButton
        variant="outline"
        aria-label="open menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />

      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<FaUserAstronaut color="white" fontSize="18px" />}
          bg="ui.main"
          isRound
          data-testid="user-menu"
        />
        <MenuList>
          <MenuItems />
        </MenuList>
      </Menu>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <MenuItems />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default UserMenu;
