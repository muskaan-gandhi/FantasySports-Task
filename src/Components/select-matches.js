import React, { useEffect, useState } from "react";
import axios from "axios";
import { View, Button , Text,StyleSheet , CheckBox} from "react-native";
import { ScrollView } from "react-native";
import Squads from "./Squads";

function SelectMatch() {
    const[match, setMatch]=useState("");
    const[total_squads, setTotal_squads]=useState(false);
    const [leagues, setLeagues] = useState(false);

    const getMatches = () => {
        axios.get("http://15.206.110.130:5001/matches/upcoming-matches", {
            headers: {
                'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksIm1vYmlsZV9udW1iZXIiOiI4NzY1NDMyMTcxIiwiaXNUZW1wVXNlciI6ZmFsc2UsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwiaWF0IjoxNjI2NDA3NzAwLCJleHAiOjEwMjY2NDA3NzAwLCJhdWQiOiIxOSIsImlzcyI6IkxlYWd1ZSBYIn0.__xc1cH9iwAN4732GczuLolRhw-GIySSRQIyv3UncbM',
                'Content-Type':'application/json'
            }
        }).then(
            (response) => {
                setMatch(response.data.matches.cricket);
            }
            
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

   function getLeagues() {
        axios.get("http://15.206.110.130:5001/leagues?match_id=6432", {
            headers: {
                'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksIm1vYmlsZV9udW1iZXIiOiI4NzY1NDMyMTcxIiwiaXNUZW1wVXNlciI6ZmFsc2UsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwiaWF0IjoxNjI2NDA3NzAwLCJleHAiOjEwMjY2NDA3NzAwLCJhdWQiOiIxOSIsImlzcyI6IkxlYWd1ZSBYIn0.__xc1cH9iwAN4732GczuLolRhw-GIySSRQIyv3UncbM',
                'Content-Type':'application/json'
            }
        }).then(
            (responseleague)=>{
            setLeagues(responseleague.data.leagues);
        })}

    const onclickhandler=()=>{
        setTotal_squads(true)
    }

    return (
        <View style={{marginHorizontal:5}}>
            <Button onPress={getMatches} title="Get Upcoming Matches"/>
            <ScrollView horizontal='true'>
            {match &&
                match.map((matches) => {
                    return(
                        <View key={matches.id} style={[styles.matches_list_container]}>
                            <Text style={[styles.matches_list]} onPress={onclickhandler}>'{matches.match_name}'</Text>
                        </View>
                    )
                })}
            </ScrollView>
            {onclickhandler && total_squads?
                <Squads/>
            :null}
            <br/>
            <Button onPress={getLeagues} title="Available Leagues"/>
            {leagues&& leagues.map(league=>{return(<Text key={league.id}>{league.name} {league.league_type} {league.id}</Text>)})}
        </View>
    );
}
export default SelectMatch;

const styles = StyleSheet.create({

    matches_list_container:{
        padding:10,
        backgroundColor:'yellow', 
        margin:10
    },
    matches_list:{
        fontFamily:'Roboto',
        fontSize:18,
        color:'black'
        
    }
})
    
