import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const TeamWrapper = styled.div`
  grid-column: 1;
  grid-row: 1/4;
  background-color: #362234;
  color: #cac4c9;
  overflow: auto;
`;

const TeamList = styled.ul`
  width: 100%;
  padding-left: 0;
  list-style-type: none;
`;

const TeamListItem = styled.li`
  height: 50px;
  width: 50px;
  margin: auto;
  background: #676066;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    border-style: solid;
    border-width: thick;
    border-color: #767676;
  }
`;

const team = ({ id, letter }) => (
  <Link key={`link-${id}`} to={`/view_team/${id}`}>
    <TeamListItem key={`team-${id}`}>{letter}</TeamListItem>
  </Link>
);

export default ({ teams }) => (
  <TeamWrapper>
    <TeamList>{teams.map(team)}</TeamList>
  </TeamWrapper>
);
