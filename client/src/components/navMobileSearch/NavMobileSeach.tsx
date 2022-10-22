import React from "react";
import {
  CloseSearchBtn,
  Container,
  NavMobileSearch,
  NavMobileSearchForm,
} from "./style";
import { MdArrowBack, MdSearch } from "react-icons/md";
import { Button } from "../../ui/Button";

const NavMobileSeach = ({
  handleToggleMobileSearch,
}: {
  handleToggleMobileSearch: () => void;
}) => {
  return (
    <Container>
      <CloseSearchBtn>
        <MdArrowBack onClick={handleToggleMobileSearch} />
      </CloseSearchBtn>
      <NavMobileSearchForm>
        <NavMobileSearch placeholder="Search" autoFocus />
        <Button variant="normal">
          <MdSearch />
        </Button>
      </NavMobileSearchForm>
    </Container>
  );
};

export default NavMobileSeach;
