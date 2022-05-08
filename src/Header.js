import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";

let Head = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 100px;
  width: 300px;
`;

export function Header(props) {
  let player1 = props.player1;
  let player2 = props.player2;
  let score = props.score;

  return (
    <Head>
      <h2>{player1}</h2>
      <h2>
        {score[0]} : {score[1]}
      </h2>
      <h2>{player2}</h2>
    </Head>
  );
}
