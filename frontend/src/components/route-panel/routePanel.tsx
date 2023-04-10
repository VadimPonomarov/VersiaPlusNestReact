import React, {FC, memo} from 'react';

import {Box, Paper} from "@mui/material";
import {v4} from 'uuid';

import {IDirection} from "../../storage/slices/directions-slice/interfaces";

interface IProps {
    route: IDirection
}

const _RoutePanel: FC<IProps> = ({route}) => {
    return (
        <Box sx={{textAlign: 'left'}}>
            <Box
                sx={{width: '100%', display: "flex", alignItems: "center", fontSize: '10px'}}
            >
                <Paper sx={{p: 1, m: 1}}>
                    <div>
                        {route.from.location}
                    </div>
                    {route.through &&
                        route.through
                            .map(item =>
                                <small key={v4()}>
                                    {item.location}
                                </small>
                            )}
                    <div>
                        {route.to.location}
                    </div>
                    <small>
                        {route.distance}
                    </small>
                </Paper>
            </Box>
        </Box>
    );
};

export const RoutePanel = memo(_RoutePanel);