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
import { Link } from "react-router-dom";
import { ContactMe } from "../contact/ContactMe.tsx";

export const BurgerMenu = () => {
  return (
    <Box
      zIndex={10}
      position={{ base: "absolute" }}
      display={{ base: "block", md: "none" }}
    >
      <Drawer.Root placement={"start"}>
        <Drawer.Trigger asChild>
          <IconButton
            aria-label="Open menu"
            variant="ghost"
            className={"burger-menu-btn"}
          >
            <RxHamburgerMenu />
          </IconButton>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Context>
                {() => (
                  <Drawer.Body pt="20" spaceY="3">
                    <VStack className="nav">
                      <div className={"links"}>
                        {links.map((link) => {
                          return (
                            <>
                              <HStack className="nav-item" key={link.label}>
                                <Link
                                  to={link.href}
                                  className="nav-link"
                                  data-testid={link.testId}
                                >
                                  {link.icon}
                                  <span>{link.label}</span>
                                </Link>
                              </HStack>
                            </>
                          );
                        })}
                      </div>
                      <div className="sidebar-footer">
                        <ContactMe size={"md"} />
                      </div>
                    </VStack>
                  </Drawer.Body>
                )}
              </Drawer.Context>
              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </Box>
  );
};
