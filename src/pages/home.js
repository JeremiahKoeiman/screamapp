import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Grid from "@material-ui/core/Grid";

import Scream from '../components/Scream'
import Profile from '../components/Profile'

var initState = {
    screams: null
}

function Home() {

    const [state, setState] = useState(initState)

    useEffect(() => {
        const abortController = new AbortController()
        axios.get('/screams')
            .then(res => {
                setState({
                    screams: res.data
                })
            })
            .catch(err => console.log(err))

        return () => {
            abortController.abort()
        }
    }, [])

    let recentScreamsMarkup = state.screams ?
        (
            state.screams.map(scream => <Scream key={scream.screamId} scream={scream}/>)
        ) : <p>Loading...</p>

    return (
        <Grid container spacing={10}>
            <Grid item sm={8} xs={12}>
                {recentScreamsMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                <Profile/>
            </Grid>
        </Grid>
    );
}

export default Home;
