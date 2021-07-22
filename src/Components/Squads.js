import React, { useState } from "react";
import axios from "axios";
import { View, Button , Text,StyleSheet , CheckBox} from "react-native";
import { ScrollView } from "react-native";
import SelectPlayer from "./select-players";

export default function SelectMatch() {
    const[squads, setSquads]=useState("");
    const[select_role, setSelect_role]=useState(false);


    const getSquads = () => {
        axios.get("http://15.206.110.130:5001/squad?match_id=6432", {
            headers: {
                'x-access-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksIm1vYmlsZV9udW1iZXIiOiI4NzY1NDMyMTcxIiwiaXNUZW1wVXNlciI6ZmFsc2UsImVtYWlsIjoidXNlcjJAZ21haWwuY29tIiwiaWF0IjoxNjI2NDA3NzAwLCJleHAiOjEwMjY2NDA3NzAwLCJhdWQiOiIxOSIsImlzcyI6IkxlYWd1ZSBYIn0.__xc1cH9iwAN4732GczuLolRhw-GIySSRQIyv3UncbM',
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(
            (response) => {
                setSquads(response.data);
            }
        ).catch(
            (error) => {
                console.log(error)
            }
        )
    }

    const onclickhandler=()=>{
        setSelect_role(true)
    }

    return(
        <Text >
            <Button onPress={getSquads} title="My Squads"/>
            <Text>
            {squads &&
                squads.map((squad) => {
                    return(
                        <Text style={{fontSize:20}} key={squad.id}>
                            <Text >{"\n"}{squad.team_name}</Text>
                            {"\n"}
                            {squads.length<10?<Text onPress={onclickhandler}>Create Squad</Text>
                            :null}
                        </Text>
                    )
                })}
            </Text>
            {onclickhandler && select_role?
                <SelectPlayer/>
            :null}
        </Text>
    );
}
