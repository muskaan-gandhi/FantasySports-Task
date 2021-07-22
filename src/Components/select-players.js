import React, {useState} from "react";
import { View, Button, Text , StyleSheet} from "react-native";
import axios from "axios";
import { CheckBox , Divider} from "react-native-elements";

export default function SelectPlayer(){

  const[players, setPlayers]= useState("");

  //states concerning the initial role-wise list of players 
  const[batsman, setBatsman]= useState(false);
  const[wicket_keeper, setWicket_keeper] = useState(false);
  const[all_rounder, setAll_rounder] = useState(false);
  const[bowler, setBowler] = useState(false);

  //states concerning role-wise selection of players 
  const[select_batsman, SetSelect_batsman]=useState([]);
  const[select_wicket, SetSelect_wicket] = useState([]);
  const[select_all_rouner, SetSelect_all_rounder] = useState([]);
  const[select_bowler, SetSelect_bowler] = useState([]);

  const[credits, setCredits] = useState(100);

  //states to update final list of selected players by the user
  const[final_squad, setFinal_squad] = useState([])
  const[final_batsman_list, setFinal_batsman_list] = useState([])
  const[final_wicket_keeper_list, setFinal_wicket_keeper_list] = useState([])
  const[final_all_rounder_list, setFinal_all_rounder_list] = useState([])
  const[final_bowler_list, setFinal_bowler_list] = useState([])
  
  const[min_player, setMin_player]= useState(false)

  const getPlayer = (e) => {
    axios.get("http://15.206.110.130:5001/squad/players?match_id=6432",{
        headers:{
            'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksIm1vYmlsZV9udW1iZXIiOiI4NzY1NDMyMTcxIiwiaXNUZW1wVXNlciI6ZmFsc2UsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwiaWF0IjoxNjI2NDA3NzAwLCJleHAiOjEwMjY2NDA3NzAwLCJhdWQiOiIxOSIsImlzcyI6IkxlYWd1ZSBYIn0.__xc1cH9iwAN4732GczuLolRhw-GIySSRQIyv3UncbM',
            'Content-Type' :'application/json'   
        }
    }).then(
        (res)=>{
            console.log(res.data)
            setPlayers(res.data)
        }
    )
  }

  axios.post("http://15.206.110.130:5001/squad", Squad,{
      headers:{
        'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksIm1vYmlsZV9udW1iZXIiOiI4NzY1NDMyMTcxIiwiaXNUZW1wVXNlciI6ZmFsc2UsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwiaWF0IjoxNjI2NDA3NzAwLCJleHAiOjEwMjY2NDA3NzAwLCJhdWQiOiIxOSIsImlzcyI6IkxlYWd1ZSBYIn0.__xc1cH9iwAN4732GczuLolRhw-GIySSRQIyv3UncbM',
            'Content-Type' :'application/json'   
      }
  })

//set the minimum players restrictions 
  let minimum ={};
  if(final_bowler_list.length<2){
    minimum.bowler='select minimum 3 bowler';
  }
  if(final_wicket_keeper_list.length<1){
    minimum.wicket_keeper='select minimum 1 wicket-keeper'
  }
  if(final_batsman_list.length<2){
    minimum.batsman='select minimum 3 batsman'
  }
  if(final_squad.length!=11){
    minimum.squad='select 11 players'
  }

  function getMySquad(){
    if(!minimum.bowler && !minimum.wicket_keeper && !minimum.batsman && !minimum.squad){
      setMin_player(true)
    }
    setFinal_squad([...final_batsman_list, final_wicket_keeper_list, final_all_rounder_list, final_bowler_list])
  }
  const Squad = final_squad.map(type => <Text>{"\n"}{type} {"\n"}</Text>)

  return(
    <Text>
    {"\n"}{"\n"}
      <Text style={{fontWeight:'400', fontSize:24, backgroundColor:'yellow', paddingHorizontal:'20vw'}} onPress={getPlayer}>Get the list of Players</Text>
      {"\n"}{"\n"}
      <Text style={{position:'absolute' ,right:'10px', fontSize:20,fontWeight:'600'}}>Available Credits = {credits}</Text>
      {"\n"}
      <Divider orientation="horizontal" width={2}/>
      {!!players &&  <Text style={{fontWeight:'400', fontSize:24}} onPress={()=>setBatsman(!batsman)}>Batsman</Text>}
      {"\n"}
  {/*get the list of batman*/}
      {!!batsman&& 
        players.map(player=>{
          return( 
            <Text key={player.id} >
              {batsman&& (player.role == "Batsman")?
                <Text style={{flexDirection:'column'}}>{player.name} {player.team_name} <Text style={{fontWeight:'600'}}>{player.event_player_credit}</Text>
                <CheckBox 
                  checked={select_batsman.includes(player.name)}
                  onPress={() => {
                    //  duplicate id to prevent mutation, used spread operator to achieve that
                    const new_bat_ID = [...select_batsman];
                    const index = new_bat_ID.indexOf(player.name);
                    if(index > -1){
                      setCredits(credits+(player.event_player_credit))
                      new_bat_ID.splice(index, 1);
                    }
                    //set the limits
                    else{
                      const batsmanlist = Object.assign([], new_bat_ID);
                      setBatsman(batsmanlist)
                      if(batsmanlist.length > 6){
                        null
                      }                     
                        else{
                        if(credits < 10){null} 
                        else{
                          new_bat_ID.push(player.name)
                          setCredits(credits-(player.event_player_credit))
                          const my_final_batsman_squad = [...batsmanlist]
                          //final list of selected batsman
                          setFinal_batsman_list(my_final_batsman_squad)
                        }                      
                      }
                    }
                    SetSelect_batsman(new_bat_ID)
                  }} />
                  {"\n"}
              </Text>: null} 
            </Text>
          )
        })}
      {"\n"}

  {/*get the list of wicket-keeper*/}
      {!!players && <Text style={{fontWeight:'400', fontSize:24}} onPress={()=>setWicket_keeper(!wicket_keeper)}>Wicket-keeper</Text>}
      {"\n"}
      {!!wicket_keeper&& 
        players.map(player=>{
          return(
            <Text key={player.id}>
            {wicket_keeper&& (player.role == "Wicket-Keeper")?
            <Text>{player.name} {player.team_name} <Text style={{fontWeight:'600'}}>{player.event_player_credit}</Text>
            <CheckBox checked={select_wicket.includes(player.name)}
              onPress={() => {
                const new_wkID = [...select_wicket];
                const index = new_wkID.indexOf(player.name);
                if(index > -1){
                  setCredits(credits+(player.event_player_credit))
                  new_wkID.splice(index, 1);
                }else{
                  const Wicket_keeper_list = Object.assign([], new_wkID);
                  setWicket_keeper(Wicket_keeper_list)
                  if(Wicket_keeper_list.length > 1){
                    null
                  }else{
                    if(credits < 10){null} 
                    else{
                        new_wkID.push(player.name)
                        setCredits(credits-(player.event_player_credit))
                        const my_final_wicketkeeper_squad = [... Wicket_keeper_list]
                        setFinal_wicket_keeper_list(my_final_wicketkeeper_squad)
                    }
                  }
                }
                SetSelect_wicket(new_wkID)
              }} /> {"\n"}
            </Text>:null}
          </Text>
        )
      })}
      {"\n"}

  {/*get the list of all-rounder*/}
      {!!players && <Text style={{fontWeight:'400', fontSize:24}} onPress={()=>setAll_rounder(!all_rounder)}>All-Rounder</Text>}
      {"\n"}
      {!!all_rounder&& players.map(player=>{
        return(
          <Text key={player.id}>
          {all_rounder && (player.role == "All-Rounder")?
            <Text>{player.name} {player.team_name} <Text style={{fontWeight:'600'}}>{player.event_player_credit}</Text>
            <CheckBox checked={select_all_rouner.includes(player.name)}
              onPress={() => {
                const new_arID = [...select_all_rouner];
                const index = new_arID.indexOf(player.name);
                if(index > -1){
                  setCredits(credits+(player.event_player_credit))
                  new_arID.splice(index, 1);
                }else{
                  const All_Rounder_list = Object.assign([], new_arID);
                  setAll_rounder(All_Rounder_list)
                  if(All_Rounder_list.length > 3){
                    null
                  }else{
                    if(credits < 10){null} 
                    else{
                      new_arID.push(player.name)
                      setCredits(credits-(player.event_player_credit))
                      const my_final_all_rounder_squad = [...All_Rounder_list]
                      setFinal_all_rounder_list(my_final_all_rounder_squad)
                    }
                  }
                }
                SetSelect_all_rounder(new_arID)
              }}/> {"\n"}
            </Text>:null}
          </Text>
        )
      })}
      {"\n"}

  {/*get the list of batman*/}
      {!!players && <Text style={{fontWeight:'400', fontSize:24}} onPress={()=>setBowler(!bowler)}>Bowler</Text>}
      {"\n"}
      {!!bowler&& players.map(player=>{
        return(
          <Text key={player.id}>
            {bowler&& (player.role == "Bowler")?
              <Text>{player.name} {player.team_name} <Text style={{fontWeight:'600'}}>{player.event_player_credit}</Text>
              <CheckBox checked={select_bowler.includes(player.name)}
                onPress={() => {
                  const new_bowler_ID = [...select_bowler];
                  const index = new_bowler_ID.indexOf(player.name);
                  if(index > -1){
                    setCredits(credits+(player.event_player_credit))
                    new_bowler_ID.splice(index, 1);
                  }else{
                    const Bowler_list = Object.assign([], new_bowler_ID);
                    setBowler(Bowler_list)
                    if(Bowler_list.length > 6){
                      null
                    }else{
                      if(credits < 10){null} 
                      else{
                        new_bowler_ID.push(player.name)
                        setCredits(credits-(player.event_player_credit))
                        const my_final_bowler_squad = [...Bowler_list]
                        setFinal_bowler_list(my_final_bowler_squad)
                      }
                    }
                  }
                  SetSelect_bowler(new_bowler_ID)
                }} />{"\n"}
              </Text>:null}
          </Text>
        )
      })}
      {"\n"}
      {/**get the final squad */}
      {!!players &&  <Button onPress={getMySquad} title="Review Squad"/>}
      {players&& final_squad&&<Text>{ !min_player?  <Text style={{color:'red'}}>{"\n"}Select atleast 3 batsman, 1 wicket-keeper and 3 bowlers</Text>:{Squad}}</Text>} 
      {"\n"}

    </Text>
  )
}


