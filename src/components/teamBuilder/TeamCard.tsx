import Card from "components/common/components/Card";
import React, { FunctionComponent, useCallback, MouseEvent } from "react";
import { Link } from "react-router-dom";
import { paths } from "router/paths";
import { Team } from "shared/interfaces";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import styled from "styled-components";

const Content = styled.div`
  flex: 1;
`;

interface IProps {
  team: Team;
  onDelete: (teamId: string) => Promise<void>;
}

const TeamCard: FunctionComponent<IProps> = ({ team, onDelete }) => {
  const handleDelete = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onDelete(team.id);
    },
    [onDelete, team.id]
  );

  return (
    <Link to={paths.TEAM_BUILDER_DETAIL.replace(":id", team.id)}>
      <Card>
        <Content>
          <span>{team.name}</span>
        </Content>

        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Card>
    </Link>
  );
};

export default TeamCard;
