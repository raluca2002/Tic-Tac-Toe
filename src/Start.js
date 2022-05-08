import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";

//inputurile cu numele playerilor

let Input = styled.input`
  width: 200px;
  padding: 7px 0;
`;

let BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

let Button = styled.button`
  margin-top: 15px;
  display: block;
  font-size: 16px;
  padding: 6px;
`;

export function Start(props) {
  let player1Ref = useRef("");
  let player2Ref = useRef("");
  let startGame = props.startGame;

  let onClick = () => {
    startGame(player1Ref.current.value, player2Ref.current.value);
  };
  return (
    <div>
      <h2>Player 1 : </h2>
      <Input type="text" ref={player1Ref}></Input>
      <h2>Player 2 : </h2>
      <Input type="text" ref={player2Ref}></Input>
      <BtnWrapper>
        <Button onClick={onClick}>Start game</Button>
      </BtnWrapper>
    </div>
  );
}
