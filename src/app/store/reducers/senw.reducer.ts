import { State } from "../state/senw.state";
import { createReducer, on } from "@ngrx/store";
import { connectingSuccess, createGroupSuccess, getGroupsSuccess } from "../actions/senw.actions";

export const initialState: State = {
    groupName: "",
    groupId: "",
    groups: [{
      groupId: "groupId12345",
      groupName: "supercoolenaam",
      gameLobby: null,
      playedGames: null,
      players: null,
      groupLeader: null,
    },{
      groupId: "IDf38f-43f43fes-ss",
      groupName: "naampjeHoor",
      gameLobby: null,
      playedGames: null,
      players: null,
      groupLeader: null,
      }
    ],
    groupLeaderId: "",
    player: {
      playerId: "",
      playerName: "",
      Avatar: "",
      Wins: 0,
      Loses: 0,
      Draws: 0,
    },
    groupPlayers: [],
  };
  export const reducer = createReducer(
    initialState,
    on(
      connectingSuccess,
      (state): State => ({
        ...state,
        groupName: "nieuw",
        groupId: "hellyeah!"
      })
    ),
    on(
      getGroupsSuccess,
      (state, props): State => ({
        ...state,
        groups: props.model
      })
    ),
    on(
      createGroupSuccess,
      (state, props): State => ({
        ...state,
        groups: state.groups.concat([
          {
            groupId: props.model.groupId,
            groupName: props.model.groupName,
            gameLobby: null,
            playedGames: null,
            players: null,
            groupLeader: null,
          },
        ]),
      })
    ),
  );