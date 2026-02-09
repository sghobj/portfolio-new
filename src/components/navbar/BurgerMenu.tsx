import { useState } from "react";
import {
  Box,
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  Portal,
  VStack,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
import "./BurgerMenu.scss";
import { links } from "../../constants/general.tsx";
import { Link, useLocation } from "react-router-dom";
import { ContactMe } from "../contact/ContactMe.tsx";

export const BurgerMenu = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <Box
      zIndex={1000}
      position="fixed"
      top="1rem"
      left="1rem"
      display={{ base: "block", md: "none" }}
    >
      <Drawer.Root
        placement={"start"}
        open={open}
        onOpenChange={(e) => setOpen(e.open)}
      >
        <Drawer.Trigger asChild>
          <IconButton
            aria-label="Open menu"
            variant="ghost"
            className={"burger-menu-btn"}
            size="lg"
            bg="var(--color-bg-primary)"
            color="var(--color-text-primary)"
            boxShadow="md"
            _hover={{
              bg: "var(--color-bg-tertiary)",
              color: "var(--color-accent)",
            }}
          >
            <RxHamburgerMenu />
          </IconButton>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content bg="var(--color-bg-primary)">
              <Drawer.Body pt="20" spaceY="3">
                <VStack
                  className="nav"
                  alignItems="flex-start"
                  gap={8}
                  w="100%"
                >
                  <VStack
                    className={"links"}
                    alignItems="flex-start"
                    gap={2}
                    w="100%"
                  >
                    {links.map((link) => {
                      const isActive = location.pathname === link.href;
                      return (
                        <HStack className="nav-item" key={link.label} w="100%">
                          <Link
                            to={link.href}
                            className={`nav-link ${isActive ? "active" : ""}`}
                            data-testid={link.testId}
                            onClick={() => setOpen(false)}
                          >
                            <Box className="nav-icon-wrapper">{link.icon}</Box>
                            <span className="nav-link-text">{link.label}</span>
                          </Link>
                        </HStack>
                      );
                    })}
                  </VStack>
                  <Box
                    className="sidebar-footer"
                    w="100%"
                    display="flex"
                    justifyContent="center"
                    pt={6}
                  >
                    <ContactMe size={"md"} />
                  </Box>
                </VStack>
              </Drawer.Body>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" color="var(--color-text-primary)" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
};
